export type RGBTuple = [r:number, g:number, b:number]

function getLuminance(color: RGBTuple) {
  const [r, g, b] = color.map(c => {
    const normalizedC = c / 255
    return normalizedC <= 0.03928 ? normalizedC / 12.92 : ((normalizedC + 0.055) / 1.055) ** 2.4
  })

  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

function contrastRatio(rgb1: RGBTuple, rgb2: RGBTuple) {
  const lum1 = getLuminance(rgb1)
  const lum2 = getLuminance(rgb2)
  const brightest = Math.max(lum1, lum2)
  const darkest = Math.min(lum1, lum2)
  return (brightest + 0.05) / (darkest + 0.05)
}

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value))
}

export function adjustContrast(bgColor: RGBTuple, textColor: RGBTuple) {
  let ratio = contrastRatio(bgColor, textColor)
  let newBgColor = bgColor

  // Attempt to adjust the background color only
  while (ratio < 3.57) {
    newBgColor = newBgColor.map(value => clamp(value - 1, 0, 255)) as RGBTuple
    ratio = contrastRatio(newBgColor, textColor)
    console.log('ratio', ratio)

    // If the background color is fully clamped and ratio is still not reached, break to prevent infinite loop
    if (newBgColor.every(value => value === 255)) {
      console.warn('Unable to reach the required contrast ratio with the background color fully clamped.')
      break
    }
  }

  return newBgColor
}
