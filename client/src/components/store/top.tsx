import React from 'react'
import { MaxHelp } from './icon'
import { User } from 'lucide-react'

const Top = () => {
  return (
    <div className='flex h-[7dvh] px-10 py-3 shadow-md'>
      <div className='flex my-auto'>
        <MaxHelp className='text-blue-600'/>
        <p className='font-semibold text-lg pl-2'>Maxhelp</p>
      </div>
      <div></div>
      <div className='flex ml-auto my-auto items-center justify-center'>
        <p className='text-black/60 text-xs'>Last Data Refresh at: <span className='text-black'>28 Apr 2022 ・ 8:27 PM</span></p>
        <p className='text-xs border border-black/60 py-1 px-4 ml-3 rounded-sm'>Refresh</p>
        <p className='text-xs border border-black/60 py-1 px-4 ml-3 rounded-sm'>Client view</p>
        <User className='mx-5'/>
      </div>
    </div>
  )
}

export default Top
