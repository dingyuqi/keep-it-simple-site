import { defineNavbarConfig } from 'vuepress-theme-plume'

export const zhNavbar = defineNavbarConfig([
  { text: '首页', link: '/', icon: 'fluent-color:home-48' },
  { text: '博客', link: '/blog/', icon: 'fxemoji:pages' },
  {
    text: '系列文章',
    items: [      
      { text: '数据挖掘', link: '/dataMining/', icon: 'material-symbols:database-outline' },
      { text: '论文笔记', link: '/paperNote/', icon: 'material-symbols:note' },
      { text: '面向对象设计原则', link: '/designModel/', icon: 'material-symbols:code-blocks' },
      { text: '面试题目', link: '/interview/', icon: 'clarity:employee-line' },
    ],
    icon: 'fxemoji:books'
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

