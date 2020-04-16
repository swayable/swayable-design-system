import GradientPercentColor from '../GradientPercentColor'

describe('GradientPercentColor', () => {
  describe('cssValue', () => {
    it('has a constant color between 0 and gradientMin', () => {
      const colorAtZero = new GradientPercentColor(0).cssValue
      const colorAtGradStart = new GradientPercentColor(.3).cssValue
      const colorBeyondGradStart = new GradientPercentColor(.31).cssValue

      expect(colorAtZero).toEqual(colorAtGradStart)
      expect(colorBeyondGradStart).not.toEqual(colorAtGradStart)
    })

    it('has a constant color between gradientMax and 100', () => {
      const colorAtHundred = new GradientPercentColor(1).cssValue
      const colorAtGradStop = new GradientPercentColor(.7).cssValue
      const colorBeforeGradStop = new GradientPercentColor(.69).cssValue

      expect(colorAtHundred).toEqual(colorAtGradStop)
      expect(colorBeforeGradStop).not.toEqual(colorAtGradStop)
    })
  })

  describe('drawGradient', () => {
    it('draws the gradient only between the gradient min and gradient max', () => {
      let cssGradient
      cssGradient = GradientPercentColor.drawGradient(0.3, 0.7)
      expect(cssGradient).toEqual('linear-gradient(to right, rgb(220,60,140) 0%, rgb(60,140,220) 100%)')

      cssGradient = GradientPercentColor.drawGradient(0.2, 0.8)
      expect(cssGradient).toEqual('linear-gradient(to right, rgb(220,60,140) 10%, rgb(60,140,220) 90%)')

      cssGradient = GradientPercentColor.drawGradient(0, 1)
      expect(cssGradient).toEqual('linear-gradient(to right, rgb(220,60,140) 30%, rgb(60,140,220) 70%)')

      cssGradient = GradientPercentColor.drawGradient(0.43, 0.67)
      expect(cssGradient).toEqual('linear-gradient(to right, rgb(168,86,166) 0%, rgb(72,134,214) 100%)')
    })
  })
})