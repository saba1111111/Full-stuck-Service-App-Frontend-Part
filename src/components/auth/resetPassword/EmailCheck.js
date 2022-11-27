import React from 'react'
import ReactTooltip from 'react-tooltip'
import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import {FaExclamationCircle} from "react-icons/fa";
import useAxios from '../../../hooks/useAxios';
const validateSchema =  Yup.object({
  email: Yup.string().email().required("required"),
})
function EmailCheck() {
  const navigate  = useNavigate();
  const {getDatas,postDatas} = useAxios();
  const onSubmit = async (values) => {
  
    try {
      const reset = await postDatas('http://localhost:8080/passwordReset',{email: values.email});
      navigate("/");
      toast.success("we send you a link,check your email and change your password!")
    }catch(err) {
      console.log(err);
      toast.error(err.response.data.errors || "Error!");
    }
  }
  return (
   <>
      <div className='text-center my-[20px] w-[95%]'>
        <p className='text-[25px]'>Password Reset</p>
      </div>
      <div>
           <Formik
        initialValues={{
          email: ""
        }}
        onSubmit={(values) => onSubmit(values)}
        validationSchema={validateSchema}
        >
    <ReusableForm/>
           </Formik>
            </div>
            </>
  )
}

export default EmailCheck
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


const  ReusableForm = () => {
return (
<Form className='max-w-[500px] mx-[auto] mt-[40px] grid '>
     <div className='mb-[20px]   w-[90%]' >
       <div className='flex items-center' >
       <p className='text-[20px] mr-[20px]' >Email:</p>
       <FaExclamationCircle className='w-[20px] h-[20px] mt-[5px] cursor-pointer' data-for="type" data-tip="Enter your email adress! " />
       <ReactTooltip backgroundColor='black' textColor="white" effect="solid" id="type" class='w-[200px]' place="right" />
       </div>
       <Reusable  name="email" id="email" type="text" placeholder="email" className='border-[1px] w-[90%] border-black p-[10px] rounded-[10px] mt-[10px] nameRed' />
            </div>
     < div className='mt-[30px] text-center w-[90%]' >
     <button  type="submit" className='bg-[#2ecc71] p-[10px] px-[30px] rounded-[10px] cursor-pointer'>Submit</button>
     </div>
  </Form>
)
}