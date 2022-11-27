
import { configureStore } from "@reduxjs/toolkit";
import persons from "./globalDatas";
const store =  configureStore({
    reducer: persons.reducer
})

export default store