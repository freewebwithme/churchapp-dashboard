import React from "react";
import { useHistory } from "react-router-dom";
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
import ReCAPTCHA from "react-google-recaptcha";

import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { SIGN_UP } from "../queries/Query.js";

import { displayErrorMessageForGraphQL, Copyright } from "../helpers/helper.js";

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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const [email, setEmail] = React.useState(null);
  const [password, setPassword] = React.useState(null);
  const [name, setName] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [recaptcha, setRecaptcha] = React.useState(null);

  let history = useHistory();

  const [signUp, { loading }] = useMutation(SIGN_UP, {
    onCompleted(data) {
      console.log(data);
      sessionStorage.setItem("user-token", data.signUp.token);
      sessionStorage.setItem("user", JSON.stringify(data.signUp.user));
      history.push("/dashboard");
    },
    onError(error) {
      console.log("Printing from sign up onError: ", error.message);
      setError(displayErrorMessageForGraphQL(error.message));
      //setError(error.message);
    },
  });

  const classes = useStyles();

  const reCaptchaOnChange = (value) => {
    console.log("ReCaptcha Value: ", value);
    setRecaptcha(value);
  };

  const reCaptchaOnError = () => {
    console.log("Recaptcha error or expired");
    setRecaptcha(null);
  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          가입하기
        </Typography>

        <Typography component="h5" variant="caption" color="error">
          {error}
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="name"
                name="name"
                variant="outlined"
                required
                fullWidth
                id="name"
                label="이름"
                autoFocus
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="이메일"
                name="email"
                autoComplete="email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="비밀번호"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </Grid>
            <Grid container justify="flex-end">
              <Grid item>
                <ReCAPTCHA
                  sitekey="6LeBr_8UAAAAAMfHP4idaKRVRHy1W-pYLcymozKM"
                  onChange={reCaptchaOnChange}
                  onExpired={reCaptchaOnError}
                  onError={reCaptchaOnError}
                />
              </Grid>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={!email || !name || !password || !recaptcha}
            onClick={(e) => {
              e.preventDefault();
              signUp({
                variables: {
                  email: email,
                  password: password,
                  name: name,
                  recaptchaValue: recaptcha,
                },
              });
            }}
          >
            가입하기
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/sign-in" variant="body2">
                이미 가입 하셨습니까? 그럼 로그인으로 가기
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}
