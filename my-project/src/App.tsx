import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Zustand from './pages/Zustand'
import Redux from './pages/Redux'
import Jotai from './pages/Jotai'
import Layout from './pages/Layout'

function App() {
  return (
    <>
     <BrowserRouter>
     <Routes>
       <Route path='/' element={<Layout />}>
       <Route path='zustand' index  element={<Zustand />} />
      <Route path='redux'  element={<Redux />} />
      <Route  path='jotai'  element={<Jotai />} />
       </Route>

     </Routes>
     </BrowserRouter>
    </>
  )
}

export default App