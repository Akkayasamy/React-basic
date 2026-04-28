import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { getToken } from "./utils/auth";
import AuthPage from "./pages/AuthPage";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import ProjectsPage from "./pages/ProjectsPage";
import MilestonesPage from "./pages/MilestonesPage";
import TasksPage from "./pages/TasksPage";
import SubtasksPage from "./pages/SubtasksPage";
import TimesheetsPage from "./pages/TimesheetsPage";

function App() {
  const token = getToken();
  const isAuth = !!token;

  return (
    <BrowserRouter>
      <ToastContainer position="top-right" autoClose={3000} />
      {isAuth && <Navbar />}

      <div
        style={{
          paddingTop: isAuth ? 64 : 0,
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
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;