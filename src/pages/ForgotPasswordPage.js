import React from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import { useMutation } from "@apollo/react-hooks";
import { SIGN_IN } from "../queries/Query.js";
import {
  setUserToSession,
  displayErrorMessageForGraphQL,
  Copyright,
} from "../helpers/helper.js";
import Loading from "../pages/components/Loading";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export const ForgotPasswordPage = () => {
  const [email, setEmail] = React.useState(null);
  const [error, setError] = React.useState(null);
  const classes = useStyles();

  const handleClick = () => {};

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          패스워드 복구 링크 받기
        </Typography>
        <Typography component="h5" variant="caption" color="error">
          {error}
        </Typography>
        <form className={classes.form} validate="true">
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="이메일"
            helperText="등록된 이메일을 입력하세요"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            disabled={!email}
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleClick()}
          >
            링크 보내기
          </Button>
        </form>
      </div>
    </Container>
  );
};
