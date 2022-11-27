import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const fetching = createAsyncThunk('fetchDatas', async (dispatch) => {
    let datas = [];
    try {
        const api = await axios.get('http://localhost:8080/getPersons'); 
        datas = api.data.persons;
    }catch(error){
      console.log(error);
    }
   return datas
})
export const posting = createAsyncThunk('posting', async (postDatas) => {
    try {
     const post = await axios.post('https://second-http-default-rtdb.firebaseio.com/persons.json',postDatas);
    }catch(error) {
        console.log(error);
    }
})
export const deleteFunc = createAsyncThunk('deleteFunc', async (id) => {
  try {
    await axios.delete(`https://second-http-default-rtdb.firebaseio.com/persons/${id}.json`);
  }catch(error){
    console.log(error);
  }
})
export const editFunc = createAsyncThunk('edit', async ({values,id}) => {
    try{
      await axios.put(`https://second-http-default-rtdb.firebaseio.com/persons/${id}.json`,values);
    }catch(error){
        console.log(error);
    }
})
const initialvalues = {
    persons: [],
    status: '',
    isAuth: false
}
const persons = createSlice({
    name: 'persons',
    initialState: initialvalues,
    reducers: {
        replace(state,action) {
            state.persons = action.payload;
        },
        checkAuth(state,action) {
            state.isAuth = action.payload;
        }
    },
    extraReducers: builder => {
        builder
        .addCase(fetching.pending, (state,action) => {
             state.status = "loading";
        })
        .addCase(fetching.fulfilled, (state,action) => {
            state.status = "succeded";
            state.persons = action.payload;
        })
        .addCase(fetching.rejected, (state,action) => {
            state.status = "failed";
        })
    }
})

export const {replace,checkAuth} = persons.actions;

export default persons
