import express from "express";
import { createServer as createViteServer } from "vite";
import db from "./db.js";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/games", (req, res) => {
    const games = db.prepare('SELECT * FROM games ORDER BY created_at DESC').all();
    res.json(games);
  });

  app.post("/api/games", (req, res) => {
    // Simple auth check (in a real app, use sessions/tokens)
    const authHeader = req.headers.authorization;
    if (authHeader !== `Bearer ${process.env.ADMIN_PASSWORD || 'admin123'}`) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { title, description, status, image_url, play_url } = req.body;
    const insert = db.prepare('INSERT INTO games (title, description, status, image_url, play_url) VALUES (?, ?, ?, ?, ?)');
    const result = insert.run(title, description, status, image_url, play_url);
    res.json({ id: result.lastInsertRowid });
  });

  app.post("/api/feedback", (req, res) => {
    const { game_id, message, contact } = req.body;
    const insert = db.prepare('INSERT INTO feedback (game_id, message, contact) VALUES (?, ?, ?)');
    insert.run(game_id, message, contact);
    res.json({ success: true });
  });

  app.get("/api/posts", (req, res) => {
    const posts = db.prepare('SELECT * FROM posts ORDER BY created_at DESC').all();
    res.json(posts);
  });

  app.post("/api/posts", (req, res) => {
    const authHeader = req.headers.authorization;
    if (authHeader !== `Bearer ${process.env.ADMIN_PASSWORD || 'admin123'}`) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { title, content, image_url } = req.body;
    const insert = db.prepare('INSERT INTO posts (title, content, image_url) VALUES (?, ?, ?)');
    const result = insert.run(title, content, image_url);
    res.json({ id: result.lastInsertRowid });
  });

  // SEO Endpoints
  app.get('/robots.txt', (req, res) => {
    res.type('text/plain');
    res.send(`User-agent: *
Allow: /
Sitemap: https://www.sashagame.shop/sitemap.xml
`);
  });

  app.get('/sitemap.xml', (req, res) => {
    res.type('application/xml');
    
    // Get dynamic content
    const games = db.prepare('SELECT id, created_at FROM games').all() as {id: number, created_at: string}[];
    const posts = db.prepare('SELECT id, created_at FROM posts').all() as {id: number, created_at: string}[];

    const baseUrl = 'https://www.sashagame.shop';
    
    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}/</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}/blog</loc>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>`;

    // Add games (assuming we have detail pages later, for now just anchor or list)
    // For now, let's just list the main pages as the primary content.
    // If we had /game/:id routes, we would add them here.

    xml += `
</urlset>`;
    
    res.send(xml);
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Production static file serving would go here
    // app.use(express.static('dist'));
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
