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
import { CONTACT_ADMIN } from "../queries/Query.js";
import {
  getUserFromSession,
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
export const ContactPage = () => {
  const classes = useStyles();
  const history = useHistory();
  const currentUser = getUserFromSession();

  // Message of mutation result
  const [snackbarMessage, setSnackbarMessage] = React.useState(null);
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarStatus, setSnackbarStatus] = React.useState("success");

  const [category, setCategory] = React.useState("");
  const [name, setName] = React.useState(initPropValue(currentUser, "name"));
  const [email, setEmail] = React.useState(initPropValue(currentUser, "email"));
  const [message, setMessage] = React.useState(null);

  const [emailVaildateState, setEmailValidateState] = React.useState("");
  const [categoryValidateState, setCategoryValidateState] = React.useState("");

  const [contactAdmin, { loading }] = useMutation(CONTACT_ADMIN, {
    onCompleted(data) {
      setSnackbarStatus("success");
      setSnackbarMessage(data.contactAdmin.message);
      setSnackbarOpen(true);
    },
    onError(error) {
      setSnackbarStatus("error");
      setSnackbarMessage(displayErrorMessageForGraphQL(error.message));
      setSnackbarOpen(true);
    },
  });
  const selectOnChange = (e) => {
    setCategory(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      contactAdmin({
        variables: {
          category: category,
          name: name,
          email: email,
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
    if (!name || !email || !message) {
      return false;
    }
    if (category === "" || categoryValidateState === "error") {
      return false;
    }
    if (emailVaildateState === "error") {
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
              subheader="관리자에게 연락하기"
            />
            <CardContent>
              <FormControl
                error={category === ""}
                className={classes.formControl}
              >
                <InputLabel id="appType-select-label">카테고리</InputLabel>
                <Select
                  labelId="appType-select-label"
                  id="appType-select"
                  value={category}
                  onChange={(e) => selectOnChange(e)}
                >
                  <MenuItem value="Feature-Request">건의사항</MenuItem>
                  <MenuItem value="Bug Report">문제점 알리기</MenuItem>
                  <MenuItem value="etc">기타</MenuItem>
                </Select>

                <FormHelperText>카테고리를 선택해주세요</FormHelperText>
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
                  error={!validateEmail(email)}
                  label="이메일"
                  variant="outlined"
                  defaultValue={email}
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
                  보내기
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
