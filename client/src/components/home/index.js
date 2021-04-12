import { useReducer, useEffect } from "react";
import { Grid } from "@material-ui/core";
import ArticleCard from "../../utils/ArticleCard";
import { getArticles } from "../../store/actions/article_actions";
import { useDispatch, useSelector } from "react-redux";
import { get } from "mongoose";

const initialSort = {
  sortBy: "_id",
  order: "desc",
  limit: 8,
  skip: 0,
};

const Home = () => {
  const [sort, setSort] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    initialSort
  );
  const articles = useSelector((state) => state.articles);
  const dispatch = useDispatch();

  useEffect(() => {
    // only trigger on first render
    // state has an articles property, but check if the articles property has a property called articles
    // i.e. => state.articles.articles
    if (articles && !articles.articles) {
      dispatch(getArticles(initialSort));
    }
  }, [dispatch, articles]);

  return (
    <div>
      <div>CAROUSEL</div>
      <Grid container spacing={2} className="article_card">
        <Grid key={1} item xs={12} sm={6} lg={3}>
          <ArticleCard />
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;
