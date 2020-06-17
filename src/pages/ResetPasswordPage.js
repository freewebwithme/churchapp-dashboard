import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import Button from "components/CustomButtons/Button.js";
import {
  getUserFromSession,
  validateLength,
  initPropValue,
  validateEmail,
  isNumber,
} from "../helpers/helper";
import { useMutation } from "@apollo/react-hooks";
import { CHANGE_PASSWORD } from "queries/Query";
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
  const currentUser = getUserFromSession();

  const [newPassword, setNewPassword] = React.useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = React.useState("");
  const [changeError, setChangeError] = React.useState(null);
  const [passwordMatchMessage, setPasswordMatchMessage] = React.useState(
    "패스워드가 일치하지 않습니다"
  );

  const [
    newPasswordValidateState,
    setNewPasswordValidateState,
  ] = React.useState("error");
  const [
    newPasswordConfirmValidateState,
    setNewPasswordConfirmValidateState,
  ] = React.useState("erro");

  const [changePassword, { loadingChangePassword }] = useMutation(
    CHANGE_PASSWORD,
    {
      onCompleted(data) {
        console.log(data);
        history.push("/dashboard/profile");
      },
      onError(error) {
        setChangeError(error.message);
      },
    }
  );
  const isPasswordMatch = (oldPassword, newPassword) => {
    if (oldPassword !== newPassword) {
      return false;
    }
    return true;
  };

  const validateForm = () => {
    if (
      newPassword === "" ||
      newPasswordValidateState === "error" ||
      newPasswordConfirm === "" ||
      newPasswordConfirmValidateState === "error" ||
      newPassword !== newPasswordConfirm
    ) {
      return false;
    }
    return true;
  };
  const handleClick = () => {
    changePassword({
      variables: {
        email: currentUser.email,
        newPassword: newPassword,
      },
    });
  };

  if (loadingChangePassword) return <Loading />;

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
                  label="새 비밀번호 확인"
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
                        setPasswordMatchMessage("패스워드가 일치하지 않습니다");
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
                    history.goBack();
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
        </Grid>
        {changeError ?? (
          <Grid item xs={6}>
            <div>
              <p>{changeError}</p>
            </div>
          </Grid>
        )}
        <Grid item md={4}></Grid>
      </Grid>
    </div>
  );
};
