import { Outlet, useLocation } from "react-router-dom";
import Header from "../molecules/Header";
import { useAuth } from "../../store/auth-context";

const AUTH_ROUTES = ["/login", "/register", "/setup"];

export default function Layout() {
  const { pathname } = useLocation();
  const { loading } = useAuth();
  const isAuthPage = AUTH_ROUTES.includes(pathname);

  if (loading) {
    return (
      <main>
        <Outlet />
      </main>
    );
  }

  return (
    <>
      {!isAuthPage && <Header />}
      <main>
        <Outlet />
      </main>
    </>
  );
}