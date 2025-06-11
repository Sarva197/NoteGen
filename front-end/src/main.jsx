import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./landingpage/homePage/HomePage";
import AboutPage from "./landingpage/about/AboutPage";
import Planspage from "./landingpage/plans/Planspage";
import WhyPage from "./landingpage/whyNoteGen/WhyPage";
import NotePage from "./Notespage/NotePage";
import CreateNote from "./Notespage/CreateNote";
import WelcomePage from "./Notespage/WelcomePage";
import Layout from "./Layout"; 
import Signup from "./landingpage/signUp/SignUp";
import Login from "./landingpage/login/Login";
import ProtectedRoute from "./ProtectedRoute";
import { AuthProvider } from "./contexts/AuthContext";
import { ToastContainer, toast } from "react-toastify";

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        {/* Routes with Layout */}
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/plans" element={<Planspage />} />
          <Route path="/whyNoteGen" element={<WhyPage />} />
          <Route path="/login" element={<Login />} />

          {/* Protected Routes inside Layout */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <WelcomePage />
              </ProtectedRoute>
            }
          />
          <Route
            path= "/dashboard/user/:userId/notes/:noteId"
            element={
              <ProtectedRoute>
                <NotePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user/:userId/notes/:noteId/create"
            element={
              <ProtectedRoute>
                <CreateNote />
              </ProtectedRoute>
            }
          />
          <Route path="/signup" element={<Signup />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </AuthProvider>
);
