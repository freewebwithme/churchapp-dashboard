import React from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Button from "components/CustomButtons/Button.js";
import { UPDATE_SERVICE_INFO } from "../queries/Query.js";
import { useMutation } from "@apollo/react-hooks";
import Loading from "./components/Loading.js";
import { ScheduleField } from "./components/ScheduleField.js";

import {
  getUserFromSession,
  setUserToSession,
  sortArray,
} from "../helpers/helper.js";

const useStyles = makeStyles((theme) => ({
  cardContent: {
    padding: theme.spacing(5),
  },
}));

// This function sets the initial state of each schedules from
// saved database.
// if there is no saved schedules, return empty string.
// This function is necessary because When an user wants to
// change certain schedules, not all, other fields won't call
// onChange function so When submit the form, it will return
// empty strings to the database which will be deleted.
// This is not a intention of users.

const loadInitialState = (church, index, propName) => {
  let sortedSchedules = sortArray(church.schedules);
  let initialValue = sortedSchedules[index];
  if (initialValue === undefined) {
    return "";
  } else {
    return initialValue[propName];
  }
};

export const EditServiceInfoPage = () => {
  const classes = useStyles();
  const history = useHistory();
  let currentUser = getUserFromSession();
  let church = currentUser.church;

  const [serviceNameOne, setServiceNameOne] = React.useState(
    loadInitialState(church, 0, "serviceName")
  );
  const [serviceTimeOne, setServiceTimeOne] = React.useState(
    loadInitialState(church, 0, "serviceTime")
  );

  const [serviceNameTwo, setServiceNameTwo] = React.useState(
    loadInitialState(church, 1, "serviceName")
  );
  const [serviceTimeTwo, setServiceTimeTwo] = React.useState(
    loadInitialState(church, 1, "serviceTime")
  );

  const [serviceNameThree, setServiceNameThree] = React.useState(
    loadInitialState(church, 2, "serviceName")
  );
  const [serviceTimeThree, setServiceTimeThree] = React.useState(
    loadInitialState(church, 2, "serviceTime")
  );

  const [serviceNameFour, setServiceNameFour] = React.useState(
    loadInitialState(church, 3, "serviceName")
  );
  const [serviceTimeFour, setServiceTimeFour] = React.useState(
    loadInitialState(church, 3, "serviceTime")
  );

  const [serviceNameFive, setServiceNameFive] = React.useState(
    loadInitialState(church, 4, "serviceName")
  );
  const [serviceTimeFive, setServiceTimeFive] = React.useState(
    loadInitialState(church, 4, "serviceTime")
  );

  const [serviceNameSix, setServiceNameSix] = React.useState(
    loadInitialState(church, 5, "serviceName")
  );
  const [serviceTimeSix, setServiceTimeSix] = React.useState(
    loadInitialState(church, 5, "serviceTime")
  );

  const [serviceNameSeven, setServiceNameSeven] = React.useState(
    loadInitialState(church, 6, "serviceName")
  );
  const [serviceTimeSeven, setServiceTimeSeven] = React.useState(
    loadInitialState(church, 6, "serviceTime")
  );

  const [serviceNameEight, setServiceNameEight] = React.useState(
    loadInitialState(church, 7, "serviceName")
  );
  const [serviceTimeEight, setServiceTimeEight] = React.useState(
    loadInitialState(church, 7, "serviceTime")
  );

  const [serviceNameNine, setServiceNameNine] = React.useState(
    loadInitialState(church, 8, "serviceName")
  );
  const [serviceTimeNine, setServiceTimeNine] = React.useState(
    loadInitialState(church, 8, "serviceTime")
  );

  const [serviceNameTen, setServiceNameTen] = React.useState(
    loadInitialState(church, 9, "serviceName")
  );
  const [serviceTimeTen, setServiceTimeTen] = React.useState(
    loadInitialState(church, 9, "serviceTime")
  );

  const [updateServiceInfo, { loading }] = useMutation(UPDATE_SERVICE_INFO, {
    onCompleted(data) {
      console.log("Printing update service info result: ", data);
      history.push("/dashboard");
    },
    onError(error) {
      console.log("Printing update service info error: ", error);
    },
  });

  const propMapToObj = () => {
    // Add all properties into map and remove empty value
    let serviceScheduleMap = new Map();
    serviceScheduleMap.set(serviceNameOne, [serviceTimeOne, 1]);
    serviceScheduleMap.set(serviceNameTwo, [serviceTimeTwo, 2]);
    serviceScheduleMap.set(serviceNameThree, [serviceTimeThree, 3]);
    serviceScheduleMap.set(serviceNameFour, [serviceTimeFour, 4]);
    serviceScheduleMap.set(serviceNameFive, [serviceTimeFive, 5]);
    serviceScheduleMap.set(serviceNameSix, [serviceTimeSix, 6]);
    serviceScheduleMap.set(serviceNameSeven, [serviceTimeSeven, 7]);
    serviceScheduleMap.set(serviceNameEight, [serviceTimeEight, 8]);
    serviceScheduleMap.set(serviceNameNine, [serviceTimeNine, 9]);
    serviceScheduleMap.set(serviceNameTen, [serviceTimeTen, 10]);

    console.log("printing map: ", serviceScheduleMap);
    for (let [key, value] of serviceScheduleMap) {
      if (key === "" || key === null) {
        serviceScheduleMap.delete(key);
      }
    }

    let obj = Object.create(null);
    for (let [key, value] of serviceScheduleMap) {
      obj[key] = value;
    }
    return obj;
  };

  console.log("Printing service name one", serviceNameOne);
  if (loading) return <Loading />;
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12} lg={6}>
          <Card>
            <CardContent className={classes.cardContent}>
              <h3>예배 시간 등록 또는 수정하기</h3>
              <br />
              <form action="">
                <ScheduleField
                  serviceName={serviceNameOne}
                  serviceTime={serviceTimeOne}
                  setNameProp={setServiceNameOne}
                  setTimeProp={setServiceTimeOne}
                />
                <ScheduleField
                  serviceName={serviceNameTwo}
                  serviceTime={serviceTimeTwo}
                  setNameProp={setServiceNameTwo}
                  setTimeProp={setServiceTimeTwo}
                />
                <ScheduleField
                  serviceName={serviceNameThree}
                  serviceTime={serviceTimeThree}
                  setNameProp={setServiceNameThree}
                  setTimeProp={setServiceTimeThree}
                />
                <ScheduleField
                  serviceName={serviceNameFour}
                  serviceTime={serviceTimeFour}
                  setNameProp={setServiceNameFour}
                  setTimeProp={setServiceTimeFour}
                />
                <ScheduleField
                  serviceName={serviceNameFive}
                  serviceTime={serviceTimeFive}
                  setNameProp={setServiceNameFive}
                  setTimeProp={setServiceTimeFive}
                />
                <ScheduleField
                  serviceName={serviceNameSix}
                  serviceTime={serviceTimeSix}
                  setNameProp={setServiceNameSix}
                  setTimeProp={setServiceTimeSix}
                />
                <ScheduleField
                  serviceName={serviceNameSeven}
                  serviceTime={serviceTimeSeven}
                  setNameProp={setServiceNameSeven}
                  setTimeProp={setServiceTimeSeven}
                />
                <ScheduleField
                  serviceName={serviceNameEight}
                  serviceTime={serviceTimeEight}
                  setNameProp={setServiceNameEight}
                  setTimeProp={setServiceTimeEight}
                />
                <ScheduleField
                  serviceName={serviceNameNine}
                  serviceTime={serviceTimeNine}
                  setNameProp={setServiceNameNine}
                  setTimeProp={setServiceTimeNine}
                />
                <ScheduleField
                  serviceName={serviceNameTen}
                  serviceTime={serviceTimeTen}
                  setNameProp={setServiceNameTen}
                  setTimeProp={setServiceTimeTen}
                />
              </form>
            </CardContent>
            <CardActions>
              <Button color="danger" onClick={() => history.goBack()}>
                취소
              </Button>
              <Button
                color="rose"
                onClick={() => {
                  let resultObj = propMapToObj();
                  let finalResult = JSON.stringify(resultObj);
                  console.log("Printing final map", finalResult);
                  updateServiceInfo({
                    variables: {
                      churchId: currentUser.church.id,
                      schedules: finalResult,
                    },
                  });
                }}
              >
                완료
              </Button>
            </CardActions>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
};
