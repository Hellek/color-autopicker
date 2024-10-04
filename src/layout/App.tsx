import { useState } from 'react'

import { ColorAutoPicker } from '@components/ColorAutoPicker/ColorAutoPicker'

import DefaultLayout from './DefaultLayout'

// eslint-disable-next-line arrow-body-style
export const App = () => {
  const [palette, setPalette] = useState(false)
  const [colorAmount, setColorAmount] = useState(30)
  const [colorGroup, setColorGroup] = useState(40)
  const [isStarted, setIsStarted] = useState(false)

  return (
    <DefaultLayout loading={false}>
      <div className="pb-4 flex items-center gap-6">
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

        <input type="Button" onClick={() => setIsStarted(true)} value="Start" />
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
