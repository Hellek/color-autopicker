/* eslint-disable no-console */
import './Tile.css'

import { useEffect, useRef } from 'react'
import { prominent } from 'color.js'

import {
  calculateColorDifference,
  hexToRgb, hslToHex, RGB, rgbToHex, RGBToHSL,
} from '@utils'

export const Tile = ({ keyName, src }: { keyName: string, src: string }) => {
  const palette = useRef<HTMLDivElement>(null)
  const button = useRef<HTMLDivElement>(null)

  const buildPalette = (colorsListRGB: RGB[]) => {
    if (!palette.current || !button.current) return

    const paletteContainer = palette.current
    const fakeButton = button.current

    const colorsListHSL = colorsListRGB.map(RGBToHSL).filter(hsl => hsl.l > 10 && hsl.l < 90)

    const colorsListHSLSortedBySaturation = [...colorsListHSL].sort((item1, item2) => {
      if (!item1) return 1
      if (!item2) return -1
      if (item2.s === item1.s) return item2.l - item1.l
      return item2.s - item1.s
    })

    const colorsListHexSortedBySaturation = colorsListHSLSortedBySaturation.map(hslToHex)

    const mostSaturatedColor = colorsListHexSortedBySaturation[0]
    const rgbСolorsListSorted = colorsListHexSortedBySaturation.map(hexToRgb)
    const orderedByColor = rgbСolorsListSorted

    // Проставляем цвет кнопке
    fakeButton.style.backgroundColor = mostSaturatedColor

    for (let i = 0; i < orderedByColor.length; i++) {
      const hexColor = rgbToHex(orderedByColor[i])
      const hsl = colorsListHSLSortedBySaturation[i]

      if (i > 0) {
        const difference = calculateColorDifference(
          orderedByColor[i],
          orderedByColor[i - 1],
        )

        // if the distance is less than 120 we ommit that color
        if (difference < 120) {
        // eslint-disable-next-line no-continue
          continue
        }
      }

      // create the div and text elements for both colors & append it to the document
      const colorElement = document.createElement('div')
      colorElement.style.backgroundColor = hexColor
      colorElement.appendChild(document.createTextNode(`${hexColor}, h: ${hsl.h}, s: ${hsl.s}, l: ${hsl.l}`))
      paletteContainer.appendChild(colorElement)
    }
  }

  const doJob = async () => {
    console.time(`${keyName} get palette`)

    const rawRes = await prominent(src, {
      amount: 10,
      group: 30,
      // sample: 100, // accuracy/performance https://github.com/luukdv/color.js/?tab=readme-ov-file#sample
    })

    const rgbRes = (rawRes as number[][]).map((item: number[]) => ({ r: item[0], g: item[1], b: item[2] })) as RGB[]

    console.timeEnd(`${keyName} get palette`)

    console.time(`${keyName} other calc`)
    buildPalette(rgbRes)
    console.timeEnd(`${keyName} other calc`)
  }

  useEffect(() => {
    setTimeout(() => {
      doJob()
    }, 200)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="max-w-sm flex flex-col">
      <img src={src} alt={keyName} className="w-full" />
      <div ref={button} className="fake-button text-white px-4 py-3 text-base mb-3">Купить</div>
      <div ref={palette} className="box-container" />
    </div>
  )
}
