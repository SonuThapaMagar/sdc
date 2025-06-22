/** @type {import('shadcn-ui/config').Config} */
module.exports = {
    ui: {
      framework: "react",
      path: "./src/components/ui",
    },
    tailwind: {
      config: "tailwind.config.cjs",
      css: "./src/index.css",
      baseColor: "zinc",
      primaryColor: "blue",
    },
    aliases: {
      components: "@/components",
      lib: "@/lib",
      utils: "@/utils",
    },
  }
  