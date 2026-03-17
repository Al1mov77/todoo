import type { RootState } from "./store/store"
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getData, deleteData, addUser, searchUser, editUser, checkStatus } from './reducers/redux'
import { Box, Button, Checkbox, Modal, TextField } from "@mui/material"
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
const App = () => {
const {data, isLoading} = useSelector((store:RootState) => store.todo)
const dispatch = useDispatch()

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


    const [openInfo, setOpenInfo] = React.useState(false);
  const handleOpenInfo = () => setOpenInfo(true);
  const handleCloseInfo = () => setOpenInfo(false);


   const [openEdit, setOpenEdit] = React.useState(false);
  const handleOpenEdit = () => setOpenEdit(true);
  const handleCloseEdit = () => setOpenEdit(false);

  const [idx,setidx] = useState(null)
  const [nameEdit,setEdit] = useState("")
  const [ageEdit,setageEdit] = useState("")


  const [nameAdd,setname] = useState("")
  const [ageAdd,setage] = useState("")
  const [idximg,setidximg] = useState(null)


  function handleEdit(user){
    setEdit(user.name)
    setageEdit(user.age)
    setidx(user.id)
    handleOpenEdit()
    
  }
  function infoUser(user){
    setidximg(user)
handleOpenInfo()
  }


useEffect(() => {
  dispatch(getData())
}, [])

if(isLoading){
  return <div>
    Loading
  </div>
}

  return (
    <>
    <button onClick={handleOpen}>add</button>
    <TextField onChange={(e) => dispatch(searchUser(e.target.value))} />
     {data.map((user) =>{
      return <div>
        <img src={user.image} alt="" />
        <h1>{user.name}</h1>
        <h1>{user.age}</h1>
        <Button color={`${user.status ? "primary" : "error"}`} variant="outlined">{user.status ? "Active" : "Inactive"}</Button>
        <Button color="error" variant="contained" onClick={() => dispatch(deleteData(user.id))}>Delete</Button>
        <Button onClick={() => infoUser(user) } color="warning" variant="outlined">Info</Button>
        <Button onClick={() => handleEdit(user)} color="warning"  variant="contained">Edit</Button>
        <Checkbox checked={user.status} onChange={() => dispatch(checkStatus(user))} />
      </div>
     })}
     <Modal
  open={open}
  onClose={handleClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Box sx={style}>
    <form onSubmit={(e) =>{
      e.preventDefault()
      dispatch(addUser({
        name:nameAdd,
        age:ageAdd,
        id:Date.now(),
        status:false
      }))
      handleClose()
    }}>

      <TextField onChange={(e) => setname(e.target.value)} value={nameAdd}  fullWidth label="user name" /> <br /> <br />
<TextField onChange={(e) => setage(e.target.value)} value={ageAdd} fullWidth label="user age" /> <br /> <br /> <br />
<Button type="submit" fullWidth  variant="outlined">Save</Button>
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
     {idximg && (
      <div>
        <img src={idximg.image} alt="" />
      <p>{idximg.name}</p>
    <p>{idximg.age}</p>
      </div>

  )}
  </Box>
</Modal>


 <Modal
  open={openEdit}
  onClose={handleCloseEdit}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Box sx={style}>
    <form onSubmit={(e) =>{
      e.preventDefault(),
      dispatch(editUser({
        id:idx,
        name:nameEdit,
        age:ageEdit,
        status:false
      }))
      handleCloseEdit()
    }} >

      <TextField onChange={(e) => setEdit(e.target.value)} value={nameEdit}  fullWidth label="user name" /> <br /> <br />
<TextField onChange={(e) => setageEdit(e.target.value)} value={ageEdit} fullWidth label="user age" /> <br /> <br /> <br />
<Button type="submit" fullWidth  variant="outlined">Save</Button>
    </form>

  </Box>
</Modal>
    </>
  )
}

export default App
