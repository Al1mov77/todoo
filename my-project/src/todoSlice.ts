import { createSlice } from '@reduxjs/toolkit'
import { getData, getInfo } from './api'

export interface IData {
  id:number,
  name:string,
  description:string,
  isCompleted:boolean
}

interface IState {
    data: IData,
}
const initialState:IState = {
    data:[],
    info:null
}


export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {},
  extraReducers: (builder) =>{
    builder.addCase(getData.fulfilled, (state,action) =>{
        state.data = action.payload
    }),
    builder.addCase(getInfo.fulfilled, (state,action) =>{
        state.info = action.payload
    })
  }
})

export const {  } = counterSlice.actions

export default counterSlice.reducer