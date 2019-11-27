<template>
  <component
    :is='type'
    ref='trigger'
    class='relative'
    :class='`tooltip-${position}-wrapper`'
    @mouseover='onMouseover'
    @mouseleave='onMouseleave'
  >
    <slot />
    <transition name='expand'>
      <div
        v-show='show'
        :style='crossAxisPosition'
        :class='`tooltip-${position}`'
        class='absolute z-50'
      >
        <div
          class='tooltip text-white rounded-lg py-1 px-2 whitespace-no-wrap'
          :class='classNames'
        >
          <slot name='tip' />
        </div>
      </div>
    </transition>
  </component>
</template>

<script>
const STATE = {
  closed: 0,
  opening: 1,
  open: 2,
}

export default {
  name: 'ToolTip',
  status: 'ready',
  props: {
    /**
     * The html element used.
     */
    type: {
      type: String,
      default: 'div',
    },
    /**
     * Tooltip position in relation to the element
     */
    position: {
      type: String,
      default: 'top',
      validator: (val) => [
        'top',
        'bottom',
        'left',
        'right',
      ].includes(val),
    },
    /**
     * Causes tooltip to open aligned with the cursor. Otherwise is centered.
     */
    cursorAlign: {
      type: Boolean,
      default: false,
    },
    /**
     * Milliseconds between mouseover and opening
     */
    delay: {
      type: Number,
      default: 200,
    },
    /**
     * Class names are applied to the tooltip
     */
    classNames: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      state: STATE.closed,
      crossAxisPosition: {},
    }
  },
  computed: {
    show() {
      return this.state === STATE.open
    },
  },
  methods: {
    onMouseover(e) {
      if (this.state === STATE.closed) this.state = STATE.opening
      setTimeout(() => {
        if (this.state === STATE.opening) {
          if (this.cursorAlign) this.alignWithCursor(e)
          this.state = STATE.open
        }
      }, this.delay)
    },
    onMouseleave() {
      this.state = STATE.closed
    },
    alignWithCursor({ clientX, clientY }) {
      const { left, top } = this.$refs.trigger.getBoundingClientRect()
      const positionTopOrBottom = ['top', 'bottom'].includes(this.position)

      this.crossAxisPosition = positionTopOrBottom
        ? { left: `${clientX - left}px`}
        : { top: `${clientY - top}px`}
    },
  },
}
</script>

<style lang="scss">
.tooltip {
  background: adjust-color($color-blue-dark, $alpha: -0.1);
  position: relative;
}

.tooltip-top-wrapper, .tooltip-bottom-wrapper {
  .expand-enter-active { animation: expandY .15s }
  .expand-leave-active { animation: expandY .15s reverse }
}
@keyframes expandY {
  0% { transform: scale(0.5) translateX(-50%) translateY(0%); }
  50% { transform: scale(1.1) translateX(-50%) translateY(0%); }
  100% { transform: scale(1) translateX(-50%) translateY(0%); }
}

.tooltip-left-wrapper, .tooltip-right-wrapper {
  .expand-enter-active { animation: expandX .15s }
  .expand-leave-active { animation: expandX .15s reverse }
}
@keyframes expandX {
  0% { transform: scale(0.5) translateX(0%) translateY(-50%); }
  50% { transform: scale(1.1) translateX(0% translateY(-50%)); }
  100% { transform: scale(1) translateX(0%) translateY(-50%); }
}

.tooltip-top {
  bottom: calc(100% - theme('spacing.1'));
  left: 50%;
  transform-origin: bottom left;
  transform: translateX(-50%) translateY(0%);
  .tooltip { bottom: theme('spacing.2') }
}
.tooltip-bottom {
  top: calc(100% - theme('spacing.1'));
  left: 50%;
  transform-origin: top left;
  transform: translateX(-50%) translateY(0%);
  .tooltip { top: theme('spacing.2') }
}
.tooltip-left {
  top: 50%;
  right: calc(100% - theme('spacing.1'));
  transform-origin: top right;
  transform: translateX(0%) translateY(-50%);
  .tooltip { right: theme('spacing.2') }
}
.tooltip-right {
  top: 50%;
  left: calc(100% - theme('spacing.1'));
  transform-origin: top left;
  transform: translateX(0%) translateY(-50%);
  .tooltip { left: theme('spacing.2') }
}
</style>

<docs>
  ```jsx
  <div class='flex justify-around mb-5'>
    <ToolTip position='right'>
      <p class='py-1 px-2 rounded border'>Right</p>
      <template #tip>
        <p>Tooltip Right</p>
      </template>
    </ToolTip>
    <ToolTip position='bottom'>
      <p class='py-1 px-2 rounded border'>Bottom</p>
      <template #tip>
        <p>Tooltip Bottom</p>
      </template>
    </ToolTip>
    <ToolTip position='left'>
      <p class='py-1 px-2 rounded border'>Left</p>
      <template #tip>
        <p>Tooltip Left</p>
      </template>
    </ToolTip>
    <ToolTip position='top'>
      <p class='py-1 px-2 rounded border'>Top</p>
      <template #tip>
        <p>Tooltip Top</p>
      </template>
    </ToolTip>
    <ToolTip :delay='500' position='bottom'>
      <p class='py-1 px-2 rounded border'>Delayed</p>
      <template #tip>
        <p>by half a second</p>
      </template>
    </ToolTip>
    <ToolTip :delay='0' position='bottom'>
      <p class='py-1 px-2 rounded border'>Not Delayed</p>
      <template #tip>
        <p>at all</p>
      </template>
    </ToolTip>
  </div>
  ```
</docs>
