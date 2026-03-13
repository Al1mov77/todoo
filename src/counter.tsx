import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface IData {
    id:number,
    name:string,
    age:number,
    sttaus:boolean
}

export interface CounterState {
    data:IData[]
}

const initialState:CounterState = {
    data:[
        {
            id:1,
            name:"Umar",
            age:16,
            status:false
        }
    ]
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    deleteUser: (state, {payload}) =>{
        state.data = state.data.filter(user => user.id !=payload)
    },
    addUser: (state, { payload }) => {
      state.data.push(payload)
    },
    editUser: (state, { payload }) => {
      state.data = state.data.map(user =>
        user.id == payload.id ? payload : user
      )
    },
  }
})

// Action creators are generated for each case reducer function
export const { deleteUser, editUser, addUser } = counterSlice.actions

export default counterSlice.reducer