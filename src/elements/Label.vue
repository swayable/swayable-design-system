<template>
  <component
    :is='element'
    class='leading-snug rounded inline-block min-w-5 text-center'
    :class='classes'
  >
    <slot />
  </component>
</template>

<script>
/**
 * Labels are generally used for contextual information
 */
export default {
  name: 'Label',
  status: 'ready',
  props: {
    /**
     * The html element used for the label.
     */
    element: {
      type: String,
      default: 'span',
    },
    /**
     * The size of the label. Defaults to md.
     * `xs, sm, md, lg`
     */
    size: {
      type: String,
      default: 'md',
      validator: value => {
        return value.match(/(xs|sm|md|lg)/)
      },
    },
    /**
     * Style variation to give additional meaning.
     */
    primary: {
      type: Boolean,
      default: false,
    },
    /**
     * Style variation to give additional meaning.
     */
    dark: {
      type: Boolean,
      default: false,
    },
    /**
     * Set true when specifying colors through utility classes (normally text, bg, and border)
     */
    custom: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    const sizeClasses = {
      xs: 'py-px px-1 text-xs',
      sm: 'py-1 px-2 text-xs',
      md: 'py-2 px-3 text-sm',
      lg: 'py-3 px-5 text-md',
    }
    return { sizeClasses }
  },
  computed: {
    classes() {
      const variant = this.classesForVariant()
      const size = this.sizeClasses[this.size]
      return `${size} ${variant}`
    },
  },
  methods: {
    classesForVariant() {
      if (this.custom) return 'border'
      const darkModifier = this.dark ? '-dark' : ''
      return this.primary || this.dark
        ? `text-white border bg-blue${darkModifier} border-blue${darkModifier}`
        : 'text-blue-dark border bg-grey-light border-grey-light'
    },
  },
}
</script>

<docs>
  ```jsx
  <Label>Normal</Label>
  <Label primary>Primary</Label>
  <Label dark>Dark</Label>
  <Label size='xs'>x-small</Label>
  <Label size='sm'>small</Label>
  <Label size='md'>medium</Label>
  <Label size='lg'>large</Label>
  <Label custom size='xs' class='rounded-full bg-grey-darker border-grey-darker text-white font-semibold font-mono'>98,345</Label>
  ```
</docs>
