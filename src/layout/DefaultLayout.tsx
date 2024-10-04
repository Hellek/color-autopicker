import './tailwind.css'

import { ReactElement } from 'react'

import { Spinner } from '@components/Spinner'

const DefaultLayout = ({ loading, children }: { loading: boolean, children: ReactElement }) => (
  <div className="grow bg-gray-800 text-white p-4 flex flex-col">
    {loading ? (
      <div className="grow flex-center">
        <Spinner />
      </div>
    ) : children}
  </div>
)

export default DefaultLayout
