import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import EditProfile from "./components/EditProfile/EditProfile";
import Dashboard from "./components/Home/Dashboard";
import AboutUs from "./components/Pages/AboutUs";
import Contact from "./components/Pages/Contact";

function App() {
  return (
      <Routes>
        <Route path="/" element={<Layout />}> 
          <Route index element={<Home />}/>
          <Route path="/aboutUs" element={<AboutUs />}/>
          <Route path="/contact" element={<Contact />}/>
          <Route path="/dashboard" element={<Dashboard />}/>
        </Route>
        <Route path="/login" element={<Login />}/>
        <Route path="/editProfile" element={<EditProfile />}/>
      </Routes>
  );
}

export default App;
