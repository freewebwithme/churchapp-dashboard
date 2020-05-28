import React from "react";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import CustomInput from "components/CustomInput/CustomInput.js";

export const ScheduleField = ({
  serviceName,
  serviceTime,
  setNameProp,
  setTimeProp,
}) => {
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
            defaultValue: serviceName,
          }}
        />
      </GridItem>
      <GridItem xs={6} sm={4} md={4}>
        <CustomInput
          labelText="예배 시간"
          helperText="예) 오전 11:00"
          inputProps={{
            disabled: serviceName === null || serviceName === "",
            onChange: (e) => {
              setTimeProp(e.target.value);
            },
            defaultValue: serviceTime,
          }}
        />
      </GridItem>
      <GridItem xs={6} sm={4} md={4}></GridItem>
    </GridContainer>
  );
};
