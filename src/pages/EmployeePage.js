import React from "react";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import { getUserFromSession } from "../helpers/helper.js";

export const EmployeePage = () => {
  let currentUser = getUserFromSession();
  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={6}>
        <p>Hello from Employee</p>
      </GridItem>
    </GridContainer>
  );
};
