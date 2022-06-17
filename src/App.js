import React from 'react';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Home from './components/Home';
import Nav from './components/Nav';
import Login from './components/Login';
import Register from './components/Register';
import {BrowserRouter, Route, Routes } from 'react-router-dom';
import HomeReactComponent from './components/HomeReactComponent';
import ClassComponent from './components/ClassComponent';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
        <Nav/>
        <ClassComponent />
        {/* <HomeReactComponent />
        <div className="auth-wrapper">
          <div className="container auth-inner">
            <Routes>
              <Route exact path='/' element={<Home/>} />
              <Route exact path='/login' element={<Login/>} />
              <Route exact path='/register' element={<Register/>} />
            </Routes>
          </div>
        </div> */}
    </div>
    </BrowserRouter>
  );
}

export default App;
