import React from "react";
import { useHistory } from "react-router-dom";
import { getUserFromSession, setUserToSession } from "../helpers/helper";
import GridItem from "components/Grid/GridItem";
import GridContainer from "components/Grid/GridContainer";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardAvatar from "components/Card/CardAvatar.js";
import Button from "components/CustomButtons/Button.js";
import { makeStyles } from "@material-ui/core/styles";

import styles from "assets/jss/material-dashboard-pro-react/views/userProfileStyles.js";

import avatar from "assets/img/default-avatar.png";
import { useQuery } from "@apollo/react-hooks";
import { ME } from "queries/Query";
import Loading from "./components/Loading";

const useStyles = makeStyles(styles);

export const ProfilePage = () => {
  const history = useHistory();

  const savedUser = getUserFromSession();
  const classes = useStyles();
  const [currentUser, setCurrentUser] = React.useState(savedUser);

  const { loading: loadingMe, error: errorMe, data: dataMe } = useQuery(ME, {
    fetchPolicy: "network-only",
    onCompleted(data) {
      setUserToSession(data.me);
      setCurrentUser(data.me);
    },
  });

  if (loadingMe) return <Loading />;

  return (
    <GridContainer>
      <GridItem xs={6} sm={6} md={6} lg={6}>
        <Card profile>
          <CardAvatar profile>
            <a href="#" onClick={(e) => e.preventDefault()}>
              <img src={avatar} alt="..." />
            </a>
          </CardAvatar>
          <CardBody profile>
            <h6 className={classes.cardCategory}>{currentUser.email}</h6>
            <h4 className={classes.cardTitle}>
              {currentUser.name ? currentUser.name : "이름을 등록하세요"}
            </h4>
            {currentUser.phoneNumber ? (
              <p className={classes.description}>
                <span>({currentUser.phoneNumber.slice(0, 3)})</span>
                <span> {currentUser.phoneNumber.slice(3, 6)}</span>
                <span> - </span>
                <span>{currentUser.phoneNumber.slice(6, 10)}</span>
              </p>
            ) : (
              <p>"전화번호를 등록하세요"</p>
            )}
            <Button
              color="primary"
              size="sm"
              onClick={() => history.push("/dashboard/edit-profile")}
            >
              프로필 수정
            </Button>
            <Button
              color="danger"
              size="sm"
              onClick={() => history.push("/dashboard/change-password")}
            >
              패스워드 변경
            </Button>
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
};
