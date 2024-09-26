import { defineNavbarConfig } from 'vuepress-theme-plume'

export const zhNavbar = defineNavbarConfig([
  { text: '首页', link: '/' },
  { text: '博客', link: '/blog/', icon: 'material-symbols:book-2-outline-rounded' },
  { text: '分类', link: '/blog/categories/', icon: 'material-symbols:category-outline' },
  { text: '归档', link: '/blog/archives/', icon: 'material-symbols:format-list-numbered' },
  {
    text: '笔记',
    items: [
      { text: '设计模式', link: '/designModel/', icon: 'material-symbols:code-blocks' },
      { text: '数据挖掘', link: '/dataMining/', icon: 'material-symbols:database-outline' },
      { text: '论文笔记', link: '/paperNote/', icon: 'material-symbols:note' },
      { text: '面试题目', link: '/interview/', icon: 'clarity:employee-line' },
    ],
    icon: 'ep:memo'
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

