<template>
  <component
    :is='element'
    class='min-h-screen'
  >
    <header>
      <NavBar>
        <NavGroup>
          <NavItem
            href='/#/Templates/Index'
            :active='true'
          >
            Documentation
          </NavItem>
          <NavItem href='/#/'>
            Template
          </NavItem>
        </NavGroup>
        <NavGroup>
          <NavDrop>
            Account
            <template #dropdown>
              <NavItem>Profile</NavItem>
              <NavItem>Settings</NavItem>
              <hr class='border-t m-0'>
              <NavItem>Logout</NavItem>
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
    element: {
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
