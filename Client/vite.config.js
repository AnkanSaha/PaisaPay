import { defineConfig } from "vite"; // vite config
import react from "@vitejs/plugin-react-swc"; // react-swc plugin
import { VitePWA } from "vite-plugin-pwa"; // pwa plugin

/* The code is exporting a default configuration object for the Vite build tool. This configuration
object specifies various settings and options for the build process. */
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "PaisaPay",
        short_name: "PaisaPay",
        theme_color: "#ffffff",
        icons: [
          {
            src: "/icons/PWA Icons/icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any maskable",
          },
          {
            src: "/icons/PWA Icons/icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
          {
            src: "/icons/PWA Icons/icon-256x256.png",
            sizes: "256x256",
            type: "image/png",
            purpose: "any maskable",
            destination: "/assets/icons",
          },
          {
            src: "/icons/PWA Icons/icon-384x384.png",
            sizes: "384x384",
            type: "image/png",
            purpose: "any maskable",
            destination: "/assets/icons",
          }
        ],
      },
    }),
  ],
  cacheDir: ".vite",
  assetsInclude: ["**/*.jpeg", "**/*.txt", "**/*.png", "**/*.svg", "**/*.jpg, **/*.webp, **/*.ico, **/*.json, **/*.webmanifest, **/*.xml, **/*.pdf, **/*.txt, **/*.md, **/*.woff, **/*.woff2, **/*.ttf, **/*.otf, **/*.eot, **/*.wav, **/*.mp3, **/*.mp4, **/*.webm, **/*.ogg, **/*.m4a, **/*.aac, **/*.flac, **/*.oga, **/*.opus, **/*.svg, **/*.svgz, **/*.zip, **/*.gz, **/*.tgz, **/*.brotli, **/*.7z, **/*.rar, **/*.bz2, **/*.xz, **/*.pdf, **/*.epub, **/*.woff, **/*.woff2, **/*.ttf, **/*.otf, **/*.eot, **/*.wav, **/*.mp3, **/*.mp4, **/*.webm, **/*.ogg, **/*.m4a, **/*.aac, **/*.flac, **/*.oga, **/*.opus, **/*.svg, **/*.svgz, **/*.zip, **/*.gz, **/*.tgz, **/*.brotli, **/*.7z, **/*.rar, **/*.bz2, **/*.xz, **/*.pdf, **/*.epub, **/*.woff, **/*.woff2, **/*.ttf, **/*.otf, **/*.eot, **/*.wav, **/*.mp3, **/*.mp4, **/*.webm, **/*.ogg, **/*.m4a, **/*.aac, **/*.flac, **/*.oga, **/*.opus, **/*.svg, **/*.svgz, **/*.zip, **/*.gz, **/*.tgz, **/*.brotli, **/*.7z, **/*.rar, **/*.bz2, **/*.xz, **/*.pdf, **/*.epub"],
  base: "/",
  mode: "production",
  ssr: true,
  worker: true,
  experimental: {
    cssVarsInjection: false,
    cssStaticVarInjection: true,
    optimizeDeps: true,
    hmrPartialAccept: true
  },
  publicDir: "public",
  preview: {
    cors: true,
    port: 3000,
    strictPort: true,
    open: true,
    hmr: true,
    https: false,
    host: "localhost",
    force: false
  },
  build: {
    outDir: "PaisaPay",
    emptyOutDir: true,
    sourcemap: true,
    minify: true,
    ssrManifest: true,
    modulePreload: true,
    copyPublicDir: true,
    cssCodeSplit: true,
    manifest: true,
    cssTarget: "es2015",
    target: "es2015",
    assetsDir: "assets",
    chunkSizeWarningLimit: 100000,
    cssMinify: true,
    ssrEmitAssets: true,
    write: true,
    assetsInlineLimit: 5128
  },
  server: {
    port: 5173,
    strictPort: true,
    open: true,
    cors: true,
    hmr: true,
    https: false,
    host: "localhost",
    force: false
  },
  resolve: {
    alias: {
      "@src": "/src",
      "@public": "/public",
      "@app": "/src/App",
      "@component": "/src/Components",
      "@page": "/src/Pages",
      "@helper": "/src/Helper",
      "@setting": "/src/Settings",
      "@validator": "/src/Validator",
      "@router": "/src/Settings/Router",
      "@redux": "/src/App/Redux",
    },
    dedupe: ["react", "react-dom", "react-router-dom"],
    extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json", ".vue", ".mjsx", ".ts", ".tsx", ".jsx", ".vue", ".json", ".wasm", ".png", ".svg", ".jpg", ".jpeg", ".gif", ".bmp", ".tiff", ".webp", ".avif", ".mp4", ".webm", ".ogg", ".mp3", ".wav", ".flac", ".aac", ".woff", ".woff2", ".ttf", ".otf", ".eot", ".pdf", ".epub", ".zip", ".gz", ".tgz", ".brotli", ".7z", ".rar", ".bz2", ".xz", ".pdf", ".epub", ".woff", ".woff2", ".ttf", ".otf", ".eot", ".wav", ".mp3", ".mp4", ".webm", ".ogg", ".m4a", ".aac", ".flac", ".oga", ".opus", ".svg", ".svgz", ".zip", ".gz", ".tgz", ".brotli", ".7z", ".rar", ".bz2", ".xz", ".pdf", ".epub", ".woff", ".woff2", ".ttf", ".otf", ".eot", ".wav", ".mp3", ".mp4", ".webm", ".ogg", ".m4a", ".aac", ".flac", ".oga", ".opus", ".svg", ".svgz", ".zip", ".gz", ".tgz", ".brotli", ".7z", ".rar", ".bz2", ".xz", ".pdf", ".epub"],
    mainFields: ["module", "jsnext:main", "jsnext", "browser", "main"],
    symlinks: true,
    preferRelative: true,
    preserveSymlinks: true,
    dedupeImportSource: true,
    mainFiles: ["index", "main", "module"],
    enforceExtension: false,
    enforceModuleExtension: false,
    fullySpecified: false
  },
  optimizeDeps: {
    include: ["react", "react-dom", "react-router-dom"],
    sourcemap: true
  }
});