import tokens from './tokens'

const LEFT_RGB = tokens.getColorRGB('pink')
const RIGHT_RGB = tokens.getColorRGB('azure')

/**
 * Finds the color at a given point in a gradient of pink-blue
 * Used to draw segments of a gradient
 * `gradientMin` and `gradientMax` allow ~mid segments to be more dramatic
 *
 * e.g. a gradient drawn with args
 * `GradientPercentColor(.45, 0, 1)` to `GradientPercentColor(55, 0, 1)`
 *  will be less visible than with args
 * `GradientPercentColor(.45, .2, .8)` to `GradientPercentColor(55, .2, .8)`
*/

class GradientPercentColor {
  constructor(percent, gradientMin=0.2, gradientMax=0.8) {
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

  get red() { return this.colorValue(0) }

  get green() { return this.colorValue(1) }

  get blue() { return this.colorValue(2) }

  get cssValue() {
    return `rgb(${this.red},${this.green},${this.blue})`
  }

  colorValue(rgbIndex) {
    const right = RIGHT_RGB[rgbIndex] * this.weight
    const left = LEFT_RGB[rgbIndex] * this.inverseWeight
    return Math.round(right + left)
  }

  static drawGradient(gradientStart, gradientStop) {
    const startColor = new GradientPercentColor(gradientStart).cssValue
    const endColor = new GradientPercentColor(gradientStop).cssValue
    return `linear-gradient(to right, ${startColor}, ${endColor})`
  }
}

export default GradientPercentColor