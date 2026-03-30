import { Outlet, useLocation } from "react-router-dom";
import Header from "../molecules/Header";

const AUTH_ROUTES = ["/login", "/register", "/setup"];
export default function Layout() {
  const { pathname } = useLocation();
  const isAuthPage = AUTH_ROUTES.includes(pathname);

  return (
    <>
      {!isAuthPage && <Header />}
      <main>
        <Outlet />
      </main>
    </>
  );
}