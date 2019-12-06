<template>
  <DropDown
    class='button-drop'
    :open='open'
    :align='align'
    @close='open = false'
  >
    <Button
      :class='`flex ${buttonClasses}`'
      :primary='primary'
      @click='open = !open'
    >
      <slot>
        <span class='flex-grow font-semibold'>{{ title }}</span>
        <Icon
          class='ml-2 text-grey-dark'
          name='chevron'
          size='xs'
        />
      </slot>
    </Button>
    <template #dropdown>
      <ButtonGroup vertical>
        <Button
          v-for='option in options'
          :key='option'
          :primary='primary'
          :class='`text-left hover:${hoverClass} ${buttonClasses}`'
          @click='$emit("change", option)'
        >
          {{ option }}
        </Button>
      </ButtonGroup>
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
     * Appears in the dropdown trigger button along with a down chevron.
     * Override these with the default slot.
     */
    title: {
      type: String,
      default: '',
    },
    /**
     * Dropdown originates from the right or left
     */
    align: {
      type: String,
      default: 'left',
      validator: value => ['right', 'left'].includes(value),
    },
    /**
     * Style variation to give additional meaning.
     */
    primary: {
      type: Boolean,
      default: false,
    },
    /**
     * Attach utility classes to the buttons (i.e. `text-sm`).
     */
    buttonClasses: {
      type: String,
      default: '',
    },
  },
  data() {
    return { open: false }
  },
  computed: {
    hoverClass() {
      return this.primary
        ? 'bg-blue-dark'
        : 'bg-grey-lighter'
    },
  },
}
</script>

<docs>
  ```jsx
  let title1 = 'Single Select'
  let title2 = 'Single Select'

  <SelectSingle
    :title='title1'
    :options='[
      "Option 1",
      "Option 2",
      "Option 3",
    ]'
    @change='option => title1 = option'
  />

  <SelectSingle
    primary
    :title='title2'
    :options='[
      "Option 1",
      "Option 2",
      "Option 3",
    ]'
    @change='option => title2 = option'
  />
  ```
</docs>
