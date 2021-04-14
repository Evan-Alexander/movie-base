import { useEffect, useState } from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { isAuthUser } from "./store/actions/users_actions";

import GoogleFontLoader from "react-google-font-loader";
import MainLayout from "./components/hoc/mainLayout";
import Loader from "./utils/Loader";

import Home from "./components/home";
import Header from "./components/navigation/Header";
import Auth from "./components/auth";
import Contact from "./components/contact";
import Dashboard from "./components/dashboard";

const Routes = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(isAuthUser());
  }, [dispatch]);

  useEffect(() => {
    if (users.auth !== null) {
      setLoading(false);
    }
  }, [users]);

  return (
    <BrowserRouter>
      <Header />
      {loading ? (
        <Loader />
      ) : (
        <MainLayout>
          <Switch>
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/auth" component={Auth} />
            <Route path="/contact" component={Contact} />
            <Route exact path="/" component={Home} />
          </Switch>
        </MainLayout>
      )}

      <GoogleFontLoader
        fonts={[
          { font: "Roboto", weights: [300, 400, 900] },
          { font: "Fredoka One" },
        ]}
      />
    </BrowserRouter>
  );
};

export default Routes;
