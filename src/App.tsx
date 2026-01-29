import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import AppProvider from "./context/AppContext";
import AuthProvider from "./context/AuthContext";
import Login from "./pages/Login/Login";
import Dashboard from "./pages/dashboard/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppProvider>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </AppProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
