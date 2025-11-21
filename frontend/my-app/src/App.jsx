import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './Components/Home'
import Addnew from './Components/Addnew'
import Edit from './Components/Edit'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Routes>
     
      <Route path='/' element={<Home></Home>}/>
      <Route path='/Addnew' element={<Addnew></Addnew>}/>
      <Route path='/Edit/:id' element={<Edit></Edit>}/>
      
    </Routes>
    </>
  )
}

export default App
