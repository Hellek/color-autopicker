import {
  useCallback, useEffect, useState,
} from 'react'

import { ColorAutoPicker } from '@components/ColorAutoPicker/ColorAutoPicker'
import { FileUploadArea } from '@components/FileUploadArea'
import { SettingsPanel } from '@components/SettingsPanel'

import DefaultLayout from './DefaultLayout'

export const App = () => {
  const [palette, setPalette] = useState(false)
  const [colorAmount, setColorAmount] = useState(20)
  const [colorGroup, setColorGroup] = useState(40)
  const [imageSources, setImageSources] = useState<string[]>([])

  // Очистка URL объектов при размонтировании или изменении источников
  useEffect(() => () => {
    imageSources.forEach(url => {
      URL.revokeObjectURL(url)
    })
  }, [imageSources])

  const processFiles = useCallback((files: FileList) => {
    const newSources: string[] = []

    for (let index = 0; index < files.length; index++) {
      const f = files[index]
      // Проверяем тип файла
      if (f.type.startsWith('image/')) {
        newSources.push(URL.createObjectURL(f))
      }
    }

    // Добавляем новые файлы к существующим, а не заменяем их
    setImageSources(prevSources => [...prevSources, ...newSources])
  }, [])

  const handleRemoveImage = useCallback(
    (indexToRemove: number) => {
      const newSources = imageSources.filter((_, index) => index !== indexToRemove)

      // Освобождаем URL удаляемого изображения
      URL.revokeObjectURL(imageSources[indexToRemove])
      setImageSources(newSources)
    },
    [imageSources],
  )

  const handleClearAll = useCallback(() => {
    imageSources.forEach(url => {
      URL.revokeObjectURL(url)
    })
    setImageSources([])
  }, [imageSources])

  if (imageSources.length === 0) {
    // Полноэкранный режим когда нет изображений
    return (
      <div className="fixed inset-0 bg-gray-800">
        <FileUploadArea
          onFilesSelected={processFiles}
          hasFiles={false}
          fileCount={0}
          onClearAll={handleClearAll}
        />
      </div>
    )
  }

  // Обычный режим когда есть изображения
  return (
    <DefaultLayout loading={false}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="space-y-4 sm:space-y-6">
          <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 items-stretch lg:items-start">
            <div className="w-full lg:flex-1 lg:max-w-md min-w-0">
              <FileUploadArea
                onFilesSelected={processFiles}
                hasFiles={imageSources.length > 0}
                fileCount={imageSources.length}
                onClearAll={handleClearAll}
              />
            </div>

            <div className="w-full lg:flex-1 min-w-0">
              <SettingsPanel
                palette={palette}
                onPaletteChange={setPalette}
                colorAmount={colorAmount}
                onColorAmountChange={setColorAmount}
                colorGroup={colorGroup}
                onColorGroupChange={setColorGroup}
              />
            </div>
          </div>

          <ColorAutoPicker
            palette={palette}
            colorAmount={colorAmount}
            colorGroup={colorGroup}
            imageSources={imageSources}
            onRemoveImage={handleRemoveImage}
          />
        </div>
      </div>
    </DefaultLayout>
  )
}
