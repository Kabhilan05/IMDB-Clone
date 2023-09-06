import React from 'react'


function Banner() {
  return (
    <div className='h-[20vh] md:h-[60vh] bg-center  bg-no-repeat  flex items-end ' style={{backgroundImage : `url(https://wallpapers.com/images/high/cool-naruto-desktop-1ku6fvej5jwhkcd7.webp)`}}>
        <div className='text-center text-xl md:text-3xl  bg-gray-900 bg-opacity-60 p-4 text-white w-full'>
            Naruto
        </div>
    </div>
  )
}

export default Banner

