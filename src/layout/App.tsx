import { useState } from 'react'

import { ColorAutoPicker } from '@components/ColorAutoPicker/ColorAutoPicker'

import DefaultLayout from './DefaultLayout'

export const App = () => {
  const [palette, setPalette] = useState(false)
  const [colorAmount, setColorAmount] = useState(20)
  const [colorGroup, setColorGroup] = useState(40)
  const [isStarted, setIsStarted] = useState(false)
  const [ownFileSrc, setOwnFileSrc] = useState<string>()

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
            Палитра
          </label>

          <label className="flex">
            <input type="number" className="max-w-[32px] mr-2" value={colorAmount} onChange={e => setColorAmount(Number(e.target.value))} />
            Amount
          </label>

          <label className="flex">
            <input type="number" className="max-w-[32px] mr-2" value={colorGroup} onChange={e => setColorGroup(Number(e.target.value))} />
            Group
          </label>

          <button
            type="button"
            onClick={() => setIsStarted(true)}
          >
            Start
          </button>
        </div>
        <div>
          <label className="flex">
            <span className="bg-green-800 hover:bg-green-700 px-2 py-1 rounded-md cursor-pointer">Своё изображение</span>
            <input
              type="file"
              className="hidden"
              onChange={e => {
                if (e.target.files) {
                  setOwnFileSrc(URL.createObjectURL(e.target.files[0]))
                  setIsStarted(true)
                }
              }}
            />
          </label>
        </div>
      </div>

      {isStarted && (
        <ColorAutoPicker
          palette={palette}
          colorAmount={colorAmount}
          colorGroup={colorGroup}
          ownFileSrc={ownFileSrc}
        />
      )}
    </DefaultLayout>
  )
}
