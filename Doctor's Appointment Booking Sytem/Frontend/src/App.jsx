import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/home'
import Doctors from './pages/doctors'
import Login from './pages/Login'
import About from './pages/about'
import Contact from './pages/contact'
import MyAppointments from './pages/MyAppointments'
import Myprofile from './pages/Myprofile'
import Appointments from './pages/Appointments'
import Navbar from './components/navbar'
import Header from './components/header'

const App = () => {
  return (
    <div className='mx-4 sm:mx-[10%]'>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/doctors' element={<Doctors/>} />
        <Route path='/doctors/:speciality' element={<Doctors/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/contact' element={<Contact/>} />
        <Route path='/my-profile' element={<Myprofile/>} />
        <Route path='/my-appointments' element={<MyAppointments/>} />
        <Route path='/appointments/:docId' element={<Appointments/>} />
        
      </Routes>
    </div>
  )
}

export default App