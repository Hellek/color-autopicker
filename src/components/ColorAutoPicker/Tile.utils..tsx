import { RGBTuple } from '@utils'

/**
 * Calculate the color distance or difference between 2 colors
 *
 * further explanation of this topic
 * can be found here -> https://en.wikipedia.org/wiki/Euclidean_distance
 * note: this method is not accuarate for better results use Delta-E distance metric.
 */
export const calculateColorDifference = ([r1, g1, b1]: RGBTuple, [r2, g2, b2]: RGBTuple): number => {
  const rDifference = (r2 - r1) ** 2
  const gDifference = (g2 - g1) ** 2
  const bDifference = (b2 - b1) ** 2

  return rDifference + gDifference + bDifference
}
