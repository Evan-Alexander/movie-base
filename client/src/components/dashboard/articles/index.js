import React, { useEffect } from "react";
import {
  getPaginateArticles,
  changeArticleStatus,
} from "../../../store/actions/article_actions";
import AdminLayout from "../../../components/hoc/AdminLayout";
import SearchIcon from "@material-ui/icons/Search";
import ArticlesPagination from "./Paginate";
import {
  Modal,
  Button,
  ButtonToolbar,
  ButtonGroup,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";

const Articles = () => {
  const articles = useSelector((state) => state.articles.adminArticles);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPaginateArticles());
  }, [dispatch]);

  const handleStatusChange = (status, _id) => {
    let newStatus = status === "draft" ? "public" : "draft";
    dispatch(changeArticleStatus(newStatus, _id));
  };

  const goToPrevPage = (page) => {
    dispatch(getPaginateArticles(page));
  };

  const goToNextPage = (page) => {
    dispatch(getPaginateArticles(page));
  };

  return (
    <AdminLayout section="Articles">
      <div className="articles_table">
        <ButtonToolbar className="mb-3">
          <ButtonGroup className="mr-2">
            <LinkContainer to="\dashboard/articles/add">
              <Button variant="secondary">Add Article</Button>
            </LinkContainer>
          </ButtonGroup>
          <form onSubmit={() => alert("search")}>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text id="btnGroupAddon2">
                  <SearchIcon />
                </InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl type="text" placeholder="Example" />
            </InputGroup>
          </form>
        </ButtonToolbar>
        <ArticlesPagination
          articles={articles}
          prev={(page) => goToPrevPage(page)}
          next={(page) => goToNextPage(page)}
          handleStatusChange={(status, id) => handleStatusChange(status, id)}
        />
      </div>
    </AdminLayout>
  );
};

export default Articles;
