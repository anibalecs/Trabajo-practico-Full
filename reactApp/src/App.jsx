import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import EditProfile from "./components/EditProfile/EditProfile";
import Dashboard from "./components/Home/Dashboard";
import AboutUs from "./components/Pages/AboutUs";
import Contact from "./components/Pages/Contact";
import DeleteUser from "./components/DeleteUser/DeleteUser";
import PrivateRoute from "./components/Home/PrivateRoute/PrivateRoute";

function App() {
  const isAuthenticated = !!localStorage.getItem('token');

  return (
      <Routes>
        <Route path="/" element={<Layout />}> 
          <Route index element={<Home />}/>
          <Route path="/aboutUs" element={<AboutUs />}/>
          <Route path="/contact" element={<Contact />}/>
          <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        </Route> 
        <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard"/> : <Login />}/>
        <Route path="/editProfile" element={<EditProfile />}/>
        <Route path="/DeleteUser" element={<DeleteUser />}/>
      </Routes>
  );
}

export default App;
