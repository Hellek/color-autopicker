import { useState } from 'react'

import { ColorAutoPicker } from '@components/ColorAutoPicker/ColorAutoPicker'

import DefaultLayout from './DefaultLayout'

// eslint-disable-next-line arrow-body-style
export const App = () => {
  const [palette, setPalette] = useState(false)
  const [colorAmount, setColorAmount] = useState(20)
  const [colorGroup, setColorGroup] = useState(40)
  const [isStarted, setIsStarted] = useState(false)

  return (
    <DefaultLayout loading={false}>
      <div className="py-4 px-1 flex flex-wrap items-center gap-6">
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

      {isStarted && (
        <ColorAutoPicker
          palette={palette}
          colorAmount={colorAmount}
          colorGroup={colorGroup}
        />
      )}
    </DefaultLayout>
  )
}
