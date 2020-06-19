import React from "react";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import Button from "../../components/CustomButtons/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { initPropValue } from "helpers/helper";
import { useMutation } from "@apollo/react-hooks";
import { CHANGE_ACTIVE_STATE } from "../../queries/AdminQuery";

export const ActivateSwitch = ({ user }) => {
  const [open, setOpen] = React.useState(false);

  const [active, setActive] = React.useState(
    initPropValue(user.church, "active")
  );

  const [changeActiveState, { loading }] = useMutation(CHANGE_ACTIVE_STATE, {
    onCompleted(data) {
      console.log(data);
      setActive(!active);
    },
    onError(error) {
      console.log(error.message);
    },
  });

  const changeSwitch = () => {
    changeActiveState({
      variables: {
        churchId: user.church.id,
        active: !active,
      },
    });
    setOpen(false);
  };
  const handleChange = (e) => {
    setOpen(true);
    console.log("Printing active state: ", active);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <FormControlLabel
        control={
          <Switch
            checked={active}
            onChange={(e) => handleChange(e)}
            color="primary"
          />
        }
        label="Active"
      />

      <Dialog
        open={open}
        onClose={() => handleClose()}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Change Church App Active State
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You are about to change church app active state to{" "}
            {(!active).toString()}. Are you sure ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose()} color="danger">
            Cancel
          </Button>
          <Button onClick={() => changeSwitch()} color="primary" autoFocus>
            Change
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
