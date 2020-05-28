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
  const {
    title,
    modal,
    setModal,
    create,
    update,
    employee,
    setEmployee,
  } = props;

  function initEmployeeState(employee, propName) {
    if (employee != null) {
      return employee[propName];
    }
    return "";
  }
  const [name, setName] = React.useState(initEmployeeState(employee, "name"));
  const [position, setPosition] = React.useState(
    initEmployeeState(employee, "position")
  );
  // TODO: There is a bug in validating order number
  // When I type just 1 it didnt' validate
  // Because setOrder doens't set 1 in on Change event.
  const [order, setOrder] = React.useState(
    initEmployeeState(employee, "order")
  );

  const [employeeNameState, setEmployeeNameState] = React.useState("");
  const [employeePositionState, setEmployeePositionState] = React.useState("");
  const [employeeOrderState, setEmployeeOrderState] = React.useState("");

  function handleClose() {
    setName("");
    setPosition("");
    setOrder("");
    setEmployeeNameState("");
    setEmployeePositionState("");
    setEmployeeOrderState("");
    // I need to set currentEmployee prop to null
    // In this way, I can draw new Employee update form with selected
    // employee
    if (setEmployee != null) {
      setEmployee(null);
    }
    setModal(false);
  }

  function verifyLength(value, length) {
    if (value.length >= length) {
      return true;
    }
    return false;
  }

  function validateForm() {
    if (
      employeeNameState === "error" ||
      name === "" ||
      employeePositionState === "error" ||
      position === "" ||
      employeeOrderState === "error" ||
      order === ""
    ) {
      return false;
    }
    return true;
  }

  return (
    <Dialog
      open={modal}
      onClose={handleClose}
      disableBackdropClick={true}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle>{title}</DialogTitle>
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
            defaultValue: name,
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
            defaultValue: position,
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
              setOrder(e.target.value);
              console.log("Printing order: ", order);
              if (isNumber(order)) {
                setEmployeeOrderState("success");
              } else {
                setEmployeeOrderState("error");
              }
            },
            defaultValue: order,
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="danger">
          취소
        </Button>
        <Button
          color="primary"
          onClick={(e) => {
            e.preventDefault();
            if (validateForm()) {
              console.log("validation success");
              if (create != null) {
                create({
                  variables: {
                    name: name,
                    position: position,
                    profileImage: null,
                    churchId: currentUser.church.id,
                    order: parseFloat(order),
                  },
                });
                setModal(false);
              } else {
                update({
                  variables: {
                    id: employee.id,
                    name: name,
                    position: position,
                    churchId: employee.churchId,
                    order: parseFloat(order),
                  },
                });
                setModal(false);
              }
            }
            console.log("validation fail");
            console.log("Printing order state", employeeOrderState);
          }}
        >
          완료
        </Button>
      </DialogActions>
    </Dialog>
  );
}
