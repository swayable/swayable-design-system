/**
 * This is Vue Design System’s helper util that
 * highlights the currently active nav item.
 */

import _each from 'lodash/each'
import _partition from 'lodash/partition'

export default {
  mounted() {
    window.addEventListener('hashchange', this.init)
  },
  beforeDestroy() {
    window.removeEventListener('hashchange', this.init)
  },
  methods: {
    init() {
      const sidebar = document.querySelector('div[class^=\'rsg--sidebar\']')
      const navLinks = sidebar.querySelectorAll('nav > ul > li > a')
      const current = location.hash.split('/')[1]
      const [actives, inactives] = _partition(navLinks, nl => nl.href.includes(current))
      _each(actives, active =>  active.parentNode.classList.add('vueds-active'))
      _each(inactives, inactive =>  inactive.parentNode.classList.remove('vueds-active'))
    },
  },
}
