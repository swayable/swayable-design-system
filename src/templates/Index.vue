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
    <article class='p-4 md:p-6'>
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

      <section>
        <Heading type='h2'>
          Typography
        </Heading>

        <Heading type='h3'>
          Headings
        </Heading>

        <table>
          <thead>
            <tr>
              <th>Heading</th>
              <th>Example</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>&lt;Heading type='h1'&gt;&lt;/Heading&gt;</code></td>
              <td>
                <Heading type='h1'>
                  h1. Amazingly few discotheques provide jukeboxes.
                </Heading>
              </td>
            </tr>
            <tr>
              <td><code>&lt;Heading type='h2'&gt;&lt;/Heading&gt;</code></td>
              <td>
                <Heading type='h2'>
                  h2. Amazingly few discotheques provide jukeboxes.
                </Heading>
              </td>
            </tr>
            <tr>
              <td><code>&lt;Heading type='h3'&gt;&lt;/Heading&gt;</code></td>
              <td>
                <Heading type='h3'>
                  h3. Amazingly few discotheques provide jukeboxes.
                </Heading>
              </td>
            </tr>
            <tr>
              <td><code>&lt;Heading type='h4'&gt;&lt;/Heading&gt;</code></td>
              <td>
                <Heading type='h4'>
                  h4. Amazingly few discotheques provide jukeboxes.
                </Heading>
              </td>
            </tr>
            <tr>
              <td><code>&lt;Heading type='h5'&gt;&lt;/Heading&gt;</code></td>
              <td>
                <Heading type='h5'>
                  h5. Amazingly few discotheques provide jukeboxes.
                </Heading>
              </td>
            </tr>
            <tr>
              <td><code>&lt;Heading type='h6'&gt;&lt;/Heading&gt;</code></td>
              <td>
                <Heading type='h6'>
                  h6. Amazingly few discotheques provide jukeboxes.
                </Heading>
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      <section>
        <Heading type='h2'>
          Dropdown
        </Heading>

        <code>
          <pre>
&lt;Dropdown @change='onChange'&gt;
  &lt;Input
    slot='trigger'
    placeholder='Search
  /&gt;

  &lt;DropdownMenu max-height='120'&gt;
    &lt;DropdownItem value='option_1'&gt;
      &lt;span&gt;Option A&lt;/span&gt;
    &lt;/DropdownItem&gt;

    &lt;DropdownItem value='option_2'&gt;
      &lt;span&gt;Option B&lt;/span&gt;
    &lt;/DropdownItem&gt;

    &lt;DropdownItem value='option_3'&gt;
      &lt;span&gt;Option C&lt;/span&gt;
    &lt;/DropdownItem&gt;

    &lt;DropdownItem value='option_4'&gt;
      &lt;span&gt;Option D&lt;/span&gt;
    &lt;/DropdownItem&gt;
  &lt;/DropdownMenu&gt;
&lt;/Dropdown&gt;
          </pre>
        </code>

        <Dropdown @change='onChange'>
          <Input
            slot='trigger'
            placeholder='Search'
          />

          <DropdownMenu :max-height='120'>
            <DropdownItem value='option_1'>
              <p>Option A</p>
            </DropdownItem>
            <DropdownItem value='option_2'>
              <p>Option B</p>
            </DropdownItem>
            <DropdownItem value='option_3'>
              <p>Option C</p>
            </DropdownItem>
            <DropdownItem value='option_4'>
              <p>Option D</p>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </section>

      <section>
        <Heading type='h2'>
          Form Controls
        </Heading>

        <Heading type='h3'>
          Input
        </Heading>

        <table>
          <thead>
            <tr>
              <th>Input</th>
              <th>Example</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>&lt;Input placeholder='Placeholder' /&gt;</code></td>
              <td>
                <Input placeholder='Placeholder' />
              </td>
            </tr>
            <tr>
              <td><code>&lt;Input disabled placeholder='Disabled' /&gt;</code></td>
              <td>
                <Input
                  disabled
                  placeholder='Disabled'
                />
              </td>
            </tr>
          </tbody>
        </table>

    </article>
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
    onChange(val) {
      console.log(val)
    },
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
