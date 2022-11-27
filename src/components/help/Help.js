import React, { useRef,useState } from 'react';
import {BsLinkedin} from "react-icons/bs";
import {FaInstagramSquare} from "react-icons/fa";
import {AiFillFacebook} from "react-icons/ai";
import axios from "axios";
import emailjs from '@emailjs/browser';

function Help() {
  const form = useRef();
const [message,setMessage] = useState(null);
  const sendEmail = async (e) => {
    e.preventDefault();
    console.log(form.current)
    try {
    await  emailjs.sendForm('service_eduetjq', 'template_brgcmls', form.current, 'HxdIg2Gynb5hyDauQ')
      setMessage("done");
      document.getElementById("myform").reset();
    }catch(error){
      setMessage("error");
      console.log(error)
    } 
    setTimeout(() => {
      setMessage(null);
    },1000)
  };
  return (
    <div>
      
      <div className='text-[25px] mb-[50px] mt-[20px] text-center' >Dont worry, if you dont understand somthing we are here to help you. {':)'}</div>
      <div className='scrolll' >
      {/* about first page */}
      <div className='text-[20px] my-[20px] w-[90%] ml-[15px]' >
        <p className='pl-[10px]' >About first page</p>
        <p>In the home page you can find the person you are looking for with filters. You can filter it with name, surname or personal number. If you can not find the person, this means that the person is not in the list yet.</p>
        </div>
      {/* about add clients page */}
      <div className='text-[20px] my-[20px] w-[90%] ml-[15px]' >
        <p className='pl-[10px]' >About add clients page</p>
        <p>If you are not looking for a person and you want to add person, you can push the Add client button and Then you wiil be add person's page, where you should write his personal information and after submit button the person wiil be in the list.</p>
        </div>
      {/* about detail page */}
      <div className='text-[20px] my-[20px] w-[90%] ml-[15px]' >
        <p className='pl-[10px]' >About detail page</p>
      <p> If you want to know more about the person you are looking for.After find the person with filter, you can push detail button and you will see the person's all information we have.If you still want to know more about the person, sorry, we can not help you.</p>
        </div>
             {/* change this as you want */}
        <div className='text-[20px] my-[20px] w-[90%] ml-[15px]' >
        <p className='pl-[10px]' >About help page</p>
      <p> in help page you can read everythin about the site.</p>
        </div>
        </div>
      {/* about contact if you still have any questions */}
      <div className='ml-[10px] mt-[50px]' >If you still have any question, you can send your questions on the email, also you can call us on the phone or just type your email and  question in the input filed below.</div>

      <div>
        <form id="myform" ref={form} onSubmit={sendEmail}  className=' p-[10px] flex justify-center items-center mt-[30px] md:flex-col' >
          <div className=''>
           <label className='mr-[5px]'  >Your email:</label>
           <input id="first" name="from_name" className='border-[1px] p-[5px]' type="email" placeholder="type your email" required/>
           </div>
           <div className='md:mt-[10px]' >
           <label className='ml-[20px] mr-[5px]'  >Your question:</label>
           <input id="first"  name='message' className='border-[1px] p-[5px]' type="text" placeholder="type your question" required/>
           </div>
           <button className='bg-[#2ecc71] p-[10px] px-[30px] rounded-[10px] cursor-pointer ml-[10px] md:mt-[10px]' >send</button>
        </form>
        <div className='w-[200px] mx-[auto]'>{message === 'done' ? <p className='mx-[auto] text-green-500'>succesfully sent!</p> : message === 'error' ? <p className='mx-[auto] text-red-500'>'Error! Try again!'</p> : <p></p>}</div>
      </div>
       {/* socialuri qselebis logoebi */}
       <div className='flex mt-[55px]' >
        <a href="https://www.linkedin.com/in/saba-pachulia-2bb368229/" target="_blank"><BsLinkedin className='m-[5px] w-[20px] h-[20px] cursor-pointer' /></a>
         <a href="https://www.instagram.com/sabapachulia1/" target="_blank"><FaInstagramSquare className='m-[5px] w-[20px] h-[20px] cursor-pointer' /></a>
         <a href="https://www.facebook.com/pachulia.saba/" target="_blank"> <AiFillFacebook className='m-[5px] w-[23px] h-[23px] cursor-pointer' /></a>
        </div>

      </div>
  )
}

export default Help
