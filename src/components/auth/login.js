import React from 'react'
import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';
import ReactTooltip from 'react-tooltip';
import {FaExclamationCircle} from "react-icons/fa";
import useAxios from '../../hooks/useAxios';
import {useNavigate,Link} from "react-router-dom";
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { checkAuth } from '../../redux/globalDatas';
const validateSchema =  Yup.object({
    email: Yup.string().email().required("required"),
    password: Yup.string().min(5).required("required"),
  })
   function Login() {
    const {getDatas,postDatas} = useAxios();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const onSubmit = async (values) => {
      try {
     const login = await postDatas('http://localhost:8080/login',{email: values.email,password: values.password})
      authorizationFunction(login);
      toast.success('Sign In successfuly!');
      navigate("/");
      }catch(err) {
        toast.error(err.response.data.errors || "Error!");
        console.log('err.response.data',err.response.data);
      }
    }
   const  authorizationFunction = (login)  => {
      localStorage.setItem("token",login.token)
     localStorage.setItem("userId",login.userId)
     const remainingMilliseconds = 60 * 60 * 1000;
     const expireDate = new Date(new Date().getTime() + remainingMilliseconds)
    localStorage.setItem('expireDate', expireDate.toISOString());
      dispatch(checkAuth(true));
     setTimeout(() => {
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.removeItem("expireDate");
      dispatch(checkAuth(false));
     },remainingMilliseconds)
    }
  return (
    <>
    <div className='text-center my-[20px] w-[95%]'>
      <p className='text-[25px]'>Sign In</p>
    </div>
    <div>
         <Formik
      initialValues={{
        email: "",
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

export default Login
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
         <FaExclamationCircle className='w-[20px] h-[20px] mt-[5px] cursor-pointer' data-for="type" data-tip="Enter your email adress!" />
         <ReactTooltip backgroundColor='black' textColor="white" effect="solid" id="type" class='w-[200px]' place="right" />
         </div>
         <Reusable  name="email" id="email" type="text" placeholder="email" className='border-[1px] w-[90%] border-black p-[10px] rounded-[10px] mt-[10px] nameRed' />
              </div>
              <div className='mb-[20px]   w-[90%]' >
         <div className='flex items-center' >
         <p className='text-[20px] mr-[20px]' >Password:</p>
         <FaExclamationCircle className='w-[20px] h-[20px] mt-[5px] cursor-pointer' data-for="type" data-tip="Pasword must be at least 5 character!" />
         <ReactTooltip backgroundColor='black' textColor="white" effect="solid" id="type" class='w-[200px]' place="right" />
         </div>
         <Reusable  name="password" id="password" type="text" placeholder="password" className='border-[1px] w-[90%] border-black p-[10px] rounded-[10px] mt-[10px] nameRed' />
              </div>
       < div className='mt-[30px] text-center w-[90%]' >
       <button  type="submit" className='bg-[#2ecc71] p-[10px] px-[30px] rounded-[10px] cursor-pointer'>Submit</button>
       </div>
       <Link to="/resetPasword" className='underline text-gray-500 mt-[50px]'>Reset password</Link>
    </Form>
  )
}