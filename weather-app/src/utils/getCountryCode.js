import { isoCodes } from './isoCodes'

export const getCountryCode = (countryName) => {
  for (let i = 0; i < isoCodes.length; i++) {
    const object = isoCodes[i]

    if (object.name.toLowerCase() === countryName.toLowerCase()) {
      return object.code
    }
  }

  return 'Not Found'
}
