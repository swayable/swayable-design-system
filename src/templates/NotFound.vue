<template>
  <component :is="type" class="min-h-screen bg-gray-100">
    <NavBar
      :navItems="[
        { name: 'Template', href: '/#/' },
        { name: 'Documentation', href: 'http://localhost:6060/' },
      ]"
    />
    <Wrapper class="text-center">
      <Heading>404 Error</Heading>
      <Paragraph> Couldn’t find what you're looking for. </Paragraph>
    </Wrapper>
  </component>
</template>

<script>
/**
 * Shows how to layout and structure an error page.
 */
export default {
  name: 'NotFound',
  metaInfo: {
    title: 'Page Not Found | Swayable Design System',
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
