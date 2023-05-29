import { useEffect, useState } from 'react'
import '../css/earthGlobeAnimation.css'

export const Home = () => {
  const [country, setCountry] = useState('')
  const [city, setCity] = useState('')

  return (
    <section className='pd-5 flex flex-col justify-center items-center'>
      <div className='w-screen h-44 bg-slate-900 flex justify-center'>
        <div className='mt-12 text-3xl font-medium text-white'>Storm Scanner</div>
      </div>
      <div className=' bg-gray-300 h-96 w-screen justify-center justify-items-center grid'>
        <div className='globe-image z-10 mb-12' />
        <div className='flex flex-col gap-5 -mt-12'>
          <label className='text-lg font-medium'>Country</label>
          <input onChange={(e) => { setCountry(e.target.value) }} value={country} type='text' placeholder='Country' className='p-5 w-4/4 h-5 bg-slate-100 rounded-lg' />
          <label className='text-lg font-medium'>City</label>
          <input onChange={(e) => { setCity(e.target.value) }} value={city} type='text' placeholder='City' className='p-5 w-4/4 h-5 bg-slate-100 rounded-lg' />
        </div>
        <div>
          <button className='hover:bg-slate-400 hover:text-white cursor-pointer rounded-lg font-bold h-12 w-32 bg-gray-100 text-lg shadow-sm'>Search</button>
        </div>
      </div>
      <div className='w-screen h-96 bg-gray-300' />
    </section>
  )
}
