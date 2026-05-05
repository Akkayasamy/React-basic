import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AuthPage from "./pages/AuthPage";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import ProjectsPage from "./pages/ProjectsPage";
import MilestonesPage from "./pages/MilestonesPage";
import TasksPage from "./pages/TasksPage";
import SubtasksPage from "./pages/SubtasksPage";
import TimesheetsPage from "./pages/TimesheetsPage";
import OverViewPage from "./pages/OverviewPage.jsx";

import { useAuth } from "./context/AuthContext.";
import { useUsers } from "./graphql/getUserQuery.js";
import { UserProvider } from "./context/UserContext.jsx";

import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Help from "./pages/Help.jsx";

function App() {
  const { isAuth } = useAuth();
  const { status, data, errorMessage, loading } = useUsers(!isAuth);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <UserProvider value={{ data, loading, status, errorMessage }}>
      <BrowserRouter>
        <ToastContainer position="top-right" autoClose={3000} />

        {/* Navbar — passes hamburger state */}
        {isAuth && (
          <Navbar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
        )}

        {/* Sidebar — only when authenticated */}
        {isAuth && (
          <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
        )}

        {/* Main content area */}
        <div
          style={{
            paddingTop: isAuth ? 64 : 0,
            marginLeft: isAuth && sidebarOpen ? 220 : 0,
            transition: "margin-left 0.3s ease",
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
            <Route
              path="/overview"
              element={isAuth ? <OverViewPage /> : <Navigate to="/" />}
            />
            <Route
              path="/projects"
              element={isAuth ? <ProjectsPage /> : <Navigate to="/" />}
            />
            <Route
              path="/milestones"
              element={isAuth ? <MilestonesPage /> : <Navigate to="/" />}
            />
            <Route
              path="/tasks"
              element={isAuth ? <TasksPage /> : <Navigate to="/" />}
            />
            <Route
              path="/subtasks"
              element={isAuth ? <SubtasksPage /> : <Navigate to="/" />}
            />
            <Route
              path="/timesheets"
              element={isAuth ? <TimesheetsPage /> : <Navigate to="/" />}
            />
            <Route
              path="/help"
              element={<Help />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;