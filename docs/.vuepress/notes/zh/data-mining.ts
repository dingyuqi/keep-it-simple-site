import { defineNoteConfig } from 'vuepress-theme-plume'

export default defineNoteConfig({
    dir: '数据挖掘',
    link: '/dataMining/',
    sidebar: [
        '',
        {
            dir: '数据',
            text: '数据',
            icon: 'mdi:database-outline',
            collapsed: false,
            items: 'auto',
        },
        {
            dir: '关联分析',
            text: '关联分析',
            icon: 'carbon:chart-relationship',
            collapsed: false,
            items: 'auto',
        }
    ]
})