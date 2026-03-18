import { create } from 'zustand'
import axios from "axios";
let api = "https://69416931686bc3ca8166e1d6.mockapi.io/api/users"

export const useTodo = create((set, get) => ({
  data:[],
  getData: async() =>{
    try {
        const {data} = await axios.get(api) 
        set((state:{data:[]}) => (state.data = data))
    } catch (error) {
        console.error(error);
    }
  },
  deleteData: async(id:string) =>{
    try {
      await axios.delete(`${api}/${id}`)
      get().getData()
    } catch (error) {
      console.error(error);
    }
  },

  editUser: async(user) =>{
    try {
      await axios.put(`${api}/${user.id}`, user)
      get().getData()
    } catch (error) {
      console.error(error);
    }
  },
  addUser: async(user) =>{
    try {
      await axios.post(api,user)
      get().getData()
    } catch (error) {
      console.error(error);
    }
  },

  checkStatus: async(user) =>{
    try {
      await axios.put(`${api}/${user.id}`,{
        ...user,
        status:!user.status
      })
      get().getData()
    } catch (error) {
      console.error(error);
    }
  },

  searchUser: async(name) =>{
    try {
      const {data} = await axios.get(`${api}?name=${name}`)
      set({data})
    } catch (error) {
      console.error(error);
    }
  },

  filterUser: async(status:string) =>{
    let url = api
    if(status == "active"){
      url=`${api}?status=true`
    }
    else if(status == "inactive"){
         url=`${api}?status=false`
    }
    else{
      url = api
    }
    try {
 const {data} = await axios.get(url)
 set({data})
    } catch (error) {
      console.error(error);
    }
  },
}))