import React, { useEffect, useState } from 'react'
import './App.css'
import { useTodo } from './Todo'
import { Box, Button, Checkbox, Modal, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
 let apiImg = "http://37.27.29.18:8001/images";

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
  useEffect(() =>{
getData()
  }, [])
     
  const {data, getData, deleteData, addData, editData, deleteImage, addImage, editStatus}:any = useTodo()
  const [idx,setidx] = useState(null)
  const [idxImage,setidxImage] = useState(null)
  const {register,handleSubmit,watch, setValue,reset,formState:{errors}} = useForm()
  const onsubmit = (data:any) =>{
const formData = new FormData()
   if(idx!=null){
    editData({
      id:idx,
      name:data.name,
      description:data.description
    })
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
       addData(formData)
   }
   handleClose()
   handleCloseEdit()
   reset()
   setidx(null)
    
    }
    function handleEdit(user){
      setidx(user.id)
  setValue("name", user.name)
  setValue("description", user.description)
      handleOpenEdit()
      
    }
 const onSubmit = (data) =>{
  const formData = new FormData()
  if (data.images && data.images.length > 0) {
  for(let i=0;i<data.images.length;i++){
    formData.append("Images", data.images[i])
  }
}
  addImage({
    id:idxImage,
    formData
  })
  handleCloseImage()
 }
  
    const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [openEdit, setOpenEdit] = React.useState(false);
  const handleOpenEdit = () => setOpenEdit(true);
  const handleCloseEdit = () => setOpenEdit(false);


   const [openImage, setOpenImage] = React.useState(false);
  const handleOpenImage = () => setOpenImage(true);
  const handleCloseImage = () => setOpenImage(false);
  return (
    <>
    <div className='flex justify-center items-center p-15'>
<Button onClick={handleOpen} variant='outlined'>Add New</Button>
    </div>
    <div className='flex justify-between p-15 flex-wrap'>
    
      {data?.map((user:any) =>{
        return <div className='relative rounded-2xl text-center shadow-2xl p-10 w-100 hover:translate-y-[-10px] transition-all duration-300 ease-in-out'>
          <p className='font-bold text-2xl'>{user.name}</p>
          <p className='font-semibold'>{user.age}</p>
          <p className='font-semibold'>{user.description}</p> <br /> <br />
          <div className='flex gap-5 items-center justify-center'>
                      <Button color={`${user.isComplited ? "success" : "error"}`} variant='contained'>{user.isCompleted ? "Active" : "Inactive"}</Button>
                      <Checkbox onChange={() => editStatus(user.id)} checked={user.isCompleted} />
          </div>
          <div className="flex justify-center mb-3">
          {user.images?.map((img) => (
            <div key={img.id}>
              <img
                className="h-[180px] w-[180px] rounded-[50%]"
                src={`${apiImg}/${img.imageName}`}
                alt=""
              />
              <br />
              <div className='flex items-center justify-center gap-5'>
       <Button onClick={() => deleteImage(img.id)}
               
variant='outlined'
 color='error'
>
                DelImg
              </Button>
              <Button onClick={() =>{
                setidxImage(user.id),
                handleOpenImage()
              }} variant='outlined'>Add Image</Button>
              </div>
       
            </div>
          ))}<div/>
      </div>
      <div className='flex gap-17 items-center justify-center'>
              <Button onClick={() => deleteData(user.id)} color='error' variant='outlined'>Delete</Button>
              <Button onClick={() => handleEdit(user)} color='warning' variant='outlined'>Edit</Button>
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
   <TextField {...register("name")} fullWidth label="User Name" /> <br /> <br />
   <input multiple {...register("images")}  type="file" />
   <TextField {...register("description")} fullWidth label="User Description" /> <br /> <br /> <br />
   <Button type='submit' fullWidth color='success' variant='contained'>Save</Button>
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
   <TextField {...register("name")} fullWidth label="User Name" /> <br /> <br />
   <input multiple {...register("images")}  type="file" />
   <TextField {...register("description")} fullWidth label="User Description" /> <br /> <br /> <br />
   <Button type='submit' fullWidth color='success' variant='contained'>Save</Button>
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
    <form onSubmit={handleSubmit(onSubmit)} action="">
   <input multiple {...register("images")}  type="file" />
   <Button type='submit'>Save</Button>
    </form>

  </Box>
</Modal>
    </>
  )
}

export default App