import { Tile } from './Tile'

type ImageRecord = {
  name: string
  src: string
}

const imagesList: ImageRecord[] = [
  {
    name: 'tank', src: 'https://s3-alpha-sig.figma.com/img/bbef/7c95/7c207556e213bcdc26c64b14df6f79f4?Expires=1730073600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=p~Mqgrz3QEaC~NOcXFHHYMPTL9nP6Rp8bF92fiEoVFGLBta9fOQRHTrPAN3~~EnyrerFmLdP2xfr1p9-JXTb6srY7Ee45L1oAEgmkceWf1ohSO9U2WsiSwIMH9A6U6hci1ofVgcgpui94KevF76R8SbkYjz4ZA1mie76~1OfjUUtUAhn2qxQix4z3mrPsdKNdlz~Deu8WEjDcfJ7Yhxgo-Jn70bxhcAXJyfJS3PXPlSQ1LfmzGuh6n7eNz1byzk2sIcbOnLA5JDqgZWJRlllmgnphPmchg6RO-WkBbuz1FAv8U~CJs~ESco6pS80LZ5y1Ts9I1WYseO3Jjtn7om92g__',
  },
  {
    name: 'zaiki', src: 'https://s3-alpha-sig.figma.com/img/f347/ace8/39162b18f869d954c82bea0a10fc19a9?Expires=1730073600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Fp4jTJ-oFz0fjxUQ7JgRSTKGWIzZhvFDIgV9X6BkFNCYd9bM9EG~ylJM8jResTP0ii8PTEzWv9e2m~uKezWLDwAccfNJdNEdthGem9~krYOZiuLsGt3gqHWbRuGLrTj7cQCLR7qQgNFXbcuHFSF2c0cbo7nNebXedJQXkd4AV55HiygennCS1Qov8p8aAokYU1zVXaqYL9xC0BDpNrRMV8xDwHfQpWw2EXhFyXJFt90dCs3GG70JvJpkOeit45TZl0j6DPVFdHQd7sYpeVMpttunsbq~pU1K-JBS7WdmfMtaVsXAHbGTGAI-CMAFsr~z0ui-h4FHnEbWlaavpxbCrQ__',
  },
  {
    name: 'neiro', src: 'https://s3-alpha-sig.figma.com/img/1ba8/dcca/08737a119b4c57bca37ffab44ca3b98c?Expires=1730073600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=o2FdQya8GBSU5or60jaSru5ivYYZ5oMMAxrR2T-uncdh8isqwlpA60AfKGqdYBvCr1rYBl3X0os5WYRyjgRlX7moSF6EyvwEZcG2MtT4itAzVa1X3U1L5hRza-9kyhJM-1wDrA7K~xaa29dMlPAIxMnY0kkcRZjGJN7ouKuBUY94vzvnjgIk7mXxW5iKQe3DwF3Pga4VF2Wiw7hUX3POyw7LGtPU18G1uFucziwM6MweLQHm6Yk6R94rPzeFDCzDHu0fYB4kDu7dgVuuqD44qtk~yjkrZ77JK2KW5Z7n6JzXlxrxOCOyi--09donh4vPrppsYcDx2PLXwaGNzAe2vw__',
  },
  {
    name: 'vtb', src: 'https://s3-alpha-sig.figma.com/img/a4a8/8662/b813ad1c69eb8f1fac946e630b8adaae?Expires=1730073600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ZU-ajWdDkELobsfun4yrz-b1Fk7G9qFErB~zomV25IgdCxjvpopFg0CTVyYVmUnxC~FDDhPxxXUIRH6fextHnGhowIWmSs2gNXe8lzhoQEuUkXaST56krw5frSAvfjQqgyHcxYB9TIYtW83sJyKWLoAYtfKZ3qi5c9YZtS2AQ6BJsQR8RgxcHGI5h-uBn0BbFmNB0fhlCW6uYaU8KSGFduYAgaAtcXAW1Nyr3ZgVSNrzBFTO72xjoiTcWC8sFwVnLuoDY6eTDm4XgL31Si306VU4deimYczJCzO6FxvkBl4s51IHJ9TNEfebbnFvK2~ptzhpWpBdoflSkBpXgzuouA__',
  },
  {
    name: 'mega1', src: 'https://s3-alpha-sig.figma.com/img/831e/9df9/ee96e6ee63f6fb359644f4cf3d54b284?Expires=1730073600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=hGNkNlIABNa8VfjIgphh~3Ag6Q5TVrA26gGvCQuGdUAk6G7n-S4nCmqiv1dIrx-ngnDJuH81gWr02Ci5VLdnUrifbP31XaimZBRQwfz4cFKi7M4JCMOmR-~FUv9K1dorrn9Ss6nIltQ9y4EwMaePGMIDsSopewqkk8IvnemwgTrHFXmm~VqSgDr5JNEHttc5ADDQpoaoVbpSVN~zE7LemxsYnx3tTuGwAhAcOj-2GTzbb-rD27QeryA4L02B4XU~aOoHuMbMLG1cmDHVdtfa-wxtvlBW8q1FWOJz6rNw0-4QJdFF9gP3nt-V1ArMpLxZaTXabiDuDuQecgcmzpHXuA__',
  },
  {
    name: 'mega2', src: 'https://s3-alpha-sig.figma.com/img/54d6/f922/648d0b859751ae9d7b66edec4e6075c4?Expires=1730073600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=AzL3~P3~0qclj3WIIC3-3A3OQjLfR~Bb1YOGslPhZt0AE8eNiCGtmGas9WmQxtCuELxQ~5O4vmvOI5pRo6YO-PN-2x2nPGftfSi05FP5OmlUF8sH6aoP36i3KKZgvBrysZchmG8~7glrEpqwgbdiPnyw9ykjYXKLIlI0makRuD2OBCBCY07Lpt0XBrFqMwhtRA~YhsykVe-Jr3azG0TSa~7~-kLFCtk3UYXjseG8rgBm4vsK5Didgn3Yhy4t1QKCSRV9sdP8TV2pwfJhlw5MrdGr6HUwubuNmMDlyF~0KwvE8Kwn~szu1jGuXkWuZCeu8r24pCEPxJu7H-lU-~a-Hg__',
  },
]

export const ColorAutoPicker = ({
  palette,
  colorAmount,
  colorGroup,
  ownFileSrc,
}: {
  palette: boolean
  colorAmount: number
  colorGroup: number
  ownFileSrc?: string
}) => {
  if (ownFileSrc) {
    return (
      <Tile
        keyName="ownFile"
        src={ownFileSrc}
        palette={palette}
        colorAmount={colorAmount}
        colorGroup={colorGroup}
      />
    )
  }

  return (
    <div className="flex flex-wrap">
      {imagesList.map(img => (
        <Tile
          key={img.name}
          keyName={img.name}
          src={img.src}
          palette={palette}
          colorAmount={colorAmount}
          colorGroup={colorGroup}
        />
      ))}
    </div>
  )
}
