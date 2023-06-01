export const convertTimeStampToDatetime = (timestamp) => {
  const date = new Date(timestamp * 1000)
  const formattedTime = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
  return formattedTime
}
