import React from "react";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import CustomInput from "components/CustomInput/CustomInput.js";

import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Fab from "@material-ui/core/Fab";
import EditIcon from "@material-ui/icons/Edit";

import { useMutation, useQuery } from "@apollo/react-hooks";

import { getUserFromSession } from "../helpers/helper.js";
import { CREATE_CHURCH, ME } from "../queries/Query.js";
import { ChurchInfoForm } from "./ChurchInfoForm.js";
import Loading from "./components/Loading.js";

const useStyles = makeStyles((theme) => ({
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "50ch",
  },
  multitextField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "50ch",
  },
  formTitle: {
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(2),
    fontSize: 28,
  },
  formSubtitle: {
    marginTop: theme.spacing(2),
  },
  cardContent: {
    padding: theme.spacing(5),
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

export default function ChurchInfoPage() {
  const classes = useStyles();

  const currentUser = getUserFromSession();

  const [modalOpen, setModalOpen] = React.useState(false);

  const { loading: loadingMe, error: errorMe, data: dataMe } = useQuery(ME);

  const [createChurch, { loading }] = useMutation(CREATE_CHURCH, {
    onCompleted(data) {
      console.log("Printing from onCompleted: ", data);
    },
    onError(error) {
      console.log("Printing from onError: ", error);
    },
  });

  if (loading) return <p>Loading....</p>;
  if (loadingMe) return <p>Loading....</p>;

  const church = dataMe.me.church;
  sessionStorage.setItem("user", JSON.stringify(dataMe.me));
  console.log("Printing DataMe: ", dataMe);

  const handleOpen = () => {
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  return (
    <GridContainer>
      {currentUser.church ? (
        <GridItem xs={12}>
          <Card>
            <CardContent className={classes.cardContent}>
              <h3>교회 정보</h3>
              <h5>{church.name}</h5>
              <h6>{church.channelId}</h6>
              <h6>{church.uuid}</h6>
              <p>{church.intro}</p>
            </CardContent>
            <CardActions className={classes.cardContent}>
              <Fab
                onClick={() => handleOpen()}
                variant="extended"
                color="primary"
                aria-label="edit"
              >
                <EditIcon className={classes.extendedIcon} />
                수정하기
              </Fab>
            </CardActions>
          </Card>
        </GridItem>
      ) : (
        <ChurchInfoForm
          title="교회 정보가 없습니다. 교회 정보를 등록하세요"
          create={createChurch}
          update={createChurch}
        />
      )}
      <GridItem xs={12} sm={12} md={12} lg={12}>
        <Modal
          open={modalOpen}
          aria-labelledby="Church Info"
          aria-describedby="Church Info"
          className={classes.modal}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{ timeout: 500 }}
        >
          <Fade in={modalOpen}>
            <ChurchInfoForm
              title="교회 정보 수정"
              create={createChurch}
              update={createChurch}
            />
          </Fade>
        </Modal>
      </GridItem>
      <GridItem xs={12} sm={6} md={6} lg={3}></GridItem>
      <GridItem xs={12} sm={6} md={6} lg={3}></GridItem>
    </GridContainer>
  );
}
