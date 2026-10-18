import type { NextConfig } from "next";

// Fully static site: `next build` writes plain HTML/CSS/JS to /out, which any
// static host (Cloudflare Pages, Netlify, Vercel) can serve. The backend for
// the consulting form is undecided, so nothing here needs a server.
// NEXT_PUBLIC_BASE_PATH is "/skills.com" for the GitHub Pages preview
// and empty on a real domain.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || undefined;

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  assetPrefix: basePath,
  trailingSlash: true,
  turbopack: { root: __dirname },
  // Covers are pre-optimised at build time (see README), so Next's runtime
  // image server is not needed.
  images: { unoptimized: true },
  // One Arabic 404 page for every unknown URL (the app has two root layouts)
  experimental: { globalNotFound: true },
};

export default nextConfig;
