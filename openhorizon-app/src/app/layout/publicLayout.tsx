import { Outlet, useLocation } from "react-router-dom";
import { UserRole } from "../../entities/user/models/userRole";
import { isAuthSelector, userRoleSelector } from "../../entities/user/store/userSlice";
import Footer from "../../shared/ui/footer";
import { Navbar } from "../../widgets/navbar/ui/Navbar/navbar";
import { PublicNavbar } from "../../widgets/navbar/ui/Navbar/publicNavbar";
import { useTypedSelector } from "../store/hooks";

export interface ProtectedLayoutProps {
  allowedRoles?: UserRole[];
}

export default function ProtectedLayout({ allowedRoles }: ProtectedLayoutProps) {
  const isAuth = useTypedSelector(isAuthSelector);
  const userRole = useTypedSelector(userRoleSelector);
  const location = useLocation();

  const isAuthPage = location.pathname === "/auth";

  return (
    <>
      {!isAuthPage && (isAuth ? <Navbar /> : <PublicNavbar />)}
      <Outlet />
      {!isAuthPage && <Footer />}
    </>
  );
}
