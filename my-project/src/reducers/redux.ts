import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

let api = "https://69416931686bc3ca8166e1d6.mockapi.io/api/users"

export interface State {
  id: string
  name: string
  age: string
  status: boolean
}

interface TodoState {
  data: State[]
  isLoading: boolean
}

const initialState: TodoState = {
  data: [],
  isLoading: false
}

export const getData = createAsyncThunk("todo/getData", async () => {
  try {
    const { data } = await axios.get(api)
    return data
  } catch (error) {
    console.error(error)
  }
})


export const searchUser = createAsyncThunk("todo/searchUser", async (name:string) => {
  try {
    const { data } = await axios.get(`${api}?name=${name}`)
    return data
  } catch (error) {
    console.error(error)
  }
})



export const filterUser = createAsyncThunk("todo/filterUser", async (status:string) => {
  try {
   let url = api
   if(status == "active"){
    url=`${api}?status=true`
   }
   else if(status == "inactive"){
    url=`${api}?status=false`
   }
   else{
    url=`${api}`
   }
   const {data} = await axios.get(url)
   return data
  } catch (error) {
    console.error(error)
  }
})

export const DeleteData = createAsyncThunk("todo/DeleteData", async (id:string, {dispatch}) => {
  try {
    const { data } = await axios.delete(`${api}/${id}`)
    dispatch(getData())
  } catch (error) {
    console.error(error)
  }
})


export const checkboxStatus = createAsyncThunk("todo/checkboxStatus", async (user:TodoState, {dispatch}) => {
  try {
    await axios.put(`${api}/${user.id}`, {
        ...user,
        status:!user.status
    })
    dispatch(getData())
  } catch (error) {
    console.error(error)
  }
})


export const editUser = createAsyncThunk("todo/editUser", async (user:TodoState, {dispatch}) => {
  try {
    await axios.put(`${api}/${user.id}`, user)
    dispatch(getData())
  } catch (error) {
    console.error(error)
  }
})


export const addUser = createAsyncThunk("todo/addUser", async (user:TodoState, {dispatch}) => {
  try {
    await axios.post(api,user)
    dispatch(getData())
  } catch (error) {
    console.error(error)
  }
})


export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getData.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getData.fulfilled, (state, action) => {
      state.isLoading = false
      state.data = action.payload
    })
    builder.addCase(getData.rejected, (state) => {
      state.isLoading = false
    }),
    builder.addCase(searchUser.fulfilled, (state, action) => {
  state.data = action.payload
}),
builder.addCase(filterUser.fulfilled, (state, action) => {
  state.data = action.payload
})
  }
})

export default todoSlice.reducer