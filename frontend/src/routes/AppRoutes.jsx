import LandingPage from '@/pages/LandingPage'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Verify from '@/pages/Verify'
import React from 'react'
import { Routes , Route , BrowserRouter} from 'react-router-dom'

const AppRoutes = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<LandingPage/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/verify-email' element={<Verify/>}/>
        </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes