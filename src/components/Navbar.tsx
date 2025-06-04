import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function Navbar() {
  const auth = useAuth();
  const logout = auth?.logout;
  const navigate = useNavigate();

  const handleLogout = () => {
    logout?.();
    navigate("/login");
  };

  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">STT Back Office</h1>
      <button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
      >
        Logout
      </button>
    </nav>
  );
}

export default Navbar;
