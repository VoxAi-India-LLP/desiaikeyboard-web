// Writes a fully rendered static HTML file for every route (plus 404.html and sitemap.xml)
// so search engines and link previews get real content, titles and structured data
// without running JavaScript. Run after `vite build` and the SSR build (see package.json).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const serverEntry = path.join(root, 'dist-server', 'entry-server.js');

const { render, INDEXABLE_PATHS, SITE_URL } = await import(pathToFileURL(serverEntry).href);
const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf-8');

const HEAD_RE = /<!--seo-head-->[\s\S]*?<!--\/seo-head-->/;
if (!HEAD_RE.test(template) || !template.includes('<div id="root"></div>')) {
  throw new Error('prerender: index.html is missing the <!--seo-head--> markers or the empty #root div');
}

const page = (route) => {
  const { html, head, lang } = render(route);
  return template
    .replace(HEAD_RE, head)
    .replace(/<html lang="[^"]*"/, `<html lang="${lang}"`)
    .replace('<div id="root"></div>', `<div id="root">${html}</div>`);
};

for (const route of INDEXABLE_PATHS) {
  const out = route === '/' ? path.join(dist, 'index.html') : path.join(dist, route.slice(1), 'index.html');
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, page(route));
  console.log(`prerendered ${route}`);
}

fs.writeFileSync(path.join(dist, '404.html'), page('/404'));
console.log('prerendered 404.html');

const today = new Date().toISOString().slice(0, 10);
const priority = (r) => (r === '/' ? '1.0' : r === '/privacy-policy' ? '0.3' : '0.9');
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${INDEXABLE_PATHS.map((r) => {
  const slug = r.match(/^\/([a-z]+)-keyboard$/)?.[1];
  const img = slug
    ? `\n    <image:image><image:loc>${SITE_URL}/featured/${slug}.jpg</image:loc></image:image>`
    : r === '/'
      ? `\n    <image:image><image:loc>${SITE_URL}/featured/hindi.jpg</image:loc></image:image>`
      : '';
  return `  <url>
    <loc>${SITE_URL}${r === '/' ? '/' : r}</loc>
    <lastmod>${today}</lastmod>
    <priority>${priority(r)}</priority>${img}
  </url>`;
}).join('\n')}
</urlset>
`;
fs.writeFileSync(path.join(dist, 'sitemap.xml'), sitemap);
console.log(`sitemap.xml: ${INDEXABLE_PATHS.length} URLs`);

fs.rmSync(path.join(root, 'dist-server'), { recursive: true, force: true });
