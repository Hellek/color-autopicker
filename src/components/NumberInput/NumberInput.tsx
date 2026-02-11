type NumberInputProps = {
  value: number
  onChange: (value: number) => void
  label: string
  hint?: string
  min?: number
  max?: number
  className?: string
}

export const NumberInput = ({
  value,
  onChange,
  label,
  hint,
  min = 1,
  max = 100,
  className = '',
}: NumberInputProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value)
    if (newValue >= min && newValue <= max) {
      onChange(newValue)
    }
  }

  return (
    <div className={`flex flex-col gap-1 min-w-0 max-w-full ${className}`}>
      <label className="flex items-center gap-2 sm:gap-2.5 min-w-0 max-w-full">
        <input
          type="number"
          className="w-16 px-2.5 py-1.5 bg-gray-600 border border-gray-500 rounded-lg text-center text-sm font-medium text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all flex-shrink-0"
          min={min}
          max={max}
          value={value}
          onChange={handleChange}
        />
        <div className="flex flex-col min-w-0 max-w-full overflow-hidden">
          <span className="text-xs font-medium text-gray-200 leading-tight break-normal">{label}</span>
          {hint && (
            <span className="text-xs text-gray-400 leading-tight mt-0.5 break-normal">
              {hint}
            </span>
          )}
        </div>
      </label>
    </div>
  )
}
