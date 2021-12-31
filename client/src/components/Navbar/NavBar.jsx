import { useEffect, useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  Dropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
} from "reactstrap";
import { Link, Redirect, useLocation } from "react-router-dom";

import ReactResizeDetector from "react-resize-detector";

import "./NavBar.css";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { logout, removeAllUsers } from "store/slices/authSlice";

const NavBarNew = ({ bgcolor = "" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropDown, setIsDropDown] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const location = useLocation();

  useEffect(() => {
    setIsAuthenticated(auth && auth.user && auth.user.email ? true : false);
    return () => {
      setIsAuthenticated(false);
    };
  }, [isAuthenticated, auth, auth.user]);

  const handleLogout = () => {
    Cookies.remove("refreshtoken");
    localStorage.removeItem("firstLogin");
    dispatch(logout());
    if (auth.user.role.toLowerCase() === "admin") dispatch(removeAllUsers());

    setIsAuthenticated(false);
    return <Redirect to="/" />;
  };

  const CustomNavItem = ({ to, linkName }) => (
    <NavItem style={{ cursor: `${auth.user.id ? "pointer" : "text"}` }}>
      <Link
        className="nav-link"
        style={{ cursor: `${auth.user.id ? "pointer" : "text"}` }}
        to={to}
      >
        <span
          className={`nav-item-link ${
            location.pathname === to && "item-underline"
          }`}
        >
          {linkName}
        </span>
      </Link>
    </NavItem>
  );

  const toggle = () => setIsOpen(!isOpen);
  return (
    <ReactResizeDetector handleWidth>
      {({ width }) => (
        <Navbar
          className={`port-navbar absolute mt-2 ${
            width < 768 && isOpen
              ? "port-navbar-is-open"
              : "port-navbar-is-close"
          } ${bgcolor}`}
          // style={{
          //   background: `url('${process.env.PUBLIC_URL}/images/header-bg.png')`,
          //   backgroundSize: "cover",
          //   backgroundRepeat: "no-repeat",
          // }}
          expand="md"
          dark
        >
          <Link className="nav-brand navbar-brand" to="/">
            <img
              className="logo change-image justify-content-center align-self-center"
              src="/images/logo.png"
              width="133"
              height="28"
              alt="ramboll"
              title="Ramboll"
            />
          </Link>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="mr-auto" navbar>
              <CustomNavItem to="/parameters" linkName="Parameter" />
              <CustomNavItem to="/weightages" linkName="Weightage" />
              <CustomNavItem to="/scores" linkName="Score" />
              <CustomNavItem to="/results" linkName="Result" />
              {isAuthenticated &&
                auth.user &&
                auth.user.role &&
                auth.user.role.toLowerCase() === "admin" && (
                  <CustomNavItem
                    to="/user_management/admin"
                    linkName="User Management"
                  />
                )}
            </Nav>

            <Nav navbar>
              {!isAuthenticated ? (
                <>
                  <NavItem>
                    <Link className="nav-link" to="/authentication/login">
                      <span
                        className={"nav-item-link"}
                        style={{
                          cursor: `${!auth.user.id ? "pointer" : "text"}`,
                          fontWeight: "bold",
                        }}
                      >
                        Login
                      </span>
                    </Link>
                  </NavItem>
                  <NavItem>
                    <Link className="nav-link" to="/authentication/register">
                      <span className="btn text-white px-5 btn-style font-weight-bold">
                        Register
                      </span>
                    </Link>
                  </NavItem>
                </>
              ) : (
                <NavItem>
                  <Dropdown
                    className="nav-item-link"
                    isOpen={isDropDown}
                    toggle={() => setIsDropDown(!isDropDown)}
                  >
                    <DropdownToggle caret nav>
                      <span
                        style={{
                          color: "white",
                          fontWeight: "bold",
                          letterSpacing: "0.8px",
                          fontSize: "18px",
                        }}
                      >
                        {auth.user.name}
                      </span>
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem
                        disabled
                        style={{
                          color: "#009dc4",
                          fontWeight: "bold",
                          letterSpacing: "0.8px",
                          fontSize: "18px",
                        }}
                      >
                        History
                      </DropdownItem>
                      <DropdownItem divider />
                      <DropdownItem
                        onClick={handleLogout}
                        style={{
                          color: "#009dc4",
                          fontWeight: "bold",
                          letterSpacing: "0.8px",
                          fontSize: "18px",
                        }}
                      >
                        Logout
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </NavItem>
              )}
            </Nav>
          </Collapse>
        </Navbar>
      )}
    </ReactResizeDetector>
  );
};

export default NavBarNew;
