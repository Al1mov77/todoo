import { create } from 'zustand'

export const useTodo = create((set) => ({
  data: [
    { id: 1, name: "Umar", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2St8qT57d1JUYzgrEub22Mk6rKXO3XkFPtQ&s" },
    { id: 2, name: "Ahmad", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2St8qT57d1JUYzgrEub22Mk6rKXO3XkFPtQ&s" }
  ],

  addUser: (name) => set((state) => ({
    data: [...state.data, { id: Date.now(), name, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2St8qT57d1JUYzgrEub22Mk6rKXO3XkFPtQ&s" }]
  })),

  deleteData: (id) => set((state) => ({
    data: state.data.filter(user => user.id != id)
  })),

  editUser: (id, name) => set((state) => ({
    data: state.data.map(user => user.id == id ? { ...user, name } : user)
  }))
}))