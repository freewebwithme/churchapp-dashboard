import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import NotificationsIcon from "@material-ui/icons/Notifications";
import Typography from "@material-ui/core/Typography";
import cellphoneImage from "../assets/img/cellphone-trimmed.png";
import Button from "components/CustomButtons/Button.js";

import { useMutation } from "@apollo/react-hooks";
import { SEND_PUSH } from "../queries/Query.js";
import { getUserFromSession, hasChurch } from "../helpers/helper.js";
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
    height: 550,
  },
  cardHeader: {
    backgroundColor: "#9C27B0",
    "& .MuiCardHeader-subheader": {
      color: "white",
    },
  },
  cellphoneHolder: {
    position: "relative",
  },
  cellphone: {
    position: "relative",
    width: 400,
  },
  messageBar: {
    position: "absolute",
    width: 363,
    top: 320,
    left: 21,
  },
  contentsHolder: {
    maxWidth: 323,
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(2),
    marginBottom: theme.spacing(1),
    marginRight: theme.spacing(2),
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  notificationIcon: {
    fontSize: 20,
    marginTop: -5,
  },
  contentsText: {
    fontSize: 13,
  },
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export const PushNotificationPage = () => {
  const classes = useStyles();
  const history = useHistory();
  const [title, setTitle] = React.useState("제목");
  const [message, setMessage] = React.useState("메세지");
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarStatus, setSnackbarStatus] = React.useState("success");
  const [snackbarMessage, setSnackbarMessage] = React.useState("");

  const currentUser = getUserFromSession();

  const [sendPush, { loading }] = useMutation(SEND_PUSH, {
    onCompleted(data) {
      console.log("sendPush finished", data.sendPush.recipients);
      // Show pop up message with total recipients.
      let message = data.sendPush.recipients + " 명에게 메세지를 보냈습니다.";
      setSnackbarMessage(message);
      setSnackbarStatus("success");
      setSnackbarOpen(true);
    },
    onError(error) {
      console.log("Error", error);
      setSnackbarMessage("메세지를 보내는데 실패했습니다.  잠시후 다시 시도하세요.");
      setSnackbarStatus("error");
      setSnackbarOpen(true);
    },
  });

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  }

  const validateForm = () => {
    if (
      title === "제목" ||
      title === "" ||
      message === "메세지" ||
      message === ""
    ) {
      return false;
    }
    return true;
  };

  if (loading) return <Loading />;

  const _noChurch = () => {
    return (
      <Grid container>
        <Grid item xs={6}>
          <p>교회 정보가 등록되어 있지 않습니다. 교회 정보부터 등록하세요</p>
          <Button color="primary" onClick={() => history.push("/dashboard")}>교회 정보 등록</Button>
        </Grid>
      </Grid>
    );
  };

  const _displayPushNotification = () => {
    return (
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={6}>
            <Card className={classes.card}>
              <CardHeader
                className={classes.cardHeader}
                subheader="앱 사용자에게 Push Notification 보내기"
              />
              <CardContent>
                <div>
                  <TextField
                    label="제목"
                    variant="outlined"
                    helperText="최대 25자 입니다."
                    InputLabelProps={{
                      shrink: true,
                    }}
                    inputProps={{
                      maxLength: 25,
                      onChange: (e) => {
                        if (e.target.value.length === 0) {
                          setTitle("제목");
                        } else {
                          setTitle(e.target.value);
                        }
                      },
                    }}
                  />
                </div>
                <div>
                  <TextField
                    label="메세지"
                    multiline
                    rows={7}
                    variant="outlined"
                    helperText="최대 150자 입니다."
                    InputLabelProps={{
                      shrink: true,
                    }}
                    inputProps={{
                      maxLength: 50,
                      onChange: (e) => {
                        if (e.target.value.length === 0) {
                          setMessage("메세지");
                        } else {
                          setMessage(e.target.value);
                        }
                      },
                    }}
                  />
                </div>
                <br />
                <br />
                <div>
                  <Button
                    color="primary"
                    disabled={!validateForm()}
                    onClick={(e) => {
                      e.preventDefault();
                      sendPush({
                        variables: {
                          churchId: currentUser.church.id,
                          title: title,
                          message: message,
                        },
                      });
                    }}
                  >
                    메세지 보내기
                  </Button>
                </div>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <div className={classes.cellphoneHolder}>
              <img src={cellphoneImage} className={classes.cellphone} />
              <Paper elevation={2} className={classes.messageBar}>
                <Grid container className={classes.contentsHolder}>
                  <Grid item xs={1}>
                    <NotificationsIcon
                      color="action"
                      fontSize="small"
                      className={classes.notificationIcon}
                    />
                  </Grid>
                  <Grid item xs={11}>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      동부 장로 교회
                    </Typography>
                  </Grid>
                  <Grid item xs={11}>
                    <div>
                      <Typography className={classes.contentsText}>
                        {title}
                      </Typography>
                      <Typography
                        display="block"
                        className={classes.contentsText}
                      >
                        {message}
                      </Typography>
                    </div>
                  </Grid>
                </Grid>
              </Paper>
            </div>
          </Grid>
        </Grid>
        <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity={snackbarStatus}>
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </div>
    );
  };

  return hasChurch(currentUser) ? _displayPushNotification() : _noChurch();
};
