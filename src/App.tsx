import React,{useState}from "react"
import type {RootState}from "./store/store"
import {useSelector,useDispatch}from "react-redux"
import {deleteUser,addUser,editUser}from "./counter"
import {Box,Button,Modal,TextField,Checkbox}from "@mui/material"
import {useFormik}from "formik"

function App(){

const {data}=useSelector((store:RootState)=>store.counter)
const dispatch=useDispatch()

const[open,setOpen]=useState(false)
const[openEdit,setOpenEdit]=useState(false)
const[idx,setidx]=useState<number|null>(null)
const[search,setSearch]=useState("")

const style={
position:"absolute",
top:"50%",
left:"50%",
transform:"translate(-50%,-50%)",
width:400,
background:"#fff",
padding:"20px",
borderRadius:"8px",
boxShadow:"0 10px 25px rgba(0,0,0,0.2)"
}

const {handleChange,handleSubmit,values,setValues}=useFormik({
initialValues:{name:"",age:"",status:false},
onSubmit:(values:any)=>{
if(idx!=null){
dispatch(editUser({id:idx,name:values.name,age:values.age,status:values.status}))
setOpenEdit(false)
setidx(null)
}else{
dispatch(addUser({id:Date.now(),name:values.name,age:values.age,status:values.status}))
setOpen(false)
}
setValues({name:"",age:"",status:false})
}
})

function handleEdit(user:any){
setidx(user.id)
setValues({name:user.name,age:user.age,status:user.status})
setOpenEdit(true)
}

const filtered=data.filter((e:any)=>e.name.toLowerCase().includes(search.toLowerCase()))

return(
<>
<table style={{margin:"auto",marginTop:"80px",width:"90%",borderCollapse:"collapse",fontFamily:"sans-serif",boxShadow:"0 2px 10px rgba(0,0,0,0.1)"}}>

<thead>
<tr>
<th colSpan={4} style={{padding:"15px"}}>
<Button variant="contained" onClick={()=>setOpen(true)}>Add User</Button>
<TextField  placeholder="Search" value={search} onChange={(e)=>setSearch(e.target.value)} style={{marginLeft:"10px"}}/>
</th>
</tr>
<tr style={{background:"#f5f5f5"}}>
<th style={{padding:"12px",border:"1px solid #FFF"}}>Name</th>
<th style={{padding:"12px",border:"1px solid #FFF"}}>Age</th>
<th style={{padding:"12px",border:"1px solid #FFF"}}>Status</th>
<th style={{padding:"12px",border:"1px solid #FFF"}}>Actions</th>
</tr>
</thead>

<tbody>
{filtered.map((user:any)=>(
<tr key={user.id}>
<td style={{padding:"12px",border:"1px solid #FFF"}}>{user.name}</td>
<td style={{padding:"12px",border:"1px solid #FFF"}}>{user.age}</td>
<td style={{padding:"12px",border:"1px solid #FFF"}}><Checkbox checked={user.status}/></td>
<td style={{padding:"12px",border:"1px solid #fffbfb"}}>
<Button variant="outlined" color="error" onClick={()=>dispatch(deleteUser(user.id))}>Delete</Button>
<Button variant="outlined" onClick={()=>handleEdit(user)} style={{marginLeft:"8px"}}>Edit</Button>
</td>
</tr>
))}
</tbody>

<Modal open={open} onClose={()=>setOpen(false)}>
<Box sx={style}>
<form onSubmit={handleSubmit} style={{display:"flex",flexDirection:"column",gap:"15px"}}>
<TextField name="name" label="Name" value={values.name} onChange={handleChange}/>
<TextField name="age" label="Age" value={values.age} onChange={handleChange}/>
<div style={{display:"flex",alignItems:"center"}}>
<Checkbox checked={values.status} onChange={(e)=>setValues({...values,status:e.target.checked})}/>
Status
</div>
<Button type="submit" variant="contained">Save</Button>
</form>
</Box>
</Modal>

<Modal open={openEdit} onClose={()=>setOpenEdit(false)}>
<Box sx={style}>
<form onSubmit={handleSubmit} style={{display:"flex",flexDirection:"column",gap:"15px"}}>
<TextField name="name" label="Name" value={values.name} onChange={handleChange}/>
<TextField name="age" label="Age" value={values.age} onChange={handleChange}/>
<div style={{display:"flex",alignItems:"center"}}>
<Checkbox checked={values.status} onChange={(e)=>setValues({...values,status:e.target.checked})}/>
Status
</div>
<Button type="submit" variant="contained">Save</Button>
</form>
</Box>
</Modal>

</table>
</>
)
}

export default App