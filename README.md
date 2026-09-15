# OVG Golf & Putt Lounge — website

A single-page marketing site for OVG Golf & Putt Lounge in Kelowna, built from the
design handoff in `ovg putt.zip` (`handoff_ovg_putt_lounge/OVG Putt Lounge.dc.html`).

It is a **plain static site** — no build step, no dependencies, no framework.
Three files do all the work:

```
index.html          all the page content
css/styles.css      all the styling (design tokens live at the top)
js/main.js          scroll reveals, counters, mobile menu, FAQ accordion, form
assets/images/      photography
assets/favicon.svg  favicon
ovg putt.zip        the original design handoff, kept for reference
```

## Viewing it locally

Double-clicking `index.html` works, but a tiny local server is closer to the real
thing. From this folder:

```bash
python3 -m http.server 8000
```

Then open <http://localhost:8000> and press `Ctrl+C` in the terminal when done.

## Publishing it

Because it is static, anywhere that serves files will host it: Netlify (drag the
folder onto their dashboard), Cloudflare Pages, GitHub Pages, or plain FTP to a
web host. Nothing needs to be compiled first.

## Making changes

- **Text** — edit `index.html`. Content is in plain HTML, in the order it appears
  on the page, with each section marked by an HTML comment (`<!-- Rates -->`).
- **Colours, fonts, spacing** — edit the tokens at the top of `css/styles.css`
  (`--neon`, `--turf`, `--night`, `--cream`, fonts, container width, gutter).
  Changing one token updates the whole site.
- **Behaviour** — `js/main.js`. Each block is commented and independent; deleting
  any one of them degrades gracefully rather than breaking the page.

Nothing is minified or generated, so every change is a normal edit you can read
in a diff and undo with `git revert`.

## How it behaves

- Fluid from roughly 360px to 1600px with no fixed breakpoints, except the
  navigation, which collapses into a MENU panel below 1120px. That collapse is
  pure CSS, so navigation works before and without JavaScript.
- The page is fully readable with JavaScript off: reveals, counters and the
  accordion are enhancements layered on top of visible content.
- `prefers-reduced-motion: reduce` turns off the marquee, headline animation,
  neon flicker, hero parallax and all scroll reveals.
- Keyboard focus rings are visible throughout, and there is a skip link.

## Still to do before launch

These are carried over from the designer's handoff notes, plus what could not be
finished in this environment:

1. **Self-host four photos.** The hero, both booking cards and the wide bar shot
   still point at the client's Wix CDN (`static.wixstatic.com`). Downloading them
   was blocked in the build environment, so they are hotlinked and each one is
   marked with a `TODO` comment in `index.html`. Download them, drop them in
   `assets/images/`, and swap the `src`.
2. **Replace the placeholder photography.** `ovg-cocktails.png`, `ovg-patio.png`
   and `ovg-group.png` are AI-generated placeholders supplied for layout. They are
   also ~2.3MB each — whatever replaces them should be compressed (WebP or JPEG,
   around 200KB) so the page loads quickly.
3. **Wire up the event enquiry form.** It currently validates and shows a
   confirmation but sends nothing — see the comment at the bottom of `js/main.js`.
   A form service (Formspree, Netlify Forms) or a small endpoint that emails
   `ovgkelowna@gmail.com` would finish it.
4. **Get a real logo.** The OVG wordmark is typeset in Anton because no logo file
   exists yet. The favicon is a placeholder for the same reason.
5. **Confirm the opening hours.** Currently "posted weekly on Instagram", which is
   what the business does today.
6. **Confirm the canonical URL** in `index.html` (currently
   `https://www.ovgputtlounge.com/`) and add an Open Graph share image, plus
   analytics if wanted.

## Live booking links used on the page

- Simulator bays — <https://app.birrdi.com/u/reserve?team_booking_link_id=okanagan-virtual-golf-kelowna>
- Mini putt — <https://ovgputtlounge.resova.us/>
- Instagram — [@ovgkelowna](https://www.instagram.com/ovgkelowna/?hl=en)
- Facebook — <https://www.facebook.com/profile.php?id=61576310855896>
