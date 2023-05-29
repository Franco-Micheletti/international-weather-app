import { useEffect, useState } from 'react'
import { convertKelvinToCelsius, convertKelvinToFarenheit } from '../utils/temperatureConverter'

export const Search = () => {
  const [city, setCity] = useState('Roldan')
  const [coordinates, setCoordinates] = useState({ lat: 0, lon: 0 })
  const [weather, setWeather] = useState('')
  const [countryCode, setCountryCode] = useState('AR')
  const [temperature, setTemperature] = useState('')

  useEffect(() => {
    const getCordinates = async () => {
      const urlGeo = 'https://api.openweathermap.org/geo/1.0/direct?q='
      const response = await fetch(`${urlGeo}${city},${countryCode}&limit=1&appid=${import.meta.env.VITE_API_KEY}`)
      const json = await response.json()
      console.log(json)
      setCoordinates({
        lat: json[0].lat,
        lon: json[0].lon
      })
    }

    getCordinates()
  }, [])

  useEffect(() => {
    if (!coordinates) return

    const getWeather = async () => {
      const urlWeather = 'https://api.openweathermap.org/data/2.5/weather?'
      const lat = coordinates.lat
      const lon = coordinates.lon
      const response = await fetch(`${urlWeather}lat=${lat}&lon=${lon}&appid=${import.meta.env.VITE_API_KEY}`)
      const json = await response.json()
      console.log(json)
      setWeather(json.weather[0].main)
      setTemperature(json.main.temp)
    }

    getWeather()
  }, [coordinates])
  return (
    <div>
      {
      city && coordinates.lon
        ? (
          <section>
            <div>Coordinates: {coordinates.lon}</div>
            <div>Coordinates: {coordinates.lat}</div>
            <div>Weather: {weather}</div>
            <div>Temperature in Kelvin: {temperature}</div>
            <div>Temperature in Farenheit: {convertKelvinToFarenheit(temperature)}</div>
            <div>Temperature in Celsius: {convertKelvinToCelsius(temperature)}</div>
          </section>
          )
        : <></>
      }
    </div>
  )
}
