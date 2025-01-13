import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router'
import './index.css'
import App from './App.tsx'
import { Login } from './authentication/Login.tsx';

const root = document.getElementById("root") as HTMLElement;

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <Routes>
      <Route path="auth" element={<Login />} />
      <Route path="app" element={<App />} />
    </Routes>
  </BrowserRouter>
);
