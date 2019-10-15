import tokens from './tokens'

const LEFT_RGB = tokens.getColorRGB('pink')
const RIGHT_RGB = tokens.getColorRGB('blue')

class GradientPercentColor {
  constructor(percent, gradientStart=20, gradientStop=80) {
    this.percent = percent
    this.gradientStart = gradientStart
    this.gradientStop = gradientStop
  }

  get weight() {
    const { percent, gradientStart, gradientStop } = this
    const range = gradientStop - gradientStart
    const weightedRatio = Math.max(percent - gradientStart, 0)
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
}

export default GradientPercentColor