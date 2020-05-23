import React from "react";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardAvatar from "components/Card/CardAvatar.js";
import { makeStyles } from "@material-ui/core/styles";
import Button from "components/CustomButtons/Button.js";
import styles from "assets/jss/material-dashboard-pro-react/views/userProfileStyles.js";
import defaultAvatar from "assets/img/default-avatar.jpg";

import { getUserFromSession } from "../helpers/helper.js";

const useStyles = makeStyles(styles);

export const EmployeePage = () => {
  let currentUser = getUserFromSession();
  const classes = useStyles();

  const _employeePage = () => {
    if (
      currentUser.church.employees.length == 0 ||
      currentUser.church.employees == null
    ) {
      return (
        <GridContainer>
          <h5>등록된 교역자분들이 없습니다.</h5>
        </GridContainer>
      );
    } else {
      return (
        <GridContainer>
          {currentUser.church.employees.map((employee) => {
            return (
              <GridItem xs={4} sm={4} md={4} lg={3}>
                <Card profile>
                  <CardAvatar profile>
                    <img src={defaultAvatar} alt="..." />
                  </CardAvatar>
                  <CardBody profile>
                    <h6 className={classes.cardCategory}>
                      {employee.position}
                    </h6>
                    <h4 className={classes.cardTitle}>{employee.name}</h4>
                    <br />
                    <Button color="rose" round>
                      Follow
                    </Button>
                  </CardBody>
                </Card>
              </GridItem>
            );
          })}
        </GridContainer>
      );
    }
  };
  return _employeePage();
};
