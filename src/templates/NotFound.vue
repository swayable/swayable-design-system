<template>
  <component
    :is='type'
    class='min-h-screen'
  >
    <header>
      <NavBar>
        <NavGroup>
          <NavItem
            name='Template'
            href='/#/Templates/Index'
            :active='true'
          />
          <NavItem
            name='Documentation'
            href='/#/'
          />
        </NavGroup>
        <NavGroup>
          <NavDrop>
            Account
            <template #dropdown>
              <NavItem name='Profile' />
              <NavItem name='Settings' />
              <hr class='border-t m-0'>
              <NavItem name='Logout' />
            </template>
          </NavDrop>
        </NavGroup>
      </NavBar>
    </header>
    <section class='p-4 md:p-6 text-center'>
      <h1 class='text-xl mt-20'>
        Page not found
      </h1>
      <p>
        <a href='/'>Go back to the beginning</a>.
      </p>
    </section>
  </component>
</template>

<script>
/**
 * Shows how to layout and structure a home page.
 */
export default {
  name: 'NotFound',
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
  <NotFound />
  ```
</docs>
