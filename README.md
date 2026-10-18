# skills: لتطوير المشاريع الذكية

Website for **Skills**, an Arabic TikTok page about running a small business in Europe with AI tools, business software and automation. The site is **Arabic (right-to-left) and English (left-to-right)**, and dark mode is the default. Its main call to action is «اطلب استشارة» (request a consultation).

> **Status: early preview.** The design system, home page and chapter pages are built. The other pages (tools, consulting, about, contact, legal) are placeholders for now. Everything you still need to supply is marked with a gold **PLACEHOLDER** box on the site.

**Live preview:** https://elhaj101.github.io/skills.com/

- Arabic: https://elhaj101.github.io/skills.com/ar/
- English: https://elhaj101.github.io/skills.com/en/
- Design system: https://elhaj101.github.io/skills.com/ar/design-system/

## What's been built so far

**Pages**

| Page | URL | State |
|---|---|---|
| Home | `/ar/`, `/en/` | Built: hero, four pillars, first 3 chapters (the next ones fade behind a wall with a button to all chapters), latest episodes, how consulting works, short About, TikTok, consulting call to action |
| All chapters | `/ar/chapters/`, `/en/chapters/` | Built: 10 themed cards with published counts |
| Chapter page | `/ar/chapters/1-claude/` … `/ar/chapters/10-cases/` | Built: themed header with motif, 10 episode slots («قريبًا» until episodes are added) |
| Design system | `/ar/design-system/` | Built: internal reference, not indexed |
| Tools, Consulting, About, Contact, Impressum, Privacy | `/ar/tools/` etc. | Placeholder ("under construction") |
| 404 | any unknown URL | Built: Arabic |
| `/` | | Forwards to the visitor's last chosen language, otherwise `/ar/` |

**Languages**

- **Arabic and English.** Each page exists at `/ar/…` and `/en/…`, with `hreflang` alternates, a canonical URL and Open Graph locales in the page metadata.
- **Language switcher** in the header (`EN` / `ع`), the mobile drawer and the footer. It opens the same page in the other language, and the choice is remembered for the next visit to `/`.
- English pages use Inter for body text and Space Grotesk for headings. Direction, fonts and arrow icons switch automatically.
- All interface text lives in `src/i18n/ar.json` and `src/i18n/en.json`, which must have the same keys (TypeScript checks this). Content files have English fields (`titleEn`, `descriptionEn`, …). When one is missing, the Arabic text is shown.

**Navigation**

- **Desktop:** an "Episodes" dropdown listing all 10 chapters with their colour dots. It closes on Escape, an outside click, or when focus leaves it. The current page is marked with a glowing underline (`aria-current="page"`).
- **Mobile:** a drawer built on the native `<dialog>` element, which gives focus trapping, Escape and an inert page behind it. It includes the chapter list, language switch, theme toggle and the consulting button.
- **On scroll:** the header blurs once you scroll, hides while you scroll down, comes back when you scroll up, and shows a reading-progress line. It never hides while keyboard focus is inside it.

**Effects** (`src/components/Effects.tsx`, `SpaceParticles.tsx`, `RotatingWord.tsx`, `ConsultSteps.tsx`)

- **Space particles on every page** (`SpaceParticles.tsx`): one fixed canvas behind all content, over the unchanged background colour.
  - Drifting, twinkling stars in three depth layers, a few tinted violet, lime or cyan. They shift with depth as you scroll.
  - Stars near the mouse swell and link to it with faint lines, and a click or tap pushes them away.
  - An occasional lime shooting star.
  - Fewer stars on phones. It pauses in background tabs.
- **Rotating tool name** in the hero (Claude, Canva, n8n, …). The width never jumps, and screen readers hear the list once.
- **Logo mark:** tilts toward the pointer, floats slowly, and has orbiting rings.
- **Cards:** a spotlight glow in the chapter colour follows the pointer.
- **"How consulting works" timeline** (`ConsultSteps.tsx`): a line joining the three steps fills as you scroll, led by a glowing comet. When it reaches a step, the badge pops and pulses, the icon draws itself in, and the card lights up. It runs horizontally on desktop and vertically on phones, in both RTL and LTR. The consulting buttons get a soft light sweep.
- **Scroll reveal:** sections fade in, with list items one after another. Content is only hidden when JavaScript is running, so nothing stays invisible if a script fails.
- **Reduced motion:** every effect is off or still when the device asks for it.

**Semantic structure**

- **Landmarks:** a skip link, then `header` (site banner), `nav` (each one labelled), `main`, `footer` and `aside` (the consulting call to action).
- **Headings:** one `h1` per page and no skipped levels. Sections are labelled by their headings.
- **Lists:** cards sit in real lists (`ol` where order matters: chapters, episodes, steps).
- **Breadcrumbs:** a `nav` with `aria-current="page"` and matching schema.org `BreadcrumbList` structured data.
- **Bilingual 404:** one page with an Arabic section and an English section, each in its own language and direction.

**Design system** (`src/app/globals.css`, `src/components/`)

- Brand tokens: ink, violet, lime, paper, plus cyan, pink and gold for chapter accents. Every text colour has been contrast-checked in both themes (see "Design decisions" below).
- **Dark mode by default, plus light mode.** The sun/moon toggle in the header remembers the choice, with no flash on load.
- **Deep-space background:** the colour gradient and soft glows are CSS, with the particle canvas on top (see Effects).
- **Fonts:** Readex Pro for Arabic and Space Grotesk for Latin words and digits, self-hosted.
- **RTL handled throughout.** Latin tool names and numbers inside Arabic text are isolated automatically (`Mixed` component). In large headings the Latin name goes on its own line. Arrows mirror in RTL.
- **Components:**

  | Component | What it is |
  |---|---|
  | `Button` | Lime primary, violet outline secondary, ghost; at least 48px tall |
  | `ChapterCard` | Wide card with one of 10 space motifs drawn in SVG: orbit, constellation, supernova, nebula, wormhole, eclipse, planet horizon, ringed planet, galaxy spiral, aurora |
  | `EpisodeCard` | 9:16 cover, tool chip, type label, play button to TikTok, «قريبًا» state |
  | `ToolCard` | Monogram until a logo is added; pricing only when confirmed; affiliate links labelled |
  | `ConsultCTA` | Consulting call-to-action panel |
  | `ConsentGate` | TikTok and booking embeds load only after a click, with an optional "remember" |
  | `Header` (+ dropdown and drawer), `LangSwitch`, `Breadcrumbs` | Navigation |
  | `Effects`, `SpaceParticles`, `RotatingWord`, `ConsultSteps` | Motion (see above) |
  | `ThemeBackground`, `ThemeToggle`, `Footer`, `Section`, `Icon` | Layout pieces and one line-icon set |
  | `Placeholder` | Gold dashed box marking content you still need to supply |

- **Mobile first:** checked at 375px and 1280px in both themes, with no sideways scrolling. The mobile menu works without JavaScript, and every tap target is at least 44px.

**Infrastructure**

- Next.js 16 static export. Adding German later means adding `de` to `src/i18n/index.ts`, creating `de.json`, and adding German fields to the content files.
- Content is validated at build time (`src/lib/content.ts`). A mistake in a JSON file stops the build with a message naming the entry.
- `.github/workflows/deploy.yml` lints, builds and publishes to GitHub Pages on every push to `main`.

**Not done yet:** the Tools, Consulting (form and booking), About, Contact, Resources and legal pages; episode detail pages; filters and search; cookie banner; sitemap, robots.txt and structured data; image optimisation for covers. Those come next, page by page.

## Stack and why

| | |
|---|---|
| **Next.js 16 (App Router), fully static export** | `next build` writes plain HTML/CSS/JS to `out/`. No server is needed, so any free static host works, and the site is fast on phones. The form backend is still undecided, so nothing depends on one yet. |
| **Tailwind CSS 4** + a small set of brand classes | Design tokens live in `src/app/globals.css`. |
| **TypeScript** | Content is typed, and the build stops with a clear message when a data file has a mistake. |
| **next/font** | Readex Pro (Arabic) and Space Grotesk (Latin, digits) are self-hosted at build time, so visitors' browsers never contact Google (GDPR). |

No CMS, no analytics, no cookies and no third-party scripts yet. The TikTok embed loads only after the visitor clicks to allow it.

## Run it locally

```bash
npm install
npm run dev        # http://localhost:3000 → /ar/
npm run build      # static site in out/
npm run lint
```

The design system reference page is at `/ar/design-system/`. It isn't linked in the menu and isn't indexed by search engines.

## Deploy

**Preview (now):** every push to `main` builds and publishes to GitHub Pages at
`https://elhaj101.github.io/skills.com/` (see `.github/workflows/deploy.yml`).
One-time setup: in the repo, go to **Settings → Pages → Build and deployment → Source** and choose **GitHub Actions**.

**Real domain (later):** any static host works (Cloudflare Pages, Netlify, Vercel). Use build command `npm run build` and output folder `out`. Set `NEXT_PUBLIC_SITE_URL` to the real domain and leave `NEXT_PUBLIC_BASE_PATH` empty.

The domain is one value: `site.url` in `src/site.config.ts`, which can be overridden by the `NEXT_PUBLIC_SITE_URL` environment variable.

## Editing content

All content is in JSON files. You never need to touch components.

| What | Where |
|---|---|
| Chapters (titles, theme, colour, description) | `content/chapters.json` |
| Episodes | `content/episodes.json` |
| Tools directory | `content/tools.json` |
| All interface text (buttons, headings, labels) | `src/i18n/ar.json` and `src/i18n/en.json` |
| Handles, links, email, booking link, domain | `src/site.config.ts` |

### Add an episode

Add an object to `content/episodes.json`:

```json
{
  "chapter": 4,
  "number": 1,
  "title": "زبائن من Google",
  "tool": "Google Maps",
  "toolSlug": "google-maps",
  "type": "correct-use",
  "shows": "كيف يظهر مشروعك لمن يبحث عن خدمتك في منطقتك.",
  "cover": "/covers/ch04-ep01.webp",
  "tiktokUrl": "",
  "publishedAt": ""
}
```

- Optional English fields: `titleEn` and `showsEn`.
- `type` is one of `tool` (أداة), `method` (طريقة) or `correct-use` (الاستخدام الصحيح).
- Put the cover image in `public/covers/` (1080×1920; WebP preferred).
- While `tiktokUrl` is empty, the episode shows as «قريبًا». Paste the TikTok link and fill `publishedAt` (e.g. `2026-11-03`) to publish it.
- Chapter slots without an entry also show «قريبًا», so each chapter always shows 10.

### Add a tool

```json
{
  "slug": "n8n",
  "name": "n8n",
  "description": "وصف قصير بالعربية.",
  "bestFor": "لمن هذه الأداة مفيدة.",
  "url": "https://n8n.io",
  "pricing": "freemium"
}
```

`pricing` (`free`, `paid` or `freemium`) is optional and hidden when missing. Only set it once confirmed. `affiliateUrl` is only for links you have approved, and the site labels it «رابط تسويقي».

### Change a text

Find it in `src/i18n/ar.json` (Arabic) or `src/i18n/en.json` (English) and edit it. Keep the keys identical in both files. Latin words such as tool names can stay inline: the site isolates them automatically so the reading order stays correct.

## Brand files

The logo files in `public/brand/` (`temp-mark.png`, `temp-wordmark-*.png`) are **temporary crops** of the preview images. Replace them with the official files (`skills-mark.svg`, lockups) and update `src/components/Logo.tsx`. The logo is never redrawn or recoloured in code.

## Design decisions to review

- **Contrast:** pure violet `#7B5CFF` is 4.4:1 on ink, below the AA requirement for body text. On dark backgrounds, links and violet text use `#A996FF` (7.7:1). In light mode, the primary button is a deeper violet `#5B3FE0` (white text 6.5:1), because white on brand violet is only 4.4:1.
- **Neons in light mode** (lime, cyan, pink, gold) are too light for text on paper. Each has a darker text shade (see `globals.css`). The bright tone is kept for glows and motifs.
- **Chapter accents:** five colours, each used twice, with neighbouring chapters always different:
  Orbit cyan · Constellation lime · Supernova gold · Nebula pink · Wormhole violet · Eclipse gold · Planet horizon cyan · Ringed planet violet · Galaxy pink · Aurora lime.
- **Chapter descriptions** in `chapters.json`, the home page texts and **all English texts** are **drafts** for you to approve.

## Before launch (checklist)

- [ ] Register the domain and set `NEXT_PUBLIC_SITE_URL`
- [ ] Official logo files, Ali's photo, real TikTok handle and social links
- [ ] Episodes JSON and covers
- [ ] Approve all texts, especially personal facts on the About page
- [ ] Choose the form backend and booking tool (Cal.com)
- [ ] Impressum and privacy policy checked by a professional
- [ ] Test the consent flow (nothing loads from TikTok before consent)
- [ ] Choose privacy-friendly analytics, or none
- [ ] Lighthouse on mobile ≥ 90 in all four categories
