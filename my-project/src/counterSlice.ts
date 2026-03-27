import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { getData } from './api/api'

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
    })
  }
})

// Action creators are generated for each case reducer function
export const {  } = counterSlice.actions

export default counterSlice.reducer