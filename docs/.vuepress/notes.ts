import { defineNotesConfig } from 'vuepress-theme-plume'
import zhDataMining from './notes/zh/data-mining'
import zhPaper from './notes/zh/paper'
import zhCodeDesign from './notes/zh/code-design'
import zhinterview from './notes/zh/interview'
import zhResource from './notes/zh/resource'
import enResource from './notes/en/resource'
import enSOLID from './notes/en/solid'

/* =================== locale: zh-CN ======================= */

export const zhNotes = defineNotesConfig({
	// 声明所有笔记的目录，(默认配置，通常您不需要声明它)
	dir: '/notes/',
	link: '/', // 声明所有笔记默认的链接前缀， 默认为 '/' （默认配置，通常您不需要声明它）
	notes: [
		zhDataMining,
		zhPaper,
		zhCodeDesign,
		zhinterview,
		zhResource
	]
})

/* =================== locale: en-US ======================= */

export const enNotes = defineNotesConfig({
	dir: 'en/notes',
	link: '/en/',
	notes: [
		enResource,
		enSOLID
	],
})
