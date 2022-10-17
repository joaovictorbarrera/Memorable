import './App.css';
import React from 'react';
import {Route, Routes} from "react-router-dom"
import Home from "./pages/Home/Home"
import Profile from "./pages/Profile/Profile"
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import DefaultLayout from './layouts/DefaultLayout/DefaultLayout';
import AuthLayout from './layouts/AuthLayout/AuthLayout';
import AuthUserProvider from './contexts/AuthUserProvider';

function App() {
  return (
    <AuthUserProvider>
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route index element={<Home />} />
          <Route path=":username" element={<Profile />} />
        </Route>

        <Route path="/" element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
      </Routes>
    </AuthUserProvider>
  )
}

export default App;
