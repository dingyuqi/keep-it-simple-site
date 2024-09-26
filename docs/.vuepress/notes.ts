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
      sidebar: 'auto'
    },
    {
      // 声明笔记的目录，相对于 `notes.dir`，这里表示 `notes/typescript` 目录
      dir: '3. 设计模式',
      // 声明笔记的链接前缀，与 `notes.link` 拼接，这里表示 `/typescript/`
      // 笔记内的所有文章会以 `/typescript/` 作为访问链接前缀。
      link: '/designModel/',
      // 配置 笔记侧边导航栏，用于导航向笔记内的所有文档
      // 声明为 `auto` 的，将根据目录结构自动生成侧边栏导航
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

