import { NumberInput } from '../NumberInput/NumberInput'

type SettingsPanelProps = {
  palette: boolean
  onPaletteChange: (value: boolean) => void
  colorAmount: number
  onColorAmountChange: (value: number) => void
  colorGroup: number
  onColorGroupChange: (value: number) => void
}

export const SettingsPanel = ({
  palette,
  onPaletteChange,
  colorAmount,
  onColorAmountChange,
  colorGroup,
  onColorGroupChange,
}: SettingsPanelProps) => (
  <div className="flex flex-wrap items-center gap-2 sm:gap-3 lg:gap-4 px-3 sm:px-4 py-4 bg-gray-700/50 rounded-xl border border-gray-600/50 w-full lg:w-auto lg:flex-1 min-w-0 max-w-full box-border">
    <label className="flex items-center gap-2 sm:gap-2.5 px-2 sm:px-3 py-2 bg-gray-600/30 rounded-lg border border-gray-600/50 cursor-pointer select-none flex-shrink-0">
      <input
        type="checkbox"
        checked={palette}
        onChange={e => onPaletteChange(e.target.checked)}
        className="w-4 h-4 text-green-600 bg-gray-700 border-gray-500 rounded focus:ring-2 focus:ring-green-500 focus:ring-offset-0 cursor-pointer flex-shrink-0"
      />
      <span className="text-xs sm:text-sm font-medium text-gray-200 whitespace-nowrap">Показать палитру</span>
    </label>

    <div className="flex flex-wrap items-center gap-2 sm:gap-3 lg:gap-4 min-w-0 w-full sm:w-auto">
      <NumberInput
        value={colorAmount}
        onChange={onColorAmountChange}
        label="Размер палитры"
        hint="Цветов (1-100)"
        className="min-w-0 max-w-full"
      />

      <NumberInput
        value={colorGroup}
        onChange={onColorGroupChange}
        label="Чувствительность"
        hint="Группировка (1-100)"
        className="min-w-0 max-w-full"
      />
    </div>
  </div>
)
