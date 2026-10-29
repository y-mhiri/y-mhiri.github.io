# LISTIC Researcher Website — Brand & Theme Brief

**Prepared for:** a web development agent building a personal researcher website (Yassine MHIRI, LISTIC / Université Savoie Mont Blanc).
**Prepared by:** the **Graphist Agent** — 2026-10-29.
**Scope:** verified brand data (colors, fonts, logo assets) + a ready-to-implement CSS theme derived from it. Everything below is implementation-ready; sources are listed at the end.

---

## 1. Brand foundations (verified, official)

### 1.1 USMB — institutional identity

Source: USMB "charte graphique" page and the official *Livre d'identité* (see §6). The USMB logotype (blason + wordmark, Gotham font) is built on **#10069F** (bleu profond) and **#EF3340** (croix de Savoie red).

| Role | Hex (RGB) | Pantone | CMYK |
|---|---|---|---|
| Bleu profond (main) | `#10069F` (16, 6, 159) | Blue 072 C | 100/85/0/0 |
| Bleu foncé | `#002542` (0, 38, 62) | 2965 C | 100/40/0/80 |
| Rouge (blason only) | `#EF3340` (239, 51, 64) | Red 032 C | 0/90/60/0 |
| Vert | `#009956` (0, 153, 86) | 347 C | 90/5/85/0 |
| Cyan | `#009CDD` (0, 156, 221) | Cyan C | 100/0/0/0 |
| Gris | `#939598` (147, 149, 152) | Cool Gray 8 C | 0/0/0/50 |
| Gris foncé (Sciences et Montagne only) | `#3C3C3B` (60, 60, 59) | — | 0/0/0/90 |

**USMB typography:** logo font **Gotham** (substitutes: Helvetica / Arial).

### 1.2 LISTIC — laboratory identity

The LISTIC identity is a **single teal/turquoise family** (network-circle pictogram + "LISTIC" wordmark, Comfortaa font). Logo files use a gradient; exact screen values decoded from the official downloadable RVB logo files:

| Role | Hex | Source |
|---|---|---|
| Teal foncé | `#009389` | vertical logo (charte) |
| Teal médian | `#1AA39B` | horizontal logo (charte) |
| Teal principal | `#00A59C` | current site header logo |
| Turquoise vif (accent, use sparingly / dark mode only) | `#00D6AE` | current site header logo |
| Teal clair | `#59B5B2` | light end of gradient |

**Print references (charte):** CMYK **C90/M0/J45/N0**, **C56/M0/J24/N0**, i.e. **Pantone DS 255-2 C (C80/M0/J40/N10)**.

**LISTIC typography:** logo font **Comfortaa** (free Google Font), body font **Imprima** (free Google Font) — both web-safe. For a reading-first site, prefer the serif stack of §2 for body text and reserve Comfortaa for the wordmark/logo moments.

**Context:** the LISTIC charte is shared with the sister Polytech labs — LISTIC = teal (Pantone DS 255-2 C), LOCIE = green (DS 294-1 C), SYMME = magenta (DS 117-1 C). Only the teal family belongs to LISTIC.

### 1.3 Official asset URLs

| Asset | URL |
|---|---|
| LISTIC logo, vertical (RVB PNG) | `https://www.univ-smb.fr/listic/wp-content/uploads/sites/66/2017/09/logo-listic.png` |
| LISTIC logo, horizontal (RVB PNG) | `https://www.univ-smb.fr/listic/wp-content/uploads/sites/66/2017/10/listic-logo-horiz.png` |
| LISTIC logo, current header variant (RVB PNG) | `https://www.univ-smb.fr/listic/wp-content/uploads/sites/66/2023/06/cropped-listic-logo-anniversary-2.png` |
| USMB logo (SVG) | `https://www.univ-smb.fr/wp-content/themes/usmb/assets/img/logo.svg` |
| Official logo packs (all variants, RVB/CMJN/N&B) | see charte pages in §6 |

**Logo rules (from the chartes):** never stretch, recolor, or rebuild the logos; use the official files only. On the site, pair the LISTIC logo with the USMB logo in the footer ("endossement discret" — USMB mark small, laboratory mark primary).

---

## 2. Web theme — "LISTIC ink on paper"

Design strategy: **one cool ink family on warm paper**. The USMB bleu profond becomes the *link ink*, the LISTIC teal (deepened to match the weight of classic scholarly accents) becomes the *accent ink*. Coherence comes from equal weight and clear roles, not from blending the two hues.

```css
/* Light theme — "LISTIC ink on paper" */
:root {
  --bg: #fcfbf8;
  --bg-soft: #f3f1ec;
  --text: #23211d;
  --text-muted: #6b675e;
  --rule: #ddd8ce;

  /* Brand inks */
  --link: #10069f;         /* USMB bleu profond — Blue 072 C, untouched */
  --link-hover: #0a0466;   /* same hue, one step darker */
  --accent: #12766c;       /* LISTIC teal "inked" (~27 % lightness) */
  --accent-soft: #e3f1ee;  /* tint of the accent — marks, badges, callouts */

  --code-bg: #f1efe9;      /* neutral: code is not brand */
  --mark-bg: #e3f1ee;      /* teal wash (replaces a yellow highlight) */

  --font-serif: 'Iowan Old Style', 'Palatino Linotype', Palatino, Georgia,
    'Times New Roman', serif;
  --font-sans: system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial,
    sans-serif;
  --font-mono: ui-monospace, 'SF Mono', 'Cascadia Code', Menlo, Consolas,
    monospace;
}

@media (prefers-color-scheme: dark) {
  :root {
    --bg: #14120e;
    --bg-soft: #1e1b15;
    --text: #ece7dc;
    --text-muted: #a49d8e;
    --rule: #353026;
    --link: #9d94ff;       /* bleu profond lightened, not saturated */
    --link-hover: #bab3ff;
    --accent: #4cc0b2;     /* LISTIC teal lightened */
    --accent-soft: #1c3833;
    --code-bg: #1e1b15;
    --mark-bg: #1c3833;
  }
}
```

### 2.1 Palette preview

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 740 330" font-family="Helvetica, Arial, sans-serif">
  <rect width="740" height="330" rx="10" fill="#fcfbf8" stroke="#ddd8ce"/>
  <text x="24" y="46" font-size="11" letter-spacing="2.5" fill="#6b675e">LISTIC · FIELD NOTES</text>
  <text x="24" y="82" font-size="22" font-weight="bold" fill="#12766c" font-family="Georgia, 'Times New Roman', serif">On the coherence of teal &amp; indigo</text>
  <line x1="24" y1="98" x2="460" y2="98" stroke="#ddd8ce"/>
  <text x="24" y="126" font-size="12.5" fill="#23211d">Links carry the USMB bleu profond —</text>
  <text x="24" y="144" font-size="12.5" fill="#10069f" text-decoration="underline">read the register map like this</text>
  <text x="24" y="164" font-size="12.5" fill="#23211d">— while the LISTIC teal, deepened to</text>
  <text x="24" y="182" font-size="12.5" fill="#23211d">ink, takes</text>
  <text x="83" y="182" font-size="12.5" font-weight="bold" fill="#12766c">headings and accents</text>
  <rect x="24" y="192" width="158" height="17" rx="3" fill="#e3f1ee"/>
  <text x="28" y="205" font-size="12.5" fill="#23211d">soft teal wash for marks</text>
  <rect x="24" y="226" width="336" height="32" rx="6" fill="#f1efe9" stroke="#ddd8ce"/>
  <text x="36" y="246" font-size="11.5" font-family="Menlo, Consolas, monospace" fill="#23211d">--link: #10069f;   --accent: #12766c;</text>
  <text x="24" y="290" font-size="10" fill="#6b675e">Every text/background pair ≥ 4.5:1 (link 13:1, accent 5.3:1) — WCAG AA</text>
  <g font-size="10.5" font-family="Menlo, Consolas, monospace">
    <rect x="504" y="40" width="16" height="16" rx="3" fill="#fcfbf8" stroke="#ddd8ce"/><text x="528" y="52" fill="#6b675e">#fcfbf8 · bg</text>
    <rect x="504" y="66" width="16" height="16" rx="3" fill="#f3f1ec" stroke="#ddd8ce"/><text x="528" y="78" fill="#6b675e">#f3f1ec · bg-soft</text>
    <rect x="504" y="92" width="16" height="16" rx="3" fill="#23211d"/><text x="528" y="104" fill="#6b675e">#23211d · text</text>
    <rect x="504" y="118" width="16" height="16" rx="3" fill="#6b675e"/><text x="528" y="130" fill="#6b675e">#6b675e · muted</text>
    <rect x="504" y="144" width="16" height="16" rx="3" fill="#ddd8ce"/><text x="528" y="156" fill="#6b675e">#ddd8ce · rule</text>
    <rect x="504" y="170" width="16" height="16" rx="3" fill="#10069f"/><text x="528" y="182" fill="#10069f">#10069f · link</text>
    <rect x="504" y="196" width="16" height="16" rx="3" fill="#0a0466"/><text x="528" y="208" fill="#6b675e">#0a0466 · hover</text>
    <rect x="504" y="222" width="16" height="16" rx="3" fill="#12766c"/><text x="528" y="234" fill="#12766c">#12766c · accent</text>
    <rect x="504" y="248" width="16" height="16" rx="3" fill="#e3f1ee" stroke="#ddd8ce"/><text x="528" y="260" fill="#6b675e">#e3f1ee · mark</text>
    <rect x="504" y="274" width="16" height="16" rx="3" fill="#f1efe9" stroke="#ddd8ce"/><text x="528" y="286" fill="#6b675e">#f1efe9 · code</text>
  </g>
</svg>
```

---

## 3. Accessibility audit (WCAG contrast, computed)

| Pair (light) | Ratio | Verdict |
|---|---|---|
| `--text` on `--bg` | 15.7 : 1 | AAA |
| `--link` on `--bg` | 13.1 : 1 | AAA |
| `--link` on `--bg-soft` | ~12 : 1 | AAA |
| `--text` on `--mark-bg` | 13.9 : 1 | AAA |
| `--accent` on `--bg` | 5.3 : 1 | AA (headings/accents) |
| `--text-muted` on `--bg` | 5.4 : 1 | AA |

| Pair (dark) | Ratio | Verdict |
|---|---|---|
| `--text` on `--bg` | ~15 : 1 | AAA |
| `--link` on `--bg` | 7.2 : 1 | AAA |
| `--accent` on `--bg` | 8.5 : 1 | AAA |
| `--text-muted` on `--bg` | ~7 : 1 | AAA |

---

## 4. Component recipes

- **Body:** `--font-serif`, 1.5–1.65 line height, max line length ~70ch. Sans (`--font-sans`) for navigation, buttons, metadata, small-caps labels.
- **Headings:** `--accent` color, serif, tight leading. Use Comfortaa (500–700) only for the site wordmark, not for content headings.
- **Links:** `--link`, `text-decoration: underline` with `text-underline-offset: 2px`; hover `--link-hover`. Never teal links — teal is reserved for headings/accents so the two inks stay distinct.
- **Focus:** `:focus-visible { outline: 2px solid var(--link); outline-offset: 2px; }` (light) / `--accent` in dark mode.
- **Selection:** `::selection { background: var(--accent-soft); }`.
- **Code:** `--code-bg` with `--rule` border, `--font-mono`; syntax highlighting in grays + `--accent`, never the full brand palette.
- **Marks/highlights:** `--mark-bg` behind `--text`.
- **Badges / tags / metadata chips:** `--accent-soft` background, `--accent` text, sans, uppercase, letter-spacing.
- **Panels/cards/aside:** `--bg-soft` with `1px solid var(--rule)`.
- **Charts/data-viz:** primary series `--accent`, secondary `--link`, tertiary `--text-muted`. The original LISTIC gradient `#009389 → #59B5B2` is allowed **only** inside data visualizations; `#00A59C`/`#00D6AE` may be used for accents in dark mode.
- **Footer co-branding:** LISTIC logo (primary) + USMB logo (smaller, muted or monochrome) + Polytech Annecy-Chambéry mention. Keep both logos official and unmodified.

---

## 5. Rules — do / don't

**Do**

- Keep warm paper neutrals unchanged; they are the canvas that makes both inks work.
- Use the accent at three intensities: full (`--accent`), tint (`--accent-soft`), and structural (`--link` family) — this is what makes the theme feel designed.
- Use Comfortaa and Imprima (both free Google Fonts) for brand touches; the serif stack carries reading.

**Don't**

- Don't use `#00D6AE` or `#00A59C` as text or backgrounds on the light theme — they are screen-neon and fail contrast; deepened `#12766c` replaces them.
- Don't put full-saturation USMB indigo (`#10069F`) next to full-saturation teal on large areas — the raw chartes conflict; the inked versions don't.
- Don't use USMB red/green/cyan in the UI. They exist for the blason and institutional seals, not for web components.
- Don't use a yellow highlight next to teal + indigo (three hues = noise); the teal wash keeps one ink family.
- Don't recolor, rebuild, or restretch the logos; don't invent new Pantone values.

---

## 6. Sources (all verified 2026-10-29)

- USMB charte graphique: <https://www.univ-smb.fr/universite/charte-graphique/>
- USMB Livre d'identité (PDF, official color codes): <https://assets.univ-smb.fr/Identite/Livret_identite_Universite_Savoie_Mont_Blanc.pdf>
- LISTIC charte graphique: <https://www.listic.univ-smb.fr/charte-graphique/>
- LISTIC charte détaillée des laboratoires (PDF, CMYK/Pantone codes): <https://projects.listic.univ-smb.fr/charte/charte-labos-V2.pdf>
- LISTIC logo screen values decoded from the official RVB logo files listed in §1.3; USMB logo colors verified in the official SVG.

---

*Signed: **the Graphist Agent** — brand audit, palette design, and accessibility review complete. Hand-off ready.*