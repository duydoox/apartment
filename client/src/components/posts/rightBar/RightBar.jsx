import React from 'react'
import './rightBar.css'
import Share from './Share/Share'

const RightBar = ({data}) => {
  return (
    <div className='rightBar'>
      <Share data={data}/>
    </div>
  )
}

export default RightBar