# Veridex Protocol Documentation

> Powered by [Mintlify](https://mintlify.com)

## Prerequisites

- **Node.js** 18+ (LTS recommended)
- **npm** or **bun**

## Local Development

### 1. Install dependencies

```bash
cd documentation
npm install
```

### 2. Start the dev server

```bash
npm run dev
```

This runs `mintlify dev` and opens a local preview at **http://localhost:3000**.

If port 3000 is already in use, run on a different port:

```bash
npm run dev:port
# → http://localhost:3333
```

### 3. Validate links

```bash
npm run lint
```

This runs `mintlify broken-links` to check for dead internal links across all `.mdx` files.

## Project Structure

```
documentation/
├── index.mdx                # Landing page
├── mint.json                # Mintlify configuration (nav, colors, tabs)
├── getting-started/         # Quickstart, installation, concepts, FAQ
├── guides/                  # Wallet creation, session keys, cross-chain, agent payments
├── chains/                  # Per-chain docs (EVM, Solana, Aptos, Sui, Starknet, Stacks)
├── api-reference/           # SDK + Relayer API reference
├── integrations/            # Next.js, React, Sera, DeFi, Payment Gateway
├── security/                # Audits, best practices, recovery
├── resources/               # Glossary, changelog, troubleshooting, migration
├── public/                  # Static assets (logos, favicon)
├── package.json
├── Dockerfile               # Docker build for self-hosted deployment
└── README.md
```

## Configuration

All site configuration lives in `mint.json`:

- **`name`** — Site title
- **`logo`** — Dark/light logo paths (relative to `/public`)
- **`colors`** — Primary, light, dark theme colors
- **`navigation`** — Sidebar navigation groups and page order
- **`tabs`** — Top-level tabs (e.g. API Reference, Agent SDK)
- **`topbarLinks`** / **`topbarCtaButton`** — Header links
- **`anchors`** — Quick-access links below the sidebar
- **`footerSocials`** — Footer social links

See the [Mintlify configuration reference](https://mintlify.com/docs/settings/global) for all options.

## Adding a New Page

1. Create a new `.mdx` file in the appropriate directory:

   ```bash
   touch guides/my-new-guide.mdx
   ```

2. Add frontmatter at the top:

   ```mdx
   ---
   title: My New Guide
   description: A short description for SEO and the sidebar
   ---

   # My New Guide

   Content goes here...
   ```

3. Add the page path to `mint.json` under the relevant navigation group:

   ```json
   {
     "group": "Guides",
     "pages": [
       "guides/create-wallet",
       "guides/my-new-guide"
     ]
   }
   ```

4. The dev server hot-reloads — your new page appears immediately.

## Deployment

### Option A: Mintlify Hosting (recommended)

Mintlify automatically deploys when you push to your connected GitHub repository. No build step needed.

1. Connect your repo at [dashboard.mintlify.com](https://dashboard.mintlify.com)
2. Push changes to your default branch
3. Mintlify builds and deploys automatically

### Option B: Docker (self-hosted / Vercel / any container platform)

Build and run the documentation as a Docker container:

```bash
# Build the image
docker build -t veridex-docs .

# Run locally
docker run -p 3333:3333 veridex-docs
# → http://localhost:3333
```

Or use the npm scripts:

```bash
npm run docker:build
npm run docker:run
```

### Option C: Vercel with Docker

1. Push this directory to a GitHub repo (or as part of the monorepo)
2. Import the project in [Vercel](https://vercel.com/new)
3. Set the **Root Directory** to `documentation/`
4. Vercel auto-detects the `Dockerfile` and builds accordingly
5. The container serves the docs on the port specified by `$PORT` (Vercel sets this automatically)

Alternatively, use Vercel's rewrite proxy to serve Mintlify-hosted docs at a subpath:

```json
// vercel.json (in your main site repo)
{
  "rewrites": [
    {
      "source": "/docs",
      "destination": "https://your-subdomain.mintlify.dev/docs"
    },
    {
      "source": "/docs/:match*",
      "destination": "https://your-subdomain.mintlify.dev/docs/:match*"
    }
  ]
}
```

## Updating the Mintlify CLI

```bash
npm install mintlify@latest
```

## Troubleshooting

| Issue | Fix |
|-------|-----|
| Port 3000 in use | `npm run dev:port` (uses 3333) or `npx mintlify dev --port <PORT>` |
| Broken links | Run `npm run lint` to find dead links |
| Styles not updating | Hard-refresh (`Cmd+Shift+R`) or restart the dev server |
| CLI version mismatch | `npm install mintlify@latest` to update |
| Images not loading | Ensure paths start with `/public/` and files exist |

## License

See [LICENSE](./LICENSE).
<!-- last deployed: 2026-02-17 -->
