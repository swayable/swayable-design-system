<template>
  <DropDown
    class='auto-complete'
    :open='open'
    :align='align'
    @close='open = false'
  >
    <TextInput
      ref='text-input'
      v-model='filter'
      class='w-full'
      :placeholder='title'
      :small='small'
      icon-end='caret'
      icon-size='md'
      @clickIconEnd='setFocus(-1)'
      @keydown.tab='open = false'
      @keydown.down='setFocus(0)'
      @click='open = true'
      @focus='open = true'
      @blur='filter = ""'
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
          :key='option.text || option'
          :ref='`option-${i}`'
          custom
          v-bind='option'
          class='bg-action-card flex whitespace-no-wrap w-full text-left first:rounded-t-md last:rounded-b-md'
          tabindex='-1'
          :small='small'
          @click='$emit("select", option)'
          @keydown.up='setFocus(i - 1)'
          @keydown.down='setFocus(i + 1)'
        >
          <span class='flex-grow'>
            {{ option.text || option }}
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
     * must have a text attribute (this is displayed).
     * Include `href` for <a>, or `to` for `<router-link>`
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
    }
  },
  computed: {
    noFilterMatch() {
      return this.filter.length && !this.filteredOptions.length
    },
    filteredOptions() {
      return this.filter.length
        ? this.options.filter(option => option.text
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
      if (i < 0) {
        this.$refs['text-input'].$el.querySelector('input').focus()
      } else if (i < this.options.length) {
        this.$refs[`option-${i}`][0].$el.focus()
      }
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
    { text: "Option 0" },
    { text: "Option 1" },
    { text: "Option 2" },
    { text: "Option 3" },
    { text: "Option 4" },
    { text: "Option 5" },
    { text: "Option 6" },
    { text: "Option 7" },
    { text: "Option 8" },
    { text: "Option 9" },
    { text: "Option 10" },
    { text: "Option 11" },
    { text: "Option 12" },
    { text: "Option 13" },
    { text: "Option 14" },
    { text: "Option 15" },
    { text: "Option 16" },
    { text: "Option 17" },
    { text: "Option 18" },
    { text: "Option 19" },
    { text: "Option 20" },
    { text: "Option 21" },
    { text: "Option 22" },
    { text: "Option 23" },
    { text: "Option 24" },
    { text: "Option 25" },
    { text: "Option 26" },
    { text: "Option 27" },
    { text: "Option 28" },
    { text: "Option 29" },
    { text: "Option 30" },
    { text: "Option 31" },
    { text: "Option 32" },
    { text: "Option 33" },
    { text: "Option 34" },
    { text: "Option 35" },
    { text: "Option 36" },
    { text: "Option 37" },
    { text: "Option 38" },
    { text: "Option 39" },
    { text: "Option 40" },
    { text: "Option 41" },
    { text: "Option 42" },
    { text: "Option 43" },
    { text: "Option 44" },
    { text: "Option 45" },
    { text: "Option 46" },
    { text: "Option 47" },
    { text: "Option 48" },
    { text: "Option 49" },
    { text: "Option 50" },
  ]
  <div class='p-1'>
    <AutoComplete
      :title='title1'
      :options='options'
      @select='o => title1 = o.text'
    />
    <div class='theme-dark-mode inline-block p-2'>
      <AutoComplete
        :title='title2'
        :options='options'
        @select='o => title2 = o.text'
      />
    </div>
  </div>
  ```
</docs>
