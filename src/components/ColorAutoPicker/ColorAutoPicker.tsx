import { generateHash } from '@utils'
import { Tile } from './Tile'

export const ColorAutoPicker = ({
  palette,
  colorAmount,
  colorGroup,
  imageSources,
}: {
  palette: boolean
  colorAmount: number
  colorGroup: number
  imageSources: string[]
}) => (
  <div className="flex flex-wrap">
    {imageSources.map((src, i) => (
      <Tile
        key={generateHash()}
        id={i}
        src={src}
        palette={palette}
        colorAmount={colorAmount}
        colorGroup={colorGroup}
      />
    ))}
  </div>
)
