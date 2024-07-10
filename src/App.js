import React from "react";
import Home from "./Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SingaleMovie from "./SingaleMovie";
import Error from './Error'
import "./App.css"
export default function App() {
  return (
    <>
   
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<SingaleMovie />} />
           <Route path="/*"element={<Error/>}/>
        </Routes>
   
    </>
  );
}
