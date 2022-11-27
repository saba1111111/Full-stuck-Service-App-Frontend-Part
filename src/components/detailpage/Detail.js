import React from 'react'
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import {useNavigate, useParams} from "react-router-dom";
import Loader  from '../Loader';
function Detail() {
  const { innerWidth, innerHeight } = useScreenSize();
  const {persons,status} = useSelector(state => state);
  const params = useParams();
  
  let filteredPerso = persons.filter(person => person._id === params.userId);
  if(status === 'loading') {
    return <div className='mt-[15%]'><Loader /></div>
  }
  if(filteredPerso.length === 0) {
    return (
      <h1 className='mt-[200px] text-center text-[30px] font-bold' >Error, Go back to Home page! <span className='text-red-500'>:&#41;</span></h1>
    )
  }
  
  return (
    <div>
    <div className={innerWidth >= 694 ?  "w-[80%] text-center  border-black mx-[auto] my-[60px]" : "hidden" }>
    <table className='' >
      <thead className='' >
       <tr className='' >
         <th className='w-[13%] tds' >Name</th>
         <th className='w-[13%] tds' >Surname</th>
         <th className='w-[13%] tds'>Personal Number</th>
         <th className='w-[13%] tds'>Country</th>
         <th className='w-[13%] tds'>City</th>
         <th className='w-[13%] tds'>profesion</th>
         <th className='w-[13%] tds'>age</th>
       </tr>
      </thead>
      { filteredPerso.length > 0 &&
      <tbody>
        <tr>
          <td className='tds' >{filteredPerso[0].name}</td>
          <td className='tds' >{filteredPerso[0].surname}</td>
          <td className='tds' >{filteredPerso[0].PersonalNumber}</td>
          <td className='tds' >{filteredPerso[0].country}</td>
          <td className='tds' >{filteredPerso[0].city}</td>
          <td className='tds' >{filteredPerso[0].profesion}</td>
          <td className='tds' >{filteredPerso[0].age}</td>
        </tr>
      </tbody>
       }
    </table>
    </div>
    { filteredPerso.length > 0 &&
    <div className={innerWidth <= 694 ?  "w-[80%] text-center  border-black mx-[auto] my-[50px]" : "hidden" }>
    <table className='' >
      <thead className='' >
       <tr className='' >
         <th className='w-[13%] tds' >Name</th>
         <td className='tds' >{filteredPerso[0].name}</td>
       </tr>
       <tr className='' >
         <th className='w-[13%] tds' >Surname</th>
         <td className='tds' >{filteredPerso[0].surname}</td>
       </tr>
       <tr className='' >
         <th className='w-[13%] tds' >Personal Number</th>
         <td className='tds' >{filteredPerso[0].PersonalNumber}</td>
       </tr>
       <tr className='' >
       <th className='w-[13%] tds'>Country</th>
       <td className='tds' >{filteredPerso[0].country}</td>
       </tr>
       <tr className='' >
       <th className='w-[13%] tds'>City</th>
       <td className='tds' >{filteredPerso[0].city}</td>
       </tr>
       <tr className='' >
       <th className='w-[13%] tds'>profesion</th>
       <td className='tds' >{filteredPerso[0].profesion}</td>
       </tr>
       <tr className='' >
         <th className='w-[13%] tds' >age</th>
         <td className='tds' >{filteredPerso[0].age}</td>
       </tr>
       
      </thead> 
    </table>
    </div> }
    { filteredPerso.length > 0 &&
     <div  className='my-[100px] mx-[40px] font-bold text-[20px]'  >
     {filteredPerso[0].name}  {filteredPerso[0].surname} was born in {filteredPerso[0].country}, {filteredPerso[0].city}. he is {filteredPerso[0].age} years old {filteredPerso[0].profesion}. If you want more information about  {filteredPerso[0].name}  {filteredPerso[0].surname}, contact him to the number {filteredPerso[0].PersonalNumber}.
     </div> }
    
   </div>
  )
}

export default Detail




const current = () => {
    const {innerWidth, innerHeight} = window;
    return {
      innerWidth,
      innerHeight
    }
  }
const useScreenSize = () => {
    const [change, setChange] = useState(current());
    useEffect(() => {
      window.addEventListener("resize", handlsize);
      return () => window.removeEventListener("resize", handlsize);
    },[])
    const handlsize = () => {
      setChange(current());
    }
    return change;
}

