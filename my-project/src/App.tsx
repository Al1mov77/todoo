import { useState } from 'react'
import './App.css'
import {useTodo} from "./todos"


function App(){
  const {data,deleteData,addUser} = useTodo()
  const [addName,setaddName] = useState("")
  function handleAdd(){
    addUser(addName)
    setaddName("") 
  }
  return (
    <>
    <input value={addName} onChange={(e) => setaddName(e.target.value)} type="text" />
    <button onClick={handleAdd}>Add</button>
       {data.map((user:any)=>{
        return <div>

          <h1>{user.name}</h1>
        <button onClick={() => deleteData(user.id)}>Delete</button>
                </div>
       })}

    </>
  )
}

export default App
