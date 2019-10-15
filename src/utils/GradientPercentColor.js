import tokens from './tokens'

const LEFT_RGB = tokens.getColorRGB('pink')
const RIGHT_RGB = tokens.getColorRGB('blue')

/**
 * Finds the color at a given point in a gradient of pink-blue
 * Used to draw segments of a gradient
 * `gradientMin` and `gradientMax` allow ~mid segments to be more dramatic
 *
 * e.g. a gradient drawn with args
 * `GradientPercentColor(45, 0, 100)` to `GradientPercentColor(55, 0, 100)`
 *  will be less visible than with args
 * `GradientPercentColor(45, 20, 80)` to `GradientPercentColor(55, 20, 80)`
*/

class GradientPercentColor {
  constructor(percent, gradientMin=20, gradientMax=80) {
    this.percent = percent
    this.gradientMin = gradientMin
    this.gradientMax = gradientMax
  }

  get weight() {
    const { percent, gradientMin, gradientMax } = this
    const range = gradientMax - gradientMin
    const weightedRatio = Math.max(percent - gradientMin, 0)
    return Math.min(weightedRatio / range, 1)
  }

  get inverseWeight() {
    return 1 - this.weight
  }

  get red() {
    const right = RIGHT_RGB[0] * this.weight
    const left = LEFT_RGB[0] * this.inverseWeight
    return Math.round(right + left)
  }

  get green() {
    const right = RIGHT_RGB[1] * this.weight
    const left = LEFT_RGB[1] * this.inverseWeight
    return Math.round(right + left)
  }

  get blue() {
    const right = RIGHT_RGB[2] * this.weight
    const left = LEFT_RGB[2] * this.inverseWeight
    return Math.round(right + left)
  }

  get rgb() {
    return [this.red, this.green, this.blue]
  }

  get cssValue() {
    return `rgb(${this.red},${this.green},${this.blue})`
  }

  static drawGradient(gradientStart, gradientStop) {
    const startColor = new GradientPercentColor(gradientStart).cssValue
    const endColor = new GradientPercentColor(gradientStop).cssValue
    return `linear-gradient(to right, ${startColor}, ${endColor})`
  }
}

export default GradientPercentColor