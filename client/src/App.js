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
        <Route exact path="/" element={<DefaultLayout />}>
          <Route index element={<Home />} />
          <Route exact path=":username" element={<Profile />} />
        </Route>

        <Route exact path="/" element={<AuthLayout />}>
          <Route exact path="login" element={<Login />} />
          <Route exact path="register" element={<Register />} />
        </Route>
      </Routes>
    </AuthUserProvider>
  )
}

export default App;
