export const generateHash = (depth: number = 3): string => {
  const maxDepth = depth > 4 ? 4 : depth

  if (maxDepth === 1) {
    return Math.random().toString(16).slice(2)
  }

  return generateHash(maxDepth - 1)
}
