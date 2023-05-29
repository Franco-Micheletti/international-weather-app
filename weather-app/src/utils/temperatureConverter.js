
export const convertKelvinToCelsius = (kelvin) => {
  const celsiusTemp = (kelvin - 273.15).toFixed(0)
  return celsiusTemp
}

export const convertKelvinToFarenheit = (kelvin) => {
  const farenheitTemp = ((kelvin - 273.15) * 5 / 9 + 32).toFixed(0)
  return farenheitTemp
}
