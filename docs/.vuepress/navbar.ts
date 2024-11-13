import { defineNavbarConfig } from 'vuepress-theme-plume'

export const zhNavbar = defineNavbarConfig([
  { text: '首页', link: '/', icon: 'flat-color-icons:home' },
  { text: '博客', link: '/blog/', icon: 'flat-color-icons:view-details' },
  {
    text: '系列文章',
    icon: 'flat-color-icons:folder',
    items: [
      { text: '数据挖掘', link: '/dataMining/', icon: 'flat-color-icons:combo-chart' },
      { text: '论文笔记', link: '/paperNote/', icon: 'flat-color-icons:library' },
      { text: '编程设计', link: '/designModel/', icon: 'flat-color-icons:command-line' },
      { text: '面试题目', link: '/interview/', icon: 'flat-color-icons:faq' },
    ]
  },
])

export const enNavbar = defineNavbarConfig([
  { text: 'Home', link: '/en/' },
  { text: 'Blog', link: '/en/blog/' },
  { text: 'Tags', link: '/en/blog/tags/' },
  { text: 'Archives', link: '/en/blog/archives/' },
  {
    text: 'Notes',
    items: [{ text: 'Demo', link: '/en/notes/demo/README.md' }]
  },
])

