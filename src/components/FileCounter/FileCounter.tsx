type FileCounterProps = {
  count: number
  onClear: () => void
}

export const FileCounter = ({ count, onClear }: FileCounterProps) => {
  if (count === 0) return null

  return (
    <div className="flex items-center gap-2 mt-2">
      <span className="text-sm text-gray-300">Загружено изображений: {count}</span>
      <button
        type="button"
        onClick={e => {
          e.stopPropagation()
          onClear()
        }}
        className="text-sm text-red-400 hover:text-red-300 underline"
      >
        Очистить все
      </button>
    </div>
  )
}
