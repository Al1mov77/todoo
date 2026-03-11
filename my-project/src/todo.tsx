import { create } from 'zustand'

export const useTodo = create((set) => ({
  data:[
    {
        id:1,
        name:"Umar",
        age:15,
        status:true
    },
     {
        id:2,
        name:"Husen",
        age:16,
        status:false
    }
  ],
    addUser: (name: string, age: number) =>
    set((state: any) => ({
      data: [...state.data, { id: Date.now(), name, age, status: false }]
    })),

  deleteUser: (id: number) =>
    set((state: any) => ({
      data: state.data.filter((user: any) => user.id != id)
    })),

  editUser: (id: number, name: string, age: number) =>
    set((state: any) => ({
      data: state.data.map((user: any) =>
        user.id == id ? { ...user, name, age } : user
      )
    })),
}))