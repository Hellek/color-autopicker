import { useCallback, useRef, useState } from 'react'

type FileUploadAreaProps = {
  onFilesSelected: (files: FileList) => void
  hasFiles: boolean
  accept?: string
  multiple?: boolean
  fileCount?: number
  onClearAll?: () => void
}

export const FileUploadArea = ({
  onFilesSelected,
  hasFiles,
  accept = 'image/*',
  multiple = true,
  fileCount = 0,
  onClearAll,
}: FileUploadAreaProps) => {
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      onFilesSelected(e.target.files)
    }
  }

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      setIsDragging(false)

      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        onFilesSelected(e.dataTransfer.files)
      }
    },
    [onFilesSelected],
  )

  const handleAreaClick = () => {
    if (!hasFiles && fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.key === 'Enter' || e.key === ' ') && !hasFiles) {
      e.preventDefault()
      fileInputRef.current?.click()
    }
  }

  if (hasFiles) {
    // Компактный вид когда есть изображения
    return (
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`
          flex items-center border-2 border-dashed rounded-xl transition-all duration-200 w-full box-border
          ${isDragging ? 'border-green-500 bg-green-900/20' : 'border-gray-600 bg-gray-700/30'}
        `}
        onClick={handleAreaClick}
        role="button"
        tabIndex={0}
        onKeyDown={handleKeyDown}
      >
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 px-3 sm:px-4 py-[15px] min-w-0">
          <label className="inline-flex items-center cursor-pointer flex-shrink-0">
            <span
              className="inline-flex items-center justify-center px-3 sm:px-4 py-2 bg-green-700 hover:bg-green-600 active:bg-green-800 text-white text-xs sm:text-sm font-medium rounded-lg transition-colors duration-150 whitespace-nowrap"
              onClick={e => e.stopPropagation()}
              onKeyDown={e => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.stopPropagation()
                }
              }}
              role="button"
              tabIndex={0}
            >
              Добавить еще изображения
            </span>
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              multiple={multiple}
              accept={accept}
              onChange={handleFileChange}
            />
          </label>

          {fileCount > 0 && onClearAll && (
            <>
              <div className="hidden sm:block h-6 w-px bg-gray-600/50 flex-shrink-0" />
              <div className="inline-flex items-center gap-2 flex-shrink-0 min-w-0">
                <span className="text-xs text-gray-300 font-medium whitespace-nowrap">
                  Загружено: <span className="text-green-400 font-semibold">{fileCount}</span>
                </span>
                <button
                  type="button"
                  onClick={e => {
                    e.stopPropagation()
                    onClearAll()
                  }}
                  className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-gray-300 bg-gray-600/50 hover:bg-gray-600 border border-gray-500/50 hover:border-gray-500 rounded-lg transition-all duration-150 whitespace-nowrap flex-shrink-0"
                >
                  <span>×</span>
                  <span className="hidden xs:inline">Очистить</span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    )
  }

  // Полноэкранный вид когда нет изображений
  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`
        fixed inset-0 border-2 border-dashed rounded-none transition-all duration-200
        ${isDragging ? 'border-green-500 bg-green-900/20 scale-[1.01]' : 'border-gray-600 bg-gray-700/30'}
        cursor-pointer hover:border-gray-500 hover:bg-gray-700/40
      `}
      onClick={handleAreaClick}
      role="button"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <div className="flex flex-col items-center justify-center h-full px-6 space-y-4">
        <label className="flex flex-col items-center cursor-pointer">
          <span
            className="inline-flex items-center justify-center px-8 py-4 bg-green-700 hover:bg-green-600 active:bg-green-800 text-white text-lg font-medium rounded-lg transition-colors duration-150 shadow-lg hover:shadow-xl text-center"
            onClick={e => e.stopPropagation()}
            onKeyDown={e => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.stopPropagation()
              }
            }}
            role="button"
            tabIndex={0}
          >
            Выбрать изображения для анализа
          </span>
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            multiple={multiple}
            accept={accept}
            onChange={handleFileChange}
          />
        </label>

        <p className="text-base text-gray-400 text-center max-w-lg">
          {isDragging ? 'Отпустите файлы здесь' : 'Перетащите изображения сюда или нажмите для выбора'}
        </p>
      </div>
    </div>
  )
}
