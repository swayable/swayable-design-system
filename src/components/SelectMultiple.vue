<template>
  <DropDown
    align='left'
    :open='open'
    class='select-options'
    @close='open = false'
  >
    <Button
      secondary
      class='rounded'
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
      <div class='flex select-dropdown border flex-col rounded mt-px'>
        <div
          v-for='(item, i) in items'
          :key='item.text'
          class='flex mt-0.5 mb-0.5'
        >
          <Button
            custom
            class='pl-3'
            size='sm'
            @click='toggle(i)'
            @mouseover='togglePreview(i)'
            @mouseout='clearPreview'
          >
            <Icon
              name='check'
              class='check-icon'
              :class='iconClassForIndex(i)'
              size='xs'
            />
          </button>
          <Button
            custom
            class='text-left flex-grow pl-1 pr-3 whitespace-no-wrap'
            @click='select(i)'
            @mouseover='selectPreview(i)'
            @mouseout='clearPreview'
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
  },
  data() {
    const items = this.options.map(option => {
      const isString = typeof option === 'string' || option instanceof String
      return {
        text: isString ? option : option.text,
        value: isString ? option : option.value,
        selected: isString ? false : option.selected,
        preview: false,
      }
    })
    if (this.allowSelectAll) {
      const countSelected = items.filter(item => item.selected).length
      items.unshift({
        text: 'All',
        value: 'all',
        preview: false,
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
      this.$emit('change', values.filter(v => v !== 'all'))
    },
  },
  methods: {
    select(itemIndex) {
      this.clearPreview()
      const selectAll = this.isAllItemIndex(itemIndex)
      for (let i = 0; i < this.items.length; i++) {
        const selected = selectAll ? true : i === itemIndex
        this.items[i].selected = selected
      }
    },
    toggle(itemIndex) {
      this.clearPreview()
      if (this.isAllItemIndex(itemIndex)) {
        const { allSelected } = this
        for (let i = 0; i < this.items.length; i++) {
          this.items[i].selected = !allSelected
        }
      } else {
        this.items[itemIndex].selected = !this.items[itemIndex].selected
      }
    },
    selectPreview(itemIndex) {
      const previewAll = this.isAllItemIndex(itemIndex)
      for (let i = 0; i < this.items.length; i++) {
        const { selected } = this.items[i]
        const preview = previewAll
          ? !selected
          : selected ? i !== itemIndex : i === itemIndex
        this.items[i].preview = preview
      }
    },
    togglePreview(itemIndex) {
      if (this.isAllItemIndex(itemIndex)) {
        const { allSelected } = this
        for (let i = 0; i < this.items.length; i++)
          this.items[i].preview = !allSelected && !this.items[i].selected
      } else {
        this.items[itemIndex].preview = !this.items[itemIndex].preview
      }
    },
    clearPreview() {
      for (let i = 0; i < this.items.length; i++) {
        this.items[i].preview = false
      }
    },
    iconClassForIndex(itemIndex) {
      const item = this.items[itemIndex]
      if (item.selected && item.preview) return 'selected-preview'
      if (item.selected) return 'selected'
      if (item.preview) return 'preview'
      return 'text-transparent'
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
  .check-icon {
    &.selected-preview { @apply text-dark-6  }
    &.selected { @apply text-dark-2 }
    &.preview { @apply text-light-0 }
  }
}
.theme-dark-mode {
  .select-options {
    .select-dropdown { @apply bg-dark-2 border-dark-4 }
    .select-button {
      @apply text-light-4;
      &.active { @apply text-blue-4 }
    }
    .check-icon {
      &.selected-preview { @apply text-light-3  }
      &.selected { @apply text-light-6 }
      &.preview { @apply text-light-2 }
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
