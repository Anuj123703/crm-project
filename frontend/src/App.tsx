import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import CreateLead from "./pages/CreateLead";
import EditLead from "./pages/EditLead";
import LeadDetails from "./pages/LeadDetail";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
    <Route path="/create-lead" element={<CreateLead />} />
      <Route path="/lead/edit/:id" element={<EditLead />} />
      <Route path="/lead/:id" element={<LeadDetails />} />
    </Routes>
  );
}