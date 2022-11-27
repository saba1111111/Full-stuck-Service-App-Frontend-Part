import React,{useRef} from 'react'
import { useClickAway } from 'react-use';

function AreYouSure({setAreSure,deltete}) {
  const ref = useRef(null);
  const submit = () => {
    deltete();
    setAreSure(false)
  }
 
useClickAway(ref, () => {
  setAreSure(false)
	});
  return (
    <div  className='fixed left-0 w-[100%]  h-[100%] top-0 bg-[#c9c9c999] text-[18px] cursor-pointer'>
      <div ref={ref} className='max-w-[400px]  min-h-[200px] border-[1px] mx-[auto] mt-[15%] flex flex-col justify-center items-center bg-gray-400 rounded-[10px]'>
      <p className='mb-[30px]'>Are you sure ?</p>
      <div onClick={submit} className='w-[90%] mb-[10px] mx-[auto] bg-blue-500 grid place-content-center rounded-[10px] text-[16px] py-[10px] text-white cursor-pointer'>confirm</div>
      <div className='underline cursor-pointer' onClick={() => setAreSure(false)}>cancel</div>
      </div>
    </div>
  )
}

export default AreYouSure
