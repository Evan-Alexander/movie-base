import React from "react";
import { useSelector } from "react-redux";
import { Container } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const MainLayout = (props) => {
  const site = useSelector((state) => state.site);
  return (
    <Container
      className={`app_container mb-5 ${
        site.layout !== "dash_layout" ? "" : "dash_layout"
      }`}
    >
      {props.children}
      <ToastContainer autoClose={2000} />
    </Container>
  );
};

export default MainLayout;
