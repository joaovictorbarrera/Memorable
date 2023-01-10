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
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

function App() {
  const client = new QueryClient()

  return (
    <QueryClientProvider client={client}>
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
    </QueryClientProvider>
  )
}

export default App;
