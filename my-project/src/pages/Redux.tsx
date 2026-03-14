import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../redux/Store";
import { addUser, deleteUser, editUser } from "../redux/Counter";
import { Button, Modal, Box, TextField } from "@mui/material";
import { useFormik } from "formik";

const Redux = () => {
  const users = useSelector((state: RootState) => state.counter.users);
  const dispatch = useDispatch<AppDispatch>();
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [idx, setIdx] = useState<number | null>(null);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOpenEdit = () => setOpenEdit(true);
  const handleCloseEdit = () => setOpenEdit(false);

  const style = { position: "absolute" as const, top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 400, bgcolor: "background.paper", border: "2px solid #000", boxShadow: 24, p: 4 };

  const formik = useFormik({
    initialValues: { name: "", age: 0, status: false },
    onSubmit: (user) => {
      if (idx !== null) {
        dispatch(editUser({ id: idx, name: user.name, age: user.age, status: user.status }));
        handleCloseEdit();
      } else {
        dispatch(addUser({ id: Date.now(), name: user.name, age: user.age, status: false }));
        handleClose();
      }
      formik.resetForm();
      setIdx(null);
    },
  });

  const handleEdit = (user: { id: number; name: string; age: number; status: boolean }) => {
    setIdx(user.id);
    formik.setValues({ name: user.name, age: user.age, status: user.status });
    handleOpenEdit();
  };

  return (
    <>
      <div className="flex justify-center mt-4">
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
          {users.map((user) => (
            <tr key={user.id} className="border-t border-gray-200 hover:bg-gray-50 transition-colors duration-200 cursor-pointer">
              <td className="p-3">{user.name}</td>
              <td className="p-3">{user.age}</td>
              <td className="p-3">{user.status ? "Active" : "Inactive"}</td>
              <td>
                <Button onClick={() => dispatch(deleteUser(user.id))} variant="outlined" color="error">Delete</Button>
                <Button onClick={() => handleEdit(user)} variant="outlined" color="primary" className="ml-2">Edit</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <form onSubmit={formik.handleSubmit}>
            <TextField fullWidth name="name" onChange={formik.handleChange} value={formik.values.name} label="User Name" margin="normal" />
            <TextField fullWidth type="number" name="age" onChange={formik.handleChange} value={formik.values.age} label="User Age" margin="normal" />
            <Button type="submit" variant="outlined" sx={{ mt: 3 }}>Save</Button>
          </form>
        </Box>
      </Modal>
      <Modal open={openEdit} onClose={handleCloseEdit}>
        <Box sx={style}>
          <form onSubmit={formik.handleSubmit}>
            <TextField fullWidth name="name" onChange={formik.handleChange} value={formik.values.name} label="User Name" margin="normal" />
            <TextField fullWidth type="number" name="age" onChange={formik.handleChange} value={formik.values.age} label="User Age" margin="normal" />
            <Button type="submit" variant="outlined" sx={{ mt: 3 }}>Save</Button>
          </form>
        </Box>
      </Modal>
    </>
  );
};

export default Redux;