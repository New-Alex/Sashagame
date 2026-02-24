import Database from 'better-sqlite3';
import path from 'path';

const db = new Database('sashagame.db');

// Initialize database
db.exec(`
  CREATE TABLE IF NOT EXISTS games (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    status TEXT DEFAULT 'prototype', -- prototype, alpha, beta, release
    image_url TEXT,
    play_url TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
  
  CREATE TABLE IF NOT EXISTS feedback (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    game_id INTEGER,
    message TEXT NOT NULL,
    contact TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(game_id) REFERENCES games(id)
  );

  CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    image_url TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

// Seed some initial data if empty
const count = db.prepare('SELECT count(*) as count FROM games').get() as { count: number };
if (count.count === 0) {
  const insert = db.prepare('INSERT INTO games (title, description, status, image_url) VALUES (?, ?, ?, ?)');
  insert.run('Neon Racer', 'Гоночная аркада в стиле ретровейв. Мой первый проект на Unity.', 'prototype', 'https://picsum.photos/seed/neon/800/600');
  insert.run('Space Defender', 'Классический шутер с элементами roguelike. Нужен фидбек по балансу оружия.', 'alpha', 'https://picsum.photos/seed/space/800/600');
  insert.run('Forest Mystery', 'Текстовый квест с элементами хоррора.', 'release', 'https://picsum.photos/seed/forest/800/600');
}

const postsCount = db.prepare('SELECT count(*) as count FROM posts').get() as { count: number };
if (postsCount.count === 0) {
  const insertPost = db.prepare('INSERT INTO posts (title, content, image_url) VALUES (?, ?, ?)');
  insertPost.run('Первые шаги в геймдеве', 'Сегодня я начал изучать Unity. Это невероятно интересно, но и сложно. Столько всего нужно запомнить! Но я не сдаюсь.', 'https://picsum.photos/seed/blog1/800/600');
  insertPost.run('Идея для новой игры', 'Хочу сделать платформер про кота, который спасает мир от огурцов. Звучит безумно, но почему бы и нет?', 'https://picsum.photos/seed/blog2/800/600');
}

export default db;
