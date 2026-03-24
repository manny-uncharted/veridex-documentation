# Veridex Documentation

> Powered by [Nextra](https://nextra.site)

This directory contains the public docs site for Veridex.

It now covers both:

- the protocol layer (`@veridex/sdk`, `@veridex/agentic-payments`, relayer, chains)
- the newer agent-framework layer (`@veridex/agents` and companion packages)

Some of the framework docs are still catching up to recent implementation work. If you find something broken, outdated, or unclear, please contribute a fix.

## Local development

```bash
cd documentation
npm install
npm run dev
```

The site runs at [http://localhost:3000](http://localhost:3000).

Development and production builds intentionally use different Next output directories:

- `next dev` writes to `.next-dev/`
- `next build` writes to `.next/`

This avoids stale chunk collisions when switching between local authoring and production verification in the same workspace.

Both `dev` and `build` now clean their own Next output directory before starting, so you should not need to manually delete stale build artifacts when switching modes.

Lint the docs app with:

```bash
npm run lint
```

## Important files

```text
documentation/
├── pages/                 Public docs content
├── components/            Shared MDX components
├── public/                Static assets
├── theme.config.tsx       Theme configuration
├── next.config.mjs        Next.js / Nextra configuration
├── package.json
└── README.md
```

### Navigation

Sidebar order is controlled by `_meta.json` files inside `pages/`.

Examples:

- `pages/_meta.json`
- `pages/guides/_meta.json`
- `pages/api-reference/_meta.json`
- `pages/resources/_meta.json`

## Adding a page

1. Create a new `.mdx` file in the correct section.
2. Add frontmatter with `title` and `description`.
3. Add the page to the relevant `_meta.json`.
4. Start the dev server and verify the page renders correctly.

## Contribution expectations

- keep package boundaries accurate
- be honest about maturity and rough edges
- update public docs when APIs or architecture change
- add or update ADR references when framework direction changes
- prefer real examples over vague marketing language

## Deployment

The docs app is a standard Next.js / Nextra site and can be deployed anywhere that supports Next.js or containerized apps.

Typical options:

- Vercel
- Docker-based platforms
- internal container environments

## Troubleshooting

| Issue | Fix |
|---|---|
| Page not in sidebar | Update the correct `_meta.json` file |
| MDX page fails to render | Check imports and JSX syntax |
| Dev server throws missing chunk errors after a build | Restart `npm run dev`; dev output is isolated in `.next-dev/` so it should no longer reuse stale build chunks |
| Docs feel stale | Open an issue or submit a docs PR |

## License

See [LICENSE](./LICENSE).
