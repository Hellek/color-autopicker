import './tailwind.css'

import { ReactNode } from 'react'

import { Spinner } from '@components/Spinner'

const DefaultLayout = ({ loading, children }: { loading: boolean, children: ReactNode | ReactNode[] }) => (
  <div className="overflow-y-scroll grow bg-gray-800 text-white px-2 flex flex-col">
    {loading ? (
      <div className="grow flex-center">
        <Spinner />
      </div>
    ) : children}
  </div>
)

export default DefaultLayout
