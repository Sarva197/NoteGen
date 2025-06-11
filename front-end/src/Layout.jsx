// src/Layout.jsx
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

function Layout() {
  const location = useLocation();

  // Regex patterns for routes where Footer should NOT appear
  const noFooterPatterns = [
    /^\/dashboard$/,
    /^\/dashboard\/user\/[^/]+\/notes\/[^/]+$/, // matches /dashboard/user/:userId/notes/:noteId
    /^\/user\/[^/]+\/notes\/[^/]+\/create$/,    // matches /user/:userId/notes/:noteId/create
  ];

  const shouldShowFooter = !noFooterPatterns.some((pattern) =>
    pattern.test(location.pathname)
  );

  return (
    <>
      <Navbar />
      <main className="container mt-4">
        <Outlet />
      </main>
      {shouldShowFooter && <Footer />}
    </>
  );
}

export default Layout;
