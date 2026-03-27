import { useDispatch, useSelector } from 'react-redux'
import './App.css'
import { Button } from './components/ui/button'
import { RootState } from '@reduxjs/toolkit/query'
import React, { useEffect, useState } from 'react'
import { addData, addImage, deleteData, editData, editStatus, getData } from './api/api'
import { Table, TableBody, TableCell, TableHead, TableRow } from './components/ui/table'
import { IData } from './counterSlice'
let apiImg = "http://37.27.29.18:8001/images"
import { Box, Button as Btn, Checkbox, Input, Modal, TextField } from '@mui/material'
import { useForm } from 'react-hook-form';



function App() {
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
  const [idx,setidx] = useState(null)


   const [openImage, setOpenImage] = React.useState(false);
  const handleOpenImage = () => setOpenImage(true);
  const handleCloseImage = () => setOpenImage(false);
  const [idximg,setidximg] = useState(null)
  const dispatch = useDispatch()
  const data = useSelector((state:RootState) => state.counter.data)
const {register,reset, handleSubmit, setValue, formState:{errors}} = useForm()

   const onsubmit = (data:any) =>{
if(idx!=null){
  dispatch(editData({
    id:idx,
    name:data.name,
    description:data.description
  }))
}
else{
const formData = new FormData()
formData.append("Name", data.name)
formData.append("Description", data.description)

if(data.images && data.images.length > 0){
  for(let i=0;i<data.images.length;i++){
    formData.append("Images", data.images[i])
  }
}
dispatch(addData(formData))
}
reset()
handleClose()
handleCloseEdit()
setidx(null)
  }


  const onSubmit2 = (data:any) =>{
    const formData = new FormData()
    if(data.images && data.images.length > 0){
      for(let i=0;i<data.images.length;i++){
        formData.append("Images", data.images[i])
      }
    }
    console.log(formData);
    
    dispatch(addImage({
      id:idximg,
      formData
    }))
    handleCloseImage()
  }

   function handleEdit(user){
      setidx(user.id)
  setValue("name", user.name)
  setValue("description", user.description)
      handleOpenEdit()
      
    }

  useEffect(() =>{
    dispatch(getData())
  },[])
  return (
    <>
    <div className='flex justify-center items-center p-15'>
<Button onClick={handleOpen}>Add new</Button>
    </div>
    <Table>

      <TableHead>

        <TableRow>

          <TableHead>
            Name
          </TableHead>
           <TableHead>
            Image
          </TableHead>
          <TableHead>
            Description
          </TableHead>
          <TableHead>
            Status
          </TableHead>
          <TableHead>
            Actions
          </TableHead>
        </TableRow>
      </TableHead>
      <TableBody>
        {data?.map((user:IData) =>{
          return <TableRow className='overflow-y-auto' key={user.id}>
            <TableCell>{user.name}</TableCell>
            <TableCell>{user.images.map((img) =>{
              return <div>
                <img  className='w-20 h-20 object-cover rounded' src={`${apiImg}/${img.imageName}`} alt="" />
              </div>
            })}</TableCell>
            <TableCell>{user.description}</TableCell>
            <TableCell>
              <Checkbox checked={user.isCompleted} onChange={() => dispatch(editStatus(user.id))} />
              <Button variant={`${user.isCompleted ? "default" : "destructive"}`}>{user.isCompleted ? "Active" : "Inactive"}</Button>
            </TableCell>
            <TableCell>
              <div className='overflow-x-auto w-full gap-5'>
                   <Button onClick={() => dispatch(deleteData(user.id))} variant='destructive'>Delete</Button>
                   <Button onClick={() => handleEdit(user)} variant={'secondary'}>Edit</Button>
                   <Button variant={`default`}>Info</Button>
              </div>
            </TableCell>
          </TableRow>
        })}
      </TableBody>
    </Table>
    

 <Modal
  open={open}
  onClose={handleClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Box sx={style}>
    <form onSubmit={handleSubmit(onsubmit)} action="">
    <TextField {...register("name")} fullWidth label="User name" /> <br /> <br />
    <TextField {...register("description")} fullWidth label="User description" /> <br /> <br />
    <Input  {...register("images")} fullWidth   type='file' /> <br /> <br /> <br />
    <Button type='submit' fullWidth variant='contained'  >Save</Button>
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
    <form onSubmit={handleSubmit(onsubmit)} action="">
    <TextField {...register("name")} fullWidth label="User name" /> <br /> <br />
    <TextField {...register("description")} fullWidth label="User description" /> <br /> <br />
    <Input  {...register("images")} fullWidth   type='file' /> <br /> <br /> <br />
    <Button type='submit' fullWidth variant='contained'  >Save</Button>
    </form>

  </Box>
</Modal>


<Modal
  open={openImage}
  onClose={handleCloseImage}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Box sx={style}>
    <form onSubmit={handleSubmit(onSubmit2)} action="">
    <Input {...register("images")}  fullWidth   type='file' /> <br /> <br /> <br />
    <Button type='submit' fullWidth variant='contained'  >Save</Button>
    </form>

  </Box>
</Modal>

  

    </>
  )
}

export default App