# DEV Ahead

What's moving underneath developer news, twice a week. Early signals, capabilities you can adopt this week, and a running [Disruption Watch](src/data/watch.json) board that rates how far each shift has got.

Written by Siyad Rahman. Suggestions and challenges to a rating are welcome: [open an issue](../../issues/new).

## How it works

```
DEV Ahead routine (twice weekly)
  └─ opens a pull request with the public edition + Watch board update
       └─ review, add your take, merge
            ├─ site rebuilds on GitHub Pages
            ├─ issue cross-posts to dev.to (canonical link back here)
            └─ paste into the LinkedIn newsletter by hand
```

- Issues: `src/content/issues/YYYY-MM-DD.md`
- Watch board: `src/data/watch.json`
- Format rules: [docs/editorial-guide.md](docs/editorial-guide.md)
- Publishing steps and one-time setup: [docs/publishing.md](docs/publishing.md)

## Develop

```bash
npm install
npm run dev      # http://localhost:4321
npm run check    # validates issues and the Watch board
npm run build
```
