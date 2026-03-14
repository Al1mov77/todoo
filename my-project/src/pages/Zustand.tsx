import { useState } from "react";
import { useTodo, type User } from "../zustand/Todo";
import { Box, Button, Modal, TextField } from "@mui/material";
import {useFormik} from "formik"

const Zustand = () => {
      const {handleChange, values, resetForm, handleSubmit, setValues} = useFormik({
    initialValues:{
      name:"",
      age:0,
      status:false
    },
    onSubmit:(user)=>{
      if(idx !== null){
       editUser(idx, user.name, user.age, user.status)
       handleCloseEdit()
      }
      else{
       addUser(user.name, user.age, false)
       handleClose()
      }
      resetForm()

    }
  })
    const {data, deleteUser, editUser, addUser} = useTodo()
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
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


    const [openEdit, setOpenEdit] = useState(false);
  const handleOpenEdit = () => setOpenEdit(true);
  const handleCloseEdit = () => setOpenEdit(false);
  const [idx,setIdx] = useState<number | null>(null)

  function handleEdit(user: User){
    setIdx(user.id)
    setValues({
      name:user.name,
      age:user.age,
      status:user.status
    })
    handleOpenEdit()
  }
  return (
    <>
    <div className="flex justify-center">
      <Button onClick={handleOpen} variant="outlined">Add New</Button>
    </div>
  <table className="w-[90%] m-auto border border-gray-300 rounded-lg overflow-hidden shadow-md mt-10">
  <thead className="bg-gray-100">
    <tr>
      <th className="p-3 text-left text-gray-700">Name</th>
      <th className="p-3 text-left text-gray-700">Age</th>
      <th className="p-3 text-left text-gray-700">Status</th>
      <th className="p-3 text-left text-gray-700">Actions</th>
    </tr>
  </thead>
  <tbody>
    {data.map((user: User) =>{
        return   <tr className="border-t border-gray-200 hover:bg-gray-50 transition-colors duration-200 cursor-pointer">
      <td className="p-3">{user.name}</td>
      <td className="p-3">{user.age}</td>
      <td className="p-3">{user.status ? "Active" : "Inactive"}</td>
      <td>
        <Button onClick={() => deleteUser(user.id)} variant="outlined" color="error">Delete</Button>
        <Button onClick={() => handleEdit(user)} variant="outlined" color="primary">Edit</Button>
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
   <TextField name='name' onChange={handleChange} value={values.name} label="User Name" /> <br /> <br />
   <TextField name='age' onChange={handleChange} value={values.age} label="User Age" /> <br /> <br /> <br />
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
   <TextField name='name' onChange={handleChange} value={values.name} label="User Name" /> <br /> <br />
   <TextField name='age' onChange={handleChange} value={values.age} label="User Age" /> <br /> <br /> <br />
   <Button type='submit' variant='outlined'>Save</Button>

    </form>

  </Box>
</Modal>
    </>

  );

  
};

export default Zustand;