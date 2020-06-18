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

import { useMutation } from "@apollo/react-hooks";
import { SIGN_UP } from "../queries/Query.js";

import {
  displayErrorMessageForGraphQL,
  Copyright,
  validateEmail,
  validateLength,
  isPasswordMatch,
} from "../helpers/helper.js";
import Loading from "pages/components/Loading.js";

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
  const [name, setName] = React.useState(null);
  const [email, setEmail] = React.useState(null);
  const [password, setPassword] = React.useState(null);
  const [passwordConfirm, setPasswordConfirm] = React.useState(null);

  const [error, setError] = React.useState(null);
  const [recaptcha, setRecaptcha] = React.useState(null);

  const [emailValidateState, setEmailValidateState] = React.useState("");
  const [passwordValidateState, setPasswordValidateState] = React.useState("");
  const [
    passwordConfirmValidateState,
    setPasswordConfirmValidateState,
  ] = React.useState("");

  const [passwordMatchMessage, setPasswordMatchMessage] = React.useState(
    "패스워드가 일치하지 않습니다"
  );
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
    setRecaptcha(value);
  };

  const reCaptchaOnError = () => {
    setRecaptcha(null);
  };

  const validateForm = () => {
    if (!name || !email || !password || !passwordConfirm || !recaptcha) {
      // props are null
      return false;
    }
    if (
      emailValidateState === "error" ||
      passwordValidateState === "error" ||
      passwordConfirmValidateState === "error"
    ) {
      return false;
    }
    return true;
  };

  if (loading) return <Loading />;

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
                error={emailValidateState === "error"}
                variant="outlined"
                required
                fullWidth
                id="email"
                label="이메일"
                name="email"
                autoComplete="email"
                onChange={(e) => {
                  if (validateEmail(e.target.value)) {
                    setEmailValidateState("success");
                  } else {
                    setEmailValidateState("error");
                  }
                  setEmail(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={passwordValidateState === "error"}
                variant="outlined"
                required
                fullWidth
                name="password"
                label="비밀번호"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e) => {
                  if (validateLength(e.target.value, 6, 20)) {
                    setPasswordValidateState("success");
                  } else {
                    setPasswordValidateState("error");
                  }
                  setPassword(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={passwordConfirmValidateState === "error"}
                variant="outlined"
                required
                fullWidth
                name="password-confirm"
                label="비밀번호 확인"
                helperText={passwordMatchMessage}
                type="password"
                id="password-confirm"
                autoComplete="current-password"
                onChange={(e) => {
                  if (validateLength(e.target.value, 6, 20)) {
                    setPasswordConfirmValidateState("success");
                  }
                  if (e.target.value !== password) {
                    setPasswordConfirmValidateState("error");
                  }
                  if (isPasswordMatch(e.target.value, password)) {
                    setPasswordMatchMessage("패스워드가 일치합니다");
                  } else {
                    setPasswordMatchMessage("패스워드가 일치하지 않습니다");
                  }
                  setPasswordConfirm(e.target.value);
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
            disabled={!validateForm()}
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
