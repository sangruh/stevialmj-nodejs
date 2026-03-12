// MySQL-compatible server for Stevia LMJ
// Falls back to SQLite if MySQL is not available
import "dotenv/config";
import express from "express";
import { createServer } from "http";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { z } from "zod";
import { initTRPC } from "@trpc/server";
import superjson from "superjson";

let _db = null;

async function getDb() {
  if (!_db) {
    // Try MySQL first
    try {
      const mysql = await import('mysql2/promise');
      
      const dbConfig = {
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'stevialmj',
        password: process.env.DB_PASSWORD || 'stevia1117!!',
        database: process.env.DB_NAME || 'triwirat_stevia',
      };

      console.log('[DB] Attempting MySQL connection to:', dbConfig.host, '/', dbConfig.database);
      
      const connection = await mysql.createConnection(dbConfig);
      await connection.ping();
      console.log('✅ [DB] MySQL connected successfully!');
      
      _db = { type: 'mysql', connection };
      
      process.on('SIGTERM', async () => {
        console.log('[DB] Closing MySQL connection...');
        await connection.end();
      });
      
    } catch (error) {
      console.warn('⚠️  [DB] MySQL connection failed:', error.message);
      console.log('[DB] Falling back to SQLite...');
      
      // Fallback to SQLite
      const { createClient } = await import('@libsql/client');
      const dbPath = process.env.DATABASE_URL?.replace('file:', '') || './sqlite.db';
      console.log('[DB] Using SQLite:', dbPath);
      
      const client = createClient({ url: `file:${dbPath}` });
      _db = { type: 'sqlite', connection: client };
    }
  }
  return _db;
}

// tRPC setup
const t = initTRPC.context().create({ transformer: superjson });
const router = t.router;
const publicProcedure = t.procedure;

// Articles router
const articlesRouter = router({
  list: publicProcedure.query(async () => {
    const db = await getDb();
    if (!db) throw new Error("Database not available");

    console.log('[API] Fetching articles from:', db.type);
    
    if (db.type === 'mysql') {
      const [rows] = await db.connection.execute('SELECT * FROM articles ORDER BY createdAt DESC');
      return rows;
    } else {
      const result = await db.connection.execute('SELECT * FROM articles ORDER BY createdAt DESC');
      return result.rows;
    }
  }),

  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      if (db.type === 'mysql') {
        const [rows] = await db.connection.execute('SELECT * FROM articles WHERE id = ? LIMIT 1', [input.id]);
        if (!rows || rows.length === 0) throw new Error("Article not found");
        return rows[0];
      } else {
        const result = await db.connection.execute('SELECT * FROM articles WHERE id = ? LIMIT 1', [input.id]);
        if (!result.rows || result.rows.length === 0) throw new Error("Article not found");
        return result.rows[0];
      }
    }),

  create: publicProcedure
    .input(z.object({
      id: z.string(), title: z.string(), excerpt: z.string(), content: z.string(),
      author: z.string(), date: z.string(), image: z.string(), readTime: z.number(),
      category: z.enum(["Diabetes", "Diet & Nutrisi", "Resep Sehat", "Tips Kesehatan", "Testimoni"]).optional(),
      tags: z.string().optional()
    }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");
      const now = new Date().toISOString();

      if (db.type === 'mysql') {
        await db.connection.execute(
          `INSERT INTO articles (id, title, excerpt, content, author, date, image, readTime, category, tags, createdAt, updatedAt)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
          [input.id, input.title, input.excerpt, input.content, input.author, input.date, input.image, input.readTime, input.category || 'Tips Kesehatan', input.tags || null]
        );
      } else {
        await db.connection.execute(
          `INSERT INTO articles (id, title, excerpt, content, author, date, image, readTime, category, tags, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [input.id, input.title, input.excerpt, input.content, input.author, input.date, input.image, input.readTime, input.category || 'Tips Kesehatan', input.tags || null, now, now]
        );
      }
      return { success: true };
    }),

  update: publicProcedure
    .input(z.object({
      id: z.string(), title: z.string(), excerpt: z.string(), content: z.string(),
      author: z.string(), date: z.string(), image: z.string(), readTime: z.number(),
      category: z.enum(["Diabetes", "Diet & Nutrisi", "Resep Sehat", "Tips Kesehatan", "Testimoni"]).optional(),
      tags: z.string().optional()
    }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");
      const now = new Date().toISOString();
      const { id, ...data } = input;

      if (db.type === 'mysql') {
        await db.connection.execute(
          `UPDATE articles SET title=?, excerpt=?, content=?, author=?, date=?, image=?, readTime=?, category=?, tags=?, updatedAt=NOW() WHERE id=?`,
          [data.title, data.excerpt, data.content, data.author, data.date, data.image, data.readTime, data.category || 'Tips Kesehatan', data.tags || null, id]
        );
      } else {
        await db.connection.execute(
          `UPDATE articles SET title=?, excerpt=?, content=?, author=?, date=?, image=?, readTime=?, category=?, tags=?, updatedAt=? WHERE id=?`,
          [data.title, data.excerpt, data.content, data.author, data.date, data.image, data.readTime, data.category || 'Tips Kesehatan', data.tags || null, now, id]
        );
      }
      return { success: true };
    }),

  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");
      await db.connection.execute('DELETE FROM articles WHERE id = ?', [input.id]);
      return { success: true };
    })
});

// App router
const appRouter = router({ articles: articlesRouter });

// Express app
const app = express();
const server = createServer(app);

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use('/api/trpc', createExpressMiddleware({ router: appRouter, createContext: () => ({}) }));
app.use(express.static('dist/public'));
app.use('*', (_, res) => res.sendFile('index.html', { root: 'dist/public' }));

// Start
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}/`);
  console.log(`📊 Database: ${process.env.DB_NAME ? 'MySQL (' + process.env.DB_NAME + ')' : 'SQLite'}`);
});
