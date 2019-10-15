<template>
  <component
    :is='type'
    class='relative'
    :class='`tooltip-${position}-wrapper`'
  >
    <span
      @mouseover='show = true'
      @mouseleave='show = false'
    >
      <slot />
    </span>
    <transition name='expand'>
      <div
        v-show='show'
        class='tooltip text-white absolute z-50 rounded-lg py-1 px-2 whitespace-no-wrap'
        :class='`tooltip-${position}`'
      >
        <slot name='tip' />
      </div>
    </transition>
  </component>
</template>

<script>
const bottom = { top: '100%', left: 'auto', right: '50%', transform: 'translateX(50%)'  }
const top = { bottom: '100%', left: 'auto', right: '50%', transform: 'translateX(50%)' }
const right = { left: '100%', top: 'auto', bottom: '50%', transform: 'translateY(50%)' }
const left = { right: '100%', top: 'auto', bottom: '50%', transform: 'translateY(50%)'  }
const anchorMap = {
  top,
  bottom,
  left,
  right,
}

export default {
  name: 'ToolTip',
  status: 'prototype',
  release: '0.1.0',
  props: {
    /**
       * The html element used.
       */
    type: {
      type: String,
      default: 'div',
    },
    /**
       * The html element used.
       */
    position: {
      type: String,
      default: 'bottom',
      validator: (val) => Object.keys(anchorMap).includes(val),
    },
  },
  data() {
    return { show: false }
  },
}
</script>

<style lang="scss">
.tooltip { background: adjust-color($color-dark, $alpha: -0.1) }

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
  bottom: calc(100% + 4px);
  left: 50%;
  transform-origin: bottom left;
  transform: translateX(-50%) translateY(0%);
  &:after {
    left: calc(50% - 4px);
    top: calc(100% - 8px);
  }
}
.tooltip-bottom {
  top: calc(100% + 4px);
  left: 50%;
  transform-origin: top left;
  transform: translateX(-50%) translateY(0%);
  &:after {
    left: calc(50% - 4px);
    bottom: calc(100% - 8px);
  }
}
.tooltip-left {
  top: 50%;
  right: calc(100% + 4px);
  transform-origin: top right;
  transform: translateX(0%) translateY(-50%);
  &:after {
    top: calc(50% - 4px);
    left: calc(100% - 8px);
  }
}
.tooltip-right {
  top: 50%;
  left: calc(100% + 4px);
  transform-origin: top left;
  transform: translateX(0%) translateY(-50%);
  &:after {
    top: calc(50% - 4px);
    right: calc(100% - 8px);
  }
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
  </div>
  ```
</docs>
