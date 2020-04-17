<template>
  <DropDown
    align='left'
    :open='open'
    @close='open = false'
  >
    <Button
      custom
      class='bg-white border rounded'
      @click='open = !open'
    >
      <slot />
    </Button>
    <template #dropdown>
      <div class='flex bg-white flex-col border -mt-px rounded'>
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
      if (item.selected && item.preview) return 'text-grey'
      if (item.selected) return 'text-black'
      if (item.preview) return 'text-grey-darker'
      return 'text-white'
    },
    isAllItemIndex(itemIndex) {
      return itemIndex === 0 && this.allowSelectAll
    },
  },
}
</script>

<docs>
  ```jsx
  const log = values => console.log(values)
  <SelectMultiple
    :options='[
      { value: 1, text: "Select 1", selected: false },
      { value: 2, text: "Select 2", selected: false },
      { value: 3, text: "Select 3", selected: true },
    ]'
    @change='log'
  >
    Allow Select All
  </SelectMultiple>

  <SelectMultiple
    class='ml-3'
    :options='[
      { value: 1, text: "Select 1", selected: false },
      { value: 2, text: "Select 2", selected: false },
      { value: 3, text: "Select 3", selected: false },
    ]'
    :allowSelectAll='false'
    @change='log'
  >
    Disallow Select All
  </SelectMultiple>
  ```
</docs>
