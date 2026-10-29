# Yassine Mhiri — personal page (V2)

Static site built with [Astro](https://astro.build). Publications are
synchronized automatically from [HAL](https://cv.archives-ouvertes.fr/yassine-mhiri).

## How to do the everyday things

| Task | What to do |
|---|---|
| Update name, photo, address, profile links | Edit `config.yaml` (`profile`, `links`) |
| Update bio, career, supervision | Edit the file in `src/content/home/` (`bio.md`, `career.md`, `supervision.md`) |
| Show / hide / reorder a homepage section | Edit `home.sections` in `config.yaml` (comment a line to hide it). `news` and `service` are ready but commented out |
| Add a news item or service | Add a line at the top of `src/content/home/news.md` (or `service.md`) |
| Add a talk, outreach event, workshop | Add an entry at the top of the right group in `src/content/pages/talks.md` |
| Number of recent publications on the homepage | `home.recent_publications` in `config.yaml` |
| Teaching | Edit `src/content/pages/teaching.md`; course files go in `public/files/teaching/` |
| New publication | Deposit on HAL — nothing else to do. The build fetches HAL |
| Publication wrong / missing on HAL | Edit `src/data/publications-overrides.yaml` |
| New job offer (internship, PhD, postdoc) | Drop a `.md` file in `src/content/positions/` |
| Offer filled | Set `status: filled` in its frontmatter |
| New page | Drop a `.md` file in `src/content/pages/` — it gets a page and a nav entry automatically |
| Moved or deleted a page whose link was shared | Add a line to `redirects` in `astro.config.mjs` |
| Turn dark mode off | `dark_mode.enabled: false` in `config.yaml` |
| Anything visual | Edit `src/styles/global.css` (colors are CSS variables at the top) |

Every content file is plain Markdown with a small YAML frontmatter block at the
top — copy an existing file to get a new one.

## Running locally

```bash
npm install
npm run dev        # dev server at http://localhost:4321
npm run build      # production build into dist/
npm run test:filter  # builds then functionally tests the publications filter
```

The publications page has a client-side filter bar (text search, one checkbox
per category, sort by year/title/author). It is plain JS loading only on that
page; `npm run test:filter` verifies it against the built page in a headless
DOM.

`npm run dev` and `npm run build` re-fetch publications from HAL first. If HAL
is unreachable, the build falls back to the committed cache
(`src/data/hal-cache.json`) and prints a warning. To refresh the cache
manually: `npm run update:hal` (then commit the updated file).

## Anatomy

```
config.yaml                        ← you: name, address, links, homepage sections, nav, HAL query
src/content/home/*.md              ← you: homepage sections (bio, career, supervision, news...)
src/content/pages/*.md             ← you: other pages (teaching.md)
src/content/positions/*.md         ← you: job offers
src/data/publications-overrides.yaml← you: HAL fixes (exclude / patch / add)
src/data/hal-cache.json            ← auto: HAL snapshot used as build fallback
src/lib/                           ← plumbing (config, HAL -> publications, BibTeX)
src/pages/                         ← routes: /, /publications/, /positions/, /<page>/
src/layouts/Base.astro             ← masthead, nav, footer, dark-mode toggle
src/styles/global.css              ← all styling (CSS variables, dark theme at the bottom)
deploy.yml                         ← GitHub Actions workflow (see "Going live")
```

## Going live (replacing the Jekyll site)

1. Copy the V2 files to the root of the `y-mhiri.github.io` repository
   (everything in this folder except `node_modules/`, `dist/`, `.astro/`).
2. Move `deploy.yml` to `.github/workflows/deploy.yml`.
3. Repository settings: Settings > Pages > Source = **GitHub Actions**.
4. Push to `main`. Done — every push rebuilds the site, including a fresh
   HAL fetch.

Old URLs are redirected: `/about/` and `/cv/` (see `redirects` in
`astro.config.mjs`) and the two offers `/stages/*.html` (small files in
`public/stages/`). The old PDFs in `/stages/` are not carried over.

## Adding concept-demo pages (future)

If you later want JS animations to teach concepts: put the explanation in a
new markdown file under `src/content/pages/` and add a `<script>` in a small
Astro page (or a component used by it). Astro bundles scripts per page, so a
demo on one page adds no JS to any other page.
