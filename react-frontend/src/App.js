import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import TopBar from "./header/topBar.js";
import Home from "./home/Home.js";
import Login from "./userManagement/Login.js";
import Register from "./userManagement/Register.js";

function App() {

  return (
    <div style={{height: "100vh", backgroundColor: "#8c8c8c"}}>
    <Router>
      <div className="App">
        <TopBar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </div>
    </Router>
    </div>
  );
}

export default App;
