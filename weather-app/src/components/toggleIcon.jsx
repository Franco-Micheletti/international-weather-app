import { useState } from 'react'

export const ToggleIcon = (direction) => {
  const [degrees, setDegrees] = useState('')

  if (direction === 'down') {
    setDegrees('0deg')
  } else if (direction === 'up') {
    setDegrees('180deg')
  }
  return (
    <div style={{ rotate: degrees }} className='cursor-pointer flex justify-center items-center'>
      <svg width='30px' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='black'><path d='M15.88 9.29L12 13.17 8.12 9.29c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41l4.59 4.59c.39.39 1.02.39 1.41 0l4.59-4.59c.39-.39.39-1.02 0-1.41-.39-.38-1.03-.39-1.42 0z' /></svg>
    </div>
  )
}
