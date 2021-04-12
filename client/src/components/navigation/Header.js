import React from "react";
import { Link, withRouter } from "react-router-dom";
import SideDrawer from "./SideNavigation";

const Header = (props) => {
  return (
    <>
      <div className="navbar fixed-top">
        <Link
          style={{ fontFamily: "Fredoka One" }}
          className="navbar-brand d-flex align-items-center"
          to="/"
        >
          FlickBase
        </Link>
        <SideDrawer />
      </div>
    </>
  );
};

export default withRouter(Header);
