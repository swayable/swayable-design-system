<template>
  <component
    :is='element'
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
    <article class='p-4 md:p-6'>
      <Heading type='h1'>
        Swayable Design System
      </Heading>
      <p class='mt-4'>
        The organized principles, tools, patterns &amp; practices providing foundation for our
        product design.
      </p>

      <section class='mt-10'>
        <Heading type='h2'>
          Form Controls
        </Heading>

        <Heading
          type='h3'
          class='mt-2'
        >
          TextInput
        </Heading>

        <TextInput
          class='min-w-full md:inline-block mt-1'
          placeholder='Try this text input'
        />
        <TextInput
          class='min-w-full md:inline-block mt-1'
          type='textarea'
          placeholder='I&apos;m just another type of text input'
        />
      </section>
    </article>
  </component>
</template>

<script>
/**
 * Shows how to layout and structure a page.
 */
export default {
  name: 'Index',
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
  <Index />
  ```
</docs>
