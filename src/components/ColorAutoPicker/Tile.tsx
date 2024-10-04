/* eslint-disable no-console */
import './Tile.css'

import { useCallback, useEffect, useRef } from 'react'

import {
  calculateColorDifference,
  getPalette, HSL, RGB, rgbToHex,
} from '@utils'

export const getImageID = (keyName: string) => `img_${keyName}`

export const Tile = ({ keyName, src }: { keyName: string, src: string }) => {
  const image = useRef<HTMLImageElement>(null)
  const button = useRef<HTMLDivElement>(null)
  const palette = useRef<HTMLDivElement>(null)

  const drawInterface = useCallback((mostSaturatedColor: string, rgbList: RGB[], hslList: HSL[]) => {
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
  }, [])

  const init = useCallback(async () => {
    if (!image.current || !image.current.complete) return

    const { mostSaturatedColor, rgbList, hslList } = await getPalette({ keyName, src })
    drawInterface(mostSaturatedColor, rgbList, hslList)
  // image.current watcher helps to detect its complete state
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [drawInterface, keyName, src, image.current])

  useEffect(() => {
    init()
  }, [init])

  return (
    <div className="max-w-sm flex flex-col">
      <img ref={image} id={getImageID(keyName)} src={src} alt={keyName} className="w-full" />
      <div ref={button} className="fake-button text-white px-4 py-3 text-base mb-3">Купить</div>
      <div ref={palette} className="box-container" />
    </div>
  )
}
