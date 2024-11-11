import { defineThemeConfig } from 'vuepress-theme-plume'
import { enNavbar, zhNavbar } from './navbar'
import { enNotes, zhNotes } from './notes'

/**
 * @see https://theme-plume.vuejs.press/config/basic/
 */
export default defineThemeConfig({
  logo: '/icon/icon.ico',
  appearance: true,

  social: [
    { icon: 'github', link: 'https://github.com/dingyuqi' },
    {
      icon: { svg: '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2m0 4l-8 5l-8-5V6l8 5l8-5z"/></svg>', name: 'e-mail' },
      link: 'mailto:dingyq2023@gmail.com'
    },
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
