#!/usr/bin/env node

import { rmSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { spawnSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

const mode = process.argv[2] ?? 'build';

const targets = mode === 'all'
  ? ['.next', '.next-dev']
  : mode === 'dev'
    ? ['.next-dev']
    : ['.next'];

for (const target of targets) {
  rmSync(join(rootDir, target), { recursive: true, force: true });
  console.log(`🧹 Removed ${target}`);
}

const generator = spawnSync(process.execPath, [join(__dirname, 'generate-llms-full.mjs')], {
  stdio: 'inherit',
});

if ((generator.status ?? 1) !== 0) {
  process.exit(generator.status ?? 1);
}
