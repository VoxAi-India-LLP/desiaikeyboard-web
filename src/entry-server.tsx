// Build-time renderer used by scripts/prerender.mjs to produce static HTML for every route.
import React from 'react';
import { renderToString } from 'react-dom/server';
import App from './App';
import { getHead, renderHeadTags, resolveRoute, INDEXABLE_PATHS, SITE_URL } from './seo';

export { INDEXABLE_PATHS, SITE_URL };

export function render(path: string) {
  const route = resolveRoute(path);
  const head = getHead(route);
  const html = renderToString(<App path={path} />);
  return { html, head: renderHeadTags(head), lang: head.lang };
}
