import { Tile } from './Tile'

export const ColorAutoPicker = ({
  palette,
  colorAmount,
  colorGroup,
  imageSources,
  onRemoveImage,
}: {
  palette: boolean
  colorAmount: number
  colorGroup: number
  imageSources: string[]
  onRemoveImage?: (index: number) => void
}) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
    {imageSources.map((src, i) => (
      <Tile
        key={src}
        id={i}
        src={src}
        palette={palette}
        colorAmount={colorAmount}
        colorGroup={colorGroup}
        onRemove={onRemoveImage ? () => onRemoveImage(i) : undefined}
      />
    ))}
  </div>
)
