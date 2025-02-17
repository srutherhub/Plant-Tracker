import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import "./index.css";
import App from "./App.tsx";
import { Login } from "./components/authentication/Login.tsx";
import { Navbar } from "./components/navbar/Navbar.tsx";

const root = document.getElementById("root") as HTMLElement;

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Navbar />} />
      <Route path="auth" element={<Login />} />
      <Route path="app" element={<App />} />
    </Routes>
  </BrowserRouter>
);
