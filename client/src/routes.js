import { useEffect, useState } from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { isAuthUser } from "./store/actions/users_actions";

import GoogleFontLoader from "react-google-font-loader";
import MainLayout from "./components/hoc/mainLayout";

import Home from "./components/home";
import Header from "./components/navigation/Header";
import Auth from "./components/auth";
import Contact from "./components/contact";
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
        <MainLayout>
          <Switch>
            <Route path="/auth" component={Auth} />
            <Route path="/contact" component={Contact} />
            <Route exact path="/" component={Home} />
          </Switch>
        </MainLayout>
      ) : (
        <p>loading</p>
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
