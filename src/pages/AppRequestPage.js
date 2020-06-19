import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";

import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Paper from "@material-ui/core/Paper";
import NotificationsIcon from "@material-ui/icons/Notifications";
import Typography from "@material-ui/core/Typography";
import Button from "components/CustomButtons/Button.js";

import { useMutation } from "@apollo/react-hooks";
import { APP_REQUEST } from "../queries/Query.js";
import {
  getUserFromSession,
  isNumber,
  validateEmail,
  displayErrorMessageForGraphQL,
  initPropValue,
} from "../helpers/helper.js";
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
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
  },
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
export const AppRequestPage = () => {
  const classes = useStyles();
  const history = useHistory();
  const currentUser = getUserFromSession();

  // Message of mutation result
  const [snackbarMessage, setSnackbarMessage] = React.useState(null);
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarStatus, setSnackbarStatus] = React.useState("success");

  const [appType, setAppType] = React.useState("");
  const [name, setName] = React.useState(initPropValue(currentUser, "name"));
  const [churchName, setChurchName] = React.useState(
    initPropValue(currentUser.church, "name")
  );
  const [email, setEmail] = React.useState(initPropValue(currentUser, "email"));
  const [phoneNumber, setPhoneNumber] = React.useState(
    initPropValue(currentUser, "phoneNumber")
  );
  const [message, setMessage] = React.useState(null);

  const [emailVaildateState, setEmailValidateState] = React.useState("");
  const [
    phoneNumberValidateState,
    setPhoneNumberValidateState,
  ] = React.useState("");

  const [appRequest, { loading }] = useMutation(APP_REQUEST, {
    onCompleted(data) {
      setSnackbarStatus("success");
      setSnackbarMessage(data.appRequest.message);
      setSnackbarOpen(true);
    },
    onError(error) {
      setSnackbarStatus("error");
      setSnackbarMessage(displayErrorMessageForGraphQL(error.message));
      setSnackbarOpen(true);
    },
  });
  const selectOnChange = (e) => {
    setAppType(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      appRequest({
        variables: {
          appType: appType,
          name: name,
          churchName: churchName,
          email: email,
          phoneNumber: phoneNumber,
          message: message,
        },
      });
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  const validateForm = () => {
    if (!name || !email || !phoneNumber || !message || !churchName) {
      return false;
    }
    if (appType === "") {
      return false;
    }
    if (
      emailVaildateState === "error" ||
      phoneNumberValidateState === "error"
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
              subheader="앱 신청하기"
            />
            <CardContent>
              <FormControl
                error={appType === ""}
                className={classes.formControl}
              >
                <InputLabel id="appType-select-label">앱 타입</InputLabel>
                <Select
                  labelId="appType-select-label"
                  id="appType-select"
                  value={appType}
                  onChange={(e) => selectOnChange(e)}
                >
                  <MenuItem value="demo">데모 앱</MenuItem>
                  <MenuItem value="realapp">앱스토어 앱</MenuItem>
                </Select>

                <FormHelperText>
                  어떤 타입의 앱을 원하시는지 둘중에 하나를 선택해주세요.
                </FormHelperText>
              </FormControl>
              <br />
              <br />
              <div>
                <TextField
                  label="이름"
                  variant="outlined"
                  defaultValue={name}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputProps={{
                    maxLength: 25,
                    onChange: (e) => {
                      setName(e.target.value);
                    },
                  }}
                />
              </div>
              <div>
                <TextField
                  label="교회 이름"
                  variant="outlined"
                  defaultValue={churchName}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputProps={{
                    maxLength: 25,
                    onChange: (e) => {
                      setChurchName(e.target.value);
                    },
                  }}
                />
              </div>
              <div>
                <TextField
                  error={!isNumber(phoneNumber)}
                  label="전화번호"
                  defaultValue={phoneNumber}
                  variant="outlined"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputProps={{
                    maxLength: 25,
                    onChange: (e) => {
                      if (isNumber(e.target.value)) {
                        setPhoneNumberValidateState("success");
                      } else {
                        setPhoneNumberValidateState("error");
                      }
                      setPhoneNumber(e.target.value);
                    },
                  }}
                />
              </div>
              <div>
                <TextField
                  error={!validateEmail(email)}
                  label="이메일"
                  defaultValue={email}
                  variant="outlined"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputProps={{
                    maxLength: 25,
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
                  label="메세지"
                  variant="outlined"
                  rows={7}
                  multiline={true}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputProps={{
                    maxLength: 250,
                    onChange: (e) => {
                      setMessage(e.target.value);
                    },
                  }}
                />
              </div>
              <div>
                <Button color="danger" onClick={() => history.goBack()}>
                  취소
                </Button>
                <Button
                  color="primary"
                  disabled={!validateForm()}
                  onClick={(e) => handleSubmit(e)}
                >
                  신청하기
                </Button>
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => handleClose()}
      >
        <Alert
          onClose={(event, reason) => handleClose(event, reason)}
          severity={snackbarStatus}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};
