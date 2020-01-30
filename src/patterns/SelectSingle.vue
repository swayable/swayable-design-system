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
        <span class='flex-grow self-center'>
          {{ title }}
        </span>
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
          :class='`flex text-left hover:${hoverClass} ${buttonClasses}`'
          @click='$emit("change", option)'
        >
          <Icon
            v-if='selected === option'
            name='check'
            class='mr-2'
          />
          <span
            class='pl-1'
            :class='{ "ml-6": selected && selected !== option }'
          >
            {{ option }}
          </span>
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
     * Attach utility classes to the buttons.
     */
    buttonClasses: {
      type: String,
      default: 'text-xs',
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
  let selected
  const options = [
    "Option 1",
    "Option 2",
    "Option 3",
  ]
    
  <SelectSingle
    :title='title1'
    :options='options'
    @change='option => title1 = option'
  />

  <SelectSingle
    primary
    :title='title2'
    :options='options'
    @change='option => title2 = option'
  />

  <SelectSingle
    title='Checks Selected'
    :options='options'
    :selected='selected'
    @change='option => selected = option'
  />
  ```
</docs>
