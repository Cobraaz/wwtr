import NavBarNew from "components/Navbar/NavBar";
import Footer from "components/Shared/Footer";
import { useLocation } from "react-router-dom";
import CustomHeader from "./CustomHeader";

const Layout = ({ children }) => {
  const location = useLocation();

  const showNavbar = () => {
    if (location.pathname === "/") {
      return <NavBarNew />;
    } else if (
      location.pathname.includes("authentication") ||
      location.pathname.includes("reset")
    ) {
      return;
    } else {
      return <NavBarNew bgcolor="port-navbar-background-color" />;
    }
  };
  return (
    <>
      {location.pathname && <CustomHeader pathname={location.pathname} />}
      <CustomHeader pathname={location.pathname} />
      <div className="container-fluid wrapper flex-shrink-0 app landing-page">
        <div className="row">
          {showNavbar()}
          <div className="col-md-12">
            <div>{children}</div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Layout;
