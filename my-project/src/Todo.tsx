import axios from "axios";
import { create } from "zustand";
let api = "http://37.27.29.18:8001/api/to-dos"

export const useTodo = create((set, get) =>({
    data:[],
getData:( async() =>{
try {
    const {data} = await axios.get(api)
    set(data)
} catch (error) {
    console.error(error);
}
}),
deleteData:(async (id:number) =>{
    try {
        await axios.delete(`${api}?id=${id}`)
        get().getData()
    } catch (error) {
        console.error(error);
    }
}),
addData:(async (formData) =>{
    try {
        await axios.post(api,formData)
        get().getData()
    } catch (error) {
        console.error(error);
    }
}),
editData:(async (formData, id) =>{
    try {
        await axios.put(`${api}?id=${id}`, formData)
        get().getData()
    } catch (error) {
        console.error(error);
    }
}),
deleteImage:(async (id:number) =>{
    try {
        await axios.delete(`http://37.27.29.18:8001/api/to-dos/images/${id}`)
        get().getData()
    } catch (error) {
        console.error(error);
    }
}),
addImage:(async ({id, formData}) =>{
    try {
        await axios.post(`http://37.27.29.18:8001/api/to-dos/${id}/images`, formData)
        get().getData()
    } catch (error) {
        console.error(error);
    }
}),

}))