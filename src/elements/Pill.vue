<template>
  <Label
    custom
    :element='element'
    class='text-white rounded-full inline-block font-mono text-sm tracking-wider'
    :class='background'
    size='xs'
  >
    <slot>
      {{ value }}
    </slot>
  </Label>
</template>

<script>
/**
 * Pills are generally used for counts
 */
export default {
  name: 'Pill',
  status: 'ready',
  props: {
    /**
     * The html element used for the pill.
     */
    element: {
      type: String,
      default: 'span',
    },
    /**
     * Style variation to give additional meaning.
     */
    attention: {
      type: Boolean,
      default: false,
    },
    /**
     * Pill content, override with default slot.
     */
    value: {
      type: String,
      default: '',
    },
  },
  computed: {
    background() {
      return this.attention
        ? 'bg-orange-dark border-orange-dark'
        : 'bg-grey-darker border-grey-darker'
    },
  },
}
</script>

<docs>
  ```jsx
  <Pill attention>0</Pill>
  <Pill>1</Pill>
  <Pill>2</Pill>
  <Pill>3</Pill>
  <Pill>4</Pill>
  <Pill>5</Pill>
  <Pill>6</Pill>
  <Pill>7</Pill>
  <Pill>8</Pill>
  <Pill>9</Pill>
  <Pill>10</Pill>
  <Pill>100</Pill>
  <Pill>98,345</Pill>
  ```
</docs>
