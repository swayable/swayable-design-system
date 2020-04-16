import tokens from './tokens'

const LEFT_RGB = tokens.getColorRGB('pink')
const RIGHT_RGB = tokens.getColorRGB('azure')
const GRADIENT_MIN = 0.3
const GRADIENT_MAX = 0.7
/**
 * Finds the color at a given point in a gradient of pink-blue
 * Used to draw segments of a gradient
 * `GRADIENT_MIN` and `GRADIENT_MAX` pull the edges of the gradient in,
 * allowing for a more dramatic change around the center
*/

class GradientPercentColor {
  constructor(percent) {
    this.percent = percent
  }

  get weight() {
    const weightedRatio = Math.max(this.percent - GRADIENT_MIN, 0)
    const range = GRADIENT_MAX - GRADIENT_MIN
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

  static drawGradient(pt1, pt2) {
    const startColor = new GradientPercentColor(pt1).cssValue
    const endColor = new GradientPercentColor(pt2).cssValue

    
    const startPct = Math.round(Math.max(0, GRADIENT_MIN - pt1) * 100)
    const endPct = Math.round(Math.min(1, 1 + GRADIENT_MAX - pt2) * 100)

    return `linear-gradient(to right, ${startColor} ${startPct}%, ${endColor} ${endPct}%)`
  }
}

export default GradientPercentColor