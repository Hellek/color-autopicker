/* eslint-disable no-console */
import './Tile.css'

import { useCallback, useEffect, useRef } from 'react'

import {
  calculateColorDifference,
  getPalette, HSL, RGB, rgbToHex,
} from '@utils'

export const Tile = ({ keyName, src }: { keyName: string, src: string }) => {
  const palette = useRef<HTMLDivElement>(null)
  const button = useRef<HTMLDivElement>(null)

  const drawInterface = useCallback((mostSaturatedColor: string, rgbList: RGB[], hslList: HSL[]) => {
    console.time(`${keyName} draw interface`)
    if (!palette.current || !button.current) return

    const paletteContainer = palette.current
    const fakeButton = button.current

    // Проставляем цвет кнопке
    fakeButton.style.backgroundColor = mostSaturatedColor

    // Рисуем палитру
    for (let i = 0; i < rgbList.length; i++) {
      const hexColor = rgbToHex(rgbList[i])
      const hsl = hslList[i]

      if (i > 0) {
        const difference = calculateColorDifference(
          rgbList[i],
          rgbList[i - 1],
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

    console.timeEnd(`${keyName} draw interface`)
  }, [keyName])

  const init = useCallback(async () => {
    const { mostSaturatedColor, rgbList, hslList } = await getPalette({ keyName, src })
    drawInterface(mostSaturatedColor, rgbList, hslList)
  }, [drawInterface, keyName, src])

  useEffect(() => {
    init()
  }, [init])

  return (
    <div className="max-w-sm flex flex-col">
      <img src={src} alt={keyName} className="w-full" />
      <div ref={button} className="fake-button text-white px-4 py-3 text-base mb-3">Купить</div>
      <div ref={palette} className="box-container" />
    </div>
  )
}
