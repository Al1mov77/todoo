import { useState } from "react";
import { useAtom } from "jotai";
import { usersAtom, addUserAtom, deleteUserAtom, editUserAtom } from "../jotai/atoms";
import { Box, Button, Modal, TextField } from "@mui/material";
import { useFormik } from "formik";

const Jotai = () => {
  const [users] = useAtom(usersAtom);
  const [, addUser] = useAtom(addUserAtom);
  const [, deleteUser] = useAtom(deleteUserAtom);
  const [, editUser] = useAtom(editUserAtom);

  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [idx, setIdx] = useState<number | null>(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOpenEdit = () => setOpenEdit(true);
  const handleCloseEdit = () => setOpenEdit(false);

  const style = {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const formik = useFormik({
    initialValues: { name: "", age: 0, status: false },
    onSubmit: (user) => {
      if (idx != null) {
        editUser({ id: idx, name: user.name, age: user.age, status: user.status });
        handleCloseEdit();
      } else {
        addUser({ id: Date.now(), name: user.name, age: user.age, status: false });
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
      <div className="flex justify-center mt-6">
        <Button onClick={handleOpen} variant="outlined">Add New</Button>
      </div>
      <div className="overflow-x-auto mt-8">
        <table className="w-full max-w-4xl mx-auto border border-gray-200 rounded-lg shadow-md bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left text-gray-700">Name</th>
              <th className="px-4 py-2 text-left text-gray-700">Age</th>
              <th className="px-4 py-2 text-left text-gray-700">Status</th>
              <th className="px-4 py-2 text-left text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-t border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer">
                <td className="px-4 py-2">{user.name}</td>
                <td className="px-4 py-2">{user.age}</td>
                <td className="px-4 py-2">{user.status ? "Active" : "Inactive"}</td>
                <td className="px-4 py-2 flex gap-2">
                  <Button onClick={() => deleteUser(user.id)} variant="outlined" color="error">Delete</Button>
                  <Button onClick={() => handleEdit(user)} variant="outlined" color="primary">Edit</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
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

export default Jotai;
