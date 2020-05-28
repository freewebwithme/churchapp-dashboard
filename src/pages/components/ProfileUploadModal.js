import React from "react";
import Button from "components/CustomButtons/Button.js";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import AvatarUpload from "./AvatarUpload.js";
import { getUserFromSession } from "../../helpers/helper.js";

export const ProfileUploadModal = (props) => {
  let currentUser = getUserFromSession();
  const { title, modal, setModal, employee, refetch, setEmployee } = props;

  function handleClose() {
    setEmployee(null);
    setModal(false);
  }
  return (
    <Dialog open={modal} onClose={handleClose} disableBackdropClick={true}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          교직원분의 사진을 업로드 해주세요.
        </DialogContentText>
        <AvatarUpload
          avatar
          setModal={setModal}
          user={currentUser}
          employee={employee}
          refetch={refetch}
        />
        <Button color="danger" onClick={handleClose}>
          취소
        </Button>
      </DialogContent>
    </Dialog>
  );
};
