import type { NextApiRequest, NextApiResponse } from 'next';
import { readFileSync } from 'fs';
import { join } from 'path';

const SECTION_SEPARATOR = '=' .repeat(80);

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).end('Method Not Allowed');
  }

  const fullPath = join(process.cwd(), 'public', 'llms-full.txt');
  let content: string;
  try {
    content = readFileSync(fullPath, 'utf-8');
  } catch {
    return res.status(500).json({ error: 'llms-full.txt not found. Run: npm run generate:llms' });
  }

  const section = typeof req.query.section === 'string' ? req.query.section.toLowerCase() : null;

  if (section) {
    const pages = content.split(SECTION_SEPARATOR);
    const header = pages[0]; // TOC block
    const matched = pages.filter((page) => {
      const urlMatch = page.match(/^URL:\s*(\S+)/m);
      if (!urlMatch) return false;
      const url = urlMatch[1];
      // Match section prefix: e.g. section=guides matches /guides/...
      return url.startsWith(`/${section}/`) || url === `/${section}`;
    });

    if (matched.length === 0) {
      return res.status(404).json({
        error: `No pages found for section "${section}"`,
        available: ['getting-started', 'guides', 'api', 'integrations', 'chains', 'resources'],
      });
    }

    const result = header.trim() + '\n\n' + matched.map((p) => SECTION_SEPARATOR + p).join('');
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=86400');
    return res.status(200).send(result);
  }

  // Full content
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=86400');
  return res.status(200).send(content);
}
