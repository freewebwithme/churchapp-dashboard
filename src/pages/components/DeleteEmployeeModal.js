import React from "react";
import Button from "components/CustomButtons/Button.js";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export function DeleteEmployeeModal(props) {
  const { employee, setEmployee, deleteEmployee, modal, setModal } = props;

  function handleClose() {
    setEmployee(null);
    setModal(false);
  }
  return (
    <Dialog open={modal} onClose={handleClose} disableBackdropClick={true}>
      <DialogTitle>교직원 삭제</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {employee.name} 님 을 교직원 리스트에서 삭제하시겠습니까?
        </DialogContentText>
        <Button
          color="danger"
          onClick={(e) => {
            deleteEmployee({
              variables: {
                id: employee.id,
                churchId: employee.churchId,
              },
            });
            setModal(false);
          }}
        >
          삭제
        </Button>
        <Button
          color="primary"
          onClick={(e) => {
            setModal(false);
          }}
        >
          취소
        </Button>
      </DialogContent>
    </Dialog>
  );
}
