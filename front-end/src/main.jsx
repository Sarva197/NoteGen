import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './landingpage/homePage/HomePage';
import SignUp from './landingpage/signUp/SignUp';
import AboutPage from './landingpage/about/AboutPage';
import Login from './landingpage/login/Login';
import Planspage from './landingpage/plans/Planspage';
import Navbar from './landingpage/Navbar';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path="/" element={<HomePage />}></Route>
      <Route path="/about" element={<AboutPage/>}></Route>
      <Route path='/plans' element={<Planspage/>}></Route>
      <Route path="/signup" element={<SignUp />}></Route>
      <Route path="/login" element={<Login/>}></Route>
    </Routes>
  </BrowserRouter>
)
