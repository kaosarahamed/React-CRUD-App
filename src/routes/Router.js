import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Users from "../pages/Users/Users";
function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Users />} />
        {/* <Route path='/edituser/:id' element={<EditUser />}/>  */}
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
