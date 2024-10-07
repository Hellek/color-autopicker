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
const hslToHex = (hslColor: HSL) => {
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

const rgbToHsl = (rgb: RGB) => {
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

const hexToRgb = (hex: string) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)

  if (!result) throw Error('hexToRgb no result')

  return {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
  }
}

// Фильтруем палитру (убираем слишком светлые/темные/бледные цвета)
const paletteFilterHSL = (hsl: HSL) => {
  if (hsl.s < 20) return false // везде где сатурация ниже 20 не пропускаем
  if (hsl.s < 30 && (hsl.l > 55 || hsl.l < 35)) return false // если с ниже 30, то смотрим чтобы lightness был в диапазоне меньше 55 и больше 35
  if (hsl.s < 40 && (hsl.l > 57 || hsl.l < 33)) return false // далее аналогично со сдвигом
  if (hsl.s < 50 && (hsl.l > 64 || hsl.l < 31)) return false
  if (hsl.s < 60 && (hsl.l > 70 || hsl.l < 28)) return false
  if (hsl.s < 70 && (hsl.l > 73 || hsl.l < 21)) return false
  if (hsl.s < 80 && (hsl.l > 76 || hsl.l < 19)) return false
  if (hsl.s < 90 && (hsl.l > 79 || hsl.l < 17)) return false
  if (hsl.l > 85 || hsl.l < 15) return false // если сатурация больше 90, то светимость должна быть ниже 85 и выше 15

  return true
}

const sortBySaturationHSL = (colorList: HSL[]) => [...colorList].sort((item1, item2) => {
  if (!item1) return 1
  if (!item2) return -1
  if (item2.s === item1.s) return item2.l - item1.l
  return item2.s - item1.s
})

export const getPalette = async ({
  keyName, src, colorAmount, colorGroup,
}: {
  keyName: string
  src: string
  colorAmount: number
  colorGroup: number
}): Promise<{
  color: string | null
  rgbList: RGB[]
  hslList: HSL[]
}> => {
  // eslint-disable-next-line no-console
  console.time(`${keyName} get palette`)

  const rawRes = await prominent(src, {
    amount: colorAmount,
    group: colorGroup,
  })

  // eslint-disable-next-line max-len
  const rawColorsListRGB = (rawRes as number[][]).map((item: number[]) => ({ r: item[0], g: item[1], b: item[2] })) as RGB[]
  const rawColorsListHSL = rawColorsListRGB.map(rgbToHsl)
  const filteredColorsListHSL = rawColorsListHSL.filter(paletteFilterHSL)

  const colorListSortedBySaturationHSL = sortBySaturationHSL(filteredColorsListHSL)
  const colorListSortedBySaturationHex = colorListSortedBySaturationHSL.map(hslToHex)
  const colorListSortedBySaturationRGB = colorListSortedBySaturationHex.map(hexToRgb)

  const mostSaturatedColorRGB = colorListSortedBySaturationRGB[0]

  const mostSaturatedColorHex = mostSaturatedColorRGB ? rgbToHex(mostSaturatedColorRGB) : null

  // eslint-disable-next-line no-console
  console.timeEnd(`${keyName} get palette`)

  return {
    color: mostSaturatedColorHex,
    rgbList: colorListSortedBySaturationRGB,
    hslList: colorListSortedBySaturationHSL,
  }
}
