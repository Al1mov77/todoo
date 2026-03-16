import React, { useEffect, useState } from 'react'
import './App.css'
import { useTodo } from './todo'
import { Box, Button, Modal, TextField } from '@mui/material'
import { useFormik } from 'formik'

function App() {

const {data,getData,deleteData, addUser, edituser, searchUser} =  useTodo()
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  const [openEdit, setOpenEdit] = React.useState(false);
  const handleOpenEdit = () => setOpenEdit(true);
  const handleCloseEdit = () => setOpenEdit(false);


    const [openInfo, setOpenInfo] = React.useState(false);
  const handleOpenInfo = () => setOpenInfo(true);
  const handleCloseInfo = () => setOpenInfo(false);
  const [infoIdx,setinfoIdx] = useState(null)


  const [name,setName] = useState("")
  const [age,setAge] = useState("")
  const [img,setImg] = useState("")


  const [idx,setidx] = useState(null)
    const [nameEdit,setNameEdit] = useState("")
  const [ageEdit,setAgeEdit] = useState("")
  const [imgEdit,setImgEdit] = useState("")


  function handleEdit(user){
    setidx(user.id)
    setNameEdit(user.name),
    setImgEdit(user.img),
    setAgeEdit(user.age)
   handleOpenEdit()
  }

  function infoUser(user){
    setinfoIdx(user)
    handleOpenInfo()
  }
useEffect(() =>{
  getData()
},[])
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
  return (
    <>
    <div className='flex justify-center items-center p-5'>
      <Button onClick={handleOpen} variant='outlined'>Add New</Button>
    </div>
    <div className='flex justify-center items-center mt-5'>
 <TextField onChange={(e) => searchUser(e.target.value)} label="Search By Name.." />
  <select name="" id="">
    <option value="active">Active</option>
    <option value="inactive">Inactive</option>
  </select>
    </div>
     <div className="flex flex-wrap gap-5 p-5">
{data.map((e)=>{
return <div className="w-64 bg-white rounded shadow p-3">
<img src={e.image} className="w-full h-40 object-cover" />

<h1 className="text-lg font-bold mt-2">{e.name}</h1>
<h1 className="text-gray-500">{e.age}</h1>
<Button color={`${e.status ? "primary" : "error"}`} variant='contained'>{e.status ? "Active" : "Inactive"}</Button>

<div className="flex gap-2 mt-3">
<Button variant="outlined" color="error" onClick={()=>deleteData(e.id)}>Delete</Button>

<Button variant="outlined" color="warning" onClick={()=>handleEdit(e)}>Edit</Button>

<Button variant="outlined" color="primary" onClick={()=>infoUser(e)}>Info</Button>
</div>

</div>
})}
</div>
     <Modal
  open={open}
  onClose={handleClose}
  aria-labelledby="parent-modal-title"
  aria-describedby="parent-modal-description"
>
  <Box sx={{ ...style, width: 400 }}>
    <form onSubmit={(e) => {
      e.preventDefault(),
      addUser(name,age,img)
      handleClose()
    }} action="">
   <TextField onChange={(e) => setName(e.target.value)} name='name' fullWidth label="Users Name" /> <br /> <br /> 
   <TextField onChange={(e) => setImg(e.target.value)} name='img' fullWidth label="Users Image" /> <br /> <br /> 
   <TextField onChange={(e) => setAge(e.target.value)} name='age' fullWidth label="Users Age" /> <br /> <br />  <br />
   <Button type='submit' fullWidth variant='outlined'>Save</Button>

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
    <form onSubmit={(e) => {
      e.preventDefault(),
      edituser(idx,nameEdit,ageEdit,imgEdit),
      handleCloseEdit()
    }} action="">
   <TextField value={nameEdit} onChange={(e) => setNameEdit(e.target.value)} name='name' fullWidth label="Users Name" /> <br /> <br /> 
   <TextField value={imgEdit} onChange={(e) => setImgEdit(e.target.value)} name='img' fullWidth label="Users Image" /> <br /> <br /> 
   <TextField value={ageEdit} onChange={(e) => setAgeEdit(e.target.value)} name='age' fullWidth label="Users Age" /> <br /> <br />  <br />
   <Button type='submit' fullWidth variant='outlined'>Save</Button>

    </form>

  </Box>
</Modal>



<Modal
  open={openInfo}
  onClose={handleCloseInfo}
  aria-labelledby="parent-modal-title"
  aria-describedby="parent-modal-description"
>
  <Box sx={{ ...style, width: 400 }}>
 

  {infoIdx && (
    <div>
      <img src={infoIdx.image} alt="" />
      <h1>{infoIdx.name}</h1>
      <h1>{infoIdx.age}</h1>
    </div>
)}

  </Box>
</Modal>
    </>
  )
}

export default App
