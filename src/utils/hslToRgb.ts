const HUE_MAX = 360
const SATURATION_MAX = 100
const LIGHTNESS_MAX = 100

const RGB_MAX = 255
const ONE_THIRD = 1 / 3
const ONE_SIXTH = 1 / 6
const HALF = 0.5

// Function to convert hue to RGB
function hueToRgb(t1: number, t2: number, t3: number): number {
  let normalizedT3 = t3
  // Adjust t3 to wrap around within [0, 1]
  if (normalizedT3 < 0) normalizedT3 += 1
  if (normalizedT3 > 1) normalizedT3 -= 1

  // Calculate RGB values based on the hue position
  if (normalizedT3 < ONE_SIXTH) {
    return t1 + (t2 - t1) * 6 * t3 // Interpolate between t1 and t2
  }
  if (normalizedT3 < 1 / 2) {
    return t2 // Return the maximum RGB value
  }
  if (normalizedT3 < 2 / 3) {
    return t1 + (t2 - t1) * (2 / 3 - t3) * 6 // Interpolate back down towards t1
  }
  return t1 // Default case, return t1
}

export function hslToRgb(h: number, s: number, l: number): [number, number, number] {
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
  return [Math.round(r * RGB_MAX), Math.round(g * RGB_MAX), Math.round(b * RGB_MAX)]
}
