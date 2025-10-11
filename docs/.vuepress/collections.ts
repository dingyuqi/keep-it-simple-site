import { defineCollections } from 'vuepress-theme-plume'
export const enCollections = defineCollections([
    {
        type: "post",
        dir: "blog",
        title: "Blog",
        postCover: {
            layout: "left",
            ratio: "4:3",
            width: 300,
        },
        pagination: {
            perPage: 10,
        },
    },
    {
        type: "doc",
        dir: "resource",
        title: "resource",
        sidebar: "auto",
        linkPrefix: "/en/resource/",
    },
    {
        type: "doc",
        dir: "solid",
        title: "solid",
        sidebar: "auto",
        linkPrefix: "/en/solid/",
    },
])

export const zhCollections = defineCollections([
    {
        type: "post",
        dir: "blog",
        title: "博客",
        postCover: {
            layout: "left",
            ratio: "4:3",
            width: 300,
        },
        pagination: {
            perPage: 10,
        },
    },
    {
        type: "doc",
        dir: "论文笔记",
        title: "论文笔记",
        sidebar: "auto",
        linkPrefix: "/paperNote/",
    },
    {
        type: "doc",
        dir: "面试题目",
        title: "面试题目",
        sidebar: "auto",
        linkPrefix: "/interview/",
    },
    {
        type: "doc",
        dir: "设计原则",
        title: "设计原则",
        sidebar: "auto",
        linkPrefix: "/designModel/",
    },
    {
        type: "doc",
        dir: "数据挖掘",
        title: "数据挖掘",
        sidebar: "auto",
        linkPrefix: "/dataMining/",
    },
    {
        type: "doc",
        dir: "网站资源",
        title: "网站资源",
        sidebar: "auto",
        linkPrefix: "/resource/",
    },
])