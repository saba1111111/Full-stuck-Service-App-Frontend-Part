import React,{useState} from 'react'
import {FiMenu} from "react-icons/fi";
import {VscChromeClose} from "react-icons/vsc";
import {Link,NavLink} from "react-router-dom";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { checkAuth } from '../../redux/globalDatas';
import { useNavigate } from 'react-router-dom';
function Navbar() {
    const globalDatas = useSelector(state => state.isAuth);
    const dispatch = useDispatch(checkAuth);
    const navigate = useNavigate();
  
    const [open, setOpen] = useState(false);
    const [second, setSecond] = useState(true);
    const close = () => {
        setSecond(!second);
        document.body.style.overflow = "visible";
        setTimeout(() => {
            setOpen(!open);
     }, 250)
    }
    const opens = () => {
      if(second == false) {
        setSecond(!second);
      }
      setOpen(!open)
      document.body.style.overflow = "hidden";
    }
    
    const logOut = () => {
      dispatch(checkAuth(false));
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.removeItem("expireDate");
      close();
      navigate("/login");
    }
  return (
    <div>
        {/* normal navbar */}
      <div id="mobile-navbar" className='w-[100%] h-[90px] bg-[#3498db] flex justify-between items-center' >
        <p className='text-white text-[30px] ml-[5%] sm:ml-[3%] ' >Clients Service App</p>
        <div className='flex text-white lg:hidden' >
           <NavLink to="/" className={(active) => active.isActive ? "underline" : ""} ><p className=' text-[20px]  py-[30px] px-[20px] mr-[15px] hover:bg-[#2ecc71] cursor-pointer'  >Home</p></NavLink>
            <NavLink to="/clients" className={(active) => active.isActive ? "underline" : ""} ><p className=' text-[20px] hover:bg-[#2ecc71] py-[30px] px-[20px] mr-[15px] cursor-pointer'  >Add client</p></NavLink> 
            <NavLink to="/help" className={(active) => active.isActive ? "underline" : ""} ><p className=' text-[20px] hover:bg-[#2ecc71] py-[30px] px-[20px] mr-[50px] cursor-pointer'  >Help</p></NavLink>
            {!globalDatas ?   
            <>
            <NavLink to="/login" className={(active) => active.isActive ? "underline" : ""} ><p className=' text-[20px] hover:bg-[#2ecc71] py-[30px] px-[20px] cursor-pointer'  >Sign in</p></NavLink>
            <NavLink to="/signup" className={(active) => active.isActive ? "underline" : ""} ><p className=' text-[20px] hover:bg-[#2ecc71] py-[30px] px-[20px]  cursor-pointer'  >Sign Up</p></NavLink>
            </>
            :  
           <p className=' text-[20px] hover:bg-[#2ecc71] py-[30px] px-[20px]  cursor-pointer' onClick={logOut}  >Log out</p>  
            }
            </div>
        {/*hamburger menu */}
        <div className='hidden lg:flex ' >
         {!open ? <FiMenu onClick={opens} className='w-[50px] h-[50px] text-white mr-[20px] cursor-pointer transition-[6s] hover:rotate-[180deg]' /> : <VscChromeClose onClick={close}className='w-[50px] h-[50px] text-white mr-[20px] cursor-pointer' /> }
        </div>
    </div>


   {/* moving mobile navbar */}
    { open &&
        <div id="second" className={second ? 'w-[100%] h-[90.5%] bg-[#bdc3c7]  hidden lg:flex animations z-20 fixed top-[90px]' : 'w-[100%] h-[87.5%] bg-[#bdc3c7]  hidden lg:flex seconds z-20 fixed top-[90px]'} >
            <div className='m-[50px]' >
            <Link to="/" ><p onClick={close} className=' text-[25px] mb-[20px] font-bold  hover:text-[#2ecc71] w-[70px]  cursor-pointer'  >Home</p></Link>
            <Link to="/clients" ><p onClick={close} className=' text-[25px] mb-[20px] font-bold hover:text-[#2ecc71] w-[140px]  cursor-pointer'  >Add person</p></Link>
            <Link to="/help" ><p onClick={close} className=' text-[25px] mb-[10px] font-bold hover:text-[#2ecc71] w-[45px]  cursor-pointer'  >Help</p></Link>
            {!globalDatas ?   
            <>
             <Link to="/login" ><p onClick={close} className=' text-[25px] mb-[20px] font-bold  hover:text-[#2ecc71] w-[90px]  cursor-pointer'  >Sign in</p></Link>
             <Link to="/signup" ><p onClick={close} className=' text-[25px] mb-[10px] font-bold  hover:text-[#2ecc71] w-[90px]  cursor-pointer'  >sign up</p></Link>
            </>
            :  
           <p className=' text-[25px] mb-[20px] font-bold  hover:text-[#2ecc71] w-[100px]  cursor-pointer'  onClick={logOut}  >Log out</p>  
            }
            </div>
            </div>
    }
    </div>
  )
}

export default Navbar
