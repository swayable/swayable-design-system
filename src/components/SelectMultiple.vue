<template>
  <DropDown
    align='left'
    :open='open'
    class='select-options'
    @close='open = false'
  >
    <Button
      secondary
      :small='small'
      @click='open = !open'
    >
      <span
        class='select-button'
        :class='{ active }'
      >
        <slot />
      </span>
    </Button>
    <template #dropdown>
      <div class='flex select-dropdown border flex-col rounded-md mt-px py-0.5'>
        <div
          v-for='(item, i) in items'
          :key='`${item.text}-${item.selected}`'
          class='flex border-default'
          :class='{ "border-b": isAllItemIndex(i) }'
        >
          <Button
            custom
            class='pl-3'
            :small='small'
            @click='toggle(i)'
          >
            <Icon
              :name='item.selected ? "checked" : "unchecked"'
              :class='item.selected ? "text-active" : "text-quarternary"'
              size='sm'
            />
          </button>
          <Button
            custom
            class='text-left flex-grow pl-1 pr-3 whitespace-no-wrap'
            :small='small'
            @click='select(i)'
          >
            {{ item.text }}
          </Button>
        </div>
      </div>
    </template>
  </DropDown>
</template>

<script>
/**
 * SelectMultiple manages selecting a subgroup of options
 */
export default {
  name: 'SelectMultiple',
  status: 'ready',
  props: {
    /**
     * Options to select/deselect `[{ text, value, selected }]` or `[value]`
     */
    options: { type: Array, required: true },
    /**
     * Includes option to select/deselect all Options
     */
    allowSelectAll: { type: Boolean, default: true },
    /**
     * Lights up text in trigger button
     */
    active: { type: Boolean, default: false },
    /**
     * Is smaller
     */
    small: { type: Boolean, default: false },
  },
  data() {
    const items = this.options.map(option => {
      const isString = typeof option === 'string' || option instanceof String
      return {
        text: isString ? option : option.text,
        value: isString ? option : option.value,
        selected: isString ? false : option.selected,
      }
    })
    if (this.allowSelectAll) {
      const countSelected = items.filter(item => item.selected).length
      items.unshift({
        text: 'All',
        value: 'all',
        selected: countSelected === items.length,
      })
    }
    return {
      open: false,
      items,
    }
  },
  computed: {
    count() {
      const { length } = this.items.filter(item => item.selected)
      return `${length}`
    },
    selectedValues() {
      return this.items
        .filter(item => item.selected)
        .map(item => item.value)
    },
    allSelected() {
      return this.selectedValues.length === this.items.length
    },
  },
  watch: {
    selectedValues(values) {
      console.log(values)
      this.$emit('change', values.filter(v => v !== 'all'))
    },
  },
  methods: {
    select(itemIndex) {
      const selectAll = this.isAllItemIndex(itemIndex)
      for (let i = 0; i < this.items.length; i++) {
        const selected = selectAll ? true : i === itemIndex
        this.items[i].selected = selected
      }
    },
    toggle(itemIndex) {
      if (this.isAllItemIndex(itemIndex)) {
        const { allSelected } = this
        for (let i = 0; i < this.items.length; i++) {
          this.items[i].selected = !allSelected
        }
      } else {
        this.items[itemIndex].selected = !this.items[itemIndex].selected
      }
    },
    isAllItemIndex(itemIndex) {
      return itemIndex === 0 && this.allowSelectAll
    },
  },
}
</script>

<style lang="scss">
.select-options {
  .select-dropdown { @apply bg-white border-light-3 }
  .select-button {
    @apply text-dark-4;
    &.active { @apply text-blue-2 }
  }
}
.theme-dark-mode {
  .select-options {
    .select-dropdown { @apply bg-dark-2 border-dark-4 }
    .select-button {
      @apply text-light-4;
      &.active { @apply text-blue-4 }
    }
  }
}
</style>

<docs>
  ```jsx
  const active1 = false
  const active2 = false
  <SelectMultiple
    :options='[
      { value: 1, text: "Select 1", selected: false },
      { value: 2, text: "Select 2", selected: false },
      { value: 3, text: "Select 3", selected: true },
    ]'
    :active='active1'
    @change='active1 = true'
  >
    ☀ Light Mode
  </SelectMultiple>

  <div class='theme-dark-mode p-2 inline-block'>
    <SelectMultiple
      :options='[
        { value: 1, text: "Select 1", selected: false },
        { value: 2, text: "Select 2", selected: false },
        { value: 3, text: "Select 3", selected: false },
      ]'
      :active='active2'
      @change='active2 = true'
    >
       ☾ Dark Mode
    </SelectMultiple>
  </div>
  ```
</docs>
