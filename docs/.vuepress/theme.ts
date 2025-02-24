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
            compact: true
        },
        pagination: {
            perPage: 10,
        }
    },
    bulletin: {
        layout: 'top-right',
        border: false,
        title: 'Announcement: Limited English Blog Content',
        contentFile: path.join(__dirname, '_limit_english_bulletin.md'),
        enablePage: page => page.path === '/en/',
    },
    plugins: {
        /**
         * Shiki 代码高亮
         * @see https://theme-plume.vuejs.press/config/plugins/code-highlight/
         */
        shiki: {
            languages: ["sql", "shell", "mermaid", "go", "html", "php", "python", "bash", "c++", "js", "css", "yaml", "md"],
            whitespace: true,
        },

        /**
         * markdown enhance
         * @see https://theme-plume.vuejs.press/config/plugins/markdown-enhance/
         */
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
        /**
         *  markdown power
         * @see https://theme-plume.vuejs.press/config/plugin/markdown-power/
         */
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
        /**
         * comments
         * @see https://theme-plume.vuejs.press/guide/features/comments/
         */
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