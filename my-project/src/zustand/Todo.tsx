import { create } from 'zustand'

export interface User {
  id: number;
  name: string;
  age: number;
  status: boolean;
}

interface TodoState {
  data: User[];
  addUser: (name: string, age: number, status: boolean) => void;
  deleteUser: (id: number) => void;
  editUser: (id: number, name: string, age: number, status: boolean) => void;
}

export const useTodo = create<TodoState>((set) => ({
  data: [
    {
        id: 1,
        name: "Umar",
        age: 16,
        status: true
    }
  ],
 addUser: (name: string, age: number, status: boolean) =>
    set((state) => ({
      data: [...state.data, { id: Date.now(), name, age, status }]
    })),

  deleteUser: (id: number) =>
    set((state) => ({
      data: state.data.filter((user) => user.id !== id)
    })),

  editUser: (id: number, name: string, age: number, status: boolean) =>
  set((state) => ({
    data: state.data.map((user) =>
      user.id === id ? { ...user, name, age, status } : user
    )
  }))

}))