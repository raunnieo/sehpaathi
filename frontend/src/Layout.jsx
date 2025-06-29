import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import ThemeToggle from "./components/ThemeToggle/ThemeToggle";
import { Outlet, useLocation } from "react-router-dom";

const Layout = () => {
  const location = useLocation();
  const hideHeaderFooter =
    location.pathname === "/signin" ||
    location.pathname === "/signup" ||
    location.pathname === "/customize-profile" ||
    location.pathname.startsWith("/dashboard");
  return (
    <div>
      {!hideHeaderFooter && <Header />}
      <Outlet />
      {!hideHeaderFooter && <Footer />}
      <ThemeToggle />
    </div>
  );
};

export default Layout;
