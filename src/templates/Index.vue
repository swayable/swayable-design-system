<template>
  <component
    :is='type'
    class='min-h-screen page'
  >
    <header>
      <NavBar>
        <NavGroup class='flex-grow'>
          <NavLogo />
          <NavItem>Home</NavItem>
          <NavItem>About</NavItem>
        </NavGroup>
        <NavDrop>
          Account
          <template #dropdown>
            <NavItem name='Profile' />
            <NavItem name='Settings' />
            <hr class='border-t m-0'>
            <NavItem name='Logout' />
          </template>
        </NavDrop>
      </NavBar>
      <NavBar
        class='h-16'
        alt
        noheading
      >
        <NavGroup>
          <NavDrop align='left'>
            Results
            <template #dropdown>
              <NavItem name='Qualitative' />
              <NavItem name='Quantitative' />
              <NavItem name='Labs' />
            </template>
          </NavDrop>
          <NavItem :active='true'>
            Design
          </NavItem>
          <NavItem>Audience</NavItem>
        </NavGroup>
      </NavBar>
    </header>
    <section class='p-4 md:p-6'>
      <Heading type='h1'>
        Swayable Design System
      </Heading>
      <p class='mt-4'>
        The organized principles, tools, patterns &amp; practices providing foundation for our
        product design.
      </p>
      <p class='mt-4'>
        Check out
        <button
          class='link'
          @click='toggleTheme'
        >
          <span v-if='darkTheme'>light theme</span>
          <span v-else>dark theme</span>
        </button>
      </p>
    </section>
  </component>
</template>

<script>
/**
 * Shows how to layout and structure a page.
 */
export default {
  name: 'Index',
  release: '0.1.0',
  metaInfo: {
    title: 'Swayable Design System',
    htmlAttrs: {
      lang: 'en',
    },
  },
  props: {
    /**
     * The html element name used for the component.
     */
    type: {
      type: String,
      default: 'div',
    },
  },
  data() {
    const darkTheme = document
      .querySelector('html')
      .getAttribute('data-theme') === 'dark'
    return { darkTheme }
  },
  mounted() {
    const toggleTheme = window.location.href.includes('theme=toggle')
    if (toggleTheme) this.toggleTheme()
  },
  methods: {
    toggleTheme() {
      this.darkTheme = !this.darkTheme
      const page = document.querySelector('html')
      if (this.darkTheme) {
        page.setAttribute('data-theme', 'dark')
      } else {
        page.removeAttribute('data-theme')
      }
    },
  },
}
</script>

<docs>
  ```jsx
  <Index />
  ```
</docs>
