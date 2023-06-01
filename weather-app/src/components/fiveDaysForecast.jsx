import { ToggleIcon } from './toggleIcon'
import React, { useState } from 'react'
export const FiveDaysForecast = (lat, lon) => {
  const [showFiveDaysForecast, setShowFiveDaysForecast] = useState(false)
  return (
    <div className='bg-white flex rounded-lg shadow-lg p-4 flex-col'>
      <div className='text-black text-lg font-medium flex justify-between'>
        5-Day Forecast Weather
        {showFiveDaysForecast
          ? <div className='flex items-center' onClick={() => setShowFiveDaysForecast(false)}><ToggleIcon direction='up' /></div>
          : <div className='flex items-center' onClick={() => setShowFiveDaysForecast(true)}><ToggleIcon direction='down' /></div>}
      </div>
      {showFiveDaysForecast
        ? <div className='bg-white h-96 w-full text-black'><div>FORECAST INFO HERE</div></div>
        : <section />}
    </div>

  )
}
