<template>
  <DropDown
    :open='open'
    :align='align'
    @close='open = false'
  >
    <Button
      custom
      class='bg-white border rounded'
      @click='open = !open'
    >
      <slot>
        <span class='flex-grow self-center'>
          {{ selected }}
        </span>
        <Icon
          class='ml-2 text-grey-dark'
          name='chevron'
          size='xs'
        />
      </slot>
    </Button>
    <template #dropdown>
      <div class='flex bg-white flex-col border -mt-px rounded'>
        <Button
          v-for='option in options'
          :key='option'
          custom
          class='whitespace-no-wrap pr-3'
          @click='$emit("change", option)'
        >
          <Icon
            v-if='selected === option'
            name='check'
            size='xs'
          />
          <span
            class='pl-1'
            :class='{ "ml-4": selected && selected !== option }'
          >
            {{ option }}
          </span>
        </Button>
      </div>
    </template>
  </DropDown>
</template>

<script>
/**
 * SelectSingle provides a dropdown with a vertical button grouping.
 *
 * Clicking an option emits `'change'` with `option`.
 *
 * It manages it's own open state.
 */
export default {
  name: 'SelectSingle',
  status: 'ready',
  props: {
    /**
     * Array of strings displayed in the dropdown
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
     * Indicates selected option
     */
    selected: {
      type: String,
    },
  },
  data() {
    return { open: false }
  },
  computed: {
    hoverClass() {
      if (this.dark) return 'bg-blue-dark'
      if (this.primary) return 'bg-blue'
      return 'bg-grey-lighter'
    },
  },
}
</script>

<docs>
  ```jsx
  let title1 = 'Single Select'
  let title2 = 'Single Select'
  const options = [
    "Option 1",
    "Option 2",
    "Option 3",
  ]
  let selected = options[0]
    
  <SelectSingle
    :selected='selected'
    :options='options'
    @change='option => selected = option'
  />
  ```
</docs>
