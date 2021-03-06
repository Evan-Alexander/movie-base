import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getArticle } from "../../store/actions/article_actions";
import { clearArticle } from "../../store/actions/index";
import Loader from "../../utils/Loader";
import ScoreCard from "../../utils/ScoreCard";

const Article = (props) => {
  const { current } = useSelector((state) => state.articles);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getArticle(props.match.params.id));
  }, [dispatch, props.match.params]);

  // Clear current article from state
  useEffect(() => {
    dispatch(clearArticle());
  }, [dispatch]);

  return (
    <>
      {current ? (
        <div className="article_container">
          <div
            style={{ background: `url(https://picsum.photos/1920/1080)` }}
            className="image"
          ></div>
          <h1>{current.title}</h1>
          <div className="mt-3 content">
            <div dangerouslySetInnerHTML={{ __html: current.content }}></div>
          </div>
          <ScoreCard current={current} />
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default Article;
