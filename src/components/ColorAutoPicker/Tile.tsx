/* eslint-disable no-console */
import './Tile.css'

import {
  memo, useCallback, useEffect, useRef,
} from 'react'
import clsx from 'clsx'

import {
  getPalette, HSL, RGB, rgbToHex,
} from '@utils'
import { calculateColorDifference } from './Tile.utils.'

export const getImageID = (keyName: string) => `img_${keyName}`

type TileType = {
  keyName: string
  src: string
  palette: boolean
  colorAmount: number
  colorGroup: number
}

const TileForMemo = ({
  keyName,
  src,
  palette,
  colorAmount,
  colorGroup,
}: TileType) => {
  const image = useRef<HTMLImageElement>(null)
  const button = useRef<HTMLDivElement>(null)
  const paletteRef = useRef<HTMLDivElement>(null)

  const drawInterface = useCallback((mostSaturatedColor: string | null, rgbList: RGB[], hslList: HSL[]) => {
    if (!paletteRef.current || !button.current) return

    const paletteContainer = paletteRef.current
    const fakeButton = button.current

    // Проставляем цвет кнопке
    if (mostSaturatedColor) {
      fakeButton.style.backgroundColor = mostSaturatedColor
    } else {
      fakeButton.style.backgroundColor = '#e1e3e6'
      fakeButton.style.color = '#222222'
    }

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
    if (!image.current) return

    image.current.onload = async () => {
      const { color, rgbList, hslList } = await getPalette({
        keyName, src, colorAmount, colorGroup,
      })

      drawInterface(color, rgbList, hslList)
    }
  }, [colorAmount, colorGroup, drawInterface, keyName, src])

  useEffect(() => {
    init()
  }, [init])

  return (
    <div className="sm:basis-1/2 md:basis-1/3 lg:basis-1/4 flex flex-col px-2 box-border">
      <img ref={image} id={getImageID(keyName)} src={src} alt={keyName} className="w-full" />
      <div ref={button} className="fake-button text-white px-4 py-3 text-base mb-4">Купить</div>
      <div ref={paletteRef} className={clsx('box-container mb-4', { hidden: !palette })} />
    </div>
  )
}

export const Tile = memo(TileForMemo)
