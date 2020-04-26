<template>
  <DropDown
    class='auto-complete'
    :open='open'
    :align='align'
    @close='doClose'
  >
    <TextInput
      ref='text-input'
      v-model='filter'
      class='w-full'
      :placeholder='placeholder || title'
      :small='small'
      icon-end='caret'
      icon-size='md'
      @clickIconEnd='setFocus(-1)'
      @keydown.tab='doClose'
      @keydown.down='setFocus(0)'
      @click='doOpen'
      @focus='doOpen'
    />
    <template #dropdown>
      <div class='bg-card border border-default flex-col mt-px rounded-md max-h-64 overflow-x-scroll'>
        <div
          v-if='noFilterMatch'
          class='w-full text-sm leading-8 text-disabled px-3'
        >
          No Matches
        </div>
        <Button
          v-for='(option, i) in filteredOptions'
          :key='option.title || option'
          :ref='`option-${i}`'
          custom
          v-bind='option'
          class='bg-action-card flex whitespace-no-wrap w-full text-left first:rounded-t-md last:rounded-b-md'
          tabindex='-1'
          :small='small'
          @click='select(option)'
          @keydown.up='setFocus(i - 1)'
          @keydown.down='setFocus(i + 1)'
          @keydown.tab='doClose'
        >
          <span class='flex-grow'>
            {{ option.title || option }}
          </span>
        </Button>
      </div>
    </template>
  </DropDown>
</template>

<script>

const preventPageScroll = function(e) {
  // space and arrow keys
  if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
    e.preventDefault()
  }
}

/**
 * AutoComplete offers typing to search many options
 */
export default {
  name: 'AutoComplete',
  status: 'ready',
  props: {
    /**
     * Populates dropdown. Each option
     * must have a `title` attribute (this is displayed).
     * Include `href` for `<a>`, or `to` for `<router-link>`
     */
    options: { type: Array, required: true },
    /**
     * Dropdown originates from the right or left
     */
    align: {
      type: String,
      default: 'left',
      validator: value => ['right', 'left'].includes(value),
    },
    /**
     * Initial display
     */
    title: {
      type: String,
    },
    /**
     * Is smaller
     */
    small: { type: Boolean, default: false },
  },
  data() {
    return {
      open: false,
      filter: '',
      placeholder: null,
    }
  },
  computed: {
    noFilterMatch() {
      return this.filter.length && !this.filteredOptions.length
    },
    filteredOptions() {
      return this.filter.length
        ? this.options.filter(option => option.title
          .toString()
          .toLowerCase()
          .includes(this.filter.toLowerCase()))
        : this.options
    },
  },
  watch: {
    open() {
      if (this.open) {
        window.addEventListener('keydown', preventPageScroll, false)
      } else {
        window.removeEventListener('keydown', preventPageScroll, false)
      }
    },
  },
  methods: {
    setFocus(i) {
      try {
        if (i < 0) {
          this.$refs['text-input'].$el.querySelector('input').focus()
        } else if (i < this.options.length) {
          this.$refs[`option-${i}`][0].$el.focus()
          this.placeholder = this.options[i].title
        }
      } catch(e) {
        console.error(e)
      }
    },
    doOpen() {
      this.open = true
      // Prevent the old title from flashing before changing
      this.placeholder = ' '
    },
    select(option) {
      this.$emit('select', option)
      this.doClose()
    },
    doClose() {
      this.filter = ''
      const clearPlaceholder = () => this.placeholder = null
      this.$nextTick(clearPlaceholder)
      this.open = false
    },
  },
}
</script>

<style lang="scss">
.auto-complete {
  input {
    &::placeholder {
      color: theme('colors.dark-2');
    }
    &:focus {
      &::placeholder { color: transparent }
    }
  }
}

.theme-dark-mode {
  .auto-complete {
    input {
      &::placeholder {
        color: theme('colors.light-6');
      }
       &:focus {
        &::placeholder { color: transparent }
      }
    }
  }
}
</style>

<docs>
  ```jsx
  let title1 = 'Light Mode'
  let title2 = 'Dark Mode'
  const options = [
    { title: "Option 0" },
    { title: "Option 1" },
    { title: "Option 2" },
    { title: "Option 3" },
    { title: "Option 4" },
    { title: "Option 5" },
    { title: "Option 6" },
    { title: "Option 7" },
    { title: "Option 8" },
    { title: "Option 9" },
    { title: "Option 10" },
    { title: "Option 11" },
    { title: "Option 12" },
    { title: "Option 13" },
    { title: "Option 14" },
    { title: "Option 15" },
    { title: "Option 16" },
    { title: "Option 17" },
    { title: "Option 18" },
    { title: "Option 19" },
    { title: "Option 20" },
    { title: "Option 21" },
    { title: "Option 22" },
    { title: "Option 23" },
    { title: "Option 24" },
    { title: "Option 25" },
    { title: "Option 26" },
    { title: "Option 27" },
    { title: "Option 28" },
    { title: "Option 29" },
    { title: "Option 30" },
    { title: "Option 31" },
    { title: "Option 32" },
    { title: "Option 33" },
    { title: "Option 34" },
    { title: "Option 35" },
    { title: "Option 36" },
    { title: "Option 37" },
    { title: "Option 38" },
    { title: "Option 39" },
    { title: "Option 40" },
    { title: "Option 41" },
    { title: "Option 42" },
    { title: "Option 43" },
    { title: "Option 44" },
    { title: "Option 45" },
    { title: "Option 46" },
    { title: "Option 47" },
    { title: "Option 48" },
    { title: "Option 49" },
    { title: "Option 50" },
  ]
  <div class='p-1'>
    <AutoComplete
      :title='title1'
      :options='options'
      @select='o => title1 = o.title'
    />
    <div class='theme-dark-mode inline-block p-2'>
      <AutoComplete
        :title='title2'
        :options='options'
        @select='o => title2 = o.title'
      />
    </div>
  </div>
  ```
</docs>
