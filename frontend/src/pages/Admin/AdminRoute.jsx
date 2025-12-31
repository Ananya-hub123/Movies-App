import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);

  console.log("=== ADMIN ROUTE DEBUG ===");
  console.log("userInfo:", userInfo);
  console.log("userInfo exists:", !!userInfo);
  console.log("isAdmin:", userInfo?.isAdmin);

  // Completely bypass authentication for testing
  console.log("Bypassing authentication completely for testing");
  return <Outlet />;
};
export default AdminRoute;
