import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'sonner'

import "./index.css"

import { AppContextProvider, useAppContext } from './Hooks/useAppContext'

import App from "./App"

import HomePage from './Pages/HomePage'
import AdminPage from './Pages/AdminPage'
import LoginPage from './Pages/LoginPage'
import RegisterPage from './Pages/RegisterPage'
import OTPconfirmPage from './Pages/OTPconfirmPage'
import StoresPage from "./Pages/StoresPage"
import CreateStorePage from './Pages/CreateStorePage'
import StorePage from './Pages/StorePage'


const RouteWrapper = () => {

  const {Logged} = useAppContext()

  return(

    <>
      <Routes>

        <Route path="/admin" element={<AdminPage/>}/>
        <Route path="/home" element={<HomePage/>}/>
        <Route path="/register" element={Logged ? <Navigate to="/home" replace/> : <RegisterPage/>}/>
        <Route path="/login" element={Logged ? <Navigate to="/home" replace/> : <LoginPage/>}/>
        <Route path="/register/otp-confirm" element={Logged ? <Navigate to="/home" replace/> : <OTPconfirmPage/>}/>
        <Route path="/create-store" element={<CreateStorePage/>}/>
        <Route path="/stores" element={<StoresPage/>}/>
        <Route path="/stores/:id" element={<StorePage/>}/>


      </Routes>
      
      <Toaster position="top-center"/>
    </>

  );

}



createRoot(document.getElementById('root')).render(
  
  
  <BrowserRouter>

    <AppContextProvider>
      
      <RouteWrapper/>

    </AppContextProvider>

  </BrowserRouter>
)