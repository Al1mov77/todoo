import { create } from 'zustand'
export const useTodo = create((set,get) => ({
    data:[
{id:1,name:"Umar"},
{id:2,name:"Ahmad"}
    ],
   addUser: (name:string) =>
  set((state:any) => ({
    data: [...state.data, { id: Date.now(), name }]
  })),
    deleteData:(id:number) =>
        set((state:any) => ({data:state.data.filter((user) => user.id != id)}))
}))