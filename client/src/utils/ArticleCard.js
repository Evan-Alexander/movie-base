import React from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  IconButton,
  Typography,
  Button,
} from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";

const ArticleCard = ({ article }) => {
  return (
    <Card>
      <CardMedia
        style={{ height: 0, paddingTop: "56.25%" }}
        image="https://picsum.photos/200"
        title="some title"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          Some Title
        </Typography>
        <Typography variant="body2" component="p">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Qui,
          obcaecati maxime rerum eos quas ab ut a odio, similique vel amet
          voluptatibus magnam temporibus ipsa sed, optio eaque. Corporis,
          architecto!
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton>
          <FavoriteIcon />
        </IconButton>
        <Button
          size="small"
          color="primary"
          component={RouterLink}
          to={`/article/id`}
        >
          Read More
        </Button>
      </CardActions>
    </Card>
  );
};

export default ArticleCard;
