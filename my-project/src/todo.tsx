import { create } from "zustand";
import axios from "axios";
let api = "https://69416931686bc3ca8166e1d6.mockapi.io/api/users"
export const useTodo = create((set,get) =>({
    data:[],
    getData:async () =>{
        try {
            const {data} = await axios.get(api)
            set((state:{data:[] }) => (state.data = data))
        } catch (error) {
            console.error(error)
        }
    },
    deleteData: async (id:number) =>{
        try {
            await axios.delete(`${api}/${id}`)
            get().getData()
        } catch (error) {
            console.error(error);
        }
    },
    addUser: async (name:string,age:number,image:string) =>{
        const newUser = {
            id:Date.now(),
            name:name,
            age:age,
            image:image
        }
        try {
            await axios.post(api, newUser)
            get().getData()
        } catch (error) {
            console.error(error);
        }
    },
    edituser: async (id,name,age,image) =>{
        const updateUser = {
        name,
        age,
        image
    }
        try {
            await axios.put(`${api}/${id}`, updateUser)
            get().getData()
        } catch (error) {
            console.error(error)
        }
    },
    searchUser: async (name) =>{
        try {
            const {data} = await axios.get(`${api}?name=${name}`)
            set({data})
        } catch (error) {
            console.error(error);
        }
    }
}))