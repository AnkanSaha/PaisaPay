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
            src: "/assets/icons/Rupee.jpeg",
            sizes: "192x192",
            type: "image/jpeg",
            purpose: "any maskable",
          },
          {
            src: "/assets/icons/Rupee.jpeg",
            sizes: "512x512",
            type: "image/jpeg",
            purpose: "any maskable",
          },
          {
            src: "/assets/icons/Rupee.jpeg",
            sizes: "192x192",
            type: "image/jpeg",
            purpose: "any maskable",
            destination: "/assets/icons",
          },
        ],
      },
    }),
  ],
  cacheDir: ".vite",
  assetsInclude: ["**/*.jpeg", "**/*.png", "**/*.svg", "**/*.gif", "**/*.jpg, **/*.webp, **/*.ico, **/*.json, **/*.webmanifest, **/*.xml, **/*.pdf, **/*.txt, **/*.md, **/*.woff, **/*.woff2, **/*.ttf, **/*.otf, **/*.eot, **/*.wav, **/*.mp3, **/*.mp4, **/*.webm, **/*.ogg, **/*.m4a, **/*.aac, **/*.flac, **/*.oga, **/*.opus, **/*.svg, **/*.svgz, **/*.zip, **/*.gz, **/*.tgz, **/*.brotli, **/*.7z, **/*.rar, **/*.bz2, **/*.xz, **/*.pdf, **/*.epub, **/*.woff, **/*.woff2, **/*.ttf, **/*.otf, **/*.eot, **/*.wav, **/*.mp3, **/*.mp4, **/*.webm, **/*.ogg, **/*.m4a, **/*.aac, **/*.flac, **/*.oga, **/*.opus, **/*.svg, **/*.svgz, **/*.zip, **/*.gz, **/*.tgz, **/*.brotli, **/*.7z, **/*.rar, **/*.bz2, **/*.xz, **/*.pdf, **/*.epub, **/*.woff, **/*.woff2, **/*.ttf, **/*.otf, **/*.eot, **/*.wav, **/*.mp3, **/*.mp4, **/*.webm, **/*.ogg, **/*.m4a, **/*.aac, **/*.flac, **/*.oga, **/*.opus, **/*.svg, **/*.svgz, **/*.zip, **/*.gz, **/*.tgz, **/*.brotli, **/*.7z, **/*.rar, **/*.bz2, **/*.xz, **/*.pdf, **/*.epub"],
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
  // server: {
  //   port: 5173,
  //   strictPort: true,
  //   open: true,
  //   cors: true,
  //   hmr: true,
  //   https: false,
  //   host: "localhost",
  //   force: false
  // },
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  optimizeDeps: {
    include: ["react", "react-dom", "react-router-dom"],
  }
});
