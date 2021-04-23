import React from "react";
import { Grid } from "@material-ui/core";
import { useSelector } from "react-redux";
import ArticleCard from "../../utils/ArticleCard";
import Loader from "../../utils/Loader";

const SearchPage = (props) => {
  const articles = useSelector((state) => state.articles);
  const query = new URLSearchParams(props.location.search);
  const keywords = query.get("keywords");

  return (
    <>
      {articles.navsearch && articles.navsearch.docs ? (
        <>
          <p>
            Your search for <b>"{keywords}"</b> returned{" "}
            <b>{articles.navsearch.totalDocs}</b> Result
            {articles.navsearch.totalDocs >= 2 ? "s" : ""}
          </p>
          <Grid container spacing={2} className="article_card">
            {articles.navsearch.docs.map((item) => (
              <Grid key={item._id} item xs={12} sm={6} lg={3}>
                <ArticleCard article={item} />
              </Grid>
            ))}
          </Grid>
        </>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default SearchPage;
