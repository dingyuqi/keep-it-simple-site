import { defineNoteConfig } from 'vuepress-theme-plume'

export default defineNoteConfig({
    dir: '2. 论文笔记',
    link: '/paperNote/',
    sidebar: [
        '',
        {
            dir: 'DGFD',
            text: 'DGFD',
            icon: 'ph:graph',
            collapsed: false,
            items: 'auto',
        }
    ]
})