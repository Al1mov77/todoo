import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
let api = "https://69416931686bc3ca8166e1d6.mockapi.io/api/users"
import axios from 'axios';

interface TodoState {
  data: State[]
  isLoading: boolean
}
const initialState: TodoState = {
  data: [],
  isLoading: false
}


export interface State {
    id:string,
    name:string,
    age:number,
    status:boolean,
    image:string
}

export const getData = createAsyncThunk("todo/getData", async() =>{
try {
    const {data} = await axios.get(api)
    return data
} catch (error) {
    console.error(error);
}

})


export const deleteData = createAsyncThunk("todo/deleteData", async(id:string, {dispatch}) =>{
try {
    await axios.delete(`${api}/${id}`)
    dispatch(getData())
} catch (error) {
    console.error(error);
}

})


export const addUser = createAsyncThunk("todo/addUser", async(user:State,{dispatch}) =>{
try {
    await axios.post(api,user)
    dispatch(getData())
} catch (error) {
    console.error(error);
}

})




export const searchUser = createAsyncThunk("todo/searchUser", async(name:string, {dispatch}) =>{
try {
    const {data} = await axios.get(`${api}?name=${name}`)
    return data
} catch (error) {
    console.error(error);
}

})



export const editUser = createAsyncThunk("todo/editUser", async(user:State, {dispatch}) =>{

try {
     await axios.put(`${api}/${user.id}`, user)
  dispatch(getData())
} catch (error) {
    console.error(error);
}

})


export const checkStatus = createAsyncThunk("todo/checkStatus", async(user:State, {dispatch}) =>{

try {
     await axios.put(`${api}/${user.id}`,{
    ...user, status:!user.status
  })
  dispatch(getData())
} catch (error) {
    console.error(error);
}

})


export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getData.pending, (state,action) => {
      console.log("PENDING")
      state.isLoading = true,
      state.data = action.payload
    })

    builder.addCase(getData.fulfilled, (state,action) => {
      console.log("FULFILLED")
      state.isLoading = false,
      state.data = action.payload
    }),
    builder.addCase(searchUser.fulfilled, (state, action) => {
  state.data = action.payload
})
  }
})

export const {} = todoSlice.actions;

export default todoSlice.reducer;