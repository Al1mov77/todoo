import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './pages/Layout'
import Zustand from './pages/Zustand'
import Redux from './pages/Redux'
import Jotai from './pages/Jotai'
function App(){
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route index element={<Layout />} />
      <Route path='/zustand' element={<Zustand />} />
      <Route path='/redux' element={<Redux />} />
      <Route path='/jotai' element={<Jotai />} />
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
