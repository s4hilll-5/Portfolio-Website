import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_')
  // Set VITE_SITE_URL (e.g. https://your-domain.vercel.app) so Open Graph
  // tags use absolute URLs. Without it they fall back to relative paths.
  const siteUrl = (env.VITE_SITE_URL || '').replace(/\/$/, '')

  return {
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'inject-site-url',
        transformIndexHtml: {
          order: 'pre',
          handler: (html) =>
            html
              .replace(
                '<!-- __SITE_URL_TAGS__ -->',
                siteUrl
                  ? `<link rel="canonical" href="${siteUrl}/" />\n    <meta property="og:url" content="${siteUrl}/" />`
                  : '',
              )
              .replaceAll('__SITE_URL__', siteUrl),
        },
      },
    ],
  }
})
