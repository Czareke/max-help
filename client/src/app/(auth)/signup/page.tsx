import React from 'react'
import { MaxHelp } from '@/components/store/icon'

const Page = () => {
  return (
    <div className='w-3/5 flex mx-auto py-14'>
        <div className='w-full '>
        <div className='flex w-5/6 mx-auto'>
            <p><MaxHelp className='inline'/> MaxHelp</p>
        </div>
        <form className='mt-16 shadow-xl w-2/3 mx-auto py-12'>
            <div className='w-5/6 mx-auto'>
                <p className='text-xl py-2 font-semibold'>Sign Up</p>
                <p className='text-sm'>Just a few steps to your online store</p>
            </div>
            <div className='w-5/6 mx-auto pt-12'>
                <p className='mb-2 text-sm'>Email</p>
                <input type="email" 
                className='flex h-12 w-full rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-neutral-950 placeholder:text-neutral-500 outline-none focus-visible:outline-none focus:ring-0 disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800 dark:bg-neutral-950 dark:ring-offset-neutral-950 dark:file:text-neutral-50 dark:placeholder:text-neutral-400 dark:focus-visible:ring-neutral-300' 
                    />
                <p className=' text-sm mt-7'>Password</p>
                <input type='password'
                className='flex h-12 w-full rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-neutral-950 placeholder:text-neutral-500 outline-none focus-visible:outline-none focus:ring-0 disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800 dark:bg-neutral-950 dark:ring-offset-neutral-950 dark:file:text-neutral-50 dark:placeholder:text-neutral-400 dark:focus-visible:ring-neutral-300'/>
                <p className='mb-2 text-sm'>Username</p>
                <input type="text" 
                className='flex h-12 w-full rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-neutral-950 placeholder:text-neutral-500 outline-none focus-visible:outline-none focus:ring-0 disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800 dark:bg-neutral-950 dark:ring-offset-neutral-950 dark:file:text-neutral-50 dark:placeholder:text-neutral-400 dark:focus-visible:ring-neutral-300' 
                    />
            </div>
            <button className='bg-blue-600 w-5/6 flex justify-center items-center mx-auto text-white py-2 mt-8 rounded-md'>Sign Up</button>
            </form>
        </div>
    </div>

  )
}

export default Page
