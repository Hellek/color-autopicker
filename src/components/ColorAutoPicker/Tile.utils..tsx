import { RGB } from '@utils'

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
