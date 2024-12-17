import { defineNotesConfig } from 'vuepress-theme-plume'
import dataMining from './notes/zh/data-mining'
import paper from './notes/zh/paper'
import codeDesign from './notes/zh/code-design'
import interview from './notes/zh/interview'
import zhResource from './notes/zh/resource'
import enResource from './notes/en/resource'

/* =================== locale: zh-CN ======================= */

export const zhNotes = defineNotesConfig({
  // 声明所有笔记的目录，(默认配置，通常您不需要声明它)
  dir: '/notes/',
  link: '/', // 声明所有笔记默认的链接前缀， 默认为 '/' （默认配置，通常您不需要声明它）
  notes: [
    dataMining,
    paper,
    codeDesign,
    interview,
    zhResource
  ]
})

/* =================== locale: en-US ======================= */

export const enNotes = defineNotesConfig({
  dir: 'en/notes',
  link: '/en/',
  notes: [
    enResource
  ],
})

