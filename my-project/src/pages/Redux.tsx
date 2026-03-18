import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch} from 'react-redux'
import type { RootState } from '../store/store'
import { getData, DeleteData, checkboxStatus, editUser, addUser, searchUser, filterUser } from '../reducers/redux'
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';
function Redux() {
    
const [idx,setidx] = useState(null)
function handleEdit(user){
    setidx(user.id)
    setValues({
        name:user.name,
        image:user.image,
        age:user.age,
        status:false
    })
    handleOpenEdit()
}
    const {initialValues, resetForm, handleChange, handleSubmit, setValues, values} = useFormik({
        initialValues:{
            name:"",
            age:0,
            image:"",
        },
        onSubmit:(user) =>{
         if(idx!=null){
   dispatch(editUser({
  id: idx,
  name: user.name,
  age: user.age,
  image: user.image,
  status: false
}))
          handleCloseEdit()
         }
         else{
            dispatch(
               addUser(user.name, user.image, user.age, user.status = false))
               handleCloseEdit()
         }
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
    const {data,isLoading} = useSelector((store:RootState) => store.todo)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getData())
    }, [dispatch])
  return (
   <>
   <div className='p-10 flex justify-center items-center'>
<Button onClick={handleOpen} variant='outlined'>Add New User</Button>
<TextField onChange={(e) => dispatch(searchUser(e.target.value))} label="Search By name..." />
    <select onChange={(e) => dispatch(filterUser(e.target.value))} defaultValue="all" name="" id="">
        <option value="all">All</option>
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
    </select>
   </div>
   <div className='flex gap-20 flex-wrap items-center justify-center'>

       {data.map((user) =>{
    return <div className='shadow-2xl border-none rounded-2xl p-10' key={user.id}>
        <img src={user.image} alt="" />
        <h1 className='text-2xl font-bold'>{user.name}</h1>
        <p className='font-bold'>{user.age}</p>
        <Checkbox onChange={() => dispatch(checkboxStatus(user))} checked={user.status} />
        <Button color={`${user.status ? "primary" : "error"}`} variant='contained'>{user.status ? "Active" : "Inactive"}</Button>
        <Button onClick={() => dispatch(DeleteData(user.id))} variant="outlined" color="error">Delete</Button>
        <Button onClick={() => handleEdit(user)} variant="outlined" color="error">Edit</Button>
    </div>
   })}
   </div>
<Modal
  open={open}
  onClose={handleClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Box sx={style}>
    <form onSubmit={handleSubmit} action="">

   <TextField value={values.name} onChange={handleChange} label="User Name" name='name' fullWidth /> <br /> <br />
   <TextField value={values.image} onChange={handleChange} label="User Image" name='image' fullWidth /> <br /> <br />
   <TextField value={values.age} onChange={handleChange} label="User Age" name='age' fullWidth /> <br /> <br /> <br />
   <Button   type='submit' fullWidth variant='contained' color='success'>Save</Button>

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

   <TextField value={values.name} onChange={handleChange} label="User Name" name='name' fullWidth /> <br /> <br />
   <TextField value={values.image} onChange={handleChange} label="User Image" name='image' fullWidth /> <br /> <br />
   <TextField value={values.age} onChange={handleChange} label="User Age" name='age' fullWidth /> <br /> <br /> <br />
   <Button   type='submit' fullWidth variant='contained' color='success'>Save</Button>

    </form>

  </Box>
</Modal>
   </>
  )
}
export default Redux