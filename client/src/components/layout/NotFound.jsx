import NavBarNew from "components/Navbar/NavBar";

const NotFound = () => {
  return (
    <>
      <NavBarNew bgcolor="port-navbar-background-color" />
      <h1 className="x-large text-primary">
        <i className="fas fa-exclamation-triangle" /> Page Not Found
      </h1>
      <p className="large">Sorry, this page does not exist</p>
    </>
  );
};

export default NotFound;
