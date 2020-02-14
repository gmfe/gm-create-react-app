import React, { FC } from 'react'
import C from './c'

interface BProps {
  name: string
}

const B: FC<BProps> = () => {
  return (
    <div>
      page b
      <C name='af' />
    </div>
  )
}

export default B
