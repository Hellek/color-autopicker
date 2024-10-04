export const capitalizeFirstLetter: (
  str: string,
  locale?: NavigatorLanguage['language'],
) => string = (str, locale = navigator.language) => {
  const [first, ...rest] = str

  return first === undefined ? '' : first.toLocaleUpperCase(locale) + rest.join('')
}

export const pluralize: (num: number, single?: string, plural?: string) => string = (num, single = '', plural = 's') => {
  if (num === 1) return single

  return plural
}
