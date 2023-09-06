import React, { useState } from 'react'

function Pagination(props) {
  let {pageNum,onNext,onPrev} = props

  return (
    <div className='flex justify-center my-4'>
        <div onClick={onPrev} className='border-2 border-r-0 p2 rounded-l-xl border-blue-400' >
            <button>Previous Button</button>
        </div>
        <div className='border-2 border-r-0 border-blue-400'>
            {pageNum}
        </div>
        <div onClick={onNext} className='border-2 p2 rounded-r-xl border-blue-400'>
            <button>Next Button</button>
        </div>
    </div>
  )
}

export default Pagination