import { prominent } from 'color.js'

export type RGB = {
  r: number
  g: number
  b: number
}

export type HSL = {
  h: number
  s: number
  l: number
}

/**
 * Calculate the color distance or difference between 2 colors
 *
 * further explanation of this topic
 * can be found here -> https://en.wikipedia.org/wiki/Euclidean_distance
 * note: this method is not accuarate for better results use Delta-E distance metric.
 */
export const calculateColorDifference = (color1: RGB, color2: RGB): number => {
  const rDifference = (color2.r - color1.r) ** 2
  const gDifference = (color2.g - color1.g) ** 2
  const bDifference = (color2.b - color1.b) ** 2

  return rDifference + gDifference + bDifference
}

// Convert each pixel value (number) to hexadecimal (string) with base 16
export const rgbToHex = (pixel: RGB): string => {
  const componentToHex = (c: number) => {
    const hex = c.toString(16)
    return hex.length === 1 ? `0${hex}` : hex
  }

  return (`#${componentToHex(pixel.r)}${componentToHex(pixel.g)}${componentToHex(pixel.b)}`).toUpperCase()
}

/**
 * Convert HSL to Hex
 * this entire formula can be found in stackoverflow, credits to @icl7126 !!!
 * https://stackoverflow.com/a/44134328/17150245
 */
export const hslToHex = (hslColor: HSL) => {
  const hslColorCopy = { ...hslColor }
  hslColorCopy.l /= 100
  const a = (hslColorCopy.s * Math.min(hslColorCopy.l, 1 - hslColorCopy.l)) / 100

  const f = (n: number) => {
    const k = (n + hslColorCopy.h / 30) % 12
    const color = hslColorCopy.l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1)
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, '0')
  }

  return `#${f(0)}${f(8)}${f(4)}`.toUpperCase()
}

/**
 * Convert RGB values to HSL
 * This formula can be
 * found here https://www.niwa.nu/2013/05/math-behind-colorspace-conversions-rgb-hsl/
 */
export const convertRGBtoHSL = (rgbValues: RGB[]) => rgbValues.map((pixel: RGB) => {
  let hue = 0
  let saturation = 0
  let luminance = 0

  // first change range from 0-255 to 0 - 1
  const redOpposite = pixel.r / 255
  const greenOpposite = pixel.g / 255
  const blueOpposite = pixel.b / 255

  const Cmax = Math.max(redOpposite, greenOpposite, blueOpposite)
  const Cmin = Math.min(redOpposite, greenOpposite, blueOpposite)

  const difference = Cmax - Cmin

  luminance = (Cmax + Cmin) / 2.0

  if (luminance <= 0.5) {
    saturation = difference / (Cmax + Cmin)
  } else if (luminance >= 0.5) {
    saturation = difference / (2.0 - Cmax - Cmin)
  }

  /**
   * If Red is max, then Hue = (G-B)/(max-min)
   * If Green is max, then Hue = 2.0 + (B-R)/(max-min)
   * If Blue is max, then Hue = 4.0 + (R-G)/(max-min)
   */
  const maxColorValue = Math.max(pixel.r, pixel.g, pixel.b)

  if (maxColorValue === pixel.r) {
    hue = (greenOpposite - blueOpposite) / difference
  } else if (maxColorValue === pixel.g) {
    hue = 2.0 + (blueOpposite - redOpposite) / difference
  } else {
    hue = 4.0 + (greenOpposite - blueOpposite) / difference
  }

  hue *= 60 // find the sector of 60 degrees to which the color belongs

  // it should be always a positive angle
  if (hue < 0) {
    hue += 360
  }

  // When all three of R, G and B are equal, we get a neutral color: white, grey or black.
  if (difference === 0) {
    return false
  }

  return {
    h: Math.round(hue) + 180, // plus 180 degrees because that is the complementary color
    s: parseFloat(`${saturation * 100}`).toFixed(2),
    l: parseFloat(`${luminance * 100}`).toFixed(2),
  }
})

export const RGBToHSL = (rgb: RGB) => {
  // make r, g, and b fractions of 1
  const r = rgb.r / 255
  const g = rgb.g / 255
  const b = rgb.b / 255

  // find greatest and smallest channel values
  const cmin = Math.min(r, g, b)
  const cmax = Math.max(r, g, b)
  const delta = cmax - cmin
  let h = 0
  let s = 0
  let l = 0

  // calculate hue
  // no difference
  if (delta === 0) h = 0
  // red is max
  else if (cmax === r) h = ((g - b) / delta) % 6
  // green is max
  else if (cmax === g) h = (b - r) / delta + 2
  // blue is max
  else h = (r - g) / delta + 4

  h = Math.round(h * 60)

  // make negative hues positive behind 360°
  if (h < 0) h += 360

  // calculate lightness
  l = (cmax + cmin) / 2

  // calculate saturation
  s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1))

  // multiply l and s by 100
  s = +(s * 100).toFixed(1)
  l = +(l * 100).toFixed(1)

  return { h, s, l }
}

/**
 * Using relative luminance we order the brightness of the colors
 * the fixed values and further explanation about this topic
 * can be found here -> https://en.wikipedia.org/wiki/Luma_(video)
*/
export const orderByLuminance = (rgbValues: RGB[]) => {
  const calculateLuminance = (p: RGB) => 0.2126 * p.r + 0.7152 * p.g + 0.0722 * p.b

  return rgbValues.sort((p1, p2) => calculateLuminance(p2) - calculateLuminance(p1))
}

export function hexToRgb(hex: string) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)

  if (!result) throw Error('hexToRgb no result')

  return {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
  }
}

export const getPalette = async ({ keyName, src }: { keyName: string, src: string }): Promise<{ mostSaturatedColor: string, rgbList: RGB[], hslList: HSL[] }> => {
  console.time(`${keyName} get palette`)

  const rawRes = await prominent(src, {
    amount: 10,
    group: 30,
    // sample: 100, // accuracy/performance https://github.com/luukdv/color.js/?tab=readme-ov-file#sample
  })

  // eslint-disable-next-line max-len
  const colorsListRGB = (rawRes as number[][]).map((item: number[]) => ({ r: item[0], g: item[1], b: item[2] })) as RGB[]
  const colorsListHSL = colorsListRGB.map(RGBToHSL).filter(hsl => hsl.l > 10 && hsl.l < 90 && hsl.h !== 0)

  const colorsListHSLSortedBySaturation = [...colorsListHSL].sort((item1, item2) => {
    if (!item1) return 1
    if (!item2) return -1
    if (item2.s === item1.s) return item2.l - item1.l
    return item2.s - item1.s
  })

  const colorsListHexSortedBySaturation = colorsListHSLSortedBySaturation.map(hslToHex)

  const mostSaturatedColor = colorsListHexSortedBySaturation[0]
  const rgbСolorsListSorted = colorsListHexSortedBySaturation.map(hexToRgb)

  console.timeEnd(`${keyName} get palette`)

  return {
    mostSaturatedColor,
    rgbList: rgbСolorsListSorted,
    hslList: colorsListHSLSortedBySaturation,
  }
}
