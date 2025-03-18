import path from 'node:path'
import type { Theme } from 'vuepress'
import { plumeTheme } from 'vuepress-theme-plume'

export const theme: Theme = plumeTheme({
	hostname: 'https://dingyuqi.com',
	docsRepo: 'https://github.com/dingyuqi/keep-it-simple-site',
	docsDir: 'docs',
	contributors: {
		mode: 'block',
	},
	changelog: true,
	copyright: 'CC-BY-NC-ND-4.0',
	footer: { message: 'Keep It Simple', copyright: 'Copyright © 2021-present dingyuqi. All rights reserved.' },
	blog: {
		postCover: {
			layout: 'left',
			ratio: '4:3',
			width: 300,
		},
		pagination: {
			perPage: 10,
		}
	},
	codeHighlighter: {
		lineNumbers: true,
	},
	bulletin: {
		layout: 'top-right',
		border: false,
		title: 'Announcement: Limited English Blog Content',
		contentFile: path.join(__dirname, '_limit_english_bulletin.md'),
		enablePage: page => page.path === '/en/',
	},
	plugins: {
		shiki: {
			whitespace: true,
		},

		markdownEnhance: {
			demo: false,
			mermaid: true,
			markmap: true,
		},

		markdownImage: {
			figure: true,
			lazyload: true,
			mark: true,
			size: true,
		},

		markdownPower: {
			youtube: true,
			icons: true,
			demo: true,
			repl: {
				go: true,
			},
			codeTabs: {
				icon: true,
			},
			abbr: true,
			annotation: true,
		},

		comment: {
			provider: 'Giscus',
			comment: true,
			repo: 'dingyuqi/blog-with-plume-theme',
			repoId: 'R_kgDOM0ffQg',
			categoryId: 'DIC_kwDOM0ffQs4CkKcH',
			category: 'Announcements',
			mapping: 'title',
			reactionsEnabled: true,
			inputPosition: 'top',
		},
		// local mini search
		search: false,
		// Algolia DocSearch
		docsearch: {
			appId: 'KFGYVIHG31',
			apiKey: 'c78d52bca994ea6b299b4bffb41c98a2',
			indexName: 'dingyuqi',
		},

		git: true,
	},
})