import tokens from '../../utils/tokens'

const LEFT_RGB = tokens.getColorRGB('pink')
const RIGHT_RGB = tokens.getColorRGB('blue')

class GradientPercentColor {
  constructor(percent, gradStart=20, gradStop=80) {
    this.percent = percent
    this.gradStart = gradStart
    this.gradStop = gradStop
  }


  get weight() {
    const { percent, gradStart, gradStop } = this
    const reversePercent = ((100 + gradStop) * 100 / gradStop) - 100
    return (percent * (reversePercent / 100) - gradStart) / gradStop
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