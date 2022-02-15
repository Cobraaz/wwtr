import { Route, Switch } from "react-router-dom";
import RegisterUser from "../Authentication/RegisterUser";

import ActivateEmail from "components/Authentication/ActivateEmail";
import ResetPassword from "components/Authentication/ResetPassword";
import AdminRoute from "./AdminRoute";
import PrivateRoute from "./PrivateRoute";
import NotFound from "../layout/NotFound";
import ResultPage from "pages/ResultPage";
import UserManagementPage from "pages/UserManagementPage";
import ParametersPage from "pages/ParametersPage";
import ScoresPage from "pages/ScoresPage";
import WeightagesPage from "pages/WeightagesPage";
import HistoryPage from "pages/HistoryPage";

const Routes = () => {
  return (
    <section>
      <Switch>
        <PrivateRoute exact path="/parameters" component={ParametersPage} />
        <PrivateRoute exact path="/weightages" component={WeightagesPage} />
        <PrivateRoute exact path="/scores" component={ScoresPage} />
        <PrivateRoute exact path="/results" component={ResultPage} />
        <PrivateRoute exact path="/history" component={HistoryPage} />
        <Route exact path="/authentication/:auth" component={RegisterUser} />
        <Route exact path="/user/reset/:token" component={ResetPassword} />
        <AdminRoute
          exact
          path="/user_management/admin"
          component={UserManagementPage}
        />
        <Route
          exact
          path="/user/activate/:activate_token"
          component={ActivateEmail}
        />
        <Route component={NotFound} />
      </Switch>
    </section>
  );
};

export default Routes;
