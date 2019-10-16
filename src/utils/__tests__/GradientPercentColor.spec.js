import GradientPercentColor from '../GradientPercentColor'

describe('GradientPercentColor', () => {
  describe('cssValue', () => {
    it('has a constant color between 0 and gradientMin', () => {
      const colorAtZero = new GradientPercentColor(0).cssValue
      const colorAtGradStart = new GradientPercentColor(.2).cssValue
      const colorBeyondGradStart = new GradientPercentColor(.21).cssValue

      expect(colorAtZero).toEqual(colorAtGradStart)
      expect(colorBeyondGradStart).not.toEqual(colorAtGradStart)
    })

    it('has a constant color between gradientMax and 100', () => {
      const colorAtHundred = new GradientPercentColor(1).cssValue
      const colorAtGradStop = new GradientPercentColor(.8).cssValue
      const colorBeforeGradStop = new GradientPercentColor(.79).cssValue

      expect(colorAtHundred).toEqual(colorAtGradStop)
      expect(colorBeforeGradStop).not.toEqual(colorAtGradStop)
    })
  })
})