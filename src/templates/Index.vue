<template>
  <component
    :is='type'
    class='min-h-screen'
  >
    <header>
      <NavBar>
        <template #left>
          <NavItem
            name='Template'
            href='/#/Templates/Index'
            :active='true'
          />
          <NavItem
            name='Documentation'
            href='/#/'
          />
        </template>
        <template>
          <NavDrop>
            Account &nbsp;
            <Icon
              name='chevron-down'
              size='small'
              aria-label='Expand Menu'
            />
            <template #dropdown>
              <NavItem name='Profile' />
              <NavItem name='Settings' />
              <hr class='border-t m-0'>
              <NavItem name='Logout' />
            </template>
          </NavDrop>
        </template>
      </NavBar>
      <NavBar
        alt
        noheading
      >
        <template #left>
          <NavDrop>
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
        </template>
      </NavBar>
    </header>
    <section class='p-4 md:p-6'>
      <h1 class='text-xl mt-2'>
        Swayable Design System
      </h1>
      <div class='mt-4'>
        <p>
          The organized principles, tools, patterns &amp; practices providing foundation for our
          product design.
        </p>
        <p class='hidden theme-dark-block'>
          Check out <a href='/#/Templates/Index'>light theme</a>.
        </p>
        <p class='theme-dark-hidden'>
          Check out <a href='/#/Templates/Dark'>dark theme</a>.
        </p>
      </div>
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
}
</script>

<docs>
  ```jsx
  <Index />
  ```
</docs>
