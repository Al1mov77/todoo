import React, { useState } from 'react'
import './App.css'
import { useAtom } from 'jotai'
import { AddUser, DeleteData, loadableAtom, EditUser, searchAtom } from './todo'
import { Box, Button, Modal, TextField } from '@mui/material'
import { useFormik } from 'formik'
function App() {
  const [value] = useAtom(loadableAtom)
  const [, deleteUser] = useAtom(DeleteData)
  const [, addUser] = useAtom(AddUser)
  const [, editUser] = useAtom(EditUser)
   const { state, data, error } = value

  const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [idx, setidx] = useState(null)


const [search,setsearch] = useAtom(searchAtom)
  function handleEdit(user){
    setidx(user.id)
    setValues({
      name:user.name,
      age:user.age,
      image:user.image,
      status:user.status
    })
    handleOpenEdit()
  }
    const [openEdit, setOpenEdit] = React.useState(false);
  const handleOpenEdit = () => setOpenEdit(true);
  const handleCloseEdit = () => setOpenEdit(false);
  const {initialValues, handleReset, handleChange, handleSubmit, values, setValues} = useFormik({
    initialValues:{
      name:"",
      age:0,
      status:false,
      image:""
    }, onSubmit:(e)=>{
     if(idx!=null){
     editUser(
  {
    name: e.name,
    age: e.age,
    image: e.image,
    status: false
  },
  idx
)
handleCloseEdit()
     }
     else{
       addUser(e.name,e.age,e.image, e.status = false)
     }

    }
  })
  return (
    <>
    <div className='flex justify-center items-center p-10'>
  <TextField value={search} onChange={(e) => setsearch(e.target.value)} label="Search By Name" />
<Button onClick={handleOpen} variant='contained'>Add New</Button>
<select name="" id="">
  <option value="active">Active</option>
  <option value="inactive">Inactive</option>
</select>
    </div>
      {state == "hasData" && (
        <div className='flex flew-wrap justify-center gap-20 border-none'>
          {data?.map((e) =>{
            return <div className='shadow-2xl border p-20 rounded-2xl border-none'>
                                            <img className='rounded-2xl' src={e.image} alt="" />
              <div className='p-5 flex flex-col gap-3 items-center'>
            <p className='fony-bold text-2xl text'>{e.name}</p>
                        <Button fullWidth variant='contained' color={`${e.status ? "primary" : "error"}`}>{e.status ? "Active" : "Inactive"}</Button>
                        <Button fullWidth onClick={() => deleteUser(e.id)} variant='outlined' color='error'>Delete</Button>
                        <Button fullWidth onClick={() => handleEdit(e)} color='warning' variant='outlined'>Edit</Button>
              </div>
            </div>
          })}
        </div>
      )
    }
    <Modal
  open={open}
  onClose={handleClose}
  aria-labelledby="parent-modal-title"
  aria-describedby="parent-modal-description"
>
  <Box sx={{ ...style, width: 400 }}>
    <form onSubmit={handleSubmit} action="">
 <TextField onChange={handleChange} value={values.name} fullWidth label="User Name" name='name' /> <br /> <br />
 <TextField onChange={handleChange} value={values.image} fullWidth  name='image' label="User Image" /> <br /> <br />
 <TextField onChange={handleChange} value={values.age} name='age' fullWidth label="User Age" /> <br /> <br /> <br />
 <Button  type='submit' fullWidth color='success' variant='contained'>Save</Button>
    </form>

  </Box>
</Modal>



    <Modal
  open={openEdit}
  onClose={handleCloseEdit}
  aria-labelledby="parent-modal-title"
  aria-describedby="parent-modal-description"
>
  <Box sx={{ ...style, width: 400 }}>
    <form onSubmit={handleSubmit} action="">
 <TextField onChange={handleChange} value={values.name} fullWidth label="User Name" name='name' /> <br /> <br />
 <TextField onChange={handleChange} value={values.image} fullWidth  name='image' label="User Image" /> <br /> <br />
 <TextField onChange={handleChange} value={values.age} name='age' fullWidth label="User Age" /> <br /> <br /> <br />
 <Button type='submit' fullWidth color='success' variant='contained'>Save</Button>
    </form>

  </Box>
</Modal>
    </>
  )
}

export default App
