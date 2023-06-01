export const convertMsToKmph = (meters) => {
  const km = (meters * 3.6).toFixed(0)
  return km
}

export const convertMsToMph = (meters) => {
  const milesPerHour = (meters * 2.237).toFixed(0)
  return milesPerHour
}
