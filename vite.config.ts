import { defineConfig } from "vite";

import { sveltekit } from "@sveltejs/kit/vite";
import { SvelteKitPWA } from "@vite-pwa/sveltekit";

export default defineConfig({
    plugins: [
        sveltekit(),
        SvelteKitPWA({
            registerType: "autoUpdate",
            includeAssets: [
                "favicon.ico",
                "logo.png"
            ],
            workbox: {
                globIgnores: [
                    "**/images/*.{png,jpg,jpeg,webp,gif}"
                ],
                globPatterns: [
                    "client/**/*.{js,css,ico,png}"
                ],
                runtimeCaching: [
                    {
                        urlPattern: /\.(?:png|jpg|jpeg|webp|gif)$/i,
                        handler: "CacheFirst",
                        options: {
                            cacheName: "images-cache",
                            expiration: {
                                maxEntries: 1000,
                                maxAgeSeconds: 604_800
                            }
                        }
                    }
                ]
            },
            manifest: {
                name: "中国大面值邮票图鉴",
                short_name: "大面值邮票",
                description: "收录 2002年9月7日 之后发行的面值大于等于 2元 的邮票，不包含小型张",
                background_color: "#f2f2f2",
                theme_color: "#d6204b",
                display: "standalone",
                orientation: "landscape-primary",
                icons: [
                    {
                        src: "logo.png",
                        sizes: "128x128",
                        type: "image/png"
                    }
                ]
            }
        })
    ],
    server: {
        host: "0.0.0.0"
    }
});
