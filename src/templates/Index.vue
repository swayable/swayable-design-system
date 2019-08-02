<template>
  <component
    :is='type'
    class='min-h-screen bg-gray-100'
  >
    <header>
      <NavBar>
        <img
          class='h-10'
          src='//images.swayable.com/logos/light.svg'
          alt='Swayable Logo'
        >
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
        <template #right>
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
    <Wrapper>
      <Heading>Swayable Design System</Heading>
      <Paragraph>
        The organized principles, tools, patterns &amp; practices providing foundation for our
        product design.
      </Paragraph>
    </Wrapper>
  </component>
</template>

<script>
/**
 * Shows how to layout and structure a home page.
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
