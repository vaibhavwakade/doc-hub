import { useUserStore } from "@/store/userStore";
import { Navigate, Outlet } from "react-router-dom";

function AuthLayout() {
  const token = useUserStore((state) => state.user);

  if (token) {
    return <Navigate to={"/dashboard"} replace />;
  }
  return (
    <>
      <Outlet />
    </>
  );
}

export default AuthLayout;
