#!/usr/bin/env node

/**
 * Generate llms-full.txt — a single plain-text file containing
 * all Veridex documentation for AI/LLM consumption.
 *
 * Usage:
 *   node scripts/generate-llms-full.mjs
 *
 * Output:
 *   public/llms-full.txt
 */

import { readFileSync, writeFileSync, readdirSync, statSync, existsSync } from 'fs';
import { join, relative, basename, extname } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PAGES_DIR = join(__dirname, '..', 'pages');
const OUTPUT = join(__dirname, '..', 'public', 'llms-full.txt');

// Ordered sections — controls output order
const SECTION_ORDER = [
  'index.mdx',
  'getting-started',
  'guides',
  'chains',
  'integrations',
  'security',
  'api-reference',
  'resources',
];

// Within each section, respect _meta.json ordering if present
function getSectionPageOrder(sectionDir) {
  const metaPath = join(sectionDir, '_meta.json');
  if (existsSync(metaPath)) {
    const meta = JSON.parse(readFileSync(metaPath, 'utf-8'));
    return Object.keys(meta);
  }
  return null;
}

// Strip MDX/JSX imports, component tags, and frontmatter → clean markdown
function mdxToPlainMarkdown(content, filePath) {
  let text = content;

  // Remove frontmatter
  text = text.replace(/^---[\s\S]*?---\n*/m, '');

  // Remove import statements
  text = text.replace(/^import\s+.*$/gm, '');

  // Remove JSX expression containers: {"text"} → text
  text = text.replace(/\{"([^"]*?)"\}/g, '$1');

  // Convert self-closing JSX tags to nothing: <Callout />, <Step />, etc.
  text = text.replace(/<\w+\s*\/>/g, '');

  // Convert opening JSX wrapper tags — extract content between them
  // <Callout type="info"> ... </Callout> → > ...
  text = text.replace(/<Callout[^>]*>\s*/g, '> **Note:** ');
  text = text.replace(/<\/Callout>\s*/g, '\n');

  text = text.replace(/<Note[^>]*>\s*/g, '> **Note:** ');
  text = text.replace(/<\/Note>\s*/g, '\n');

  text = text.replace(/<Warning[^>]*>\s*/g, '> **Warning:** ');
  text = text.replace(/<\/Warning>\s*/g, '\n');

  text = text.replace(/<Info[^>]*>\s*/g, '> **Info:** ');
  text = text.replace(/<\/Info>\s*/g, '\n');

  text = text.replace(/<Tip[^>]*>\s*/g, '> **Tip:** ');
  text = text.replace(/<\/Tip>\s*/g, '\n');

  text = text.replace(/<Danger[^>]*>\s*/g, '> **Danger:** ');
  text = text.replace(/<\/Danger>\s*/g, '\n');

  // Remove remaining JSX tags (Steps, Step, Tabs, Tab, Cards, Card, etc.)
  text = text.replace(/<\/?\w+[^>]*>/g, '');

  // Clean up excessive blank lines
  text = text.replace(/\n{4,}/g, '\n\n\n');

  // Trim
  text = text.trim();

  return text;
}

function extractTitle(content) {
  // Try frontmatter title
  const fmMatch = content.match(/^---[\s\S]*?title:\s*['"]?(.+?)['"]?\s*$/m);
  if (fmMatch) return fmMatch[1];

  // Try first # heading
  const headingMatch = content.match(/^#\s+(.+)$/m);
  if (headingMatch) return headingMatch[1];

  return null;
}

function collectPages() {
  const pages = [];

  for (const section of SECTION_ORDER) {
    const sectionPath = join(PAGES_DIR, section);

    // Top-level file (index.mdx)
    if (section.endsWith('.mdx')) {
      if (existsSync(sectionPath)) {
        pages.push({ path: sectionPath, section: 'home', slug: 'index' });
      }
      continue;
    }

    // Section directory
    if (!existsSync(sectionPath) || !statSync(sectionPath).isDirectory()) continue;

    const order = getSectionPageOrder(sectionPath);
    const mdxFiles = readdirSync(sectionPath)
      .filter(f => extname(f) === '.mdx')
      .map(f => basename(f, '.mdx'));

    // Sort by _meta.json order, then alphabetically for unlisted
    const sorted = order
      ? [...order.filter(k => mdxFiles.includes(k)), ...mdxFiles.filter(k => !order.includes(k))]
      : mdxFiles.sort();

    for (const slug of sorted) {
      const filePath = join(sectionPath, `${slug}.mdx`);
      if (existsSync(filePath)) {
        pages.push({ path: filePath, section, slug });
      }
    }
  }

  return pages;
}

function generate() {
  const pages = collectPages();
  const parts = [];

  // Header
  parts.push('# Veridex Protocol — Full Documentation');
  parts.push('');
  parts.push('> This file contains the complete Veridex Protocol documentation in plain text,');
  parts.push('> optimized for AI/LLM consumption. Generated from the MDX source files.');
  parts.push('>');
  parts.push('> Docs site: https://docs.veridex.network');
  parts.push('> GitHub: https://github.com/veridex-protocol/');
  parts.push('> llms.txt index: https://docs.veridex.network/llms.txt');
  parts.push('');
  parts.push(`> Generated: ${new Date().toISOString()}`);
  parts.push(`> Pages: ${pages.length}`);
  parts.push('');

  // Table of contents
  parts.push('## Table of Contents');
  parts.push('');
  let currentSection = '';
  for (const page of pages) {
    if (page.section !== currentSection) {
      currentSection = page.section;
      const sectionTitle = currentSection.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
      parts.push(`### ${sectionTitle}`);
    }
    const raw = readFileSync(page.path, 'utf-8');
    const title = extractTitle(raw) || page.slug.replace(/-/g, ' ');
    parts.push(`- ${title} (/${page.section}/${page.slug})`);
  }
  parts.push('');
  parts.push('---');
  parts.push('');

  // Full content
  for (const page of pages) {
    const raw = readFileSync(page.path, 'utf-8');
    const title = extractTitle(raw) || page.slug;
    const urlPath = page.section === 'home' ? '/' : `/${page.section}/${page.slug}`;
    const markdown = mdxToPlainMarkdown(raw, page.path);

    parts.push(`${'='.repeat(80)}`);
    parts.push(`URL: ${urlPath}`);
    parts.push(`${'='.repeat(80)}`);
    parts.push('');
    parts.push(markdown);
    parts.push('');
    parts.push('');
  }

  const output = parts.join('\n');
  writeFileSync(OUTPUT, output, 'utf-8');

  const sizeKB = (Buffer.byteLength(output) / 1024).toFixed(1);
  console.log(`✅ Generated ${OUTPUT}`);
  console.log(`   ${pages.length} pages, ${sizeKB} KB`);
}

generate();
