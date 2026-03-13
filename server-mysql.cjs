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
      console.log('[DEBUG] Attempting MySQL connection...');
      console.log('[DEBUG] DB_HOST:', process.env.DB_HOST || 'localhost');
      console.log('[DEBUG] DB_USER:', process.env.DB_USER || '(not set)');
      console.log('[DEBUG] DB_NAME:', process.env.DB_NAME || '(not set)');
      
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
      console.error('Stack:', error.stack);
      console.error('');
      console.error('Please check:');
      console.error('1. Database exists in Plesk');
      console.error('2. Username/password correct');
      console.error('3. MySQL service running');
      console.error('4. Environment variables set in Plesk Node.js panel');
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
    console.log('[DEBUG] articles.list called');
    try {
      const db = await getDb();
      console.log('[DEBUG] DB connection obtained');
      const [rows] = await db.connection.execute('SELECT * FROM articles ORDER BY createdAt DESC');
      console.log('✅ [API] Fetched', rows.length, 'articles');
      return rows;
    } catch (error) {
      console.error('❌ [API] articles.list ERROR:', error.message);
      console.error('Stack:', error.stack);
      throw error;
    }
  }),

  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      console.log('[DEBUG] articles.getById called with id:', input.id);
      try {
        const db = await getDb();
        const [rows] = await db.connection.execute('SELECT * FROM articles WHERE id = ? LIMIT 1', [input.id]);
        if (!rows || rows.length === 0) throw new Error("Article not found");
        return rows[0];
      } catch (error) {
        console.error('❌ [API] articles.getById ERROR:', error.message);
        throw error;
      }
    }),

  create: publicProcedure
    .input(z.object({
      id: z.string(),
      title: z.string(),
      excerpt: z.string(),
      content: z.string(),
      author: z.string(),
      date: z.string().nullable().optional(),
      image: z.string(),
      readTime: z.number(),
      category: z.enum(["Diabetes", "Diet & Nutrisi", "Resep Sehat", "Tips Kesehatan", "Testimoni"]).optional(),
      tags: z.string().nullable().optional()
    }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      const dateValue = input.date || new Date().toISOString().split('T')[0];
      await db.connection.execute(
        `INSERT INTO articles (id, title, excerpt, content, author, date, image, readTime, category, tags, createdAt, updatedAt)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
        [input.id, input.title, input.excerpt, input.content, input.author, dateValue, input.image, input.readTime, input.category || 'Tips Kesehatan', input.tags || null]
      );
      return { success: true };
    }),

  update: publicProcedure
    .input(z.object({
      id: z.string(),
      title: z.string(),
      excerpt: z.string(),
      content: z.string(),
      author: z.string(),
      date: z.string().nullable().optional(),
      image: z.string(),
      readTime: z.number(),
      category: z.enum(["Diabetes", "Diet & Nutrisi", "Resep Sehat", "Tips Kesehatan", "Testimoni"]).optional(),
      tags: z.string().nullable().optional()
    }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      const { id, ...data } = input;
      const dateValue = data.date || new Date().toISOString().split('T')[0];
      await db.connection.execute(
        `UPDATE articles SET title=?, excerpt=?, content=?, author=?, date=?, image=?, readTime=?, category=?, tags=?, updatedAt=NOW() WHERE id=?`,
        [data.title, data.excerpt, data.content, data.author, dateValue, data.image, data.readTime, data.category || 'Tips Kesehatan', data.tags || null, id]
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

// Logging middleware for API requests
app.use('/api/trpc', (req, res, next) => {
  console.log('[DEBUG] API Request:', req.method, req.path);
  console.log('[DEBUG] Query:', req.query);
  console.log('[DEBUG] Body:', req.body);
  next();
});

app.use('/api/trpc', createExpressMiddleware({ 
  router: appRouter, 
  createContext: () => ({}),
  onError: ({ error, path, input, req }) => {
    console.error('❌ [tRPC ERROR]', {
      error: error.message,
      path,
      input,
      url: req?.url
    });
  }
}));
app.use(express.static('public'));
app.use('*', (_, res) => res.sendFile('index.html', { root: 'public' }));

// Start
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}/`);
  console.log(`📊 Database: MySQL (${process.env.DB_NAME || 'NOT SET'})`);
  console.log(`🔍 Environment: ${process.env.NODE_ENV || 'development'}`);
});
