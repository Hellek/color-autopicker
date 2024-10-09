/* eslint-disable no-console */
import './Tile.css'

import {
  memo, useCallback, useEffect, useRef,
  useState,
} from 'react'
import clsx from 'clsx'

import {
  getPalette, HSLTuple, rgbToHex,
  RGBTuple,
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

const fallbackBackgroundColor = '#e1e3e6'

const TileForMemo = ({
  keyName,
  src,
  palette,
  colorAmount,
  colorGroup,
}: TileType) => {
  const paletteRef = useRef<HTMLDivElement>(null)
  const [backgroundColor, setBackgroundColor] = useState<string | null>(null)
  const [textColor, setTextColor] = useState('#fff')

  const drawInterface = useCallback((mostSaturatedColor: string | null, rgbList: RGBTuple[], hslList: HSLTuple[]) => {
    if (!paletteRef.current) return

    const paletteContainer = paletteRef.current

    setBackgroundColor(mostSaturatedColor ?? fallbackBackgroundColor)

    // Рисуем палитру
    for (let i = 0; i < rgbList.length; i++) {
      const hexColor = rgbToHex(rgbList[i])
      const [h, s, l] = hslList[i]

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
      colorElement.appendChild(document.createTextNode(`${hexColor}, h: ${h}, s: ${s}, l: ${l}`))
      paletteContainer.appendChild(colorElement)
    }
  }, [])

  const init = useCallback(async () => {
    try {
      const { color, rgbList, hslList } = await getPalette({
        keyName, src, colorAmount, colorGroup,
      })

      drawInterface(color, rgbList, hslList)
    } catch (e) {
      setBackgroundColor(fallbackBackgroundColor)
      setTextColor('#222')
    }
  }, [colorAmount, colorGroup, drawInterface, keyName, src])

  useEffect(() => {
    init()
  }, [init])

  return (
    <div className="sm:basis-1/2 md:basis-1/3 lg:basis-1/4 flex flex-col px-2 box-border">
      <img id={getImageID(keyName)} src={src} alt={keyName} className="w-full" />
      <div style={{ backgroundColor: backgroundColor ?? '' }} className={`fake-button text-white px-4 py-3 text-base mb-4 ${backgroundColor ? 'buttonOverlay' : ''}`}>
        <span style={{ color: textColor }} className="buttonText">Купить</span>
      </div>
      <div ref={paletteRef} className={clsx('box-container mb-4', { hidden: !palette })} />
    </div>
  )
}

export const Tile = memo(TileForMemo)
