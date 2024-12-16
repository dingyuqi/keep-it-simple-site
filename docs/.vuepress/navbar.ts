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
  {
    text: '更多',
    icon: 'icon-park:more-two',
    items:[
      { text: '网站资源', link: '/resource/', icon: 'flat-color-icons:link' },
    ]
  }
])

export const enNavbar = defineNavbarConfig([
  { text: 'Home', link: '/en/', icon: 'flat-color-icons:home' },
  { text: 'Blog', link: '/en/blog/', icon: 'flat-color-icons:view-details' },
  {
    text: 'More',
    icon: 'icon-park:more-two',
    items:[
      { text: 'Resource', link: '/en/resource/', icon: 'flat-color-icons:link' },
    ]
  }
])

