import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import { UPDATE_SERVICE_INFO } from "../queries/Query.js";
import { useMutation } from "@apollo/react-hooks";
import Loading from "./components/Loading.js";

import { getUserFromSession, setUserToSession } from "../helpers/helper.js";

const useStyles = makeStyles((theme) => ({
  cardContent: {
    padding: theme.spacing(5),
  },
}));

export const EditServiceInfoPage = () => {
  const classes = useStyles();

  const [serviceNameOne, setServiceNameOne] = React.useState("");
  const [serviceTimeOne, setServiceTimeOne] = React.useState("");

  const [serviceNameTwo, setServiceNameTwo] = React.useState("");
  const [serviceTimeTwo, setServiceTimeTwo] = React.useState("");

  const [serviceNameThree, setServiceNameThree] = React.useState("");
  const [serviceTimeThree, setServiceTimeThree] = React.useState("");

  const [serviceNameFour, setServiceNameFour] = React.useState("");
  const [serviceTimeFour, setServiceTimeFour] = React.useState("");

  const [serviceNameFive, setServiceNameFive] = React.useState("");
  const [serviceTimeFive, setServiceTimeFive] = React.useState("");

  const [serviceNameSix, setServiceNameSix] = React.useState("");
  const [serviceTimeSix, setServiceTimeSix] = React.useState("");

  const [serviceNameSeven, setServiceNameSeven] = React.useState("");
  const [serviceTimeSeven, setServiceTimeSeven] = React.useState("");

  const [serviceNameEight, setServiceNameEight] = React.useState("");
  const [serviceTimeEight, setServiceTimeEight] = React.useState("");

  const [serviceNameNine, setServiceNameNine] = React.useState("");
  const [serviceTimeNine, setServiceTimeNine] = React.useState("");

  const [serviceNameTen, setServiceNameTen] = React.useState("");
  const [serviceTimeTen, setServiceTimeTen] = React.useState("");

  const [updateServiceInfo, { loading }] = useMutation(UPDATE_SERVICE_INFO, {
    onCompleted(data) {
      console.log("Printing update service info result: ", data);
    },
    onError(error) {
      console.log("Printing update service info error: ", error);
    },
  });

  let currentUser = getUserFromSession();

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
                  prop={serviceNameOne}
                  setNameProp={setServiceNameOne}
                  setTimeProp={setServiceTimeOne}
                />
                <ScheduleField
                  prop={serviceNameTwo}
                  setNameProp={setServiceNameTwo}
                  setTimeProp={setServiceTimeTwo}
                />
                <ScheduleField
                  prop={serviceNameThree}
                  setNameProp={setServiceNameThree}
                  setTimeProp={setServiceTimeThree}
                />
                <ScheduleField
                  prop={serviceNameFour}
                  setNameProp={setServiceNameFour}
                  setTimeProp={setServiceTimeFour}
                />
                <ScheduleField
                  prop={serviceNameFive}
                  setNameProp={setServiceNameFive}
                  setTimeProp={setServiceTimeFive}
                />
                <ScheduleField
                  prop={serviceNameSix}
                  setNameProp={setServiceNameSix}
                  setTimeProp={setServiceTimeSix}
                />
                <ScheduleField
                  prop={serviceNameSeven}
                  setNameProp={setServiceNameSeven}
                  setTimeProp={setServiceTimeSeven}
                />
                <ScheduleField
                  prop={serviceNameEight}
                  setNameProp={setServiceNameEight}
                  setTimeProp={setServiceTimeEight}
                />
                <ScheduleField
                  prop={serviceNameNine}
                  setNameProp={setServiceNameNine}
                  setTimeProp={setServiceTimeNine}
                />
                <ScheduleField
                  prop={serviceNameTen}
                  setNameProp={setServiceNameTen}
                  setTimeProp={setServiceTimeTen}
                />
              </form>
            </CardContent>
            <CardActions>
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
                수정완료
              </Button>
            </CardActions>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
};

const ScheduleField = ({ prop, setNameProp, setTimeProp }) => {
  return (
    <GridContainer>
      <GridItem xs={6} sm={4} md={4}>
        <CustomInput
          labelText="예배 이름"
          helperText="예) 주일 오전 예배"
          inputProps={{
            onChange: (e) => {
              setNameProp(e.target.value);
            },
          }}
        />
      </GridItem>
      <GridItem xs={6} sm={4} md={4}>
        <CustomInput
          labelText="예배 시간"
          helperText="예) 오전 11:00"
          inputProps={{
            disabled: prop === null || prop === "",
            onChange: (e) => {
              setTimeProp(e.target.value);
            },
          }}
        />
      </GridItem>
      <GridItem xs={6} sm={4} md={4}></GridItem>
    </GridContainer>
  );
};
