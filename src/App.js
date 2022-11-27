import FirstPage from './components/firstpage/FirstPage';
import './App.css';
import Edit from './components/edit/Edit';
import Navbar from './components/navbar/Navbar';
import Help from './components/help/Help';
import Detail from './components/detailpage/Detail';
import AddClients from './components/addclients/AddClients';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch,useSelector } from 'react-redux'
import { fetching } from './redux/globalDatas';
import SignUp from './components/auth/signUp';
import Login from './components/auth/login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { checkAuth } from './redux/globalDatas';
import { Navigate } from 'react-router-dom';
import EmailCheck from './components/auth/resetPassword/EmailCheck';
import ResetPassword from './components/auth/resetPassword/ResetPassword';
function App() {
  const dispatch = useDispatch();
  const globalData = useSelector(state => state.isAuth);

  useEffect(() => {
   dispatch(fetching(dispatch));
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const expireDate = localStorage.getItem("expireDate");
    if(token && userId && expireDate) {
      if(new Date(expireDate) <= new Date()) {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        localStorage.removeItem("expireDate");
        dispatch(checkAuth(false));
      }else{
        dispatch(checkAuth(true));
      }}
  },[])
  
  return (
    <div>
     <BrowserRouter>
     <Navbar />
       <Routes>
         <Route path="/" element={<FirstPage />} />
         <Route path="/clients"  element={<AddClients />} />
         <Route path="/help"  element={<Help />}/>
         <Route path="/details/:userId" element={<Detail />} />
         <Route path="/edit/:userId" element={<Edit />}  />
         <Route path="/edit/:userId" element={<Edit />}  />
         <Route path="/login" element={!globalData ? <Login /> : <Navigate to='/' />}  />
         <Route path="/signUp" element={!globalData ? <SignUp /> : <Navigate to='/' />}  />
         <Route path="/resetPasword" element={!globalData ? <EmailCheck /> : <Navigate to='/' />}  />
         <Route path="/resetPasword/:token" element={!globalData ? <ResetPassword /> : <Navigate to='/' />}  />
         <Route path="*" element={<h1 className='mt-[200px] text-center text-[30px] font-bold' >Error, Go back to Home page! <span className='text-red-500'>:&#41;</span></h1>} />
       </Routes>
     </BrowserRouter>
<ToastContainer autoClose="3000" hideProgressBar />
    </div>
  );
}

export default App;
