import React,{useState} from 'react';
import { useDispatch } from 'react-redux';
import { posting,fetching } from '../../redux/globalDatas';
import {useNavigate} from "react-router-dom";
import {FaExclamationCircle} from "react-icons/fa";
import ReactTooltip from "react-tooltip";
import { Formik, Form, useField } from 'formik';
import Loader from '../Loader';
import * as Yup from 'yup';
import useAxios from '../../hooks/useAxios';
import { toast } from 'react-toastify';
const validateSchema =  Yup.object({
  name: Yup.string().required("required"),
  surname: Yup.string().required("required"),
  PersonalNumber: Yup.number().typeError('Must be a number!').required("required numbers!"),
  country: Yup.string().required("required"),
  city: Yup.string().required("required"),
  profesion: Yup.string().required("required"),
  age: Yup.number().typeError('Must be a number!').required("required numbers! ")
})

function AddClients() {
  const [loadeing,setLoading] = useState(false);
  const {getDatas,postDatas} = useAxios();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onSubmit = async (values) => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const expireDate = localStorage.getItem("expireDate");
    try {
    setLoading(true);
     await postDatas('http://localhost:8080/addPerson',{values: values,auth: {token: token,userId: userId,expireDate: expireDate}})
     toast.success("Add succesfully!");
    setTimeout(() => {
      dispatch(fetching());
      navigate('/');
      setLoading(false);
    },1100)
  }catch(err) {
    navigate("/login");
    toast.error('Operation Failed! try again, make sure you are sign in!');
  }
  }
   if(loadeing) {
   return  <div className='mt-[100px]'><Loader /></div>
   }
  return (
    <Formik
initialValues={{
  name: "",
  surname: "",
  PersonalNumber: '',
  country: '',
  city: '',
  profesion: '',
  age: ''
}}
onSubmit={(values) => onSubmit(values)}
validationSchema={validateSchema}
>
  <ReusableForm loadeing={loadeing} />
    </Formik>
  )
}


export default AddClients

const Reusable = ({label,...props}) => {
    const [Field,meta] = useField(props);
  return (
    <>
    <label htmlFor={props.id} >{label}</label>
    <input {...Field} {...props} />
    {meta.touched && meta.error ? <p className='text-red-500' >{meta.error}</p> : <p>{""}</p>}
    </>
  )
}



export const  ReusableForm = ({loadeing}) => {
  return (
<Form>
    <div className='flex flex-col' > 
     {/* first row */}
    <div className='flex mb-[50px] md:mb-[20px] mt-[50px] justify-evenly md:flex-col md:mx-[auto]' >
      {/* name */}
       <div className='md:mb-[20px]' >
         <div className='flex items-center' >
         <p className='text-[20px] mr-[20px]' >Type client's name:</p>
         <FaExclamationCircle className='w-[20px] h-[20px] mt-[5px] cursor-pointer' data-for="type" data-tip="Name shuld only contain letters, not numbers and spaces!" />
         <ReactTooltip backgroundColor='black' textColor="white" effect="solid" id="type" class='w-[200px]' place="right" />
         </div>
         <Reusable  name="name" id="name" type="text" placeholder="name" className='border-[1px] border-black p-[10px] rounded-[10px] mt-[10px] nameRed' />
       </div>
       {/* clients surname */}
       <div className='flex flex-col md:mb-[20px]' >
        <div className='flex' >
         <p>Type client's surname</p>
         <FaExclamationCircle data-for="surname" data-tip="Name shuld only contain letters, not numbers and spaces!" className='w-[20px] h-[20px] mt-[5px] cursor-pointer ml-[30px]' />
          <ReactTooltip id="surname" backgroundColor='black' textColor='white' effect="solid" class='w-[200px]' place="right" />
         </div>
          <Reusable  name="surname" id="surname" type="text" placeholder="surname" className='border-[1px] border-black p-[10px] rounded-[10px] mt-[10px] nameRed' />
       </div>
       {/* personal number */}
       <div>
        <div className='flex  ml-[-20px] ' >
         <p>Type client's personal number</p>
         <FaExclamationCircle data-for="number" data-tip="personal number's length must be 11 and shuld only contain numbers!" className='w-[20px] h-[20px] mt-[5px] cursor-pointer ml-[10px]' />
         <ReactTooltip id="number" backgroundColor="black" textColor='white' class='w-[200px]' effect="solid" place="right" />
         </div>
          <Reusable  name="PersonalNumber" id="number" type="text" placeholder="number" className='border-[1px] border-black p-[10px] rounded-[10px] mt-[10px] nameRed' />
       </div>

      </div> 
     {/* socond row */}
      <div className='flex mb-[40px] md:mb-[20px] justify-evenly md:flex-col md:mx-[auto]' >
        {/* country */}
      <div className='md:mb-[20px]' >
        <div className='flex' > 
         <h1>Type client's country</h1>
         <FaExclamationCircle className='w-[20px] h-[20px] mt-[5px] cursor-pointer ml-[30px]' data-for="country" data-tip="Name shuld only contain letters, not numbers and spaces!" />
         <ReactTooltip class='w-[200px]' id="country" place="right" effect='solid' backgroundColor='black' textColor='white' />
         </div>
         <Reusable  name="country" id="country" type="text" placeholder="country" className='border-[1px] border-black p-[10px] rounded-[10px] mt-[10px] ' />
       </div>
       {/* city */}
       <div className='md:mb-[20px]' >
        <div className='flex' >
         <p>Type client's city</p>
         <FaExclamationCircle className='w-[20px] h-[20px] mt-[5px] cursor-pointer ml-[50px]' data-for="city" data-tip="city shuld only contain letters, not numbers and spaces!" />
         <ReactTooltip class='w-[200px]' id="city" place="right" effect='solid' backgroundColor='black' textColor='white' />
         </div>
          <Reusable  name="city" id="city" type="text" placeholder="city" className='border-[1px] border-black p-[10px] rounded-[10px] mt-[10px] ' />
       </div>
       {/* professsion */}
       <div>
       <div className='flex' >
         <p>Type client's profesion</p>
         <FaExclamationCircle className='w-[20px] h-[20px] mt-[5px] cursor-pointer ml-[30px]' data-for="profesion" data-tip="profesion shuld only contain letters, not numbers and spaces!" />
         <ReactTooltip class='w-[200px]' id="profesion" place="right" effect='solid' backgroundColor='black' textColor='white' />
         </div>
         <Reusable  name="profesion" id="profesion" type="text" placeholder="profesion" className='border-[1px] border-black p-[10px] rounded-[10px] mt-[10px] ' />
       </div>
       </div>
       {/* age */}
       <div className='mx-[auto]' >
        <div className='flex' >
       <p>Choose clients's age</p>
       <FaExclamationCircle data-for="number" data-tip="age must be more than 18 and only contain numbers!" className='w-[20px] h-[20px] mt-[5px] cursor-pointer ml-[10px]' />
         <ReactTooltip id="ages" backgroundColor="black" textColor='white' class='w-[200px]' effect="solid" place="right" />
         </div>
     <Reusable  name="age" id="ages" type="text" placeholder="age" className='border-[1px] border-black p-[10px] rounded-[10px] mt-[10px] ' />
       </div>
       {/* button */}
       < div className='text-center mt-[50px]' >
       <button disabled={loadeing} type="submit" className='bg-[#2ecc71] p-[10px] px-[30px] rounded-[10px] cursor-pointer'>Submit</button>
       </div>

    </div>
    </Form>
  )
}