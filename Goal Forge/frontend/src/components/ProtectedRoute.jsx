import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  // Agar token nahi hai, toh user ko login page par redirect karo
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Agar token hai, toh jo mang raha hai (dashboard) woh dikhao
  return children;
};

export default ProtectedRoute;