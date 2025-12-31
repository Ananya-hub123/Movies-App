import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);

  console.log("=== ADMIN ROUTE DEBUG ===");
  console.log("userInfo:", userInfo);
  console.log("userInfo.isAdmin:", userInfo?.isAdmin);

  // Temporarily bypass admin check for testing
  return userInfo ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace />
  );
};
export default AdminRoute;
