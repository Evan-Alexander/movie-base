import * as Yup from "yup";

export const formValues = {
  title: "",
  content: "",
  excerpt: "",
  score: "",
  director: "",
  actors: [],
  status: "draft",
};

export const validation = () =>
  Yup.object({
    title: Yup.string().required("Sorry the title is required"),
    content: Yup.string()
      .required("Sorry the content is required")
      .min(50, "Please add more content"),
    excerpt: Yup.string()
      .required("Sorry the excerpt is required")
      .max(500, "Sorry its 500 max"),
    score: Yup.number()
      .required("Sorry the score is required")
      .min(0, "Score needs to be between 0 - 100")
      .max(100, "Score needs to be between 0 - 100"),
    director: Yup.string().required("Sorry the directore is required"),
    actors: Yup.array().required("You must provide at actors"),
    status: Yup.string().required("You must provide a status"),
  });
