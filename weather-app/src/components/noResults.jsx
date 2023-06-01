import React from 'react'

export const NoResults = ({ city, country }) => {
  return (
    <section>
      <div className='text-white h-52 w-screen bg-slate-900 text-2xl justify-center items-center flex'>
        <div className='p-6 flex flex-wrap just text-center'>Weather in {city}, {country}</div>
      </div>
      <div className='p-6 flex bg-gray-300 w-screen h-screen text-black shadow-md justify-center'>
        <div className='bg-white w-fit h-fit p-5 rounded-lg text-md font-medium'>
          <div className='flex flex-col justify-center items-center gap-5 p-5'>
            <div><img width='80px' height='80px' src='/images/not-found.png' /></div>
            <div>No results found for the country and city name provided</div>
          </div>
        </div>
      </div>
    </section>
  )
}
