// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    nitro: {
        preset: "aws-lambda",
        serveStatic: true,
    },    
    runtimeConfig: {
        API_BASE_URL: process.env.API_BASE_URL,
    },
    css: ["bootstrap/dist/css/bootstrap.min.css"],
    pages: true,
    // ssr: true
})
