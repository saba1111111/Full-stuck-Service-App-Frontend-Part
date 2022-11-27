import axios from "axios";

const useAxios = () => {
  const getDatas = async (url) => {
      const datas = await axios.get(url);
      return datas.data;
  }
  const postDatas = async (url,postDatas) => {
    const datas = await axios.post(url,postDatas);
    return datas.data; 
}
const putDatas = async (url,postDatas) => {
  const datas = await axios.put(url,postDatas);
  return datas.data; 
}
const deleteDatas = async (url,postDatas) => {
  const datas = await axios.delete(url,postDatas);
  return datas.data; 
}

  return {getDatas,postDatas,putDatas,deleteDatas};
}

export default useAxios;