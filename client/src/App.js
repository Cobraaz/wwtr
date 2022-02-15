import Loading from "components/Shared/Loader";
import Notify from "components/Shared/Notify";
import ScrollToTop from "components/Shared/scrollToTop";
import { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import store from "store";
import { loadUser } from "store/slices/authSlice";

import "./App.css";

import Home from "pages/Home";
import Layout from "./components/layout/Layout";

import Routes from "./components/Routing/Routes";

const App = () => {
  useEffect(() => {
    const firstLogin = localStorage.getItem("firstLogin");
    if (firstLogin) {
      store.dispatch(loadUser());
    }
  }, []);
  return (
    <Router>
      <ScrollToTop />
      <Layout>
        <Fragment>
          <Loading />
          <Notify />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route component={Routes} />
          </Switch>
          <ToastContainer
            position="top-right"
            autoClose={8000}
            hideProgressBar={false}
            newestOnTop={false}
            draggable={false}
            closeOnClick
            pauseOnHover
          />
        </Fragment>
      </Layout>
    </Router>
  );
};

export default App;
