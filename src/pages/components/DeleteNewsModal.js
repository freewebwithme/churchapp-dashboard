import React from "react";
import Button from "components/CustomButtons/Button.js";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export function DeleteNewsModal(props) {
  const { news, setNews, modal, setModal, deleteNews, user } = props;

  function handleClose() {
    setNews(null);
    setModal(false);
  }
  return (
    <Dialog open={modal} onClose={handleClose} disableBackdropClick={true}>
      <DialogTitle>뉴스 삭제</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {news.content} 을 삭제하시겠습니까?
        </DialogContentText>
        <Button
          color="danger"
          onClick={(e) => {
            e.preventDefault();
            deleteNews({
              variables: {
                id: news.id,
                churchId: user.church.id,
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
