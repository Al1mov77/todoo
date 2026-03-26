import { useDispatch, useSelector } from 'react-redux'
import './App.css'
import React, { useEffect, useState } from 'react'
import { addData, addImage, deleteData, deleteImage, editData, editStatus, getData, getInfo } from './api'
let apiImg = "http://37.27.29.18:8001/images"
import type { RootState } from '@reduxjs/toolkit/query'
import { Box, Button, Checkbox, Input, Modal, TextField } from '@mui/material'
import { useForm } from 'react-hook-form'

function App(){
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



    const [openInfo, setOpenInfo] = React.useState(false);
  const handleOpenInfo = () => setOpenInfo(true);
  const handleCloseInfo = () => setOpenInfo(false);
const [idxinfo,setidxinfo] = useState(null)
  const dispatch = useDispatch()

  const data = useSelector((state:RootState) => state.counter.data)
  const info = useSelector((state:RootState) => state.counter.info)

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
      <Button variant='outlined' onClick={handleOpen}>Add New</Button>
    </div>
    <div className='flex flex-wrap items-center gap-5 justify-between'>

            {data.map((user) =>{
        return <div className='flex flex-col gap-5 justify-center items-center shadow-2xl rounded-2xl p-15'>
          <h1>{user.name}</h1>
          <h1>{user.description}</h1>
          <div className='flex gap-2 items-center'>
            <Checkbox onChange={() => dispatch(editStatus(user.id))} checked={user.isCompleted} />
                      <Button color={`${user.isCompleted ? "success" : "error"}`} variant='contained'>{user.isCompleted ? "Active" : "Inactive"}</Button>
          </div>

          {user.images?.map((img) =>{
            return <div>
              <img className='w-[300px] h-[300px]' src={`${apiImg}/${img.imageName}`} alt="" />
              <div className='flex gap-3 justify-center mt-5'>
                          <Button onClick={() => dispatch(deleteImage(img.id))} variant='contained' color='error'>Delete Image</Button>
                          <Button onClick={() =>{
                            setidximg(img.id)
                            handleOpenImage()
                          }}  variant='contained'>Add Image</Button>
              </div>

            </div>
          })}
          <div className='flex gap-3 justify-center mt-5'>
          <Button onClick={() => dispatch(deleteData(user.id))} color='error' variant='outlined'>Delete</Button>
          <Button onClick={() => handleEdit(user)} variant='outlined' color='warning'>Edit</Button>
          <Button onClick={() =>{
            setidxinfo(user.id)
            handleOpenInfo()
            dispatch(getInfo(user.id))
          }}  variant='outlined'>Info</Button>
          </div>
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


<Modal
  open={openInfo}
  onClose={handleCloseInfo}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Box sx={style}>
   {info ? (
    <>
    <h1 className='font-bold text-2xl'>{info.name}</h1>
    <h1 className='font-semibold'>{info.description}</h1> <br />
    <div className='flex gap-2 items-center'>
            <Checkbox onChange={() => dispatch(editStatus(info.id))} checked={info.isCompleted} />
                      <Button color={`${info.isCompleted ? "success" : "error"}`} variant='contained'>{info.isCompleted ? "Active" : "Inactive"}</Button>
          </div>
    </>
   ) : (
    <>
    <p>Loading..</p>
    </>
   )} <br /> <br /> <br />
   <Button onClick={handleCloseInfo} variant='outlined' fullWidth>Close</Button>
    
  </Box>
</Modal>
    </>
  )
}

export default App