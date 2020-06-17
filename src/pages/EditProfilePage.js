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
import { UPDATE_ME } from "queries/Query";
import Loading from "./components/Loading";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "35ch",
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

export const EditProfilePage = () => {
  const currentUser = getUserFromSession();
  const history = useHistory();

  const classes = useStyles();
  const [name, setName] = React.useState(initPropValue(currentUser, "name"));
  const [email, setEmail] = React.useState(initPropValue(currentUser, "email"));
  const [phoneNumber, setPhoneNumber] = React.useState(
    initPropValue(currentUser, "phoneNumber")
  );

  const [nameValidateState, setNameValidateState] = React.useState(
    name ? "success" : "error"
  );
  const [emailValidateState, setEmailVaildateState] = React.useState(
    email ? "success" : "error"
  );

  const [updateError, setUpdateError] = React.useState(null);
  const [updateMe, { loading }] = useMutation(UPDATE_ME, {
    onCompleted(data) {
      // update completed
      history.push("/dashboard/profile");
    },
    onError(error) {
      // Error
      console.log("onError: ", error);
      setUpdateError("정보를 업데이트 할 수 없습니다. 다시 시도하세요");
    },
  });

  const handleClick = () => {
    updateMe({
      variables: {
        userId: currentUser.id,
        name: name,
        email: email,
        phoneNumber: phoneNumber,
      },
    });
  };
  const validateForm = () => {
    if (name === null || name === "" || email === null || email === "") {
      return false;
    }
    if (
      nameValidateState === "" ||
      nameValidateState === "error" ||
      emailValidateState === "" ||
      emailValidateState === "error"
    ) {
      return false;
    }
    return true;
  };

  if (loading) return <Loading />;

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={6}>
          <Card className={classes.card}>
            <CardHeader
              className={classes.cardHeader}
              subheader="개인 정보 수정하기"
            />
            <CardContent>
              <div>
                <TextField
                  error={!validateLength(name, 2, 20)}
                  label="이름"
                  helperText="이름은 2자 이상 20자 미만입니다"
                  variant="outlined"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputProps={{
                    maxLength: 25,
                    defaultValue: name,
                    onChange: (e) => {
                      if (validateLength(e.target.value, 2, 20)) {
                        setNameValidateState("success");
                      } else {
                        setNameValidateState("error");
                      }

                      setName(e.target.value);
                    },
                  }}
                />
              </div>
              <div>
                <TextField
                  error={!validateLength(email, 6, 30) || !validateEmail(email)}
                  label="Email"
                  variant="outlined"
                  helperText="이메일 주소는 6자 이상 30자 미만입니다"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputProps={{
                    defaultValue: email,
                    onChange: (e) => {
                      if (
                        validateLength(e.target.value, 6, 30) ||
                        validateEmail(e.target.value)
                      ) {
                        setEmailVaildateState("success");
                      } else {
                        setEmailVaildateState("error");
                      }
                      setEmail(e.target.value);
                    },
                  }}
                />
              </div>
              <div>
                <TextField
                  label="전화번호"
                  error={
                    !validateLength(phoneNumber, 9, 15) ||
                    !isNumber(phoneNumber)
                  }
                  variant="outlined"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputProps={{
                    defaultValue: phoneNumber,
                    onChange: (e) => {
                      setPhoneNumber(e.target.value);
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
        {updateError ?? (
          <Grid item xs={6}>
            <div>
              <p>{updateError}</p>
            </div>
          </Grid>
        )}
      </Grid>
    </div>
  );
};
