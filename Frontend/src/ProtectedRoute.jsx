import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const userRole = localStorage.getItem("userRole");

  if (!userRole || !allowedRoles.includes(userRole)) {
    return <Navigate to="/" />; 
  }

  return children;
};

export default ProtectedRoute;
