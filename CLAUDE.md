# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A personal Hexo 5 blog ("Robert 雜記", zh-TW) published to GitHub Pages at https://hot5656.github.io/. Almost all work here is writing or editing Markdown posts in `source/_posts/`; there is no application code and no test suite.

## Commands

```bash
npm run server     # hexo server — local preview at http://localhost:4000
npm run build      # hexo generate — render into public/
npm run clean      # hexo clean — clear db.json and public/ (use when output looks stale)
npm run deploy     # hexo deploy — push public/ to the master branch via hexo-deployer-git
npx hexo new <name>   # new post from scaffolds/post.md, creates source/_posts/<name>.md + asset folder
```

## Branches and deployment

Source and generated site live in the **same GitHub repo** (`hot5656/hot5656.github.io`):
- `backup` — the source branch (this working tree). Commits are conventionally titled `update YYYY/MM/DD`.
- `master` — the generated static site, written only by `npm run deploy` (via `.deploy_git/`). Never edit or merge source into `master` by hand.

## Posts

- Files are named `<topic>-<n>.md` (e.g. `claude-6.md`, `python-42.md`); topic prefixes group series (ai, claude, python, flutter, n8n, react, …).
- `post_asset_folder: true`: each post's images live in a sibling folder of the same name (`source/_posts/claude-6/`) and are referenced with `{% asset_img pic1.png pic1 %}`, not Markdown image syntax.
- Front matter: `title`, `abbrlink`, `date`, `categories`, `tags`. Permalinks are `:year/:month/:day/:title/`. `hexo-abbrlink` auto-generates `abbrlink` (crc16, hex) on first build — don't change an existing one.
- Posts are mostly Chinese notes written as `###` headings followed by fenced code blocks (often ```` ``` bash ```` used for plain notes).

## Theme and config

- Theme is **NexT** (`hexo-theme-next`, installed from npm — `themes/` is empty). Site config is `_config.yml`; theme config is `_config.next.yml` (scheme Gemini). `_config.landscape.yml` is unused.
- Custom styling/overrides for NexT live in `source/_data/` (`styles.styl`, `variables.styl`, `languages.yml`).
- Plugins in use: sitemap, local search (`search.json`), word counter (`symbols_count_time`), flowchart/sequence diagram filters.
- Root-level `map*.html` and `.t*.txt` files are gitignored scratch files, not part of the site.
