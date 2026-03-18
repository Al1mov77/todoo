import React, { useEffect, useState } from 'react'
import { useTodo } from '../Todo'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import { useFormik } from 'formik'

function Zustand() {
        const {data,getData, deleteData, addUser, editUser, checkStatus, searchUser, filterUser}:any = useTodo()
        const [idx,setidx] = useState(null)
        function handleEdit(user){
            setidx(user.id)
            setValues({
                name:user.name,
                age:user.age
            })
            handleOpenEdit()
        }
    const {initialValues, resetForm, handleChange, handleSubmit, setValues, values} = useFormik({
    initialValues:{
        name:"",
        age:0
    },
     onSubmit:(user) =>{
      if(idx!=null){
       editUser({
        id:idx,
        name:user.name,
        age:user.age,
        status:user.status
       }),
       handleCloseEdit()
      }
      
      else{
addUser({
    name:user.name,
    age:user.age,
    status:user.status = false
}),
 handleClose()
      }
      resetForm()
     }
    })
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

      const [openEdit, setOpenEdit] = React.useState(false);
  const handleOpenEdit = () => setOpenEdit(true);
  const handleCloseEdit = () => setOpenEdit(false);
    useEffect(() =>{
        getData()
    },[])
  return (
    <>
   <div className='flex items-center justify-center p-10'>
    <TextField onChange={(e) => searchUser(e.target.value)} label="Search By Name" />
        <select defaultValue="all" onChange={(e) => filterUser(e.target.value)} name="" id="">
         <option value="all">All</option>
         <option value="active">Active</option>
         <option value="inactive">Inctive</option>
        </select>
   <Button onClick={handleOpen} variant='contained'>Add New</Button>
   </div>
   <table className='w-[90%] m-auto text-left h-10'>
    <thead>
<tr style={{borderBottom:"1px solid black"}} >
    <th className='font-semibold'>Name</th>
    <th className='font-semibold'>Age</th>
    <th className='font-semibold'>Status</th>
    <th className='font-semibold'>Actions</th>
</tr>
    </thead>
    <tbody>
        {data.map((user) =>{
            return <tr className='h-5' style={{borderBottom:"1px solid black"}}>
                <td>
                    {user.name}
                </td>
                <td>
                    {user.age}
                </td>
                <td>
                   <Button style={{width:"100px"}} color={`${user.status ? "primary" : "error"}`} variant='contained'>{user.status ? "Active" : "Inactive"}</Button>
                </td>
                <td>
                    <div className='flex gap-5 items-center'>
                        <Checkbox onChange={() => checkStatus(user)} checked={user.status} />
<Button onClick={() => deleteData(user.id)} color='error' variant='outlined'>Delete</Button>
<Button onClick={() => handleEdit(user)} color='warning' variant='contained'>Edit</Button>
                    </div>
                </td>
            </tr>
        })}
    </tbody>
   </table>

   <Modal
  open={open}
  onClose={handleClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Box sx={style}>
    <form onSubmit={handleSubmit} action="">
   <TextField value={values.name} onChange={handleChange} label="User Name" name='name'  fullWidth /> <br /> <br />
   <TextField value={values.age} onChange={handleChange} label="User Age"  name='age' fullWidth /> <br /> <br /> <br />
   <Button type='submit' fullWidth variant='outlined' color='success'>Save</Button>
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
   <TextField value={values.name} onChange={handleChange} label="User Name" name='name'  fullWidth /> <br /> <br />
   <TextField value={values.age} onChange={handleChange} label="User Age"  name='age' fullWidth /> <br /> <br /> <br />
   <Button type='submit' fullWidth variant='outlined' color='success'>Save</Button>
    </form>

  </Box>
</Modal>
    </>
  )
}
export default Zustand