import React,{useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { posting,fetching } from '../../redux/globalDatas';
import {useNavigate, useParams} from "react-router-dom";
import ReactTooltip from "react-tooltip";
import { Formik, Form, useField } from 'formik';
import Loader from '../Loader';
import * as Yup from 'yup';
import { ReusableForm } from '../addclients/AddClients'
import { editFunc } from '../../redux/globalDatas';
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
});
function Edit() {
  const {getDatas,postDatas,putDatas} = useAxios();
  const [loadeing,setLoading] = useState(false);
  const {persons,status} = useSelector(state => state);
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();

  const onSubmit = async (values) => {
    try {
    setLoading(true);
    await putDatas('http://localhost:8080/editPerson',{values: {...values,personId: params.userId},auth: {token: localStorage.getItem("token"),userId: localStorage.getItem("userId"),expireDate: localStorage.getItem("expireDate")}})
    setTimeout(() => {
      dispatch(fetching())
      navigate('/');
      setLoading(false);
    },1100)
  }catch(err) {
    toast.error(err.response.data.errors);
    navigate("/");
  }
  }
  let filteredPerso = persons.filter(person => person._id === params.userId) ;
  if(status === 'loading' || loadeing) {
    return <div className='mt-[15%]'><Loader /></div>
  }
  if(filteredPerso.length === 0) {
    return (
      <h1 className='mt-[200px] text-center text-[30px] font-bold' >Error, Go back to Home page! <span className='text-red-500'>:&#41;</span></h1>
    )
  }
  return (
    <div>
       <Formik
      initialValues={{
      name: filteredPerso[0]?.name,
      surname: filteredPerso[0]?.surname,
      PersonalNumber: filteredPerso[0]?.PersonalNumber,
      country: filteredPerso[0]?.country,
      city: filteredPerso[0]?.city,
      profesion: filteredPerso[0]?.profesion,
      age: filteredPerso[0]?.age
      }}
      onSubmit={(values) => onSubmit(values)}
      validationSchema={validateSchema}
      >
      <ReusableForm loadeing={false} />
      </Formik>
    </div>
  )
}

export default Edit
