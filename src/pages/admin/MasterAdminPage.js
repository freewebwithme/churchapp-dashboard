import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory, Link } from "react-router-dom";

import { useQuery } from "@apollo/react-hooks";
import { LIST_ALL_USERS } from "../../queries/Query";
import Loading from "../components/Loading.js";

import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Table from "components/Table/Table.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardIcon from "components/Card/CardIcon.js";
import CardHeader from "components/Card/CardHeader.js";
import { Person, Edit } from "@material-ui/icons";

import styles from "assets/jss/material-dashboard-pro-react/views/extendedTablesStyle.js";

const useStyles = makeStyles(styles);

export function MasterAdminPage(props) {
  const classes = useStyles();
  const history = useHistory();

  const { loading, error, data } = useQuery(LIST_ALL_USERS);
  if (error) return <p>{error.message}</p>;
  if (loading) {
    return <Loading />;
  }

  // Build each row for user list.
  function userRows(users) {
    const rows = users.map((user) => {
      // Build link url, appending user id
      let infoLink = "admin/edit-church-info/" + user.id;
      let videosLink = "admin/edit-latest-videos/" + user.id;
      let employeesLink = "admin/edit-employees/" + user.id;
      let newsLink = "admin/edit-church-news/" + user.id;
      let notificationsLink = "admin/edit-church-info/" + user.id;
      return [
        user.id,
        user.name,
        user.email,
        <Link to={infoLink}>Info</Link>,
        <Link to={videosLink}>Videos</Link>,
        <Link to={employeesLink}>Employees</Link>,
        <Link to={newsLink}>News</Link>,
        <Link to={notificationsLink}>Notifications</Link>,
      ];
    });
    return rows;
  }

  return (
    <GridContainer>
      <GridItem xs={12}>
        <Card>
          <CardHeader color="rose" icon>
            <CardIcon color="rose">
              <Person />
            </CardIcon>
            <h4 className={classes.cardIconTitle}>All Users</h4>
          </CardHeader>
          <CardBody>
            <Table
              tableHead={["id", "name", "email"]}
              tableData={userRows(data.listUsers)}
              customCellClasses={[classes.center, classes.right, classes.right]}
              customClassesForCells={[0, 4, 5]}
              customHeadCellClasses={[
                classes.center,
                classes.right,
                classes.right,
              ]}
              customHeadClassesForCells={[0, 4, 5]}
            />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
