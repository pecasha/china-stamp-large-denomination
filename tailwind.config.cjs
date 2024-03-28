/** @type {import("tailwindcss").Config}*/
const config = {
    content: [
        "./src/**/*.{html,js,svelte,ts}",
        "./node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}",
        "./node_modules/flowbite-svelte-icons/**/*.{html,js,svelte,ts}"
    ],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                primary: {
                    50: "#fff5f2",
                    100: "#fff1ee",
                    200: "#ffe4de",
                    300: "#ffd5cc",
                    400: "#ffbcad",
                    500: "#fe795d",
                    600: "#ef562f",
                    700: "#eb4f27",
                    800: "#cc4522",
                    900: "#a5371b"
                }
            }
        }
    },
    plugins: [
        require("flowbite/plugin")
    ]
};

module.exports = config;
