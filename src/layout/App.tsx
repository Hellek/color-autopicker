import { useState } from 'react'

import { ColorAutoPicker } from '@components/ColorAutoPicker/ColorAutoPicker'

import DefaultLayout from './DefaultLayout'

export const App = () => {
  const [palette, setPalette] = useState(false)
  const [colorAmount, setColorAmount] = useState(20)
  const [colorGroup, setColorGroup] = useState(40)
  const [imageSources, setimageSources] = useState<string[]>([])

  return (
    <DefaultLayout loading={false}>
      <div className="py-4 px-1 flex flex-wrap items-center justify-between">
        <div className="flex flex-wrap items-center gap-6">
          <label className="flex">
            <input
              type="checkbox"
              checked={palette}
              onChange={() => setPalette(!palette)}
            />
            Show palette
          </label>

          <label className="flex">
            <input type="number" className="max-w-[32px] mr-2" value={colorAmount} onChange={e => setColorAmount(Number(e.target.value))} />
            Max palette size
          </label>

          <label className="flex">
            <input type="number" className="max-w-[32px] mr-2" value={colorGroup} onChange={e => setColorGroup(Number(e.target.value))} />
            Palette algo sensivity
          </label>
        </div>
        <div>
          <label className="flex">
            <span className="bg-green-800 hover:bg-green-700 px-2 py-1 rounded-md cursor-pointer">Download images</span>
            <input
              type="file"
              className="hidden"
              multiple
              onChange={e => {
                if (e.target.files) {
                  const { files } = e.target
                  const sources: string[] = []

                  for (let index = 0; index < files.length; index++) {
                    const f = files[index]
                    sources.push(URL.createObjectURL(f))
                  }

                  setimageSources(sources)
                }
              }}
            />
          </label>
        </div>
      </div>

      {imageSources.length > 0 && (
        <ColorAutoPicker
          palette={palette}
          colorAmount={colorAmount}
          colorGroup={colorGroup}
          imageSources={imageSources}
        />
      )}
    </DefaultLayout>
  )
}
