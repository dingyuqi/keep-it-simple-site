import { defineNoteConfig } from 'vuepress-theme-plume'

export default defineNoteConfig({
    dir: '1. 数据挖掘',
    link: '/dataMining/',
    sidebar: [
        '',
        {
            dir: '1. 数据',
            text: '数据',
            icon: 'mdi:database-outline',
            collapsed: false,
            items: 'auto',
        },
        {
            dir: '2. 关联分析',
            text: '关联分析',
            icon: 'carbon:chart-relationship',
            collapsed: false,
            items: 'auto',
        }
    ]
})