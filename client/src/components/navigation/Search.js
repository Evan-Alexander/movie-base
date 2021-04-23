import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { withRouter } from "react-router-dom";
import { useDispatch } from "react-redux";
import { TextField } from "@material-ui/core";
import { getNavSearchResults } from "../../store/actions/article_actions";

const NavSearch = (props) => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: { keywords: "" },
    validationSchema: Yup.object({
      keywords: Yup.string().min(3, "Please type a full word"),
    }),
    onSubmit: (values) => {
      dispatch(getNavSearchResults(1, 5, values.keywords));
      props.closeDrawer();
      props.history.push(`/searchresults?keywords=${values.keywords}`);
    },
  });

  const errorHelper = (formik, values) => ({
    error: formik.errors[values] && formik.touched[values] ? true : false,
    helperText:
      formik.errors[values] && formik.touched[values]
        ? formik.errors[values]
        : null,
  });

  return (
    <>
      <form style={{ margin: "20px" }} onSubmit={formik.handleSubmit}>
        <TextField
          label="Search Movie"
          variant="outlined"
          name="keywords"
          {...formik.getFieldProps("keywords")}
          {...errorHelper(formik, "keywords")}
        />
      </form>
    </>
  );
};

export default withRouter(NavSearch);
