import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Candidates from "./pages/Candidates";
import AdminResults from "./pages/AdminResults";
import AddCandidate from "./pages/AddCandidate";
import DeleteCandidate from "./pages/DeleteCandidate";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import { Toaster } from "react-hot-toast";
import VotingHistory from "./pages/VotingHistory";


function App() {
  return (
    <BrowserRouter>
      <Toaster />

      <Routes>

        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />   {/* 🔥 THIS */}

        <Route
          path="/candidates"
          element={
            <ProtectedRoute>
              <Candidates />
            </ProtectedRoute>
          }
        />

      <Route
  path="/history"
  element={
    <ProtectedRoute>
      <VotingHistory />
    </ProtectedRoute>
  }
/>


        <Route
          path="/results"
          element={
            <ProtectedRoute>
              <AdminResults />
            </ProtectedRoute>
          }
        />

        <Route
          path="/add-candidate"
          element={
            <ProtectedRoute>
              <AddCandidate />
            </ProtectedRoute>
          }
        />

        <Route
          path="/delete-candidate"
          element={
            <ProtectedRoute>
              <DeleteCandidate />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
