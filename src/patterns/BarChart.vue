<template>
  <div
    class='bar-chart w-full flex bg-inherit'
    :style='`height: ${thickness}px`'
  >
    <div
      class='flex-shrink-0 flex relative items-center bg-inherit flex-row-reverse'
      v-bind='originSpacerBinding'
    >
      <div
        :class='dataLabelClassList'
        class='mr-1'
      >
        {{ leftLabel }}
      </div>
    </div>
    <transition :name='transitionName'>
      <div
        v-show='show'
        v-bind='barWidthBinding'
        class='h-full flex-shrink-0 relative bg-inherit'
        :class='`grow-${direction}`'
      >
        <div
          v-bind='barBackgroundBinding'
          class='absolute w-full h-full z-10 bg-grey-200'
        />
        <div class='w-full h-full bg-inherit overflow-hidden relative'>
          <div
            v-bind='arrowTopBinding'
            class='arrow rotate-1/8 h-full z-10 bg-inherit absolute'
          />
          <div
            v-bind='arrowBottomBinding'
            class='arrow rotate-7/8 h-full z-10 bg-inherit absolute'
          />
        </div>
        <transition :name='transitionName'>
          <div
            v-show='show'
            v-if='error'
            class='grow-delay absolute h-full flex flex-col items-stretch top-0 z-20'
            v-bind='errorBarBinding'
          >
            <span class='flex-grow' />
            <span class='flex-grow bg-grey-700 opacity-25' />
            <span class='flex-grow' />
          </div>
        </transition>
      </div>
    </transition>
    <div class='flex-grow flex items-center relative bg-inherit'>
      <div
        :class='dataLabelClassList'
        class='ml-1'
      >
        {{ rightLabel }}
      </div>
    </div>
  </div>
</template>

<script>
import _pick from 'lodash/pick'
import GradientPercentColor from '../utils/GradientPercentColor'

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
     * The margin of error in the delta
     */
    error: { type: Number },
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
     * Bar is grey rather than a gradient
     */
    insignificant: { type: Boolean, default: false },
    /**
     * Animates drawing the graph
     */
    animate: { type: Boolean, default: true },
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
  data() {
    return { show: false }
  },
  computed: {
    transitionName() {
      return this.animate ? 'grow' : ''
    },
    dataLabelClassList() {
      const opacity = !this.show && this.animate
        ? 'opacity-0'
        : 'opacity-75'
      return [
        'data-label',
        'whitespace-no-wrap',
        'text-xs',
        'font-semibold',
        'bg-inherit',
        'z-30',
        'px-px',
        opacity,
      ]
    },
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
    arrowTopBinding() {
      return { style: this.buildArrowCSS('top') }
    },
    arrowBottomBinding() {
      return { style: this.buildArrowCSS('bottom') }
    },
    direction() {
      return  this.positive
        ? 'right'
        : 'left'
    },
    errorBarBinding() {
      const errorRatio = (this.error * 2) / this.width
      const width = errorRatio * 100
      return {
        style: {
          width: `${width}%`,
          [this.direction]: `-${width / 2}%`,
        },
      }
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
  watch: {
    mode() {
      this.show = false
      this.$nextTick(() => { this.show = true })
    },
  },
  mounted() {
    this.show = true
  },
  methods: {
    buildArrowCSS(yAnchor) {
      const xOffset = this.thickness / 3
      const xAnchor = this.positive
        ? 'left'
        : 'right'
      return {
        width: `${this.thickness}px`,
        [yAnchor]: '50%',
        [xAnchor]: `calc(100% - ${xOffset}px)`,
      }
    },
  },
}
</script>

<style lang="scss">
@keyframes grow-in {
  0% { transform: scale3d(0, 1, 1); }
  100% { transform: scale3d(1, 1, 1); }
}

$timing: 1s;
$cubic-ease: cubic-bezier(0.21, 0.61, 0.35, 1);
.bar-chart, .bar-chart .arrow {
  transition: all 0.3s ease-out;
}
.bar-chart {
  overflow-x: hidden;
  .grow-enter-active { animation: grow-in $timing $cubic-ease }
  .grow-enter-active
  .grow-left.grow-enter-active { transform-origin: right }
  .grow-right.grow-enter-active { transform-origin: left }
  .grow-delay { animation-delay: $timing; }
  .grow-delay.grow-enter-to { transition: opacity 0.3s }
  .grow-enter-active .grow-delay { opacity: 0 !important }
  .data-label {
    transition: opacity 0.15s;
    transition-delay: $timing;
  }
}
</style>

<docs>
  ```jsx
  const modes = ['delta', 'baseline']
  const shared = { insignificant:  false, max: 7, min: -2, scale: 10, }
  const props1 = { ...shared, deltaLabel: '+44.2%', baselineLabel: '38.5% ▶', baseline: 3.85, delta: 4.42, error: 0.9 }
  const props2 = { ...shared, baselineLabel: '◀ 54.5%', deltaLabel: '-2.4%', baseline: 5.45, delta: -0.24, insignificant: true, error: 0.31 }
  const props3 = { ...shared, baselineLabel: '◀ 18.5%', deltaLabel: '-14.1%', baseline: 1.85, delta: -1.41, error: 1.2 }

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
  <Heading type='h5' class='mt-10 text-center'>
    The same data shown in Delta vs. Baseline modes
  </Heading>
  <button @click='() => modes.reverse()'>Reverse Modes</button>
  <div
    v-for='mode in modes'
   class='bg-grey-100 py-1 mt-1'
  >
    <p class='text-center capitalize'>{{ mode }} mode</p>
    <div class='mt-2 bg-inherit'>
      <BarChart
        class='mt-px'
        :mode='mode'
        v-bind='props1'
      />
      <BarChart
        class='mt-px'
        :mode='mode'
        v-bind='props2'
      />
      <BarChart
        class='mt-px'
        :mode='mode'
        v-bind='props3'
      />
    </div>
  </div>
  <Heading type='h5' class='mt-10 text-center'>Gotcha</Heading>
  <p class='text-center text-medium'>
    It is important for the bar or the direct parent of a bar to have a background,
    otherwise no direction (arrow) will be shown.
  </p>
  <div class='flex mt-2 mb-5'>
    <BarChart class='bg-white' mode='baseline' :baseline='25' :delta='50' :animate='false'  />
    <span>vs.</span>
    <BarChart mode='baseline' :baseline='25' :delta='50' :animate='false' />
  </div>
  ```
</docs>
