import React from "react";
import InputMask from "react-input-mask";
import CustomInput from "components/CustomInput/CustomInput.js";

export function PhonenumberInput(props) {
  const { phonenumberState, defaultValue, onChange, value } = props;
  return (
    <InputMask mask="(999) 999 - 9999" maskChar=" " value={value}>
      {() => (
        <CustomInput
          error={phonenumberState === "error"}
          success={phonenumberState === "success"}
          labelText="교회 전화번호"
          helperText="ex) 2134445555"
          formControlProps={{
            style: {
              width: "50ch",
            },
          }}
          inputProps={{
            onChange: onChange,
            defaultValue: defaultValue,
          }}
        />
      )}
    </InputMask>
  );
}
