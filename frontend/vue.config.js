const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    allowedHosts: [process.env.ALLOWED_HOST ?? process.env.ALLOWED_HOST],
  },
  css: {
    loaderOptions: {
      sass: {
        additionalData: `
          @import "@/styles/_variables.scss";
        `,
      },
    },
  },
});
