import React from "react";
import { useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import Button from "components/CustomButtons/Button.js";
import {
  isPasswordMatch,
  validateLength,
  validateEmail,
  displayErrorMessageForGraphQL,
} from "../helpers/helper";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { RESET_PASSWORD, VERIFY_TOKEN } from "queries/Query";
import Loading from "./components/Loading";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "35ch",
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  card: {
    textAlign: "center",
  },
  cardHeader: {
    backgroundColor: "#9C27B0",
    "& .MuiCardHeader-subheader": {
      color: "white",
    },
  },
  notificationIcon: {
    fontSize: 20,
    marginTop: -5,
  },
  contentsText: {
    fontSize: 13,
  },
}));
export const ResetPasswordPage = () => {
  const history = useHistory();
  const classes = useStyles();
  const { token } = useParams();

  console.log("Printing token", token);

  const [emailFromToken, setEmailFromToken] = React.useState(null);
  const [email, setEmail] = React.useState(null);
  const [newPassword, setNewPassword] = React.useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = React.useState("");
  const [changeError, setChangeError] = React.useState(null);
  const [verifyError, setVerifyError] = React.useState(null);
  const [passwordMatchMessage, setPasswordMatchMessage] = React.useState(
    "패스워드가 일치하지 않습니다"
  );

  const [emailValidateState, setEmailValidateState] = React.useState("");

  const [
    newPasswordValidateState,
    setNewPasswordValidateState,
  ] = React.useState("");
  const [
    newPasswordConfirmValidateState,
    setNewPasswordConfirmValidateState,
  ] = React.useState("");

  // Verifying token from address
  const {
    loading: verifying,
    data: verifiedData,
    error: verifiedError,
  } = useQuery(VERIFY_TOKEN, {
    variables: {
      token: token,
    },
    onCompleted(data) {
      console.log(data.verifyToken.email);
      setEmailFromToken(data.verifyToken.email);
      setVerifyError(null);
      setChangeError(null);
    },
    onError(error) {
      setVerifyError(displayErrorMessageForGraphQL(error.message));
      console.log(error);
    },
  });

  // Reset password
  const [resetPassword, { loadingChangePassword }] = useMutation(
    RESET_PASSWORD,
    {
      onCompleted(data) {
        console.log(data);
        history.push("/sign-in?reset=true");
        setVerifyError(null);
        setChangeError(null);
      },
      onError(error) {
        setChangeError(displayErrorMessageForGraphQL(error.message));
        console.log(error);
      },
    }
  );

  const validateForm = () => {
    if (
      emailValidateState === "error" ||
      newPasswordValidateState === "error" ||
      newPasswordConfirmValidateState === "error" ||
      newPassword !== newPasswordConfirm
    ) {
      return false;
    }
    if (!email || !newPassword || !newPasswordConfirm) {
      return false;
    }
    return true;
  };
  const handleClick = () => {
    resetPassword({
      variables: {
        emailFromToken: emailFromToken,
        emailFromInput: email,
        newPassword: newPassword,
      },
    });
  };

  const _displayVerifiedError = () => {
    return (
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item md={4}></Grid>
          <Grid item md={4}>
            <Card className={classes.card}>
              <CardHeader className={classes.cardHeader} subheader="에러" />
              <CardContent>
                <p>{verifyError}</p>
                <Button
                  color="primary"
                  onClick={() => history.push("/forgot-password")}
                >
                  패스워드 리셋 페이지로 가기
                </Button>
              </CardContent>
            </Card>
          </Grid>
          <Grid item md={4}></Grid>
        </Grid>
      </div>
    );
  };
  const _displayVerifiedOK = () => {
    return (
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item md={4}></Grid>
          <Grid item md={4}>
            <Card className={classes.card}>
              <CardHeader
                className={classes.cardHeader}
                subheader="패스워드 변경하기"
              />
              <CardContent>
                <div>
                  <TextField
                    error={!validateEmail(email)}
                    label="로그인 이메일"
                    variant="outlined"
                    helperText="로그인시 사용했던 이메일을 입력하세요"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    inputProps={{
                      onChange: (e) => {
                        if (validateEmail(e.target.value)) {
                          setEmailValidateState("success");
                        } else {
                          setEmailValidateState("error");
                        }
                        setEmail(e.target.value);
                      },
                    }}
                  />
                </div>
                <div>
                  <TextField
                    type="password"
                    error={!validateLength(newPassword, 6, 20)}
                    label="새로운 패스워드"
                    variant="outlined"
                    helperText="새로운 패스워드를 입력하세요"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    inputProps={{
                      onChange: (e) => {
                        if (validateLength(e.target.value, 6, 20)) {
                          setNewPasswordValidateState("success");
                        } else {
                          setNewPasswordValidateState("error");
                        }
                        setNewPassword(e.target.value);
                      },
                    }}
                  />
                </div>
                <div>
                  <TextField
                    type="password"
                    label="새 패스워드 확인"
                    error={
                      !validateLength(newPasswordConfirm, 6, 20) ||
                      !isPasswordMatch(newPassword, newPasswordConfirm)
                    }
                    variant="outlined"
                    helperText={passwordMatchMessage}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    inputProps={{
                      onChange: (e) => {
                        if (validateLength(e.target.value, 6, 20)) {
                          setNewPasswordConfirmValidateState("success");
                        }
                        if (newPassword !== e.target.value) {
                          setNewPasswordConfirmValidateState("error");
                        }
                        if (isPasswordMatch(newPassword, e.target.value)) {
                          setPasswordMatchMessage("패스워드가 일치합니다");
                        } else {
                          setPasswordMatchMessage(
                            "패스워드가 일치하지 않습니다"
                          );
                        }
                        setNewPasswordConfirm(e.target.value);
                      },
                    }}
                  />
                </div>
                <br />
                <br />
                <div>
                  <Button
                    color="danger"
                    onClick={(e) => {
                      e.preventDefault();
                      history.push("/forgot-password");
                    }}
                  >
                    취소
                  </Button>
                  <Button
                    disabled={!validateForm()}
                    color="primary"
                    onClick={(e) => {
                      e.preventDefault();
                      handleClick();
                    }}
                  >
                    완료
                  </Button>
                </div>
              </CardContent>
            </Card>
            {changeError !== null ? (
              <Grid item xs={6}>
                <div>
                  <p>{changeError}</p>
                </div>
              </Grid>
            ) : null}
          </Grid>
          <Grid item md={4}></Grid>
        </Grid>
      </div>
    );
  };
  if (loadingChangePassword || verifying) return <Loading />;

  if (verifyError != null) {
    return _displayVerifiedError();
  }
  return _displayVerifiedOK();
};
