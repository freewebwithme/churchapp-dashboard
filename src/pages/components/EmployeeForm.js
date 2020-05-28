import React from "react";
import Button from "components/CustomButtons/Button.js";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import CustomInput from "components/CustomInput/CustomInput.js";
import AvatarUpload from "./AvatarUpload.js";
import { getUserFromSession, isNumber } from "../../helpers/helper.js";

export function EmployeeForm(props) {
  let currentUser = getUserFromSession();

  const { title, modal, setModal, create, update } = props;
  const [name, setName] = React.useState("");
  const [position, setPosition] = React.useState("");
  const [order, setOrder] = React.useState(1);

  const [employeeNameState, setEmployeeNameState] = React.useState(null);
  const [employeePositionState, setEmployeePositionState] = React.useState(
    null
  );
  const [employeeOrderState, setEmployeeOrderState] = React.useState(null);

  function handleClose() {
    setName("");
    setPosition("");
    setOrder(1);
    setEmployeeNameState(null);
    setEmployeePositionState(null);
    setEmployeeOrderState(null);
    setModal(false);
  }

  function validateForm() {
    if (
      employeeNameState === "success" &&
      employeePositionState === "success" &&
      employeeOrderState === "success"
    ) {
      return true;
    }
    return false;
  }

  function verifyLength(value, length) {
    if (value.length >= length) {
      return true;
    }
    return false;
  }

  return (
    <Dialog
      open={modal}
      onClose={handleClose}
      disableBackdropClick={true}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          교회 소개 스크린에 표시될 교역자 분들입니다. <br />
          프로필 사진은 기본정보를 등록후에 추가 하실수 있습니다.
        </DialogContentText>
        <CustomInput
          error={employeeNameState === "error"}
          success={employeeNameState === "success"}
          labelText="교역자 이름"
          helperText="예) 김철수"
          formControlProps={{
            fullWidth: true,
          }}
          inputProps={{
            onChange: (e) => {
              if (verifyLength(e.target.value, 2)) {
                setEmployeeNameState("success");
              } else {
                setEmployeeNameState("error");
              }
              setName(e.target.value);
            },
          }}
        />
        <CustomInput
          error={employeePositionState === "error"}
          success={employeePositionState === "success"}
          labelText="포지션"
          helperText="예) 담임 목사"
          formControlProps={{
            fullWidth: true,
          }}
          inputProps={{
            onChange: (e) => {
              if (verifyLength(e.target.value, 2)) {
                setEmployeePositionState("success");
              } else {
                setEmployeePositionState("error");
              }
              setPosition(e.target.value);
            },
          }}
        />
        <CustomInput
          error={employeeOrderState === "error"}
          success={employeeOrderState === "success"}
          labelText="표시 순서"
          helperText="1-100까지 번호를 적어주세요. 낮은 번호부터 앱에 순서대로 배치됩니다."
          formControlProps={{
            fullWidth: true,
          }}
          inputProps={{
            onChange: (e) => {
              if (parseFloat(order) >= 0 && isNumber(order)) {
                setEmployeeOrderState("success");
              } else {
                setEmployeeOrderState("error");
              }
              setOrder(e.target.value);
            },
            type: "number",
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="danger">
          취소
        </Button>
        <Button
          disabled={!validateForm()}
          color="primary"
          onClick={(e) => {
            e.preventDefault();
            if (create != null) {
              create({
                variables: {
                  name: name,
                  position: position,
                  profileImage: null,
                  churchId: currentUser.church.id,
                  order: order,
                },
              });
              setModal(false);
            } else {
              update({});
            }
          }}
        >
          등록
        </Button>
      </DialogActions>
    </Dialog>
  );
}
