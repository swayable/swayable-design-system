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
            active='true'
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
        <p>
          Check out <a href='/#/Templates/Dark'>dark theme</a>.
        </p>
      </div>
    </section>
  </component>
</template>

<script>
/**
 * Shows how to layout and structure a home page.
 */
export default {
  name: 'Light',
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
  <Light />
  ```
</docs>
