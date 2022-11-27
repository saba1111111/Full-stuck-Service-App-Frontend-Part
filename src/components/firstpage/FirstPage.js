import React from 'react'
import {useState, useEffect, useRef } from 'react';
import {ImBin} from "react-icons/im";
import {AiOutlineEdit} from "react-icons/ai";
import data from "./people.json"
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Loader from '../Loader';
import { useDispatch } from 'react-redux';
import { deleteFunc, fetching } from '../../redux/globalDatas';
import AreYouSure from '../AreYouSure';
import useAxios from '../../hooks/useAxios';
import { toast } from 'react-toastify';
 

function FirstPage() {
  const dispatch = useDispatch();
  const {getDatas,postDatas,deleteDatas} = useAxios();
  const persons = useSelector(state => state);
  const [loadeing,setLoading] = useState(false);
  const [datas,setDatas] = useState(persons?.persons);
  const [nameValue,setNameValue] = useState("");
  const [numberValue,setNumberValue] = useState("");
  const [surnameValue,setSurnameValue] = useState("");
  const [EnithingValue,setEnithingValue] = useState("");
  const [areSure,setAreSure] = useState(false);
  const [idOfDeleteItems,setIdOfDeleteItems] = useState(null);
 
  useEffect(() => {
    setDatas(persons.persons);
  },[persons.persons])
  useEffect(() => {
   let newDatas = persons.persons;
    if(persons.persons?.length > 0) {
      if(EnithingValue){
        newDatas = newDatas.filter(a => [a.name,a.surname,a.PersonalNumber].join('').toLocaleLowerCase().includes(EnithingValue.toString().toLocaleLowerCase()))
       }
     if(nameValue){
      newDatas = newDatas.filter(b => b.name.includes(nameValue));
     }
     if(surnameValue){
      newDatas = newDatas.filter(b => b.surname.includes(surnameValue));
     }
     if(numberValue){
      newDatas = newDatas.filter(b => b.PersonalNumber.toString().includes(numberValue));
     }
    }
     setDatas(newDatas);
  },[nameValue,numberValue,surnameValue,EnithingValue])
  useEffect(() => {
    if(areSure) {
     document.body.style.overflowY = "hidden"
    }else{
      document.body.style.overflowY = "visible"
    }
  },[areSure])
  if(persons.status === 'failed' && persons.persons.length === 0) {
     return <p>Error, somthing happen!</p>
  }
 const  nameChange  = (e) => {
  setNameValue(e.target.value);
 }
 const  surnameChange  = (e) => {
   setSurnameValue(e.target.value)
 }
 const numberChange = (e) => {
  setNumberValue(e.target.value);
 }
 const EnithingChange = (e) => {
  setEnithingValue(e.target.value);
 }
 
 const deltete = async () => {
    setLoading(true);
    try {
    await postDatas('http://localhost:8080/deletePerson',{values: {_id: idOfDeleteItems},auth: {token: localStorage.getItem("token"),userId: localStorage.getItem("userId"),expireDate: localStorage.getItem("expireDate")}})
    setTimeout(() => {
      dispatch(fetching());
    },300)
    }catch(err){
      toast.error(err.response.data.errors);
    }
    setLoading(false);
 }

  return (
    <>
   {areSure && <AreYouSure setAreSure={setAreSure} deltete={deltete}/>} 
    <div className=''>
        {/* filter part */}
        <div className='w-[90%] min-h-[80px] bg-[rgb(127,140,141)] mx-[auto]  mt-[30px] mb-[15px] flex  items-center justify-evenly text-center md:w-[100%] sm:flex-col sm:items-start sm:p-[10px]' >
        <div className='mr-[10px] sm:mb-[20px]' >
               <label className='text-[18px]' >Search Anything</label>
               <input onChange={EnithingChange} value={EnithingValue} className='w-[15vw] min-w-[170px] py-[5px] pl-[7px]  ml-[5px] rounded-[10px]' type="text" placeholder="Search Enithing" />
           </div>
           <div className='mr-[10px] sm:mb-[20px]' >
               <label className='text-[19px] ' >Name:</label>
               <input onChange={nameChange}  value={nameValue} className='w-[15vw] min-w-[90px] py-[5px] pl-[7px]  ml-[5px] rounded-[10px] sm:min-w-[170px]' type="text" placeholder="your name" />
           </div>
           <div className='mr-[10px] sm:mb-[20px]' >
               <label className='text-[19px]' >Surname:</label>
               <input onChange={ surnameChange} value={surnameValue} className='w-[15vw] min-w-[110px] py-[5px] pl-[7px] ml-[5px] rounded-[10px] sm:min-w-[170px]' type="text" placeholder="your Surname" />
           </div>
           <div className='mr-[10px] sm:mb-[20px]' >
               <label className='text-[18px]' >Personal Number:</label>
               <input onChange={numberChange} value={numberValue} className='w-[15vw] min-w-[170px] py-[5px] pl-[7px]  ml-[5px] rounded-[10px]' type="text" placeholder="your Personal Number" />
           </div>
           
        </div>
       
    {/* table part */}
        <div className='mokle  mx-[auto] my-[0] md:w-[95%] sm:w-[370px] ' >

      <table className='w-[99%] text-center  font-bold table-1'>
          <thead>
          <tr>
              <th className='w-[18%] bg-[#2c3e50] text-[#f1c40f] p-[5px] py-[10px] m-[5px]' >Name</th>
              <td className='w-[1%]' ></td>
              <th className='w-[18%] bg-[#2c3e50] text-[#f1c40f]' >Surname</th>
              <td className='w-[1%]' ></td>
              <th className='w-[18%] bg-[#2c3e50] text-[#f1c40f]' >Personal Number</th>
              <td className='w-[1%]' ></td>
              <th className='w-[18%] bg-[#2c3e50] text-[#f1c40f]'>Details</th>
              <td className='w-[1%]' ></td>
              <th className='w-[9%] bg-[#2c3e50] text-[#f1c40f]'>Delete</th>
              <td className='w-[1%]' ></td>
              <th className='w-[9%] bg-[#2c3e50] text-[#f1c40f]'>Edit</th>
          </tr>
          </thead>
         {persons.status !== 'loading' && (
          <tbody   className='' >
        {  datas.map((a,index) => {
        return (
          <tr key={index}  >
          <td  className="border-[1px] p-[5px] border-black" >{a.name}</td>
          <td className='w-[1%]' ></td>
              <td  className="border-[1px] p-[5px] border-black" > {a.surname}</td>
              <td  className='w-[1%]' ></td>
              <td  className="border-[1px] p-[5px] border-black" >{a.PersonalNumber}</td>
              <td  className='w-[1%]' ></td>
              <td  className="border-[1px] p-[5px] border-black cursor-pointer " ><Link to={`/details/${a._id}`} ><p>details</p></Link></td>
              <td  className='w-[1%]' ></td>
              <td onClick={() => {setAreSure(true);setIdOfDeleteItems(a._id)}} className="border-[1px] p-[11px] border-black cursor-pointer flex justify-center" ><ImBin  className='text-red-500 text-center'  /></td>
              <td  className='w-[1%]' ></td>
              <td className="border-[1px] pt-[7px] pb-[11px]  border-black cursor-pointer flex justify-center items-center"><Link to={`/edit/${a._id}`} ><AiOutlineEdit className='text-[#2980b9] text-center w-[20px] h-[20px] bg-black'  /></Link></td>
              </tr>
              )})}
            </tbody>
        )} 
        
      </table> 
      {persons.status === 'loading' && <div><Loader /></div>}
      {/* There is no such person part */}
       {datas.length <= 0 && <div className=' text-[25px] mt-[40px] flex justify-center' > <p className='' >There is no such person, Try again! </p><p className='rotate-[90deg] text-red-700 ml-[30px] pt-[10px]' >:&#41;</p></div>} 
      </div>
    </div>
    </>
  )
}

export default FirstPage
