import React from "react";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Button from "components/CustomButtons/Button.js";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles({
  container: {
    marginTop: 100,
  },
  media: {
    height: "auto",
    maxWidth: "100%",
  },
  item: {
    textAlign: "center",
  },
});

const image404 = require("../assets/img/404Error.jpg");
export const PageNotFound = () => {
  const classes = useStyles();
  return (
    <Container maxWidth="lg" className={classes.container}>
      <img src={image404} className={classes.media} />
      <br />
      <br />
      <Grid container>
        <Grid item xs></Grid>
        <Grid item xs className={classes.item}>
          <Button className={classes.button} size="lg" color="info" href="/">
            홈으로 돌아가기
          </Button>
        </Grid>
        <Grid item xs></Grid>
      </Grid>
    </Container>
  );
};
