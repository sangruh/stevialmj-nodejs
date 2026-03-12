// MySQL Server for Stevia LMJ - NO SQLite Fallback
require('dotenv').config();
const express = require('express');
const http = require('http');
const { createExpressMiddleware } = require('@trpc/server/adapters/express');
const { z } = require('zod');
const { initTRPC } = require('@trpc/server');
const superjson = require('superjson').default;
const mysql = require('mysql2/promise');

let _db = null;

async function getDb() {
  if (!_db) {
    try {
      // MySQL connection configuration
      const connection = await mysql.createConnection({
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
      });

      await connection.ping();
      console.log('✅ [MySQL] Connected to', process.env.DB_NAME, '@', process.env.DB_HOST);
      
      _db = { type: 'mysql', connection };
      
      process.on('SIGTERM', async () => {
        console.log('[MySQL] Closing connection...');
        await connection.end();
      });
      
    } catch (error) {
      console.error('❌ [MySQL] Connection FAILED!');
      console.error('Error:', error.message);
      console.error('');
      console.error('Please check:');
      console.error('1. Database exists in Plesk');
      console.error('2. Username/password correct');
      console.error('3. MySQL service running');
      throw error;
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
    const [rows] = await db.connection.execute('SELECT * FROM articles ORDER BY createdAt DESC');
    console.log('✅ [API] Fetched', rows.length, 'articles');
    return rows;
  }),

  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const db = await getDb();
      const [rows] = await db.connection.execute('SELECT * FROM articles WHERE id = ? LIMIT 1', [input.id]);
      if (!rows || rows.length === 0) throw new Error("Article not found");
      return rows[0];
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
      await db.connection.execute(
        `INSERT INTO articles (id, title, excerpt, content, author, date, image, readTime, category, tags, createdAt, updatedAt)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
        [input.id, input.title, input.excerpt, input.content, input.author, input.date, input.image, input.readTime, input.category || 'Tips Kesehatan', input.tags || null]
      );
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
      const { id, ...data } = input;
      await db.connection.execute(
        `UPDATE articles SET title=?, excerpt=?, content=?, author=?, date=?, image=?, readTime=?, category=?, tags=?, updatedAt=NOW() WHERE id=?`,
        [data.title, data.excerpt, data.content, data.author, data.date, data.image, data.readTime, data.category || 'Tips Kesehatan', data.tags || null, id]
      );
      return { success: true };
    }),

  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      await db.connection.execute('DELETE FROM articles WHERE id = ?', [input.id]);
      return { success: true };
    })
});

// App router
const appRouter = router({ articles: articlesRouter });

// Express app
const app = express();
const server = http.createServer(app);

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use('/api/trpc', createExpressMiddleware({ router: appRouter, createContext: () => ({}) }));
app.use(express.static('public'));
app.use('*', (_, res) => res.sendFile('index.html', { root: 'public' }));

// Start
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}/`);
  console.log(`📊 Database: MySQL (${process.env.DB_NAME})`);
});
