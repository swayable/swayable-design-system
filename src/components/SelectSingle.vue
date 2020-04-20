<template>
  <DropDown
    class='select-options'
    :open='open'
    :align='align'
    @close='open = false'
  >
    <Button
      secondary
      class='bg-card rounded'
      @click='open = !open'
    >
      <span
        class='select-button'
        :class='{ active }'
      >
        <slot>
          <span class='flex-grow self-center'>
            {{ selected }}
          </span>
          <Icon
            class='ml-2'
            name='chevron'
            size='xs'
          />
        </slot>
      </span>
    </Button>
    <template #dropdown>
      <div class='bg-card flex-col mt-px rounded'>
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
    /**
     * Lights up text in trigger button
     */
    active: { type: Boolean, default: false },
  },
  data() {
    return { open: false }
  },
}
</script>

<docs>
  ```jsx
  const options = [
    "Light Mode",
    "Option 2",
    "Option 3",
  ]
  const options2 = [
    "Dark Mode",
    "Option 2",
    "Option 3",
  ]
  let selected = options[0]
  let selected2 = options2[0]
  let active = false
  let active2 = false
  <SelectSingle
    :selected='selected'
    :options='options'
    :active='active'
    @select='option => { selected = option; active = true }'
  />
  <div class='theme-dark-mode inline-block p-2'>
    <SelectSingle
      :selected='selected2'
      :options='options2'
      :active='active2'
      @select='option => { selected2 = option; active2 = true }'
    />
  </div>
  ```
</docs>
