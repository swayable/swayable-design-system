<template>
  <span
    class='text-input rounded-md border inline-flex relative'
    :class='wrapperClasses'
  >
    <Button
      v-if='iconStart'
      custom
      small
      tabindex='-1'
      class='left-0 h-full absolute pl-2 pr-px'
      @click='$emit("clickIconStart")'
    >
      <Icon
        :name='iconStart'
        :size='calcIconSize'
      />
    </Button>
    <input
      :disabled='disabled'
      :type='type'
      :value='value'
      class='py-px rounded-md flex-grow bg-inherit text-inherit'
      :class='inputClasses'
      :placeholder='placeholder'
      v-on='eventBindings'
    >
    <Button
      v-if='iconEnd'
      custom
      small
      tabindex='-1'
      class='right-0 h-full absolute pr-2 pl-px'
      @click='$emit("clickIconEnd")'
    >
      <Icon
        :name='iconEnd'
        :size='calcIconSize'
      />
    </Button>
  </span>
</template>

<script>
/**
 * Provides various types of short text input
 */
export default {
  name: 'TextInput',
  props: {
    /**
     * The type of the form input field.
     * `text, number, email, password, search, textarea`
     */
    type: {
      type: String,
      default: 'text',
      validator: value => {
        return value.match(/(text|number|email|password|search)/)
      },
    },
    /**
     * Text value of the form input field.
     */
    value: {
      type: String,
      default: null,
    },
    /**
     * The placeholder value for the form input field.
     */
    placeholder: {
      type: String,
      default: null,
    },
    /**
     * Whether the form input field is disabled or not.
     * `true, false`
     */
    disabled: {
      type: Boolean,
      default: false,
    },
    /**
     * Is smaller
     */
    small: {
      type: Boolean,
      default: false,
    },
    /**
     * In error state
     */
    error: {
      type: Boolean,
      default: false,
    },
    /**
     * Highlighted border
     */
    active: { type: Boolean, default: false },
    /**
     *  Icon name to show before text
     */
    iconStart: { type: String },
    /**
     *  Icon name to show after text
     */
    iconEnd: { type: String },
    /**
     * The size of the icon
     * `sm, md, lg`
     * If unspecified, icon size will follow input size
     */
    iconSize: {
      type: String,
      validator: value => {
        return value.match(/(sm|md|lg|xl)/)
      },
    },
  },
  computed: {
    calcIconSize() {
      if (this.iconSize) return this.iconSize
      else return this.small ? 'sm' : 'md'
    },
    eventBindings() {
      // $listeners emits all events to parent component
      // input event is a hack to make v-model work
      // see https://github.com/vuejs/vue/issues/7042#issuecomment-344948474
      return {
        ...this.$listeners,
        input: e => this.$emit('input', e.target.value),
      }
    },
    wrapperClasses() {
      let border = 'border-default'
      if (this.active) border = 'border-blue-1'
      if (this.error) border = 'border-red-1'
  
      return `${border}`
    },
    inputClasses() {
      const able = this.disabled
        ? 'cursor-not-allowed disabled'
        : 'focus:shadow-outline'
      const pl = this.iconStart ? 'pl-7' : 'pl-2'
      const pr = this.iconEnd ? 'pr-7' : 'pr-2'
      const size = this.small ? 'leading-6 text-md' : 'leading-7 text-lg'
      return `${able} ${size} ${pl} ${pr}`
    },
  },
}
</script>

<style lang="scss">
  .text-input {
    @apply text-dark-4 bg-light-6;
    &[disabled], [disabled] {
      @apply text-light-2 bg-light-4;
    }
  }
  .theme-dark-mode {
    .text-input {
      @apply text-light-4 bg-dark-2;
      &[disabled], [disabled] {
        @apply text-dark-3 bg-dark-0 border-dark-3;
      }
    }
  }
</style>

<docs>
  ```jsx
  <div class='p-2'>
    <TextInput iconStart='search' iconSize='sm' placeholder="Placeholder" />
    <TextInput iconEnd='caret' placeholder="Placeholder" />

    <h3 class='typography-4 w-full uppercase text-light-1'>Light Mode</h3>
    <div class='flex -mx-1'>
      <TextInput small class='flex-grow m-1' placeholder="Placeholder" />
      <TextInput small class='flex-grow m-1' value="Text Input" />
      <TextInput small class='flex-grow m-1' value="Disabled" disabled />
    </div>
    <div class='flex -mx-1'>
      <TextInput class='flex-grow m-1' placeholder="Placeholder" />
      <TextInput class='flex-grow m-1' value="Text Input" />
      <TextInput class='flex-grow m-1' value="Disabled" disabled />
    </div>
  </div>

  <div class='mt-5 theme-dark-mode p-2'>
    <h3 class='typography-4 uppercase text-dark-5'>DARK MODE</h3>
    <div class='flex'>
      <TextInput class='flex-grow m-1' placeholder="Placeholder" />
      <TextInput class='flex-grow m-1' value="Text Input" />
      <TextInput class='flex-grow m-1' value="Disabled" disabled />
    </div>
  </div>
  ```
</docs>
