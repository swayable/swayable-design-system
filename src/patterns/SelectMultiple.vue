<template>
  <DropDown
    class='multiple-select'
    align='left'
    :open='open'
    @close='open = false'
  >
    <Button
      :class='`flex`'
      @click='open = !open'
    >
      <slot>
        <span class='flex-grow font-semibold'>{{ title }}</span>
        <Pill
          :value='count'
          class='ml-2'
        />
      </slot>
    </Button>
    <template #dropdown>
      <ButtonGroup vertical>
        <div
          v-for='(item, i) in items'
          :key='item.text'
          class='bg-white flex border-l border-r rounded'
          :class='{
            "border-b": isAllItemIndex(i) || i === items.length-1,
          }'
        >
          <Button
            menu
            class='hover:bg-white pl-3'
            size='sm'
            @click='toggle(i)'
            @mouseover='togglePreview(i)'
            @mouseout='clearPreview'
          >
            <Icon
              name='check'
              :class='iconClassForIndex(i)'
            />
          </Button>
          <Button
            menu
            class='text-left flex-grow pl-1'
            @click='select(i)'
            @mouseover='selectPreview(i)'
            @mouseout='clearPreview'
          >
            {{ item.text }}
          </Button>
        </div>
      </ButtonGroup>
    </template>
  </DropDown>
</template>

<script>
/**
 * SelectSingle provides a dropdown with a vertical button grouping.
 *
 * Selecting or toggling emits `'change'` with an array of selected values
 *
 * It manages it's own open state.
 */
export default {
  name: 'SelectMultiple',
  status: 'ready',
  props: {
    /**
     * Appears in the dropdown trigger button alongside the active count.
     * Override these with the default slot.
     */
    title: { type: String, default: '', required: true },
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
      this.$emit('change', values)
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
    title='Multiple Select'
    :options='[
      { value: 1, text: "Select 1", selected: false },
      { value: 2, text: "Select 2", selected: false },
      { value: 3, text: "Select 3", selected: true },
    ]'
    @change='log'
  />
  <SelectMultiple
    title='Without All'
    :options='[
      { value: 1, text: "Select 1", selected: false },
      { value: 2, text: "Select 2", selected: false },
      { value: 3, text: "Select 3", selected: false },
    ]'
    :allowSelectAll='false'
    @change='log'
  />
  ```
</docs>
