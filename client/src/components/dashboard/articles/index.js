import React, { useEffect, useState } from "react";
import {
  getPaginateArticles,
  changeArticleStatus,
  removeArticle,
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
const Articles = (props) => {
  const articles = useSelector((state) => state.articles.adminArticles);
  const notifications = useSelector((state) => state.notifications);
  const dispatch = useDispatch();
  const [removeAlert, setRemoveAlert] = useState(false);
  const [articleToRemove, setArticleToRemove] = useState(null);

  const editArtsAction = (id) => {
    props.history.push(`/dashboard/articles/edit/${id}`);
  };

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

  const handleClose = () => setRemoveAlert(false);
  const handleShow = (id = null) => {
    setArticleToRemove(id);
    setRemoveAlert(true);
  };

  const handleDelete = () => {
    dispatch(removeArticle(articleToRemove));
  };

  useEffect(() => {
    dispatch(getPaginateArticles());
  }, [dispatch]);

  useEffect(() => {
    handleClose();
    if (notifications && notifications.articleRemoved) {
      dispatch(getPaginateArticles(articles.page));
    }
  }, [dispatch, notifications, articles]);

  return (
    <AdminLayout section="Articles">
      <div className="articles_table">
        <ButtonToolbar className="mb-3">
          <ButtonGroup className="mr-2">
            <LinkContainer to="/dashboard/articles/add">
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
          handleShow={(id) => handleShow(id)}
          handleStatusChange={(status, id) => handleStatusChange(status, id)}
          editArtsAction={(id) => editArtsAction(id)}
        />
        <Modal show={removeAlert} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Are you sure?</Modal.Title>
          </Modal.Header>
          <Modal.Body>This action can not be undone.</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="danger" onClick={() => handleDelete()}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </AdminLayout>
  );
};

export default Articles;
