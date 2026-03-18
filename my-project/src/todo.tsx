import React from 'react'
import axios from 'axios'
import { loadable } from 'jotai/utils'
import { atom } from 'jotai'
let api = "https://69416931686bc3ca8166e1d6.mockapi.io/api/users"
let trigger = atom(false)
export const searchAtom = atom("")

export const GetDataAtom = atom(async (get) =>{
    get(trigger) 
    const seaechValue = get(searchAtom)
    try {
        const {data} = await axios.get(
            seaechValue ? `${api}?name=${seaechValue}` : `${api}`
        )
        return data
    } catch (error) {
        console.error(error);
    }
})


export const DeleteData = atom(null,async(get,set,id:string) =>{
    try {
        await axios.delete(`${api}/${id}`)
       const { data } = await axios.get(api)
     set(trigger, !get(trigger))
    } catch (error) {
        console.error(error);
    }
})


export const AddUser = atom(null,async(get,set,user) =>{
    try {
        await axios.post(api, user)
       const { data } = await axios.get(api)
       set(trigger, !get(trigger))
    } catch (error) {
        console.error(error);
    }
})


export const EditUser = atom(null,async(get,set,user, id:string) =>{
    try {
        await axios.put(`${api}/${id}`,user)
       const { data } = await axios.get(api)
       set(trigger, !get(trigger))
    } catch (error) {
        console.error(error);
    }
})

export const loadableAtom = loadable(GetDataAtom)