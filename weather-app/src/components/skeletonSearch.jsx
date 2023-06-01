import '../css/skeleton.css'

export const SkeletonSearch = ({ city, country }) => {
  return (
    <section>
      <div className='text-white h-52 w-screen bg-slate-900 text-2xl justify-center items-center flex'>
        <div className='p-6 flex flex-wrap just text-center'>Weather in {city}, {country}</div>
      </div>
      <div className='p-6 flex bg-gray-300 w-screen h-screen text-white shadow-md'>
        <div className='shadow-xl p-7 bg-white h-fit w-full flex flex-col text-black justify-center rounded-lg items-center'>
          <div className='justify-center flex mb-2 font-bold text-2xl skeleton-item' />
          <div className='flex justify-center p-1 mb-5 skeleton-item w-96 h-5 rounded-lg' />
          <div className='flex gap-5 justify-center flex-wrap'>
            <div style={{ width: '295px' }} className='skeleton-item p-5 h-48 flex gap-5 justify-center items-center rounded-lg' />
            <div style={{ width: '218px' }} className='skeleton-item p-5 rounded-lg h-48' />
          </div>
        </div>
      </div>
    </section>
  )
}
