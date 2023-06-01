import { useEffect, useState } from 'react'
import { convertKelvinToCelsius, convertKelvinToFarenheit } from '../utils/temperatureConverter'
import { useSearchParams } from 'react-router-dom'
import { getCountryCode } from '../utils/getCountryCode'
import { getTodayData } from '../api/getTodayData'
import { convertMsToKmph, convertMsToMph } from '../utils/unitsConverter'
import { convertTimeStampToDatetime } from '../utils/converTimestampToDatetime'
import { SkeletonSearch } from './skeletonSearch'
import { NoResults } from './noResults'
import { FiveDaysForecast } from './fiveDaysForecast'

export const Search = () => {
  // const [city, setCity] = useState('Roldan')
  const [coordinates, setCoordinates] = useState({ lat: 0, lon: 0 })
  const [searchParams] = useSearchParams()
  const [loading, setLoading] = useState(true)
  const [units, setUnits] = useState('farenheit')
  const [today, setToday] = useState({
    weather: '',
    sunrise: '',
    sunset: '',
    temperatureKelvin: '',
    feelsLikeKelvin: '',
    humidity: '',
    pressure: '',
    windSpeed: '',
    windGust: ''
  })

  const country = searchParams.get('country' || null)
  const city = searchParams.get('city' || null)

  useEffect(() => {
    const getCordinates = async () => {
      const countryCode = getCountryCode(country)
      const urlGeo = 'https://api.openweathermap.org/geo/1.0/direct?q='
      const response = await fetch(`${urlGeo}${city},${countryCode}&limit=1&appid=${import.meta.env.VITE_API_KEY}`)
      const json = await response.json()
      if (json.length !== 0) {
        setCoordinates({
          lat: json[0].lat,
          lon: json[0].lon
        })
      }
    }

    getCordinates()
  }, [])

  useEffect(() => {
    if (!coordinates || coordinates.lon === 0) return

    const fetchTodayData = async () => {
      const data = await getTodayData(coordinates.lat, coordinates.lon)
      setToday({
        weather: data.weather[0].main,
        sunrise: convertTimeStampToDatetime(data.sys.sunrise),
        sunset: convertTimeStampToDatetime(data.sys.sunset),
        temperatureKelvin: data.main.temp,
        feelsLikeKelvin: data.main.feels_like,
        humidity: data.main.humidity,
        pressure: data.main.pressure,
        windSpeed: data.wind.speed,
        windGust: data.wind.gust
      })
      if (data) {
        setLoading(false)
      }
    }
    fetchTodayData()
  }, [coordinates])
  return (
    <div>
      {loading
        ? <SkeletonSearch city={city} country={country} />
        : city && country && today.weather !== ''
          ? (
            <section>
              <div className='text-white h-52 w-full bg-slate-900 text-2xl justify-center items-center flex'>
                <div className='p-6 flex flex-wrap just text-center'>Weather in {city}, {country}</div>
              </div>
              <div className='p-6 flex flex-col gap-5 bg-gray-300 w-full h-screen text-white shadow-md'>
                <div className='shadow-xl p-7 bg-white h-fit w-full flex flex-col text-black justify-center rounded-lg'>
                  <div className='flex justify-end gap-3'>
                    <div onClick={() => setUnits('farenheit')} className='shadow-md cursor-pointer hover:border border-slate-400 h-8 w-8 p-2 rounded-full bg-gray-100 flex justify-center items-center'>
                      <div
                        style={{ color: units === 'farenheit' ? '#bfbfbf' : 'black' }}
                        className='font-bold'
                      >F°
                      </div>
                    </div>
                    <div onClick={() => setUnits('celsius')} className='shadow-md cursor-pointer hover:border border-slate-400 h-8 w-8 p-2 rounded-full bg-gray-100 flex justify-center items-center'>
                      <div
                        style={{ color: units === 'celsius' ? '#bfbfbf' : 'black' }}
                        className='font-bold text-md'
                      >C°
                      </div>
                    </div>
                  </div>
                  <div className='justify-center flex mb-2 font-bold text-2xl'>Time Now</div>
                  <div className='flex justify-center p-1 mb-2'>
                    {new Date().toUTCString().slice(0, 33)}
                  </div>
                  <div className='flex gap-5 justify-center flex-wrap'>
                    <div className='shadow-lg p-5 w-fit h-54 flex gap-5 justify-center items-center bg-gray-100 rounded-lg'>
                      <div className='flex flex-col justify-center items-center bg-gray-500 rounded-lg p-5'>
                        <img width='42px' height='42px' src={`/images/${today.weather.toLowerCase()}.png`} />
                        <div className='font-medium text-white text-lg'>{today.weather}</div>
                      </div>
                      <div className='flex flex-col'>
                        <div>
                          <div className='font-bold'>Temperature</div>
                          <div className='flex flex-col justify-center items-end'>
                            {units === 'farenheit'
                              ? <div>{convertKelvinToFarenheit(today.temperatureKelvin)}°F</div>
                              : <div>{convertKelvinToCelsius(today.temperatureKelvin)}°C</div>}
                          </div>
                        </div>
                        <div>
                          <div className='font-bold'>Feels Like</div>
                          <div className='flex flex-col justify-center items-end'>
                            {units === 'farenheit'
                              ? <div>{convertKelvinToFarenheit(today.feelsLikeKelvin)}°F</div>
                              : <div>{convertKelvinToCelsius(today.feelsLikeKelvin)}°C</div>}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='shadow-lg bg-gray-100 p-5 rounded-lg w-fit h-54'>
                      <div className='flex gap-5 justify-between'>
                        <div className='font-bold'>Humidity: </div>
                        <div className='font-normal'>{today.humidity} %</div>
                      </div>
                      <div className='flex gap-5 justify-between'>
                        <div className='font-bold'>Pressure: </div>
                        <div className='font-normal'>{today.pressure} Pa</div>
                      </div>
                      <div className='flex gap-5 justify-between'>
                        <div className='font-bold'>Wind Speed: </div>
                        <div className='font-normal'>
                          {units === 'farenheit'
                            ? <div>{convertMsToMph(today.windSpeed)} Mph</div>
                            : <div>{convertMsToKmph(today.windSpeed)} Kph</div>}
                        </div>
                      </div>
                      <div className='flex gap-5 justify-between'>
                        <div className='font-bold'>Sunrise Today:</div>
                        <div className='font-normal'>{today.sunrise} GMT</div>
                      </div>
                      <div className='flex gap-5 justify-between'>
                        <div className='font-bold'>Sunset Today: </div>
                        <div className='font-normal'>{today.sunset} GMT</div>
                      </div>
                    </div>
                  </div>
                </div>
                <FiveDaysForecast />
              </div>
            </section>
            )
          : <NoResults city={city} country={country} />}
    </div>
  )
}
