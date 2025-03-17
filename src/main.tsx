import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import "./index.css";
import App from "./App.tsx";
import { Login } from "./components/authentication/Login.tsx";
import { Navbar } from "./components/navbar/Navbar.tsx";
import { ManagePlants } from "./pages/ManagePlants.tsx";
import { Signup } from "./components/authentication/Signup.tsx";

const root = document.getElementById("root") as HTMLElement;

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Navbar />} />
      <Route path="auth" element={<Login />} />
      <Route path="signup" element={<Signup />} />
      <Route path="app" element={<App />}>
        <Route path="manage" element={<ManagePlants />} />
      </Route>
      <Route path="*" element={<div>Error</div>} />
    </Routes>
  </BrowserRouter>
);
