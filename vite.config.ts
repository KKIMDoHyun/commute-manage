import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: [
            { find: "@apis", replacement: "/src/apis" },
            { find: "@assets", replacement: "/src/assets" },
            { find: "@components", replacement: "/src/components" },
            { find: "@pages", replacement: "/src/pages" },
            { find: "@routes", replacement: "/src/routes" },
            { find: "@stores", replacement: "/src/stores" },
            { find: "@types", replacement: "/src/types" },
            { find: "@utils", replacement: "/src/utils" },
            { find: "@", replacement: "/src" },
        ],
    },
});
