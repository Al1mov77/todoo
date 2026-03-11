import { Box, Button, Checkbox, Modal, TextField } from '@mui/material'
import './App.css'
import { useTodo } from './todo'
import React, { useState } from 'react';
import { useFormik } from 'formik';
function App() {
    const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


      const [openEdit, setOpenEdit] = React.useState(false);
  const handleOpenEdit = () => setOpenEdit(true);
  const handleCloseEdit = () => setOpenEdit(false);
  const [idx,setIdx] = useState(null)
   const [name,setname] = useState("")
   const [age,setage] = useState("")
   const [searcj,setsearch] = useState("")



   function handlEdit(user){
    setIdx(user.id)
    setValues({
      id:user.id,
      name:user.name,
     age:user.age,
     status:user.status
    })
    handleOpenEdit()
   }
  const {data, deleteUser, addUser, editUser} = useTodo()
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
const {initialValues, handleSubmit, resetForm, values, handleChange, setValues} = useFormik({
  initialValues:{
    id:0,
    name:"",
    age:0,
    status:false
  },
  onSubmit:(user) =>{
    if(idx){
      editUser(idx,user.name,user.age,user.status)
      handleCloseEdit()
    }
    else{
     addUser(user.name,user.age,user.status)
     handleClose()
    }
    resetForm()

  }
})
const filter  = data.filter((value) =>
  value.name.includes(searcj.toLowerCase())
)
  return (
    <>
    <TextField onChange={(e) => setsearch(e.target.value)} value={searcj} label="search" />
    <div className='flex justify-center items-center p-20'>
      <Button onClick={handleOpen} variant='outlined'>Add New User</Button>
    </div>
      {filter.map((user) =>{
        return <div>
          <h1>{user.name}</h1>
          <h1>{user.age}</h1>
          <h1 className={`${user.status ? "text-green-500" :  "text-red-500"}`}>{user.status ? "Active" : "Inactive"}</h1>
          <Button onClick={() => deleteUser(user.id)} variant='outlined' color='error'>Delete</Button>
          <Button onClick={() => handlEdit(user)} color='warning' variant='outlined'>Edit</Button>
          <Checkbox  />
        </div>
      })}

      <Modal
  open={open}
  onClose={handleClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Box sx={style}>
   <form onSubmit={handleSubmit} action="">
    <TextField onChange={handleChange} value={values.name} name='name' label="User Name" /> <br /> <br />
    <TextField onChange={handleChange} value={values.age} name='age' label="User Age" /> <br /> <br /> <br />
    <Button type='submit' variant='outlined'>Save</Button>
   </form>
  </Box>
</Modal>


      <Modal
  open={openEdit}
  onClose={handleCloseEdit}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Box sx={style}>
   <form onSubmit={handleSubmit} action="">
    <TextField onChange={handleChange} value={values.name} name='name' label="User Name" /> <br /> <br />
    <TextField onChange={handleChange} value={values.age} name='age' label="User Age" /> <br /> <br /> <br />
    <Button type='submit' variant='outlined'>Save</Button>
   </form>
  </Box>
</Modal>
    </>
  )
}

export default App
