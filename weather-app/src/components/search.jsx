import { useEffect, useState } from 'react'
import { convertKelvinToCelsius, convertKelvinToFarenheit } from '../utils/temperatureConverter'
import { useSearchParams } from 'react-router-dom'
import { getCountryCode } from '../utils/getCountryCode'
import { getTodayData } from '../api/getTodayData'
import { convertMsToKms } from '../utils/unitsConverter'
import { convertTimeStampToDatetime } from '../utils/converTimestampToDatetime'
import { SkeletonSearch } from './skeletonSearch'

export const Search = () => {
  // const [city, setCity] = useState('Roldan')
  const [coordinates, setCoordinates] = useState({ lat: 0, lon: 0 })
  const [searchParams, setSearchParams] = useSearchParams()
  const [loading, setLoading] = useState(true)
  const [today, setToday] = useState({
    weather: '',
    sunrise: '',
    sunset: '',
    temperatureKelvin: '',
    temperatureCelsius: '',
    temperatureFarenheit: '',
    feelsLikeKelvin: '',
    feelsLikeCelsius: '',
    feelsLikeFarenheit: '',
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
      setCoordinates({
        lat: json[0].lat,
        lon: json[0].lon
      })
    }

    getCordinates()
  }, [])

  useEffect(() => {
    if (!coordinates) return

    const fetchTodayData = async () => {
      const data = await getTodayData(coordinates.lat, coordinates.lon)
      setToday({
        weather: data.weather[0].main,
        sunrise: convertTimeStampToDatetime(data.sys.sunrise),
        sunset: convertTimeStampToDatetime(data.sys.sunset),
        temperatureKelvin: data.main.temp,
        temperatureCelsius: convertKelvinToCelsius(data.main.temp),
        temperatureFarenheit: convertKelvinToFarenheit(data.main.temp),
        feelsLikeKelvin: data.main.feels_like,
        feelsLikeCelsius: convertKelvinToCelsius(data.main.feels_like),
        feelsLikeFarenheit: convertKelvinToFarenheit(data.main.feels_like),
        humidity: data.main.humidity,
        pressure: data.main.pressure,
        windSpeed: convertMsToKms(data.wind.speed),
        windGust: convertMsToKms(data.wind.gust)
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
        : city && country && coordinates.lon && today
          ? (
            <section>
              <div className='text-white h-52 w-screen bg-slate-900 text-2xl justify-center items-center flex'>
                <div className='p-6 flex flex-wrap just text-center'>Weather in {city}, {country}</div>
              </div>
              <div className='p-6 flex bg-gray-300 w-screen h-screen text-white shadow-md'>
                <div className='shadow-xl p-7 bg-white h-fit w-full flex flex-col text-black justify-center rounded-lg'>
                  <div className='justify-center flex mb-2 font-bold text-2xl'>Time Now</div>
                  <div className='flex justify-center p-1 mb-2'>{Date(Date.now()).toString().slice(0, 33)}</div>
                  <div className='flex gap-5 justify-center flex-wrap'>
                    <div className='p-5 w-fit h-54 flex gap-5 justify-center items-center bg-gray-100 rounded-lg'>
                      <img src={`/images/${today.weather.toLowerCase()}.png`} />
                      <div>
                        <div className='font-bold'>Temperature</div>
                        <div className='flex flex-col justify-center items-end'>
                          <div>{parseInt(today.temperatureKelvin).toFixed(0)}°K</div>
                          <div>{today.temperatureFarenheit}°F</div>
                          <div>{today.temperatureCelsius}°C</div>
                        </div>
                      </div>
                      <div>
                        <div className='font-bold'>Feels Like</div>
                        <div className='flex flex-col justify-center items-end'>
                          <div>{parseInt(today.feelsLikeKelvin).toFixed(0)}°K</div>
                          <div>{today.feelsLikeFarenheit}°F</div>
                          <div>{today.feelsLikeCelsius}°C</div>
                        </div>
                      </div>
                    </div>
                    <div className='bg-gray-100 p-5 rounded-lg w-fit h-54'>
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
                        <div className='font-normal'>{today.windSpeed} k/m</div>
                      </div>
                      <div className='flex gap-5 justify-between'>
                        <div className='font-bold'>Sunrise Today:</div>
                        <div className='font-normal'>{today.sunrise}</div>
                      </div>
                      <div className='flex gap-5 justify-between'>
                        <div className='font-bold'>Sunset Today: </div>
                        <div className='font-normal'>{today.sunset}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            )
          : <div>City or country not found</div>}
    </div>
  )
}
