import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import "./App.css";
import "antd/dist/reset.css";
import globalRouter from "@constants/navigate";

export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

function App() {
  const navigate = useNavigate();
  globalRouter.navigate = navigate;

  return (
    <>
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
