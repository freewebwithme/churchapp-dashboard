import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import ImageUpload from "components/CustomUpload/ImageUpload.js";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import {
  Collapse,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  IconButton,
  CircularProgress,
} from "@material-ui/core";

import { useMutation } from "@apollo/react-hooks";
import { DELETE_SLIDER_IMAGE } from "../../queries/Query.js";
import { getUserFromSession } from "../../helpers/helper.js";

const useStyles = makeStyles((theme) => ({
  cardContent: {
    padding: theme.spacing(5),
  },
  slideImage: {
    height: 0,
    paddingTop: "56.25%",
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  collapse: {
    marginTop: theme.spacing(2),
  },
}));
const defaultSlideImage = require("../../assets/img/no-slide-image.png");

export function SlideImageCard(props) {
  const classes = useStyles();
  const { slideImage, setSlideImage, slideImageNumber, title } = props;

  const [expanded, setExpanded] = React.useState(false);

  const [deleteSlideImage, { loading: loadingDelete }] = useMutation(
    DELETE_SLIDER_IMAGE,
    {
      onCompleted(data) {
        console.log("Printing from onCompleted Delete slide image", data);
        const church = data.deleteSlideImage;
        let slideImage;
        if (slideImageNumber === "sliderOne") {
          slideImage = church.slideImageOne;
        } else if (slideImageNumber === "sliderTwo") {
          slideImage = church.slideImageTwo;
        } else if (slideImageNumber === "sliderThree") {
          slideImage = church.slideImageThree;
        }
        // set slide image state to display newly deleted slide image.
        setSlideImage(slideImage);
        setExpanded(false);
      },
      onError(error) {
        console.log("Printing from onError Delete slide image", error);
      },
    }
  );

  const handleExpandClick = (setExpanded, expanded) => {
    setExpanded(!expanded);
  };

  const currentUser = getUserFromSession();

  const handleDelete = (sliderNumber) => {
    deleteSlideImage({
      variables: {
        userId: currentUser.id,
        sliderNumber: sliderNumber,
      },
    });
  };

  if (loadingDelete) return <p>Deleting......</p>;

  return (
    <>
      <Card>
        <CardHeader subheader={title} />
        {loadingDelete ? (
          <CircularProgress color="secondary" />
        ) : (
          <CardMedia
            image={slideImage ?? defaultSlideImage}
            className={classes.slideImage}
          />
        )}
        <CardActions disableSpacing>
          <IconButton
            disabled={!slideImage || slideImageNumber === "sliderOne"}
            color="secondary"
            onClick={() => handleDelete(slideImageNumber)}
          >
            <DeleteIcon />
          </IconButton>
          <IconButton
            color="primary"
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={() => handleExpandClick(setExpanded, expanded)}
            aria-expanded={expanded}
            aria-label="change image"
          >
            <EditIcon />
          </IconButton>
        </CardActions>
      </Card>
      <Collapse
        in={expanded}
        timeout="auto"
        unmountOnExit
        className={classes.collapse}
      >
        <Card>
          <CardHeader subheader="슬라이드 이미지 추가 밎 변경" />
          <CardContent className={classes.cardContent}>
            <GridContainer>
              <GridItem xs={12} sm={12} md={12}>
                <ImageUpload
                  addButtonProps={{
                    color: "rose",
                    round: true,
                  }}
                  changeButtonProps={{
                    color: "rose",
                    round: true,
                  }}
                  removeButtonProps={{
                    color: "danger",
                    round: true,
                  }}
                  setImageFile={setSlideImage}
                  sliderNumber={slideImageNumber}
                  disabled={false}
                  setExpanded={setExpanded}
                />
              </GridItem>
            </GridContainer>
          </CardContent>
        </Card>
      </Collapse>
    </>
  );
}

SlideImageCard.propTypes = {
  slideImage: PropTypes.string,
  setSlideImage: PropTypes.func,
  slideImageNumber: PropTypes.string,
  title: PropTypes.string,
};
