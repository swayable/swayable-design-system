import GradientPercentColor from '../GradientPercentColor'

describe('GradientPercentColor', () => {
  describe('cssValue', () => {
    it('has a constant color between 0 and gradientStart', () => {
      expect.assertions(2)

      const colorAtZero = new GradientPercentColor(0).cssValue
      const colorAtGradStart = new GradientPercentColor(20).cssValue
      const colorBeyondGradStart = new GradientPercentColor(21).cssValue

      expect(colorAtZero).toEqual(colorAtGradStart)
      expect(colorBeyondGradStart).not.toEqual(colorAtGradStart)
    })

    it('has a constant color between gradientStop and 100', () => {
      expect.assertions(2)

      const colorAtHundred = new GradientPercentColor(100).cssValue
      const colorAtGradStop = new GradientPercentColor(80).cssValue
      const colorBeforeGradStop = new GradientPercentColor(79).cssValue

      expect(colorAtHundred).toEqual(colorAtGradStop)
      expect(colorBeforeGradStop).not.toEqual(colorAtGradStop)
    })
  })
})