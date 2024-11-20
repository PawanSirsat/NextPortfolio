import React from 'react'
import LandingPageNavBar from './components/navbar'

type Props = {
  children: React.ReactNode
}

const layout = ({ children }: Props) => {
  return (
    <div className='felx felx-col py-10 px-10 xl:px-5 container'>
      <LandingPageNavBar />
      {children}
    </div>
  )
}

export default layout
