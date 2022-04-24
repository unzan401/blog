//vue.config.js
module.exports = {
  title: "UnZan's page",
  description: "雲山的隨手筆記：數學、教育、投資、程式、前端、網頁設計",
  base: process.env.NODE_ENV === "production" ? "/blog/" : "/",
  themeConfig: {
    // 博客配置
    nav: [
      {
        text: "關於",
        link: "/about/",
      },
      {
        text: "文章",
        link: "/articles/",
        items:[
          {text: "雜談", link: "/articles/discussion/"}
        ]
      },
    ],
    editLinks: true,
    darkMode: true,
    repo: "https://github.com/unzan401/blog",
    repoLabel: "Github",
    lastUpdated: "Last Updated", // string | boolean
  },
  locales: {
    "/": {
      lang: "zh-TW",
    },
  },
  plugins: [
    "@vuepress/back-to-top",
    [
      "@vuepress/blog",
      {
        sitemap: {
          hostname: "https://unzan401.github.io/blog/",
        },
      },
    ],
    ['@vuepress/search', {
      searchMaxSuggestions: 10,
      getExtraFields: (page) => page.frontmatter.tags ?? [],
    }]
  ],
};
