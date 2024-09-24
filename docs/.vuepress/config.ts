import { defineUserConfig } from 'vuepress'
import { viteBundler } from '@vuepress/bundler-vite'
import { plumeTheme } from 'vuepress-theme-plume'

export default defineUserConfig({
  base: '/',
  lang: 'zh-CN',
  locales: {
    '/': {
      title: 'Keep It Simple',
      lang: 'zh-CN',
      description: 'The goal is to explain computer knowledge in simple and easy-to-understand way.',
    },
    '/en/': {
      title: 'Keep It Simple',
      lang: 'en-US',
      description: 'The goal is to explain computer knowledge in simple and easy-to-understand way.',
    },
  },

  bundler: viteBundler(),

  theme: plumeTheme({
    // 添加您的部署域名
    hostname: 'https://dingyuqi.com',
    plugins: {
      /**
       * Shiki 代码高亮
       * @see https://theme-plume.vuejs.press/config/plugins/code-highlight/
       */
      // shiki: {
      //   languages: ['shell', 'bash', 'typescript', 'javascript'],
      //   twoslash: true,
      // },

      /**
       * markdown enhance
       * @see https://theme-plume.vuejs.press/config/plugins/markdown-enhance/
       */
      markdownEnhance: {
        demo: true,
      //   include: true,
      //   chart: true,
      //   echarts: true,
        mermaid: true,
        figure: true,
      //   flowchart: true,
      },

      /**
       *  markdown power
       * @see https://theme-plume.vuejs.press/config/plugin/markdown-power/
       */
      // markdownPower: {
      //   pdf: true,
      //   caniuse: true,
      //   plot: true,
      //   bilibili: true,
      //   youtube: true,
      //   icons: true,
      //   codepen: true,
      //   replit: true,
      //   codeSandbox: true,
      //   jsfiddle: true,
      //   repl: {
      //     go: true,
      //     rust: true,
      //     kotlin: true,
      //   },
      // },

      /**
       * comments
       * @see https://theme-plume.vuejs.press/guide/features/comments/
       */
      comment: {
        provider: 'Giscus', // "Artalk" | "Giscus" | "Twikoo" | "Waline"
        comment: true,
        repo: 'dingyuqi/alex-blog-issues',
        repoId: 'R_kgDOMRQTXA',
        categoryId: 'DIC_kwDOMRQTXM4CioGB',
        category: 'Announcements', 
        mapping: 'pathname',
        reactionsEnabled: true,
        inputPosition: 'top',
      },
    },
  }),
})