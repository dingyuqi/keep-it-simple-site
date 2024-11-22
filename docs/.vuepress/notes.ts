import { defineNoteConfig, defineNotesConfig } from 'vuepress-theme-plume'

/* =================== locale: zh-CN ======================= */

export const zhNotes = defineNotesConfig({
  // 声明所有笔记的目录，(默认配置，通常您不需要声明它)
  dir: '/notes/',
  link: '/', // 声明所有笔记默认的链接前缀， 默认为 '/' （默认配置，通常您不需要声明它）
  notes: [
    // 每个笔记都是 `notes` 数组中的一个对象
    {
      dir: '1. 数据挖掘',
      link: '/dataMining/',
      sidebar: 'auto'
    },
    {
      dir: '2. 论文笔记',
      link: '/paperNote/',
      sidebar: [
        {
          dir: 'DGFD',
          text: 'DGFD',
          icon: 'ph:graph',
          collapsed: false,
          items: 'auto',
        }
      ],
    },
    {
      dir: '3. 设计原则',
      link: '/designModel/',
      sidebar: 'auto'
    },
    {
      dir: '4. 面试题目',
      link: '/interview/',
      sidebar: 'auto'
    }
  ]
})

/* =================== locale: en-US ======================= */

const enDemoNote = defineNoteConfig({
  dir: 'demo',
  link: '/demo',
  sidebar: ['', 'foo', 'bar'],
})

export const enNotes = defineNotesConfig({
  dir: 'en/notes',
  link: '/en/',
  notes: [enDemoNote],
})

