import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function createServer() {
  const app = express();

  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'custom',
  });

  app.use(vite.middlewares);

  app.use(async (req, res) => {
    const url = req.originalUrl;

    let template = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf-8');
    template = await vite.transformIndexHtml(url, template);

    const { render } = await vite.ssrLoadModule('/src/entry-server.jsx');
    const { html, head } = render();

    const finalHtml = template
      .replace(`<!--head-tags-->`, head)
      .replace(`<!--app-html-->`, html);

    res.status(200).set({ 'Content-Type': 'text/html' }).end(finalHtml);
  });

  app.listen(3000, () => {
    console.log('✅ Server running at http://localhost:3000');
  });
}

createServer();
