import { RouterProvider } from "react-router-dom";
import router from "./routes.jsx";
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <>
      {/* 🌟 Toaster ko yahan rakha hai taaki payment/login alerts har jagah dikhein */}
      <Toaster 
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          // Default styling for your Midnight Dark Theme
          style: {
            background: '#1e293b',
            color: '#f8fafc',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '12px',
            fontSize: '0.9rem',
            fontFamily: "'Plus Jakarta Sans', sans-serif",
          },
          success: {
            iconTheme: {
              primary: '#3b82f6',
              secondary: '#fff',
            },
          },
        }}
      />
      
      {/* Main App Router */}
      <RouterProvider router={router} />
    </>
  );
}

export default App;