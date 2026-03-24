import nextra from 'nextra';
import { PHASE_DEVELOPMENT_SERVER } from 'next/constants.js';

const withNextra = nextra({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.tsx',
  defaultShowCopyCode: true,
  latex: false,
});

export default (phase) => withNextra({
  // Keep dev and production build artifacts isolated.
  // Use the official Next phase API rather than NODE_ENV so every load phase
  // resolves the same output directory consistently.
  distDir: phase === PHASE_DEVELOPMENT_SERVER ? '.next-dev' : '.next',
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  async headers() {
    return [
      {
        source: '/:path*.txt',
        headers: [
          { key: 'Content-Type', value: 'text/plain; charset=utf-8' },
          { key: 'Cache-Control', value: 'public, max-age=3600, s-maxage=86400' },
        ],
      },
    ];
  },
});
