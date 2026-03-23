import React from 'react';
import type { DocsThemeConfig } from 'nextra-theme-docs';

const config: DocsThemeConfig = {
  logo: (
    <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>
      Veridex Protocol
    </span>
  ),
  project: {
    link: 'https://github.com/veridex-protocol/',
  },
  chat: {
    link: 'https://discord.gg/veridex',
  },
  docsRepositoryBase: 'https://github.com/manny-uncharted/veridex-documentation/tree/main',
  footer: {
    text: (
      <span>
        © {new Date().getFullYear()} Veridex Protocol. All rights reserved.
      </span>
    ),
  },
  head: (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta property="og:title" content="Veridex Protocol Documentation" />
      <meta
        property="og:description"
        content="Cross-chain passkey authentication, autonomous agent payments, and on-chain identity"
      />
      <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
    </>
  ),
  useNextSeoProps() {
    return {
      titleTemplate: '%s — Veridex Protocol',
    };
  },
  primaryHue: 302,
  primarySaturation: 100,
  sidebar: {
    defaultMenuCollapseLevel: 1,
    toggleButton: true,
  },
  toc: {
    backToTop: true,
  },
  navigation: {
    prev: true,
    next: true,
  },
  editLink: {
    text: 'Edit this page on GitHub →',
  },
  feedback: {
    content: 'Question? Give us feedback →',
    labels: 'feedback',
  },
  banner: {
    key: 'veridex-docs-v1',
    text: (
      <a href="https://github.com/veridex-protocol/" target="_blank" rel="noreferrer">
        🚀 Veridex Protocol is live on testnet. Star us on GitHub →
      </a>
    ),
  },
};

export default config;
