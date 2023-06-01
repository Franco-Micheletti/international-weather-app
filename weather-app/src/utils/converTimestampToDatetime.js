export const convertTimeStampToDatetime = (timestamp) => {
  const date = new Date(timestamp * 1000)
  const formattedTime = `${date.getUTCHours()}:${date.getUTCMinutes()}:${date.getUTCSeconds()}`
  return formattedTime
}
