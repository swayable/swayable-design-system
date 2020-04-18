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
      <div class='bg-white flex-col border -mt-px rounded'>
        <Button
          v-for='option in options'
          :key='option'
          custom
          class='flex whitespace-no-wrap pr-3'
          @click='$emit("select", option)'
        >
          <Icon
            v-if='selected === option'
            name='check'
            size='xs'
          />
          <span
            class='pl-2 flex-grow'
            :class='{ "ml-3": selected && selected !== option }'
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
 * SelectSingle manages selecting a single option
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
  const options = [
    "Option 1",
    "Option 2",
    "Option 3",
  ]
  let selected = options[0]
  <SelectSingle
    :selected='selected'
    :options='options'
    @select='option => selected = option'
  />
  ```
</docs>
