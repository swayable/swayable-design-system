
<template>
  <component
    :is='smartElement'
    class='button inline-flex items-center rounded-md focus:outline-none transition ease-in-out duration-150'
    :class='{ destructive, small, secondary, "color": !custom }'
    :disabled='disabled'
    v-bind='navigation'
    v-on='$listeners'
  >
    <slot />
  </component>
</template>

<script>
import Label from './Label'

/**
 * Buttons are generally used for interface actions.
 * Event handlers can be attached like any other button.
 *
 * Including `props.to` will cause the element to become a `<router-link>`
 *
 * Including `props.href` will cause the element to become an `<a>`
 */
export default {
  name: 'Button',
  status: 'ready',
  props: {
    /**
     * The html element used for the Button.
     */
    element: {
      type: String,
      validator: value => {
        return value.match(/(button|a|input|router-link)/)
      },
    },
    /**
     * Element will be &lt;router-link&gt;
     */
    to: {
      type: Object,
    },
    /**
     * Element with be &lt;a&gt;
     */
    href: {
      type: String,
    },
    /**
     * Style variation to warn users
     */
    destructive: {
      type: Boolean,
      default: false,
    },
    /**
     * Disables interaction (overrides destructive).
     */
    disabled: {
      type: Boolean,
      default: false,
    },
    /**
     * Smaller button
     */
    small: {
      type: Boolean,
      default: false,
    },
    /**
     * Alternative button style
     */
    secondary: {
      type: Boolean,
      default: false,
    },
    /**
     * Strips styles
     */
    custom: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    smartElement() {
      if (this.element) return this.element
      if (this.to) return 'router-link'
      if (this.href) return 'a'
      return 'button'
    },
    navigation() {
      if (this.smartElement === 'router-link') return { to: (this.to || this.href) }
      if (this.smartElement === 'a') return { href: this.href }
      return {}
    },
  },
}
</script>

<style lang="scss">
.button {
  &:focus { @apply shadow-outline; }

  &.small { @apply px-2 py-1.5 text-md leading-3 }
  &:not(.small) { @apply px-3 py-1.5 text-lg leading-5 }
  
  &[disabled] {
    @apply bg-light-3 text-light-0 cursor-not-allowed;
    &.secondary {
      @apply bg-white text-light-1 border border-light-3;
    }
  }
  &:not([disabled]) {
    &.color {
      @apply bg-blue-1 text-white;
      &:hover { @apply bg-blue-2; }
      &:active { @apply bg-blue-3; }

      &.destructive {
        @apply bg-red-1;
        &:hover { @apply bg-red-2; }
        &:active { @apply bg-red-3; }
      }

      &.secondary {
        @apply bg-white text-blue-1 border border-light-3;
        &:hover { @apply text-blue-2; }
        &:active { @apply text-blue-3; }
       
        &.destructive {
          @apply bg-white text-red-1;
          &:hover { @apply text-red-2; }
          &:active { @apply text-red-3; }
        }
      }
    }
  }
}
.theme-dark-mode {
  .button {
    &[disabled] {
      @apply bg-dark-4 text-light-2;
      &.secondary {
        @apply bg-dark-1 text-dark-4 border border-dark-4;
      }
    }
    &:not([disabled]) {
      &.color {
        @apply bg-blue-3 text-dark-0;
        
        &:hover { @apply bg-blue-4; }
        &:active { @apply bg-blue-5; }

        &.destructive {
          @apply bg-red-3;
          &:hover { @apply bg-red-4; }
          &:active { @apply bg-red-5; }
          &:focus { @apply shadow-outline; }
        }

        &.secondary {
          @apply bg-dark-2 text-blue-3 border border-dark-4;
          &:hover { @apply text-blue-4; }
          &:active { @apply text-blue-5; }
        
          &.destructive {
            @apply bg-dark-2 text-red-3;
            &:hover { @apply text-red-4; }
            &:active { @apply text-red-5; }
          }
        }
      }
    }
  }
}
</style>

<docs>
  ```jsx
  <div class='flex flex-col items-center justify-center'>
    <Table>
      <template slot="head">
        <TableRow>
          <TableCell head />
          <TableCell head>
            Normal
          </TableCell>
          <TableCell head>
            Custom
          </TableCell>
          <TableCell head>
            Destructive
          </TableCell>
          <TableCell head>
            Disabled
          </TableCell>
        </TableRow>
      </template>
      <TableRow>
        <TableCell head>
          <span>Normal</span>
        </TableCell>
        <TableCell>
          <Button>Button</Button>
        </TableCell>
        <TableCell>
          <Button custom>Button</Button>
        </TableCell>
        <TableCell>
          <Button destructive>Button</Button>
        </TableCell>
        <TableCell>
          <Button disabled>Button</Button>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell head>
          Small
        </TableCell>
        <TableCell>
          <Button small>Button</Button>
        </TableCell>
        <TableCell>
          <Button small custom>Button</Button>
        </TableCell>
        <TableCell>
          <Button small destructive>Button</Button>
        </TableCell>
        <TableCell>
          <Button small disabled>Button</Button>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell head>
          <span>Secondary</span>
        </TableCell>
        <TableCell>
          <Button secondary>Button</Button>
        </TableCell>
        <TableCell>
          <Button secondary custom>Button</Button>
        </TableCell>
        <TableCell>
          <Button secondary destructive>Button</Button>
        </TableCell>
        <TableCell>
          <Button secondary disabled>Button</Button>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell head>
          Secondary Small
        </TableCell>
        <TableCell>
          <Button secondary small>Button</Button>
        </TableCell>
        <TableCell>
          <Button secondary small custom>Button</Button>
        </TableCell>
        <TableCell>
          <Button secondary small destructive>Button</Button>
        </TableCell>
        <TableCell>
          <Button secondary small disabled>Button</Button>
        </TableCell>
      </TableRow>
    </Table>
  </div>

  <div class='theme-dark-mode flex flex-col items-center jusify-center px-5 pb-10 mt-5'>
    <h3 class='typography-2 mt-5 w-full text-center'>Dark Mode</h3>
    <div>
      <Table>
        <template slot="head">
          <TableRow>
            <TableCell head />
            <TableCell head>
              Normal
            </TableCell>
            <TableCell head>
              Custom
            </TableCell>
            <TableCell head>
              Destructive
            </TableCell>
            <TableCell head>
              Disabled
            </TableCell>
          </TableRow>
        </template>
        <TableRow>
          <TableCell head>
            <span>Normal</span>
          </TableCell>
          <TableCell>
            <Button>Button</Button>
          </TableCell>
          <TableCell>
            <Button custom>Button</Button>
          </TableCell>
          <TableCell>
            <Button destructive>Button</Button>
          </TableCell>
          <TableCell>
            <Button disabled>Button</Button>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell head>
            Small
          </TableCell>
          <TableCell>
            <Button small>Button</Button>
          </TableCell>
          <TableCell>
            <Button small custom>Button</Button>
          </TableCell>
          <TableCell>
            <Button small destructive>Button</Button>
          </TableCell>
          <TableCell>
            <Button small disabled>Button</Button>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell head>
            <span>Secondary</span>
          </TableCell>
          <TableCell>
            <Button secondary>Button</Button>
          </TableCell>
          <TableCell>
            <Button secondary custom>Button</Button>
          </TableCell>
          <TableCell>
            <Button secondary destructive>Button</Button>
          </TableCell>
          <TableCell>
            <Button secondary disabled>Button</Button>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell head>
            Secondary Small
          </TableCell>
          <TableCell>
            <Button secondary small>Button</Button>
          </TableCell>
          <TableCell>
            <Button secondary small custom>Button</Button>
          </TableCell>
          <TableCell>
            <Button secondary small destructive>Button</Button>
          </TableCell>
          <TableCell>
            <Button secondary small disabled>Button</Button>
          </TableCell>
        </TableRow>
      </Table>
    </div>
  </div>
  ```
</docs>
