import './App.css';
import React from 'react';
import {Route, Routes} from "react-router-dom"
import Home from "./pages/Home"
import Profile from "./pages/Profile"
import PageLayout from './layouts/PageLayout';

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<PageLayout />}>
        <Route index element={<Home />} />
        <Route exact path=":username" element={<Profile />} />
      </Route>
    </Routes>
  )
}

export default App;
