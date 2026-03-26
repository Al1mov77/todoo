import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { IData } from "./todoSlice";
const api = "http://37.27.29.18:8001/api/to-dos"
export const getData = createAsyncThunk("todo/getData", async() =>{
    const {data} = await axios.get(api)
    return data.data
})

export const deleteData = createAsyncThunk("todo/deleteData", async(id:number, {dispatch}) =>{
   try {
    await axios.delete(`${api}?id=${id}`)
dispatch(getData())
   } catch (error) {
    console.error(error)
   }
})

export const addData = createAsyncThunk("todo/addData", async(formData:IData, {dispatch}) =>{
   try {
    await axios.post(api,formData)
     dispatch(getData())
   } catch (error) {
    console.error(error)
   }
})

export const editData = createAsyncThunk("todo/editData", async(formData:IData, {dispatch}) =>{
   try {
    await axios.put(`${api}?id=${formData.id}`, formData)
     dispatch(getData())
   } catch (error) {
    console.error(error)
   }
})


export const deleteImage = createAsyncThunk("todo/deleteImage", async(id:number, {dispatch}) =>{
   try {
    await axios.delete(`http://37.27.29.18:8001/api/to-dos/images/${id}`)
dispatch(getData())
   } catch (error) {
    console.error(error)
   }
})



export const addImage = createAsyncThunk("todo/Image", async(formData:IData, {dispatch}) =>{
   try {
    await axios.post(`http://37.27.29.18:8001/api/to-dos/${formData.id}/images`, formData)
     dispatch(getData())
   } catch (error) {
    console.error(error)
   }
})

export const editStatus = createAsyncThunk("todo/editStatus", async(id:number, {dispatch}) =>{
   try {
    await axios.put(`http://37.27.29.18:8001/completed?id=${id}`)
     dispatch(getData())
   } catch (error) {
    console.error(error)
   }
})

export const getInfo = createAsyncThunk("todo/getInfo", async(id:number) =>{
    const {data} = await axios.get(`http://37.27.29.18:8001/api/to-dos/${id}`)
    return data.data
})