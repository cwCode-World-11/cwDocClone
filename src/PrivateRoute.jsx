import { useAuthContext } from "./Hooks/AuthContext";
import { Navigate } from "react-router-dom";

// PrivateRoute component
const PrivateRoute = ({ elementPodu: EnnodaElement }) => {
  const isAuthenticated = useAuthContext().currentUser; // check for auth

  return isAuthenticated ? EnnodaElement : <Navigate to="/login" />;
};

export default PrivateRoute;
