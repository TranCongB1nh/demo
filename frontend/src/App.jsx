import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Dashboard from "./Pages/Dashboard";

const App = () => {
  // const navigate = useNavigate();
  // const location = useLocation();

  // useEffect(() => {
  //   const localUser = localStorage.getItem("currentUser");
  //   const sessionUser = sessionStorage.getItem("currentUser");

  //   // Nếu không có người dùng đăng nhập, điều hướng đến trang Login
  //   if (!localUser && !sessionUser) {
  //     if (location.pathname !== "/login" && location.pathname !== "/register") {
  //       navigate("/login", { replace: true });
  //     }
  //   } else {
  //     // Nếu người dùng đã đăng nhập và đang ở trang login, điều hướng đến trang Todo
  //     if (location.pathname === "/login" || location.pathname === "/register") {
  //       navigate("/todo", { replace: true });
  //     }
  //   }
  // }, [navigate, location]);

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
};

export default App;
