import './Tile.css'

import {
  memo, useCallback, useEffect, useRef,
  useState,
} from 'react'
import clsx from 'clsx'

import {
  extractColors, HSLTuple, rgbToHex,
  RGBTuple,
} from '@utils'
import { calculateColorDifference } from './Tile.utils.'

export const getImageID = (keyName: number) => `img_${keyName}`

type TileType = {
  id: number
  src: string
  palette: boolean
  colorAmount: number
  colorGroup: number
  onRemove?: () => void
}

const fallbackBackgroundColor = '#2688eb'

const TileForMemo = ({
  id,
  src,
  palette,
  colorAmount,
  colorGroup,
  onRemove,
}: TileType) => {
  const paletteRef = useRef<HTMLDivElement>(null)
  const [backgroundColor, setBackgroundColor] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const textColor = '#fff'

  const copyToClipboard = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      // Fallback для старых браузеров
      const textArea = document.createElement('textarea')
      textArea.value = text
      textArea.style.position = 'fixed'
      textArea.style.opacity = '0'
      document.body.appendChild(textArea)
      textArea.select()

      try {
        document.execCommand('copy')
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      } catch (e) {
        // Игнорируем ошибку
      }

      document.body.removeChild(textArea)
    }
  }, [])

  const drawInterface = useCallback((mostSaturatedColor: string | null, rgbList: RGBTuple[], hslList: HSLTuple[]) => {
    if (!paletteRef.current) return

    const paletteContainer = paletteRef.current
    // Очищаем предыдущую палитру
    paletteContainer.innerHTML = ''

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
      colorElement.className = 'palette-color-item'
      colorElement.style.backgroundColor = hexColor
      colorElement.style.cursor = 'pointer'
      colorElement.title = 'Нажмите для копирования'
      colorElement.onclick = () => copyToClipboard(hexColor)
      colorElement.appendChild(document.createTextNode(`${hexColor}, h: ${h}, s: ${s}, l: ${l}`))
      paletteContainer.appendChild(colorElement)
    }
  }, [copyToClipboard])

  const init = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      const { color, rgbList, hslList } = await extractColors({
        src, colorAmount, colorGroup,
      })

      drawInterface(color, rgbList, hslList)
    } catch (e) {
      setError('Ошибка при обработке изображения')
      setBackgroundColor(fallbackBackgroundColor)
    } finally {
      setIsLoading(false)
    }
  }, [colorAmount, colorGroup, drawInterface, src])

  const useOverlay = () => backgroundColor && (backgroundColor !== fallbackBackgroundColor)

  useEffect(() => {
    init()
  }, [init])

  return (
    <div className="flex flex-col relative group bg-gray-700/30 rounded-xl overflow-hidden border border-gray-600/50 hover:border-gray-500 transition-all duration-200">
      {/* Кнопка удаления */}
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          className="absolute top-3 right-3 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white rounded-full w-8 h-8 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 z-10 border-0 outline-none shadow-lg"
          aria-label="Удалить изображение"
        >
          <span className="text-xl font-bold leading-none">×</span>
        </button>
      )}

      {/* Изображение с индикацией загрузки */}
      <div className="relative bg-gray-800">
        {isLoading && (
          <div className="absolute inset-0 bg-gray-800/80 flex items-center justify-center z-10 backdrop-blur-sm">
            <div className="animate-spin border-4 border-green-500 border-t-transparent rounded-full w-10 h-10" />
          </div>
        )}
        <img
          id={getImageID(id)}
          src={src}
          alt={`Изображение ${id + 1}`}
          className="w-full h-auto object-cover"
        />
      </div>

      <div className="p-4 space-y-4">
        {/* Основной цвет с возможностью копирования */}
        <div
          style={{ backgroundColor: backgroundColor ?? '' }}
          className={clsx(
            'rounded-lg px-4 py-3 text-base font-medium cursor-pointer relative transition-all duration-200 shadow-md hover:shadow-lg',
            useOverlay() && 'button-overlay',
            copied && 'ring-2 ring-green-400 ring-offset-2 ring-offset-gray-700',
          )}
          onClick={() => backgroundColor && copyToClipboard(backgroundColor)}
          role="button"
          tabIndex={0}
          onKeyDown={e => {
            if ((e.key === 'Enter' || e.key === ' ') && backgroundColor) {
              e.preventDefault()
              copyToClipboard(backgroundColor)
            }
          }}
          title={copied ? 'Скопировано!' : 'Нажмите для копирования цвета'}
        >
          <span style={{ color: textColor }} className="button-text font-mono text-sm">
            {copied ? '✓ Скопировано!' : backgroundColor}
          </span>
        </div>

        {/* Сообщение об ошибке */}
        {error && (
          <div className="text-red-400 text-sm font-medium px-2">{error}</div>
        )}

        {/* Палитра цветов */}
        <div ref={paletteRef} className={clsx('box-container', { hidden: !palette })} />
      </div>
    </div>
  )
}

export const Tile = memo(TileForMemo)
