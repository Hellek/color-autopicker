import { prominent } from 'color.js'

export type RGBTuple = [r:number, g:number, b:number]
export type HSLTuple = [h:number, s:number, l:number]

const HUE_MAX = 360
const SATURATION_MAX = 100
const LIGHTNESS_MAX = 100

const RGB_MAX = 255
const ONE_THIRD = 1 / 3
const ONE_SIXTH = 1 / 6
const HALF = 0.5

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value))
}

// Convert each pixel value (number) to hexadecimal (string) with base 16
export const rgbToHex = ([r, g, b]: RGBTuple): string => {
  const componentToHex = (c: number) => {
    const hex = c.toString(16)
    return hex.length === 1 ? `0${hex}` : hex
  }

  return (`#${componentToHex(r)}${componentToHex(g)}${componentToHex(b)}`).toUpperCase()
}

const rgbToHsl = ([_r, _g, _b]: RGBTuple): HSLTuple => {
  // make r, g, and b fractions of 1
  const r = _r / 255
  const g = _g / 255
  const b = _b / 255

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

  return [h, s, l]
}

// Function to convert hue to RGB
function hueToRgb(t1: number, t2: number, t3: number): number {
  let normalizedT3 = t3
  if (normalizedT3 < 0) normalizedT3 += 1
  if (normalizedT3 > 1) normalizedT3 -= 1

  let result
  if (normalizedT3 < ONE_SIXTH) {
    result = t1 + (t2 - t1) * 6 * normalizedT3
  } else if (normalizedT3 < 1 / 2) {
    result = t2
  } else if (normalizedT3 < 2 / 3) {
    result = t1 + (t2 - t1) * (2 / 3 - normalizedT3) * 6
  } else {
    result = t1
  }

  return clamp(result, 0, 1)
}

export function hslToRgb([h, s, l]: HSLTuple): RGBTuple {
  // Normalize the hue, saturation, and lightness
  const normalizedH = h / HUE_MAX // Convert from degrees to a 0-1 range
  const normalizedS = s / SATURATION_MAX // Convert from percentage to a 0-1 range
  const normalizedL = l / LIGHTNESS_MAX // Convert from percentage to a 0-1 range

  // Calculate the chroma (q) and the midpoint (p)
  const q = normalizedL < HALF ? normalizedL * (1 + normalizedS) : normalizedL + normalizedS - (normalizedL * normalizedS) // Calculate the maximum RGB value
  const p = 2 * normalizedL - q // Calculate the minimum RGB value

  // Calculate RGB values based on adjusted hue
  const r = normalizedS === 0
    ? normalizedL // Achromatic case (gray)
    : hueToRgb(p, q, normalizedH + ONE_THIRD) // Adjust hue for red

  const g = normalizedS === 0
    ? normalizedL // Achromatic case (gray)
    : hueToRgb(p, q, normalizedH) // Adjust hue for green

  const b = normalizedS === 0
    ? normalizedL // Achromatic case (gray)
    : hueToRgb(p, q, normalizedH - ONE_THIRD) // Adjust hue for blue

  // Convert from [0, 1] range to [0, 255]
  return [
    Math.round(clamp(r * RGB_MAX, 0, RGB_MAX)),
    Math.round(clamp(g * RGB_MAX, 0, RGB_MAX)),
    Math.round(clamp(b * RGB_MAX, 0, RGB_MAX)),
  ]
}

// Фильтруем палитру (убираем слишком светлые/темные/бледные цвета)
const paletteFilterHSL = ([, s, l]: HSLTuple) => {
  if (s < 20) return false // везде где сатурация ниже 20 не пропускаем
  if (s < 30 && (l > 55 || l < 35)) return false // если с ниже 30, то смотрим чтобы lightness был в диапазоне меньше 55 и больше 35
  if (s < 40 && (l > 57 || l < 33)) return false // далее аналогично со сдвигом
  if (s < 50 && (l > 64 || l < 31)) return false
  if (s < 60 && (l > 70 || l < 28)) return false
  if (s < 70 && (l > 73 || l < 21)) return false
  if (s < 80 && (l > 76 || l < 19)) return false
  if (s < 90 && (l > 79 || l < 17)) return false
  if (l > 85 || l < 15) return false // если сатурация больше 90, то светимость должна быть ниже 85 и выше 15

  return true
}

const sortBySaturationHSL = (colorList: HSLTuple[]) => colorList.slice().sort((item1, item2) => {
  if (!item1) return 1
  if (!item2) return -1
  const [, s1, l1] = item1
  const [, s2, l2] = item2
  if (s2 === s1) return l2 - l1
  return s2 - s1
})

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

function adjustContrast(bgColor: RGBTuple, textColor: RGBTuple) {
  let ratio = contrastRatio(bgColor, textColor)
  let newBgColor = bgColor

  // Attempt to adjust the background color only
  while (ratio < 3.57) {
    newBgColor = newBgColor.map(value => clamp(value - 5, 0, 255)) as RGBTuple
    ratio = contrastRatio(newBgColor, textColor)

    // If the background color is fully clamped and ratio is still not reached, break to prevent infinite loop
    if (newBgColor.every(value => value === 255)) {
      console.warn('Unable to reach the required contrast ratio with the background color fully clamped.')
      break
    }
  }

  return newBgColor
}

export const getPalette = async ({
  keyName, src, colorAmount, colorGroup,
}: {
  keyName: string
  src: string
  colorAmount: number
  colorGroup: number
}): Promise<{
  color: string | null
  rgbList: RGBTuple[]
  hslList: HSLTuple[]
}> => {
  // eslint-disable-next-line no-console
  performance.mark('start')

  const colorListRGB = (await prominent(src, {
    amount: colorAmount,
    group: colorGroup,
  })) as RGBTuple[]

  // eslint-disable-next-line max-len
  const rawColorsListHSL = colorListRGB.map(rgbToHsl)
  const filteredColorsListHSL = rawColorsListHSL.filter(paletteFilterHSL)
  const colorListSortedBySaturationHSL = sortBySaturationHSL(filteredColorsListHSL)
  const colorListSortedBySaturationRGB = colorListSortedBySaturationHSL.map(hslToRgb)

  const saturatedColor = colorListSortedBySaturationRGB[0]
  let contrastedColor = null
  let adjustedColor = null

  if (saturatedColor) {
    contrastedColor = adjustContrast(saturatedColor, [255, 255, 255])
  }
  if (contrastedColor) {
    adjustedColor = rgbToHex(contrastedColor)
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
