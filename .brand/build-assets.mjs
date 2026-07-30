// Renders the Cedar & Stone brand assets from the two source SVGs.
// Run: node .brand/build-assets.mjs   (from the repo root)
import sharp from "sharp";
import { writeFileSync, readFileSync } from "node:fs";

const FOREST = "#386641";
const SIENNA = "#bc6c25";
const CREAM  = "#fefae0";
const DARK   = "#283618";

// --- the mark, as a standalone badge (filled, for icons) ---
// Simplified relative to the inline site mark: filled disc instead of a hairline
// ring, three courses, heavier forms — the ring version muddies below ~24px.
const badge = (px) => `<svg xmlns="http://www.w3.org/2000/svg" width="${px}" height="${px}" viewBox="0 0 48 48">
  <circle cx="24" cy="24" r="23" fill="${FOREST}"/>
  <path d="M9.5 24.0 v-1.1 a4.3 4.3 0 0 1 4.7-4.3 a5.8 5.8 0 0 1 6.2-4.7 a6.4 6.4 0 0 1 11.8-1.0 a5.8 5.8 0 0 1 6.7 4.4 a1.9 1.9 0 0 1 .6.1 v6.6 Z" fill="${CREAM}"/>
  <g fill="${CREAM}">
    <rect x="6.4"  y="25.6" width="16.4" height="5.0" rx="1.2"/>
    <rect x="24.0" y="25.6" width="17.6" height="5.0" rx="1.2"/>
    <rect x="9.0"  y="31.8" width="7.8"  height="5.0" rx="1.2"/>
    <rect x="18.0" y="31.8" width="12.0" height="5.0" rx="1.2" fill="${SIENNA}"/>
    <rect x="31.2" y="31.8" width="7.8"  height="5.0" rx="1.2"/>
    <rect x="15.6" y="38.0" width="7.4"  height="5.0" rx="1.2"/>
    <rect x="24.2" y="38.0" width="7.4"  height="5.0" rx="1.2"/>
  </g>
</svg>`;

// Very small sizes: drop the third course and fatten everything.
const badgeTiny = (px) => `<svg xmlns="http://www.w3.org/2000/svg" width="${px}" height="${px}" viewBox="0 0 48 48">
  <rect width="48" height="48" rx="9" fill="${FOREST}"/>
  <path d="M10 24.5 v-1.2 a5 5 0 0 1 5.4-5 a6.6 6.6 0 0 1 7.1-5.4 a7.3 7.3 0 0 1 13.4-1.2 a5.2 5.2 0 0 1 2.1 1 v11.8 Z" fill="${CREAM}"/>
  <g fill="${CREAM}">
    <rect x="7" y="26.5" width="15.5" height="6.2" rx="1.4"/>
    <rect x="24" y="26.5" width="17" height="6.2" rx="1.4"/>
    <rect x="7" y="34.4" width="10" height="6.2" rx="1.4"/>
    <rect x="18.5" y="34.4" width="11" height="6.2" rx="1.4" fill="#e08a34"/>
    <rect x="31" y="34.4" width="10" height="6.2" rx="1.4"/>
  </g>
</svg>`;

const buf = (svg) => Buffer.from(svg);
const R = (svg, size) => sharp(buf(svg), { density: 2400 }).resize(size, size);

const out = [];

// Browser tab + PWA/Android + Apple touch. WebP for the web, PNG masters
// for anywhere WebP isn't safe (email, Apple touch icon).
await R(badgeTiny(48), 32).webp({ quality: 92 }).toFile("public/favicon-32.webp");   out.push("favicon-32.webp");
await R(badge(48), 192).webp({ quality: 90 }).toFile("public/icon-192.webp");        out.push("icon-192.webp");
await R(badge(48), 512).webp({ quality: 90 }).toFile("public/icon-512.webp");        out.push("icon-512.webp");
await R(badge(48), 512).png().toFile("public/icon-512.png");                          out.push("icon-512.png");
await R(badgeTiny(48), 180).png().toFile("public/apple-touch-icon.png");              out.push("apple-touch-icon.png");

// --- OG / social share card, 1200x630 ---
// Composition mirrors Atlas Studio's: mark left, wordmark right, tagline
// below, hairline rule and meta strip at the foot. Text is drawn as SVG here
// (no browser), so the faces fall back to a generic serif/sans — acceptable
// for a share card, which is a raster snapshot either way.
const og = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <rect width="1200" height="630" fill="${CREAM}"/>
  <g transform="translate(96,150) scale(4.7)">
    <circle cx="24" cy="24" r="23" fill="${FOREST}"/>
    <path d="M9.5 24.0 v-1.1 a4.3 4.3 0 0 1 4.7-4.3 a5.8 5.8 0 0 1 6.2-4.7 a6.4 6.4 0 0 1 11.8-1.0 a5.8 5.8 0 0 1 6.7 4.4 a1.9 1.9 0 0 1 .6.1 v6.6 Z" fill="${CREAM}"/>
    <g fill="${CREAM}">
      <rect x="6.4"  y="25.6" width="16.4" height="5.0" rx="1.2"/>
      <rect x="24.0" y="25.6" width="17.6" height="5.0" rx="1.2"/>
      <rect x="9.0"  y="31.8" width="7.8"  height="5.0" rx="1.2"/>
      <rect x="18.0" y="31.8" width="12.0" height="5.0" rx="1.2" fill="${SIENNA}"/>
      <rect x="31.2" y="31.8" width="7.8"  height="5.0" rx="1.2"/>
      <rect x="15.6" y="38.0" width="7.4"  height="5.0" rx="1.2"/>
      <rect x="24.2" y="38.0" width="7.4"  height="5.0" rx="1.2"/>
    </g>
  </g>
  <text x="420" y="272" font-family="Georgia, 'Times New Roman', serif" font-size="86" font-weight="700" fill="${DARK}">Cedar &amp; Stone</text>
  <text x="424" y="318" font-family="Helvetica, Arial, sans-serif" font-size="25" font-weight="600" letter-spacing="6.5" fill="${SIENNA}">LANDSCAPE CO.</text>
  <text x="96" y="452" font-family="Georgia, 'Times New Roman', serif" font-size="41" fill="${DARK}">Design, build, and maintenance for high-desert yards.</text>
  <rect x="96" y="516" width="1008" height="1.6" fill="${FOREST}" opacity=".3"/>
  <text x="96" y="565" font-family="Helvetica, Arial, sans-serif" font-size="21" font-weight="600" letter-spacing="3.4" fill="${FOREST}">BEND, OREGON &#183; SINCE 2008</text>
  <text x="1104" y="565" text-anchor="end" font-family="Helvetica, Arial, sans-serif" font-size="21" font-weight="600" letter-spacing="3.4" fill="${FOREST}" opacity=".72">CONCEPT BUILD</text>
</svg>`;
// Pin to exactly 1200x630 — the SVG carries those dims, so resize rather than
// letting `density` scale it up.
await sharp(buf(og), { density: 150 }).resize(1200, 630).png().toFile("public/og-image.png"); out.push("og-image.png");
await sharp(buf(og), { density: 150 }).resize(1200, 630).webp({ quality: 88 }).toFile("public/og-image.webp"); out.push("og-image.webp");

// Vector masters kept in .brand for regeneration / print.
writeFileSync(".brand/mark-badge.svg", badge(512));
writeFileSync(".brand/mark-tiny.svg", badgeTiny(512));

console.log("wrote:", out.join(", "));
