import React from "react";
import { useHistory } from "react-router-dom";
import { useApolloClient } from "@apollo/react-hooks";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "components/CustomButtons/Button.js";
import { removeUserFromSession } from "../helpers/helper.js";

export function LogoutPage() {
  const client = useApolloClient();
  const [modal, setModal] = React.useState(true);
  let history = useHistory();

  const handleClose = () => {
    setModal(false);
    history.goBack();
  };

  const handleLogout = () => {
    removeUserFromSession();
    client.resetStore();
    history.push("/");
  };

  return (
    <div>
      <Dialog
        open={modal}
        disableBackdropClick={true}
        disableEscapeKeyDown={true}
      >
        <DialogTitle>{"로그아웃 하시겠습니까?"}</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose} color="danger">
            취소
          </Button>
          <Button onClick={handleLogout} color="primary" autoFocus>
            로그아웃
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
