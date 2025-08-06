// @ts-check
import { defineConfig } from "astro/config";
import { viteStaticCopy } from "vite-plugin-static-copy";

// https://astro.build/config
export default defineConfig({
  experimental: {
    fonts: [
      {
        provider: "local",
        name: "Graphik Semibold",
        cssVariable: "--talk-marco-graphik-semibold",
        variants: [
          {
            src: ["./src/fonts/GraphikSemibold.otf"],
            weight: 700,
            style: "normal",
          },
        ],
      },
      {
        provider: "local",
        name: "Graphik Regular",
        cssVariable: "--talk-marco-graphik-regular",
        variants: [
          {
            weight: 400,
            style: "normal",
            src: ["./src/fonts/GraphikRegular.otf"],
          },
        ],
      },
      {
        provider: "local",
        name: "Graphik Medium",
        cssVariable: "--talk-marco-graphik-medium",
        variants: [
          {
            src: ["./src/fonts/GraphikMedium.otf"],
            weight: 500,
            style: "normal",
          },
        ],
      },
    ],
  },
  vite: {
    build: {
      rollupOptions: {
        output: {
          manualChunks: (id) => {
            if (id.includes("src/vendor")) {
              return "vendor/[name]";
            }
          },
        },
      },
    },
    plugins: [
      // @ts-ignore
      viteStaticCopy({
        targets: [
          {
            src: "node_modules/p-slides/css/deck.css",
            dest: "css",
          },
        ],
      }),
    ],
  },
});
