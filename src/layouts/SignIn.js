import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
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

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function SignIn() {
  const [email, setEmail] = React.useState(null);
  const [password, setPassword] = React.useState(null);
  const [error, setError] = React.useState(null);
  let history = useHistory();
  let query = useQuery(); // when password reset complete, it will forward to this page with reset=true
  let reset = query.get("reset");
  let location = useLocation();

  const classes = useStyles();
  const [signIn, { loading }] = useMutation(SIGN_IN, {
    onCompleted(data) {
      sessionStorage.setItem("user-token", data.signIn.token);
      const user = data.signIn.user;
      setUserToSession(user);

      let { from } = location.state || { from: { pathname: "/dashboard" } };
      if (user.admin) {
        history.replace("/dashboard/admin");
      } else {
        history.replace("/dashboard");
      }
    },
    onError(error) {
      console.log("printing from sign in onError:", error);
      setError(displayErrorMessageForGraphQL(error.message));
    },
  });

  if (loading) return <Loading />;

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          로그인
        </Typography>
        <br />
        {reset === "true" ? (
          <Typography component="h1" variant="h6">
            패스워드가 리셋됐습니다. 새로운 패스워드로 로그인 하세요.
          </Typography>
        ) : null}
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
            name="email"
            autoComplete="email"
            autoFocus
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="패스워드"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            disabled={!email || !password}
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={(e) => {
              e.preventDefault();
              signIn({
                variables: {
                  email: email,
                  password: password,
                },
              });
            }}
          >
            접속하기
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="/forgot-password" variant="body2">
                비밀번호를 잊으셨나요?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/sign-up" variant="body2">
                {"계정이 없습니까? 가입하러 가기"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
