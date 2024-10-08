import { prominent } from 'color.js'

import { adjustContrast } from './adjustContrast'
import { hslToRgb } from './hslToRgb'

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
  performance.mark('start')

  const rawRes = await prominent(src, {
    amount: colorAmount,
    group: colorGroup,
  })

  // eslint-disable-next-line max-len
  const rawColorsListRGB = (rawRes as number[][]).map((item: number[]) => ({ r: item[0], g: item[1], b: item[2] })) as RGB[]
  const rawColorsListHSL = rawColorsListRGB.map(rgbToHsl)
  const filteredColorsListHSL = rawColorsListHSL.filter(paletteFilterHSL)

  const colorListSortedBySaturationHSL = sortBySaturationHSL(filteredColorsListHSL)

  const colorListSortedBySaturationRGB = colorListSortedBySaturationHSL.map(hsl => {
    const [r, g, b] = hslToRgb(hsl.h, hsl.s, hsl.l)

    return { r, g, b }
  })

  const saturatedColor = colorListSortedBySaturationRGB[0]
  let contrastedColor = null
  let adjustedColor = null

  if (saturatedColor) {
    contrastedColor = adjustContrast([saturatedColor.r, saturatedColor.g, saturatedColor.b], [255, 255, 255])
  }
  if (contrastedColor) {
    adjustedColor = rgbToHex({ r: contrastedColor[0], g: contrastedColor[1], b: contrastedColor[2] })
  }

  // eslint-disable-next-line no-console
  performance.mark('end')

  console.log(performance.measure(`${keyName} get palette`, 'start', 'end'))

  return {
    color: adjustedColor,
    rgbList: colorListSortedBySaturationRGB,
    hslList: colorListSortedBySaturationHSL,
  }
}
