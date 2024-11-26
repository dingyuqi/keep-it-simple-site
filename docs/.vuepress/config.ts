import { defineUserConfig } from 'vuepress'
import { viteBundler } from '@vuepress/bundler-vite'
import { theme } from './theme.js'
import { googleAnalyticsPlugin } from '@vuepress/plugin-google-analytics'

export default defineUserConfig({
  base: '/',
  lang: 'zh-CN',
  locales: {
    '/': {
      title: 'Keep It Simple',
      lang: 'zh-CN',
      description: '用最简单的语言解释计算机.',
    },
    '/en/': {
      title: 'Keep It Simple',
      lang: 'en-US',
      description: 'The goal is to explain computer knowledge in simple and easy-to-understand way.',
    },
  },
  head: [
    ['link', { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/icon/icon.ico' }],
    ['link', { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/icon/icon.ico' }],
    ['meta', { name: 'google-site-verification', content: 't6yehdgO6LA8H84E3clbe8ofMkBTMFLA_7rCiE7Fhl4' }],
  ],

  bundler: viteBundler(),

  theme,

  plugins: [
    googleAnalyticsPlugin({
      id: 'G-DWDHVL9R0F',
    }),
  ],
})
