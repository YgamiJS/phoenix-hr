import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import viteImagemin from "vite-plugin-imagemin";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    viteImagemin({
      gifsicle: {
        interlaced: false,
        optimizationLevel: 7,
      },
      mozjpeg: {
        quality: 20,
      },
      optipng: {
        optimizationLevel: 7,
      },
      pngquant: {
        quality: [0.8, 0.9],
        speed: 4,
      },
      svgo: {
        plugins: [
          {
            name: "removeViewBox",
          },
          {
            active: false,
            name: "removeEmptyAttrs",
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
