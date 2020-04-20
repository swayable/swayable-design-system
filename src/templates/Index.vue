<template>
  <component
    :is='element'
    class='min-h-screen page font-body'
  >
    <header>
      <slot name='header'>
        <NavBar />
      </slot>
    </header>
    <article class='p-4 md:p-6 w-full overflow-x-scroll'>
      <slot />
    </article>
  </component>
</template>

<script>


/**
 * Used as a page wrapper
 */
export default {
  name: 'Index',
  metaInfo: {
    title: 'Swayable',
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
  <Index />
  ```
</docs>
