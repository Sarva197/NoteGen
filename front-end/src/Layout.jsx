// src/Layout.jsx
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout() {
  return (
   <div className="d-flex flex-column min-vh-100">
      <Navbar />

      {/* Main content area that grows to fill remaining space */}
      <main className="flex-grow-1 container py-4">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
