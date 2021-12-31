import { Route, Switch } from "react-router-dom";
import RegisterUser from "../Authentication/RegisterUser";

import ActivateEmail from "components/Authentication/ActivateEmail";
import ResetPassword from "components/Authentication/ResetPassword";
import UserManagement from "components/UserManagement";
import AdminRoute from "./AdminRoute";
import Parameters from "components/Parameters";
import PrivateRoute from "./PrivateRoute";
import Weightages from "components/Weightages";
import Scores from "components/Scores";
import Results from "components/Results";
import NotFound from "../layout/NotFound";

const Routes = () => {
  return (
    <section>
      <Switch>
        <PrivateRoute exact path="/parameters" component={Parameters} />
        <PrivateRoute exact path="/weightages" component={Weightages} />
        <PrivateRoute exact path="/scores" component={Scores} />
        <PrivateRoute exact path="/results" component={Results} />
        <Route exact path="/authentication/:auth" component={RegisterUser} />
        <Route exact path="/user/reset/:token" component={ResetPassword} />
        <AdminRoute
          exact
          path="/user_management/admin"
          component={UserManagement}
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
