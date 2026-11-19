import React from 'react';
import { LANGUAGE_EDITIONS, editionPath } from '../data/editions';

export const NotFoundPage: React.FC = () => (
  <main className="flex-1 px-4 pt-32 pb-20 text-center sm:px-6">
    <p className="text-sm font-bold uppercase tracking-wide text-[#FF9933]">404</p>
    <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-[#172033] sm:text-4xl">Page not found</h1>
    <p className="mx-auto mt-4 max-w-md text-slate-600">
      The page you are looking for doesn’t exist. Try one of our language keyboards or go back home.
    </p>
    <a href="/" className="mt-6 inline-block rounded-xl bg-[#000080] px-6 py-3 text-sm font-bold text-white">
      Go to homepage
    </a>
    <ul className="mx-auto mt-10 flex max-w-2xl flex-wrap justify-center gap-2">
      {LANGUAGE_EDITIONS.map((e) => (
        <li key={e.slug}>
          <a href={editionPath(e)} className="inline-block rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:border-amber-300">
            {e.name} Keyboard
          </a>
        </li>
      ))}
    </ul>
  </main>
);
