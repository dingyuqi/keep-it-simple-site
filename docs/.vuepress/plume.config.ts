import { defineThemeConfig } from 'vuepress-theme-plume'
import { enNavbar, zhNavbar } from './navbar'
import { enNotes, zhNotes } from './notes'

/**
 * @see https://theme-plume.vuejs.press/config/basic/
 */
export default defineThemeConfig({
  logo: '/icon/icon.ico',
  // your git repo url
  docsRepo: '',
  docsDir: 'docs',

  appearance: true,

  social: [
    { icon: 'github', link: 'https://github.com/dingyuqi' },
  ],

  locales: {
    '/': {
      profile: {
        avatar: '/icon/icon.ico',
        name: 'Keep It Simple',
        description: '用最简单的语言解释计算机',
        // circle: true,
        location: 'ShenZhen, China',
        // organization: '',
      },

      navbar: zhNavbar,
      notes: zhNotes,
    },
    '/en/': {
      profile: {
        avatar: '/icon/icon.ico',
        name: 'Keep It Simple',
        description: 'The goal is to explain computer knowledge in simple and easy-to-understand way.',
        // circle: true,
        // location: '',
        // organization: '',
      },

      navbar: enNavbar,
      notes: enNotes,
    },
  },
})
