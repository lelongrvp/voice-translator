import { Navigate, Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useAuth } from "../hooks/useAuth";

const ProtectedRoute = () => {
  const auth = useAuth();
  const token = auth?.token;

  if (!token) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="flex  h-screen bg-gray-100">
      <div className="flex-col">
        <span className="w-full h-[88px] left-[32px] right-[32px] bottom-[8px] bg-background-1 flex items-center justify-between">
          <img src="/logo.svg" alt="Logo" className="w-[236px] h-[48px]" />
        </span>
        <Sidebar />
      </div>
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="flex-1 p-4 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default ProtectedRoute;
