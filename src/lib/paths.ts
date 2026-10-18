// Sub-path the site is served from. Empty on a real domain; "/skills.com"
// for the GitHub Pages preview (set in .github/workflows/deploy.yml).
// next/link adds it automatically; plain <img> and <a> need asset().
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const asset = (path: string) => (path.startsWith("/") ? `${basePath}${path}` : path);

// Where "/" forwards to (the default language).
export const rootTarget = `${basePath}/ar/`;
