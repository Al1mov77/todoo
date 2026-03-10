import React, { useState } from 'react'
import { useTodo } from './todos'
import { useFormik } from 'formik'

const App = () => {
  const { data, deleteData, editUser, addUser } = useTodo()
  const [idx, setIdx] = useState(null)
  const [open, setOpen] = useState(false)
  const [openA, setOpenA] = useState(false)

  const { handleChange, handleSubmit, values, setFieldValue, resetForm } = useFormik({
    initialValues: { name: "" },
    onSubmit: (v) => {
      if (idx) {
        editUser(idx, v.name)
        setOpen(false)
      } else {
        addUser(v.name)
        setOpenA(false)
      }
      resetForm()
      setIdx(null)
    }
  })

  const handleEdit = (user) => {
    setIdx(user.id)
    setFieldValue("name", user.name)
    setOpen(true)
  }

  return (
    <div className="flex flex-col items-center mt-10">
      <button className="border" onClick={() => setOpenA(true)}>ADD USER</button>

      <div className="flex flex-wrap justify-center gap-4 mt-4">
        {data.map((user) => (
          <div key={user.id} className="flex flex-col items-center border">
            <img className="w-20 h-20" src={user.img} alt="" />
            <h2>{user.name}</h2>
            <div className="flex gap-2 mt-2">
              <button className="border" onClick={() => deleteData(user.id)}>Delete</button>
              <button className="border" onClick={() => handleEdit(user)}>Edit</button>
            </div>
          </div>
        ))}
      </div>

      {open && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-20">
          <div className="bg-white p-4">
            <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input className='text-black' name="name" value={values.name} onChange={handleChange} placeholder="Name" />
              <button type="submit" className="border">Save</button>
            </form>
          </div>
        </div>
      )}

      {openA && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-20">
          <div className="bg-white p-4">
            <form onSubmit={handleSubmit} className="flex flex-col gap-2">
              <input className='text-black'  name="name" value={values.name} onChange={handleChange} placeholder="Name" />
              <button type="submit" className="border">Add</button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default App