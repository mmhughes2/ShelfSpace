import { Outlet } from "react-router-dom";
import SiteHeader from "./SiteHeader";
import Footer from "./Footer";
import "./Layout.css";

function Layout() {
  return (
    <div className="site-shell">
      <SiteHeader />
      <main className="site-main">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
