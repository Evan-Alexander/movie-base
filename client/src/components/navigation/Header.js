import React, { useEffect, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import SideDrawer from "./SideNavigation";
import { useSelector, useDispatch } from "react-redux";
import { clearNotifications } from "../../store/actions/index";
import { logoutUser } from "../../store/actions/users_actions";
import { appLayout } from "../../store/actions/site_actions";
import { showToast } from "../../utils/tools";

const Header = (props) => {
  const [layout, setLayout] = useState("");
  const notifications = useSelector((state) => state.notifications);
  const dispatch = useDispatch();

  const signOutUser = () => {
    dispatch(logoutUser());
    props.history.push("/");
  };

  useEffect(() => {
    if (notifications && notifications.error) {
      const msg = notifications.msg ? notifications.msg : "Error";
      showToast("ERROR", msg);
      dispatch(clearNotifications());
    }
    if (notifications && notifications.success) {
      const msg = notifications.msg ? notifications.msg : "Success!";
      showToast("SUCCESS", msg);
      dispatch(clearNotifications());
    }
  }, [notifications, dispatch]);

  // watch for changes in pathname to render different layouts between main and admin layouts
  useEffect(() => {
    const pathArray = props.location.pathname.split("/");
    if (pathArray[1] === "dashboard") {
      setLayout("dash_layout");
      dispatch(appLayout("dash_layout"));
    } else {
      setLayout("");
      dispatch(appLayout(""));
    }
  }, [props.location.pathname, dispatch]);
  return (
    <>
      <div className={`navbar fixed-top ${layout}`}>
        <Link
          style={{ fontFamily: "Fredoka One" }}
          className="navbar-brand d-flex align-items-center"
          to="/"
        >
          FlickBase
        </Link>
        <SideDrawer signOutUser={signOutUser} />
      </div>
    </>
  );
};

export default withRouter(Header);
