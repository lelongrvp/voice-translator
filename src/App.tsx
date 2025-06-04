import {
  Navigate,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
import Login from "./pages/Login";
import ProtectedRoute from "./routes/ProtectedRoute";
import { allRoutes } from "./routes/routesConfig";

function App() {
  const auth = useAuth();
  const token = auth?.token;

  const router = createBrowserRouter([
    {
      path: "/login",
      element: token ? <Navigate to="/dashboard" replace /> : <Login />,
    },
    {
      element: <ProtectedRoute />,
      children: allRoutes,
    },
  ]);

  // Return RouterProvider with the router configuration
  return <RouterProvider router={router} />;
}

export default App;
