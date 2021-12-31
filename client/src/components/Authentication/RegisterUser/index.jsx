import { useEffect, useState } from "react";
import Register from "../Register";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Login from "../Login";
import Alert from "../../Shared/Alert";
import { useParams, useHistory, Redirect, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Forgetpassword from "components/Authentication/ForgetPassword";
import ResetPassword from "components/Authentication/ResetPassword";

const RegisterUser = () => {
  let { auth: authParam } = useParams();
  const history = useHistory();
  const [tabIndex, setTabIndex] = useState(0);
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    setTabIndex(authParam === "login" ? 0 : 1);
  }, [authParam]);

  if (auth.token) return <Redirect to="/" />;

  const ShowComponents = () => {
    if (authParam === "forget_password") {
      return (
        <Tabs>
          <TabList className="row">
            <Tab className="col-12 text-left mb-4 border-b pr-0">
              <h2 className={"d-block mb-1 pb-3 login-heading active-title"}>
                Forget Password
              </h2>
            </Tab>
          </TabList>

          <TabPanel>
            <div>
              <div>
                <Forgetpassword />
              </div>
            </div>
          </TabPanel>
        </Tabs>
      );
    } else if (authParam === "reset_password") {
      return (
        <Tabs>
          <TabList className="row">
            <Tab className="col-12 text-left mb-4 border-b pr-0">
              <h2 className={"d-block mb-1 pb-3 login-heading active-title"}>
                Reset Password
              </h2>
            </Tab>
          </TabList>

          <TabPanel>
            <div>
              <div>
                <ResetPassword />
              </div>
            </div>
          </TabPanel>
        </Tabs>
      );
    } else if (authParam === "login" || authParam === "register") {
      return (
        <Tabs
          selectedIndex={tabIndex}
          onSelect={(index) => {
            setTabIndex(index);
            history.push(
              `/authentication/${index === 0 ? "login" : "register"}`
            );
          }}
        >
          <TabList className="row">
            <Tab className="col-6 text-left mb-4 border-b pr-0">
              <h2
                className={`d-block mb-3 pb-3 login-heading cursor-pointer ${
                  tabIndex === 0 && "active-title"
                }`}
              >
                Log In
              </h2>
            </Tab>
            <Tab className="col-6 text-left mb-4 border-b pr-0">
              <h2
                className={`d-block mb-3 login-heading pb-3 cursor-pointer ${
                  tabIndex === 1 && "active-title"
                }`}
              >
                Register
              </h2>
            </Tab>
          </TabList>

          <TabPanel>
            <div>
              <div>
                <Login />
              </div>
            </div>
          </TabPanel>
          <TabPanel>
            <div>
              <div>
                <Register />
              </div>
            </div>
          </TabPanel>
        </Tabs>
      );
    }
  };

  return (
    <>
      <div className="login-page col-12 px-0">
        <div className="row">
          <div className="col-md-6 left-side">
            <div className="pt-4 pl-4">
              <Link className="d-flex py-2" to="/">
                <img
                  className="logo change-image justify-content-center align-self-center"
                  src="/images/logo.png"
                  width="133"
                  height="28"
                  alt=""
                  title=""
                />
              </Link>
              <h1 className="text-white mt-5">
                <strong style={{ fontSize: "90px" }}>
                  Waste Water <br />
                  Treatment Referee
                </strong>
              </h1>
            </div>
          </div>

          <div className="col-md-6 right-side form-wrapper pr-5 d-flex align-items-center justify-content-center">
            <div className="login-center" style={{ minHeight: "700px" }}>
              <Alert />
              <ShowComponents />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterUser;
