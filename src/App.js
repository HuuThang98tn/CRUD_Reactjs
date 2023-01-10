import React from "react";
import './App.css';
import Employee from './Screen/Employee';
import ScreenLogin from "./Screen/ScreenLogin"
import { BrowserRouter, Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ScreenLogin />} />
        <Route path="/todolist" element={<Employee />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
