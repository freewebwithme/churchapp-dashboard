import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { CircularProgress, Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    marginLeft: theme.spacing(5),
  },
}));

export default function Loading() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid item xs={12}>
          <CircularProgress color="secondary" />
        </Grid>
      </Grid>
    </div>
  );
}
