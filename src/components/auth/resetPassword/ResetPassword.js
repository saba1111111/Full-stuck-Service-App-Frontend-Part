import React from 'react'
import ReactTooltip from 'react-tooltip'
import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import {FaExclamationCircle} from "react-icons/fa";
import useAxios from '../../../hooks/useAxios';
const validateSchema =  Yup.object({
  password: Yup.string().min(5).required("required"),
})
function ResetPassword() {
    const {token} = useParams();
    const {getDatas,postDatas} = useAxios();
    const navigate  = useNavigate();

  const onSubmit = async (values) => {
      const NewPassword = values.password;
      try {
          const reset = await postDatas(`http://localhost:8080/passwordReset/${token}`,{password: NewPassword,})
          navigate("/login");
          toast.success("Password updated successfuly!");
      }catch(err) {
        console.log(err);
        navigate("/resetPasword")
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
          password: ""
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

export default ResetPassword
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
       <p className='text-[20px] mr-[20px]' >New Password:</p>
       <FaExclamationCircle className='w-[20px] h-[20px] mt-[5px] cursor-pointer' data-for="type" data-tip="Pasword must be at least 5 character!" />
       <ReactTooltip backgroundColor='black' textColor="white" effect="solid" id="type" class='w-[200px]' place="right" />
       </div>
       <Reusable  name="password" id="password" type="text" placeholder="password" className='border-[1px] w-[90%] border-black p-[10px] rounded-[10px] mt-[10px] nameRed' />
            </div>
     < div className='mt-[30px] text-center w-[90%]' >
     <button  type="submit" className='bg-[#2ecc71] p-[10px] px-[30px] rounded-[10px] cursor-pointer'>Submit</button>
     </div>
  </Form>
)
}