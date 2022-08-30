import { Switch } from "react-router-dom";

import MyRouter from "./MyRouter";

import Login from "../pages/Login";
import Page404 from "../pages/Page404";

const Routes = () => {
  return (
    <Switch>
      <MyRouter exact path="/" component={Login} />
      <MyRouter path="*" component={Page404} />
    </Switch>
  );
};
export default Routes;
