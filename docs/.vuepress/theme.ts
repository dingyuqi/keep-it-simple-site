import type { Theme } from 'vuepress'
import { plumeTheme } from 'vuepress-theme-plume'
export const theme: Theme = plumeTheme({
    // 添加您的部署域名
    hostname: 'https://dingyuqi.com',
    // your git repo url
    docsRepo: 'https://github.com/dingyuqi/blog-with-plume-theme',
    docsDir: 'docs',
    contributors: {
        mode: 'block',
    },
    changelog: {
        maxCount: 10,
    },

    plugins: {
        /**
         * Shiki 代码高亮
         * @see https://theme-plume.vuejs.press/config/plugins/code-highlight/
         */
        shiki: {
            languages: ["sql", "shell", "mermaid", "go", "html", "php", "python", "bash", "c++", "js", "ts", "css", "yaml", "md"],
            //   twoslash: true,
        },

        /**
         * markdown enhance
         * @see https://theme-plume.vuejs.press/config/plugins/markdown-enhance/
         */
        markdownEnhance: {
            demo: true,
            //   include: true,
            //   chart: true,
            //   echarts: true,
            mermaid: true,
            //   flowchart: true,
        },

        markdownImage: {
            // 启用 figure
            figure: true,
            // 启用图片懒加载
            // lazyload: true,
            // 启用图片标记
            mark: true,
            // 启用图片大小
            size: true,
        },
        /**
         *  markdown power
         * @see https://theme-plume.vuejs.press/config/plugin/markdown-power/
         */
        markdownPower: {
            //   pdf: true,
            //   caniuse: true,
            //   plot: true,
            //   bilibili: true,
            //   youtube: true,
            icons: true,
            //   codepen: true,
            //   replit: true,
            //   codeSandbox: true,
            //   jsfiddle: true,
            repl: {
                go: true,
                //     rust: true,
                //     kotlin: true,
            },
            codeTabs: {
                icon: true, // CodeTabsOptions
            }
        },

        /**
         * comments
         * @see https://theme-plume.vuejs.press/guide/features/comments/
         */
        comment: {
            provider: 'Giscus', // "Artalk" | "Giscus" | "Twikoo" | "Waline"
            comment: true,
            repo: 'dingyuqi/blog-with-plume-theme',
            repoId: 'R_kgDOM0ffQg',
            categoryId: 'DIC_kwDOM0ffQs4CkKcH',
            category: 'Announcements',
            mapping: 'title',
            reactionsEnabled: true,
            inputPosition: 'top',
        },

        /**
         * local mini search
         */
        search: false,

        /**
         * Algolia DocSearch
         */
        docsearch: {
            appId: 'KFGYVIHG31',
            apiKey: 'c78d52bca994ea6b299b4bffb41c98a2',
            indexName: 'dingyuqi',
        },
        git: true,

    },
    blog: {
        // 配置 封面图 布局位置
        // postCover: 'left', // 'left' | 'right' | 'odd-left' | 'odd-right' | 'top'
        postCover: {
            layout: 'left',
            ratio: '4:3',
            width: 300,
            compact: true
        },
        pagination: {
            perPage: 10,
        }
    }
})