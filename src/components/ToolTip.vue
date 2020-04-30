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
    <div
      v-show='show'
      :style='crossAxisPosition'
      :class='`tooltip-${position}`'
      class='absolute z-50'
    >
      <div
        class='tooltip text-white rounded py-2 px-3 whitespace-no-wrap'
        :class='classNames'
      >
        <slot name='tip' />
      </div>
    </div>
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
// TODO: dark mode requires some refactoring, but is so-so ok for now
$tooltipColor: adjust-color($color-dark-3, $alpha: -0.1);
.tooltip {
  background: $tooltipColor;
  position: relative;
  &:before {
    content: ' ';
    width: 0;
    height: 0;
    border: theme('spacing.1') solid transparent;
    position: absolute;
  }
}

.tooltip-top {
  bottom: calc(100% - theme('spacing.1'));
  left: 50%;
  transform-origin: bottom left;
  transform: translateX(-50%) translateY(0%);
  .tooltip {
    bottom: theme('spacing.2');
    &:before {
      top: 100%;
      left: calc(50% - theme('spacing.1'));
      border-top-color: $tooltipColor;
    }
  }
}
.tooltip-bottom {
  top: calc(100% - theme('spacing.1'));
  left: 50%;
  transform-origin: top left;
  transform: translateX(-50%) translateY(0%);
  .tooltip {
    top: theme('spacing.2');
     &:before {
      bottom: 100%;
      left: calc(50% - theme('spacing.1'));
      border-bottom-color: $tooltipColor;
    }
  }
}
.tooltip-left {
  top: 50%;
  right: calc(100% - theme('spacing.1'));
  transform-origin: top right;
  transform: translateX(0%) translateY(-50%);
  .tooltip {
    right: theme('spacing.2');
    &:before {
      left: 100%;
      top: calc(50% - theme('spacing.1'));
      border-left-color: $tooltipColor;
    }
  }
}
.tooltip-right {
  top: 50%;
  left: calc(100% - theme('spacing.1'));
  transform-origin: top left;
  transform: translateX(0%) translateY(-50%);
  .tooltip {
    left: theme('spacing.2');
    &:before {
      right: 100%;
      top: calc(50% - theme('spacing.1'));
      border-right-color: $tooltipColor;
    }
  }
}
</style>

<docs>
  ```jsx
  <div class='flex justify-around mb-5 theme-dark-mode'>
    <ToolTip position='right'>
      <Label>Right</Label>
      <template #tip>
        <p>Tooltip Right</p>
      </template>
    </ToolTip>
    <ToolTip position='bottom'>
      <Label>Bottom</Label>
      <template #tip>
        <p>Tooltip Bottom</p>
      </template>
    </ToolTip>
    <ToolTip position='left'>
      <Label>Left</Label>
      <template #tip>
        <p>Tooltip Left</p>
      </template>
    </ToolTip>
    <ToolTip position='top'>
      <Label>Top</Label>
      <template #tip>
        <p>Tooltip Top</p>
      </template>
    </ToolTip>
    <ToolTip :delay='500' position='bottom'>
      <Label>Delayed</Label>
      <template #tip>
        <p>by half a second</p>
      </template>
    </ToolTip>
    <ToolTip :delay='0' position='bottom'>
      <Label>Not Delayed</Label>
      <template #tip>
        <p>at all</p>
      </template>
    </ToolTip>
  </div>
  ```
</docs>
