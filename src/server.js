import 'dotenv/config';
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

const app = express();

// Разрешаем CORS и JSON
app.use(cors());
app.use(express.json());

// Гарантируем корректную кодировку HTML
app.use((req, res, next) => {
  const p = req.path.toLowerCase();
  if (p === "/" || p.endsWith(".html")) res.set("Content-Type", "text/html; charset=utf-8");
  next();
});

// Статика (наш фронт лежит в /public)
app.use(express.static(path.join(__dirname, "../public")));

// Простое здоровье сервера
app.get("/health", (req, res) => {
  res.json({ ok: true, time: new Date().toISOString() });
});

// Заглушка автообнаружения (пока просто пусто)
globalThis.discover = { items: [], ts: Date.now() };
app.get("/api/discover", (req, res) => {
  res.json({ ok: true, items: discover.items, ts: discover.ts });
});

// Запуск
const PORT = process.env.PORT || 8888;
app.listen(PORT, () => {
  console.log(`[trik] listening on http://localhost:${PORT}`);
});
