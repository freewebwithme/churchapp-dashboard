import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import ReCAPTCHA from "react-google-recaptcha";

import { useMutation } from "@apollo/react-hooks";
import { FORGOT_PASSWORD_START } from "../queries/Query.js";
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
  const [message, setMessage] = React.useState(null);
  const [recaptcha, setRecaptcha] = React.useState(null);

  const classes = useStyles();

  const [forgotPasswordStart, { loading }] = useMutation(
    FORGOT_PASSWORD_START,
    {
      onCompleted(data) {
        // sent email
        console.log(data);
        setEmail(null);
        setRecaptcha(null);
        setMessage(data.passwordResetStart.message);
      },
      onError(error) {
        // Error
        setMessage(error.message);
      },
    }
  );

  const reCaptchaOnChange = (value) => {
    setRecaptcha(value);
  };

  const reCaptchaOnError = () => {
    setRecaptcha(null);
  };
  const handleClick = (e) => {
    e.preventDefault();
    forgotPasswordStart({
      variables: {
        email: email,
        recaptchaValue: recaptcha,
      },
    });
  };

  if (loading) return <Loading />;

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          패스워드 복구 링크 받기
        </Typography>
        <br />
        <br />
        <Typography component="h5" variant="caption" color="error">
          {message}
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
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <ReCAPTCHA
            sitekey="6LeBr_8UAAAAAMfHP4idaKRVRHy1W-pYLcymozKM"
            onChange={reCaptchaOnChange}
            onExpired={reCaptchaOnError}
            onError={reCaptchaOnError}
          />
          <Button
            type="submit"
            fullWidth
            disabled={!email || !recaptcha}
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={(e) => handleClick(e)}
          >
            링크 보내기
          </Button>
        </form>
      </div>
    </Container>
  );
};
