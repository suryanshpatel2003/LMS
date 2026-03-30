import { createBrowserRouter, Outlet } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";

// Layout components
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

// Pages
import LandingPage from "./pages/LandingPage.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import AdminPanel from "./pages/AdminPanel";
import PaymentPage from "./pages/PaymentPage";
import CourseDetails from "./pages/CourseDetails.jsx";

// 1. Ek Layout banaya jo har page pe Navbar/Footer dikhayega
const Layout = () => {
  return (
    <>
      <Navbar />
        <Outlet />
      <Footer />
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, // Yaha humne layout wrap kar diya
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/dashboard",
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "/course/:id",
        element: (
          <ProtectedRoute>
            <CourseDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "/admin",
        element: (
          <ProtectedRoute>
            <AdminPanel />
          </ProtectedRoute>
        ),
      },
      {
        path: "/payment",
        element: (
          <ProtectedRoute>
            <PaymentPage />
          </ProtectedRoute>
        ),
      }
    ]
  }
]);

export default router;