<template>
  <DropDown
    class='auto-complete'
    :open='open'
    :align='align'
    @close='doClose'
  >
    <TextInput
      :ref='`text-input`'
      v-model='filter'
      class='w-full'
      :placeholder='placeholder || title'
      :small='small'
      :icon-end='icon'
      icon-size='sm'
      :no-border='noBorder'
      @clickIconEnd='clickIcon'
      @keydown.tab='doClose'
      @keydown.up='setFocus(-1)'
      @keydown.down='setFocus(1)'
      @click='doOpen'
      @focus='doOpen'
    />
    <template #dropdown>
      <div
        ref='options-container'
        class='bg-card border border-default flex-col mt-px rounded-md max-h-64 overflow-x-scroll'
      >
        <div
          v-if='noFilterMatch'
          class='w-full text-sm leading-8 text-disabled px-3'
        >
          No Matches
        </div>
        <template v-for='group in groups'>
          <div
            v-for='(option, i) in filteredGroupedOptions[group]'
            :key='`${group}-${option.title || option}`'
          >
            <div
              v-if='group !== "undefined" && i === 0'
              class='px-2 py-1 typography-8 uppercase bg-card-sub tracking-wide text-tertiary'
            >
              {{ group }}
            </div>
            <Button
              custom
              v-bind='bindingsFor(option)'
              class='bg-action-card w-full text-left'
              tabindex='-1'
              :small='small'
              @click='select(option)'
              @keydown.up='setFocus(-1)'
              @keydown.down='setFocus(1)'
              @keydown.tab='doClose'
            >
              <Icon
                v-if='option.icon'
                :name='option.icon'
                class='mr-1 text-tertiary'
              />
              <span class='flex-grow md:truncate py-3.5 px-1 typography-7'>
                {{ option.title || option }}
              </span>
              <span class='flex-shrink-0 text-tertiary py-3.5 pr-1 typography-7'>
                {{ option.meta }}
              </span>
            </Button>
          </div>
        </template>
      </div>
    </template>
  </DropDown>
</template>

<script>
import _sortBy from 'lodash/sortBy'
import _omit from 'lodash/omit'

const preventPageScroll = function(e) {
  // arrow keys
  if([37, 38, 39, 40].indexOf(e.keyCode) > -1) {
    e.preventDefault()
  }
}

/**
 * AutoComplete offers typing to search many options.
 * Options can use title, icon, and group, and
 * Try using your keyboard arrows to navigate options.
 */
export default {
  name: 'AutoComplete',
  status: 'ready',
  props: {
    /**
     * Populates dropdown. Can be strings or objects.
     * If objects, each option must have a `title` attribute (this is displayed).
     * They also accept icon, group, and meta. Any other attribute will bind to the element.
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
    /**
     * Removes border
     */
    noBorder: { type: Boolean, default: false },
    /**
     *  If options have a grouping, specify the order here with an array of group names
     *  e.g. ['tests', 'content']
     *  If not provided, they will be sorted alphabetically
     */
    groupOrder: { type: Array },
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
      return this.filter.length && !this.groups.length
    },
    icon() {
      return this.filter.length
        ? 'close'
        : 'search'
    },
    groups() {
      const filteredGroups = Object.keys(this.filteredGroupedOptions)
      if (!this.groupOrder) return filteredGroups.sort()
      else {
        const lowerCaseGroupOrder = this.groupOrder.map(g => g.toLowerCase())
        return _sortBy(
          filteredGroups,
          g => lowerCaseGroupOrder.indexOf(g.toLowerCase())
        )
      }
    },
    filteredGroupedOptions() {
      const inFilter = option => this.optionValue(option)
        .toString()
        .toLowerCase()
        .includes(this.filter.toLowerCase())
      
      return this.options.reduce((acc, option) => {
        if (!inFilter(option)) return acc
        acc[option.group] = acc[option.group] || []
        acc[option.group].push(option)
        return acc
      }, {})
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
    bindingsFor(option) {
      if (typeof option === 'string') return {}
      else return _omit(option, ['group', 'icon'])
    },
    optionValue(option) {
      return option.title ? option.title : option
    },
    getTextInput() {
      return this.$refs['text-input'].$el.querySelector('input')
    },
    getButtons() {
      const container = this.$refs['options-container']
      return container.querySelectorAll('button, [href]')
    },
    setFocus(change) {
      const textInputEl = this.getTextInput()
      try {
        const currentFocus = document.activeElement
        if (!currentFocus) return textInputEl.focus()

        const buttons = Array.from(this.getButtons())

        if (currentFocus === textInputEl) {
          if (change > 0) {
            return buttons[0].focus()
          } else {
            return buttons[buttons.length - 1].focus()
          }
        }

        const focusedButtonIndex = buttons.indexOf(currentFocus)
        if (focusedButtonIndex === -1) return textInputEl.focus()

        const newFocusedButtonIndex = focusedButtonIndex + change

        const newFocusedButton = buttons[newFocusedButtonIndex]
        if (!newFocusedButton) return textInputEl.focus()
        
        return newFocusedButton.focus()
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
    clickIcon() {
      if (this.open) {
        this.doClose()
      } else {
        this.getTextInput().focus()
      }
    },
  },
}
</script>

<style lang="scss">
.auto-complete {
  .text-input {
    input {
      &::placeholder {
        opacity: 1;
        color: theme('colors.dark-2');
      }
      &:focus {
        &::placeholder { color: transparent }
      }
    }
  }
}

.theme-dark-mode {
  .auto-complete {
    .text-input {
      input {
        &::placeholder {
          opacity: 1;
          color: theme('colors.light-6');
        }
        &:focus {
          &::placeholder { color: transparent }
        }
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
    { title: "Video 1", icon: "play" , group: 'Content' },
    { title: "Video 2", icon: "play" , group: 'Content' },
    { title: "Test 0", icon: "document" , group: 'Tests', meta: '2d'},
    { title: "Test 1", icon: "document" , group: 'Tests', meta: '3d'},
    { title: "Test 2", icon: "document" , group: 'Tests', meta: '4d'},
    { title: "Test 3", icon: "document" , group: 'Tests', meta: '5d'},
    { title: "Test 4", icon: "document" , group: 'Tests', meta: '6d'},
    { title: "Test 5", icon: "document" , group: 'Tests', meta: '7d'},
    { title: "Test 6", icon: "document" , group: 'Tests', meta: '8d'},
    { title: "Test 7", icon: "document" , group: 'Tests', meta: '9d'},
    { title: "Test 8", icon: "document" , group: 'Tests', meta: '10d'},
    { title: "Test 9", icon: "document" , group: 'Tests', meta: '11d'},
  ]
  <div class='p-1 flex flex-col md:flex-row'>
    <div class='inline-block p-2'>
      <AutoComplete
        class='w-full'
        :options='["This is a very simple case", "Which is perhaps important", "But frankly, a lot more exciting of an AutoComplete could be made - with icons, groupings, and delight."]'
      />
    </div>
    <div class='inline-block p-2'>
      <AutoComplete
        small
        noBorder
        :title='title1'
        :options='options'
        @select='o => title1 = o.title'
        :groupOrder='["tests", "content"]'
        class='w-full'
      />
    </div>
    <div class='theme-dark-mode inline-block p-2'>
      <AutoComplete
        class='w-full'
        :title='title2'
        :options='options'
        @select='o => title2 = o.title'
      />
    </div>
  </div>
  ```
</docs>
