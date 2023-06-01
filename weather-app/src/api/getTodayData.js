export const getTodayData = async (lat, lon) => {
  const urlWeather = 'https://api.openweathermap.org/data/2.5/weather?'
  const response = await fetch(`${urlWeather}lat=${lat}&lon=${lon}&appid=${import.meta.env.VITE_API_KEY}`)
  const json = await response.json()

  return json
}
