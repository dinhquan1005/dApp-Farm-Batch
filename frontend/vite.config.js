import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  base: "./",
  build: {
    rollupOptions: {
      input: {
        index: resolve(__dirname, "index.html"),
        "trang-trai": resolve(__dirname, "trang-trai.html"),
        "marketplace-p2p": resolve(__dirname, "marketplace-p2p.html"),
        "thong-bao": resolve(__dirname, "thong-bao.html"),
        "ho-so": resolve(__dirname, "ho-so.html"),
        "qr-code": resolve(__dirname, "qr-code.html"),
        "ng-nhp": resolve(__dirname, "ng-nhp.html"),
      },
    },
  },
});
