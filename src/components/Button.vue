
<template>
  <component
    :is='smartElement'
    class='button inline-flex items-center focus:outline-none transition ease-in-out duration-150'
    :class='{ destructive, small, secondary, "color rounded-md": !custom }'
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
  &:focus {
    @apply shadow-outline relative;
  }

  &.small {
    @apply px-2 text-md leading-7;
    &.secondary { @apply leading-6 py-px }
  }
  &:not(.small) {
    @apply px-3 text-lg leading-8;
    &.secondary { @apply leading-7 py-px }
  }
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
  <div class='p-5 max-w-full overflow-x-scroll'>
    <h3 class='typography-4 w-full uppercase text-light-1'>Light Mode</h3>
    <Table class='pr-5'>
      <template slot="head">
        <TableRow head>
          <HeadCell />
          <HeadCell />
          <HeadCell>
            custom
          </HeadCell>
          <HeadCell>
            destructive
          </HeadCell>
          <HeadCell>
            disabled
          </HeadCell>
        </TableRow>
      </template>
      <TableRow>
        <HeadCell />
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
        <HeadCell>
          small
        </HeadCell>
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
        <HeadCell>
          <span>secondary</span>
        </HeadCell>
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
        <HeadCell>
          secondary small
        </HeadCell>
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

  <div class='theme-dark-mode mt-1 p-5 max-w-full overflow-x-scroll'>
    <h3 class='typography-4 uppercase text-dark-5'>DARK MODE</h3>
    <Table class='pr-5'>
      <template slot="head">
        <TableRow head>
          <HeadCell />
          <HeadCell />
          <HeadCell>
            custom
          </HeadCell>
          <HeadCell>
            destructive
          </HeadCell>
          <HeadCell>
            disabled
          </HeadCell>
        </TableRow>
      </template>
      <TableRow>
        <HeadCell />
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
        <HeadCell>
          small
        </HeadCell>
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
        <HeadCell>
          <span>secondary</span>
        </HeadCell>
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
        <HeadCell>
          secondary small
        </HeadCell>
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
  ```
</docs>
