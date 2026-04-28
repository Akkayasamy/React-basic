import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { getToken } from "./utils/auth";
import AuthPage from "./pages/AuthPage";
import Dashboard from "./pages/Dashboard";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";

function App() {
  const token = getToken();
  const isAuth = !!token;

  return (
    <BrowserRouter>
      <ToastContainer position="top-right" autoClose={3000} />
      {isAuth && <Sidebar />}
      {isAuth && <Header />}

      <div
        style={{
          marginLeft: isAuth ? 200 : 0,
          paddingTop: isAuth ? 60 : 0,
          flex: 1,
          minHeight: 0,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Routes>
          <Route
            path="/"
            element={isAuth ? <Navigate to="/dashboard" /> : <AuthPage />}
          />
          <Route
            path="/dashboard"
            element={isAuth ? <Dashboard /> : <Navigate to="/" />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;