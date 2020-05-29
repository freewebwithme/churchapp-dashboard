import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "components/CustomButtons/Button.js";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import CustomInput from "components/CustomInput/CustomInput.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import AnnouncementOutlinedIcon from "@material-ui/icons/AnnouncementOutlined";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
  announcementIcon: {
    marginRight: 10,
  },
  contentField: {
    width: "100ch",
  },
}));
export function NewsModal(props) {
  const classes = useStyles();
  const { news, setNews, modal, setModal, createNews, updateNews } = props;

  const [content, setContent] = React.useState("");
  const [contentValidationState, setContentValidationState] = React.useState(
    ""
  );

  function handleClose() {
    if (setNews != null) {
      setNews(null);
    }
    setModal(false);
    console.log("handle close()");
  }
  function handleSubmit() {
    if (createNews != null) {
    }
    if (updateNews != null) {
    }
  }
  return (
    <Dialog
      fullWidth={true}
      maxWidth="sm"
      open={modal}
      onClose={handleClose}
      disableBackdropClick={true}
    >
      <DialogTitle>
        <AnnouncementOutlinedIcon className={classes.announcementIcon} />
        교회 소식
      </DialogTitle>
      <DialogContent dividers>
        새로운 교회 소식을 작성하세요
        <GridContainer>
          <GridItem xs={12} sm={12} md={12} lg={12}>
            <CustomInput
              labelText="내용"
              className={classes.contentField}
              error={contentValidationState === "error"}
              success={contentValidationState === "success"}
              formControlProps={{
                fullWidth: true,
              }}
              inputProps={{
                fullWidth: true,
                multiline: true,
                rows: 4,
                onChange: (e) => {
                  if (e.target.value.length > 10) {
                    setContentValidationState("success");
                  } else {
                    setContentValidationState("error");
                  }
                  setContent(e.target.value);
                },
              }}
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={12} lg={12}>
            <Button color="danger" onClick={handleClose}>
              취소
            </Button>
            <Button color="primary" onClick={handleSubmit}>
              완료
            </Button>
          </GridItem>
        </GridContainer>
      </DialogContent>
    </Dialog>
  );
}
