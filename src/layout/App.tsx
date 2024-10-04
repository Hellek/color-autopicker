import { ColorAutoPicker } from '@components/ColorAutoPicker/ColorAutoPicker'

import DefaultLayout from './DefaultLayout'

// eslint-disable-next-line arrow-body-style
export const App = () => {
  return (
    <DefaultLayout loading={false}>
      <ColorAutoPicker />
    </DefaultLayout>
  )
}
