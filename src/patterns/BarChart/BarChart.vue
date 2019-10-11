<template>
  <div
    class='w-full flex bar-chart bg-inherit'
    :class='direction'
    :style='`height: ${thickness}px`'
  >
    <div
      class='spacer flex-shrink-0 flex relative items-center'
      v-bind='originSpacerBinding'
    >
      <div class='absolute right-1 whitespace-no-wrap text-xs font-semibold'>
        {{ this.leftLabel }}
      </div>
    </div>
    <div
      class='h-full flex-shrink-0 relative bg-inherit overflow-hidden'
      v-bind='barWidthBinding'
    >
      <div
        class='absolute w-full h-full z-10'
        v-bind='barBackgroundBinding'
      />
      <div
        class='arrow bg-inherit overflow-hidden absolute h-full'
        v-bind='arrowBinding'
      />
    </div>
    <div class='spacer flex-grow flex items-center relative'>
      <div class='absolute left-1 whitespace-no-wrap text-xs font-semibold'>
        {{ this.rightLabel }}
      </div>
    </div>
  </div>
</template>

<script>
import _pick from 'lodash/pick'
import GradientPercentColor from './GradientPercentColor'

/**
 * Draws a single horizontal bar.
 */
export default {
  name: 'BarChart',
  props: {
    /**
     * Shown next to the baseline (only visible when mode is 'baseline')
     */
    baselineLabel: { type: String, default: '' },
    /**
     * Shown next to the delta (visible in all modes)
     */
    deltaLabel: { type: String, default: '' },
    /**
     * The termination point of the bar. `baseline + delta` should be within min to max range.
     */
    delta: { type: Number, required: true },
    /**
     * The origin point of the bar. `baseline` should be within min to max range.
     */
    baseline: { type: Number, required: false, default: 0 },
    /**
     * The px thickness of the bar
     */
    thickness: { type: Number, default: 20 },
    /**
     * The number represented at extreme left of the graph in delta mode
     * (in 'baseline' mode min is always 0)
     */
    min: { type: Number, default: 0 },
    /**
     * The number represented at extreme right of the graph in delta mode
     * (in 'baseline' mode max is always scale).
     * Defaults to `scale`
     */
    max: { type: Number },
    /**
     * The scale at which the baseline and delta are represented.
     */
    scale: { type: Number, default: 100 },
    /**
     * If true, the bar will be grey
     */
    insignificant: { type: Boolean },
    /**
     * `'delta'` mode is used to show the relative difference between bars; baselines are aligned.
     * `'baseline'` mode is used to show absolute differences between bars; baselines are plotted
     */
    mode: {
      type: String,
      default: 'delta',
      validator: (val) => ['baseline', 'delta'].includes(val),
    },
  },
  computed: {
    positive() {
      return this.delta >= 0
    },
    isDelta() {
      return this.mode == 'delta'
    },
    width() {
      return Math.abs(this.delta)
    },
    totalWidth() {
      const max = this.max || this.scale
      return this.isDelta
        ? max - this.min
        : this.scale
    },
    origin() {
      return this.isDelta
        ? this.deltaModeOrigin
        : this.baselineModeOrigin
    },
    deltaModePivot() {
      const ratio = Math.abs(this.min) / this.totalWidth
      return this.totalWidth * ratio
    },
    deltaModeOrigin() {
      const origin = this.positive
        ? this.deltaModePivot
        : this.deltaModePivot - this.width
      return origin
    },
    baselineModeOrigin() {
      const origin = this.positive
        ? this.baseline
        : this.baseline + this.delta
      return Math.abs(origin)
    },
    direction() {
      return this.positive
        ? 'right'
        : 'left'
    },
    originSpacerBinding() {
      const originRatio = this.origin / this.totalWidth
      const width = `${originRatio * 100}%`
      return { style: { width } }
    },
    barWidthBinding() {
      const widthRatio = this.width / this.totalWidth
      const width = `${widthRatio * 100}%`
      return { style: { width } }
    },
    barBackgroundBinding() {
      const { background } = this
      return { style: { background } }
    },
    arrowBinding() {
      const width = `${this.thickness / 2}px`
      return { style: { width } }
    },
    leftLabel() {
      if (this.isDelta && this.positive) return ''
      return this.positive
        ? this.baselineLabel
        : this.deltaLabel
    },
    rightLabel() {
      if (this.isDelta && !this.positive) return ''
      return this.positive
        ? this.deltaLabel
        : this.baselineLabel
    },
    background() {
      if (this.insignificant) return 'transparent'

      const scaleToPercent = 100 / this.scale

      const baselineColor = new GradientPercentColor(this.baseline * scaleToPercent).cssValue
      const deltaPos = (this.baseline + this.delta)
      const deltaColor = new GradientPercentColor(deltaPos * scaleToPercent).cssValue

      return this.positive
        ? `linear-gradient(to right, ${baselineColor}, ${deltaColor})`
        : `linear-gradient(to right, ${deltaColor}, ${baselineColor})`
    },
  },
}
</script>

<style lang='scss'>
.bar-chart {
  .arrow {
    &:before, &:after {
      z-index: 20;
      position: absolute;
      content: ' ';
      height: 100%;
      width: 100%;
      background: inherit;
    }
    &:before { top: -36% }
    &:after { bottom: -36% }
  }
  &.left {
    .arrow {
      left: 0;
      &:before, &:after { right: 50% }
      &:before { transform: rotate(45deg) }
      &:after {transform: rotate(-45deg) }
    }
  }
  &.right {
    .arrow {
      right: 0;
      &:before, &:after { left: 50% }
      &:before { transform: rotate(-45deg) }
      &:after { transform: rotate(45deg) }
    }
  }
}
</style>

<docs>
  ```jsx
  const shared = { insignificant:  false, max: 7, min: -2, scale: 10, }
  const props1 = { ...shared, deltaLabel: '+44.2%', baselineLabel: '38.5% ▶', baseline: 3.85, delta: 4.42, }
  const props2 = { ...shared, baselineLabel: '◀ 18.5%', deltaLabel: '-14.1%', baseline: 1.85, delta: -1.41, }

  const common = {
    // max:0.08,
    // min:-0.27,
    min:-0.3,
    max:0.1,
    mode:"delta",
    scale:10,
  }

  const props3 = {
    ...common,
    baseline:6.70,
    baselineLabel:"",
    delta:-0.27,
    deltaLabel:"-2.8",
  }

  const props4 = {
    ...common,
    baseline:6.70,
    baselineLabel:"",
    delta:0.08,
    deltaLabel:"0.9",
  }

  <div class='bg-grey py-1'>
    <BarChart class='my-1' v-bind='props4' />
    <BarChart class='my-1' v-bind='props3' />
  </div>

  <Heading type='h5' class='text-center'>A Quick basic graph</Heading>
  <div class='bg-grey-100 py-1 my-1'>
    <div class='mt-1 bg-inherit'>
      <BarChart class='mt-px' :delta='25' />
      <BarChart class='mt-px' :delta='0.5' />
      <BarChart class='mt-px' :delta='100' />
      <BarChart class='mt-px' :delta='50' />
      <BarChart class='mt-px' :delta='75' />
    </div>
  </div>
  <Heading type='h5' class='mt-10 text-center'>The same data shown in Delta vs. Baseline modes</Heading>
  <div class='bg-grey-100 py-1 mt-1'>
    <p class='text-center'>Delta mode</p>
    <div class='mt-2 bg-inherit'>
      <BarChart class='mt-px' v-bind='props1' />
      <BarChart class='mt-px' v-bind='props2' />
    </div>
  </div>
  <div class='bg-grey-100 py-1 mt-3'>
    <p class='text-center'>Baseline mode</p>
    <div class='mt-2 bg-inherit'>
      <BarChart class='mt-px' mode='baseline' v-bind='props1' />
      <BarChart class='mt-px' mode='baseline' v-bind='props2' />
    </div>
  </div>
  <Heading type='h5' class='mt-10 text-center'>Gotcha</Heading>
  <p class='text-center text-medium'>
    It is important for the bar or the direct parent of a bar to have a background,
    otherwise no direction (arrow) will be shown.
  </p>
  <div class='flex mt-2 mb-5'>
    <BarChart class='bg-white' mode='baseline' :baseline='25' :delta='50' />
    <span>vs.</span>
    <BarChart mode='baseline' :baseline='25' :delta='50' />
  </div>
  ```
</docs>
