<template>
  <div
    class='bar-chart w-full flex bg-inherit relative font-mono items-center'
    :style='`height: ${thickness}px`'
  >
    <div
      :style='deltaBarStyles'
      class='delta bg-inherit overflow-hidden relative'
    >
      <div
        :style='{ background }'
        class='h-full'
      />
      <div
        :style='buildArrowStyles("top")'
        class='arrow rotate-1/8 h-full bg-inherit absolute'
      />
      <div
        :style='buildArrowStyles("bottom")'
        class='arrow rotate-7/8 h-full bg-inherit absolute'
      />
    </div>

    <div
      v-if='error'
      class='error absolute h-full flex flex-col items-stretch top-0'
      :style='errorBarWrapperStyles'
    >
      <span class='flex-grow' />
      <span
        class='bg-black opacity-10'
        :style='errorBarStyles'
      />
      <span class='flex-grow' />
    </div>

    <div class='labels absolute w-full h-full flex items-stretch'>
      <div
        class='absolute flex items-center bg-inherit h-full'
        :style='{ right: `${100 - pointToPct(origin)}%` }'
      >
        <div
          :class='dataLabelClassList'
          class='absolute dataLabelLeft'
        >
          {{ leftLabel }}
        </div>
      </div>
      <div
        v-if='showTooltip'
        class='absolute h-full'
        :style='tooltipStyles'
      >
        <ToolTip
          class='h-full'
          :delay='600'
          :position='tooltipDown ? "bottom" : "top"'
          :cursor-align='true'
        >
          <template #tip>
            <slot />
          </template>
        </ToolTip>
      </div>

      <div
        class='absolute flex items-center bg-inherit h-full'
        :style='{ left: `${pointToPct(origin + width)}%` }'
      >
        <div
          :class='dataLabelClassList'
          class='ml-1'
        >
          {{ rightLabel }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import _pick from 'lodash/pick'
import GradientPercentColor from '../utils/GradientPercentColor'
const DEFAULT_BAR_HEIGHT = 20
const MAX_ERROR_BAR_HEIGHT = DEFAULT_BAR_HEIGHT / 3
/**
 * Draws a single horizontal bar.
 */
export default {
  name: 'BarChart',
  status: 'ready',
  props: {
    /**
     * Displayed next to the baseline.
     */
    baselineLabel: { type: String, default: '' },
    /**
     * Displayed next to the delta.
     */
    deltaLabel: { type: String, default: '' },
    /**
     * The termination point of the bar.
     */
    delta: { type: Number, required: true },
    /**
     * The origin point of the bar.
     */
    baseline: { type: Number, required: false, default: 0 },
    /**
     * The margin of error in the delta.
     */
    error: { type: Number },
    /**
     * The px thickness of the bar.
     */
    thickness: { type: Number, default: DEFAULT_BAR_HEIGHT },
    /**
     * Extreme left point of the graph.
     */
    min: { type: Number, default: 0 },
    /**
     * Defaults to `scale`. Extreme right point of the graph.
     */
    max: { type: Number },
    /**
     * The scale that baseline and delta measures.
     * This should not be confused with min/max.
     *
     * e.g. when charting a likert scale with 5 choices and
     * all data points happen to be either `2`, `3`, or `4`, your `scale` should be `5`,
     * even though may choose a `min` of `2` and a `max` `4` if you desire.
     *
     */
    scale: { type: Number, default: 100 },
    /**
     * Removes the color gradient of the bar.
     */
    insignificant: { type: Boolean, default: false },
    /**
     * Aligned baselines demonstrates relative differences between bars,
     * otherwise demonstrates absolute differences by plotting baselines.
     */
    alignBaselines: {
      type: Boolean,
      default: false,
    },
    /**
     * Controls direction tooltip opens
     */
    tooltipDown: { type: Boolean, default: true },
  },
  computed: {
    showTooltip() {
      return !!this.$slots.default
    },
    dataLabelClassList() {
      return [
        'data-label',
        'whitespace-no-wrap',
        'text-xs',
        'font-semibold',
        'bg-inherit',
        'px-px',
        'opacity-75',
        'color-blue-dark',
        'font-mono',
      ]
    },
    positive() {
      return this.delta >= 0
    },
    width() {
      return Math.abs(this.delta)
    },
    minPoint() {
      return this.min
    },
    maxPoint() {
      return this.max || this.scale
    },
    totalWidth() {
      return this.maxPoint - this.minPoint
    },
    origin() {
      return this.alignBaselines
        ? this.alignedOrigin
        : this.baselineOrigin
    },
    alignedOrigin() {
      const pivot = this.minPoint * -1
      return this.positive
        ? pivot
        : pivot - this.width
    },
    baselineOrigin() {
      const origin = this.positive
        ? this.baseline
        : this.baseline + this.delta
      return origin - this.minPoint
    },
    direction() {
      return this.positive
        ? 'right'
        : 'left'
    },
    deltaBarStyles() {
      const marginLeft = this.pointToPct(this.origin)
      const width = this.pointToPct(this.width)
      const marginRight = 100 - marginLeft - width
      return {
        height: `${this.thickness}px`,
        marginLeft: `${marginLeft}%`,
        width: `${width}%`,
        marginRight: `${marginRight}%`,
      }
    },
    tooltipStyles() {
      const left = this.pointToPct(this.origin)
      const width = this.pointToPct(this.width)
      return {
        left: `${left}%`,
        width: `${width}%`,
      }
    },
    errorOrigin() {
      return this.positive
        ? this.origin + this.width
        : this.origin
    },
    errorLeft() {
      return this.errorOrigin - this.error
    },
    errorRight() {
      return this.errorOrigin + this.error
    },
    errorWidth() {
      return this.error * 2
    },
    errorBarWrapperStyles() {
      if (this.error === undefined) return {}
      const right = this.pointToPct(this.errorRight)
      const left = this.pointToPct(this.errorLeft)
      const boundaryViolationRight = Math.max((right - 100), 0)
      const boundaryViolationLeft = Math.min(left, 0)
      const width = this.pointToPct(this.errorWidth)
        - boundaryViolationRight
        + boundaryViolationLeft
      
      return {
        width: `${width}%`,
        left: `${left - boundaryViolationLeft}%`,
      }
    },
    errorBarStyles() {
      if (this.error === undefined) return {}

      const height = Math.min(this.thickness / 3, MAX_ERROR_BAR_HEIGHT)
      return { height: `${height}px` }
    },
    leftLabel() {
      return this.positive
        ? this.baselineLabel
        : this.deltaLabel
    },
    rightLabel() {
      return this.positive
        ? this.deltaLabel
        : this.baselineLabel
    },
    background() {
      if (this.insignificant) return 'rgba(0,0,0,0.1)'

      const gradientPoints = [
        this.baseline / this.scale,
        (this.baseline + this.delta) / this.scale,
      ]

      if (!this.positive) gradientPoints.reverse()
      return GradientPercentColor.drawGradient(...gradientPoints)
    },
  },
  methods: {
    buildArrowStyles(yAnchor) {
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
    pointToPct(point) {
      const ratio = point / this.totalWidth
      return ratio * 100
    },
  },
}
</script>

<style lang="scss">
.dataLabelLeft { right: calc(100% + theme('spacing.1')) }
</style>

<docs>
  ```jsx
  const sharedProps = { scale: 10, max: 9, min: -3 }
  const props1 = {
    ...sharedProps,
    deltaLabel: '+44.2%',
    baselineLabel: '38.5%',
    baseline: 3.85,
    delta: 4.42,
    error: 4.42,
  }
  const props2 = {
    ...sharedProps,
    baselineLabel: '54.5%',
    deltaLabel: '-2.4%',
    baseline: 5.45,
    delta: -0.24,
    insignificant: true,
    error: 0.31,
  }
  const props3 = {
    ...sharedProps,
    baselineLabel: '18.5%',
    deltaLabel: '-14.1%',
    baseline: 1.85,
    delta: -1.41,
    error: 1.2,
  }

  <h5 class='text-center'>A Quick basic graph</h5>
  <div class='bg-grey-light py-1 my-1'>
    <div class='mt-1 bg-inherit'>
      <BarChart class='mt-px' :delta='25' :error='20' />
      <BarChartTwo class='mt-px' :delta='25' :error='30' />
      <BarChart class='mt-px' :delta='0.5' />
      <BarChart class='mt-px' :delta='100' :error='50' />
      <BarChart class='mt-px' :delta='50' :error='50' />
      <BarChart class='mt-px' :baseline='100' :delta='-50' :error='50' />
      <BarChart class='mt-px' :delta='75' />
    </div>
  </div>
  <h5 class='mt-10 text-center'>
    The same data shown in Aligned vs. Absolute baselines
  </h5>
  <div>
    <div class='bg-grey-light py-1 mt-1'>
      <p class='text-center capitalize'>Aligned Baselines</p>
      <div class='mt-2 bg-inherit'>
        <BarChart
          :alignBaselines='true'
          class='mt-px'
          v-bind='props1'
        >

          This is significant
        </BarChart>
        <BarChartTwo
          :alignBaselines='true'
          class='mt-px'
          v-bind='props1'
        />
        <BarChart
          :alignBaselines='true'
          class='mt-px'
          v-bind='props2'
        >
          This is insignificant
        </BarChart>
        <BarChartTwo
          :alignBaselines='true'
          class='mt-px'
          v-bind='props2'
        />
        <BarChart
          :alignBaselines='true'
          class='mt-px'
          v-bind='props3'
        />
        <BarChartTwo
          :alignBaselines='true'
          class='mt-px'
          v-bind='props3'
        />
      </div>
    </div>
    <div class='bg-grey-light py-1 mt-1'>
      <p class='text-center capitalize'>Absolute Baselines</p>
      <div class='mt-2 bg-inherit'>
        <BarChart
          class='mt-px'
          v-bind='props1'
        />
        <BarChart
          class='mt-px'
          v-bind='props2'
        />
        <BarChart
          class='mt-px'
          v-bind='props3'
        />
      </div>
    </div>
  </div>
  <h5 class='mt-10 text-center'>Gotcha</h5>
  <p class='text-center text-medium'>
    It is important for the bar or the direct parent of a bar to have a background,
    otherwise no direction (arrow) will be shown.
  </p>
  <div class='flex mt-2 mb-5'>
    <BarChart class='bg-grey-light' :baseline='25' :delta='50' />
    <span>vs.</span>
    <BarChart :baseline='25' :delta='50' />
  </div>
  ```
</docs>
