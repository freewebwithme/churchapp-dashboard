import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CustomInput from "components/CustomInput/CustomInput.js";

import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { getUserFromSession } from "../../helpers/helper.js";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  textField: {
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
}));

export const KeyInfoForm = ({ user, updateKeyInfo }) => {
  const church = user.church;

  const returnDefaultValue = (church, value) => {
    if (church === null || church === undefined) {
      return "";
    } else if (church[value] === null) {
      return "";
    } else {
      return church[value];
    }
  };

  const history = useHistory();
  const classes = useStyles();

  const [googleApiKey, setGoogleApiKey] = React.useState(
    returnDefaultValue(church, "googleApiKey")
  );
  const [stripeSecretKey, setStripeSecretKey] = React.useState(
    returnDefaultValue(church, "stripeSecretKey")
  );
  const [stripePublishableKey, setStripePublishableKey] = React.useState(
    returnDefaultValue(church, "stripePublishableKey")
  );
  const [onesignalAppId, setOnesignalAppId] = React.useState(
    returnDefaultValue(church, "onesignalAppId")
  );
  const [onesignalApiKey, setOnesignalApiKey] = React.useState(
    returnDefaultValue(church, "onesignalApiKey")
  );

  const [googleApiKeyState, setGoogleApiKeyState] = React.useState("");
  const [stripeSecretKeyState, setStripeSecretKeyState] = React.useState("");
  const [
    stripePublishableKeyState,
    setStripePublishableKeyState,
  ] = React.useState("");
  const [onesignalAppIdState, setOnesignalAppIdState] = React.useState("");
  const [onesignalApiKeyState, setOnesignalApiKeyState] = React.useState("");

  const validateForm = () => {
    if (
      googleApiKeyState === "error" ||
      googleApiKeyState === "" ||
      stripeSecretKeyState === "error" ||
      stripeSecretKeyState === "" ||
      stripePublishableKeyState === "error" ||
      stripePublishableKeyState === "" ||
      onesignalAppIdState === "error" ||
      onesignalAppIdState === "" ||
      onesignalApiKeyState === "error" ||
      onesignalApiKeyState === ""
    ) {
      if (
        googleApiKey === "" ||
        stripeSecretKey === "" ||
        stripePublishableKey === "" ||
        onesignalAppId === "" ||
        onesignalApiKey === ""
      ) {
        return false;
      } else {
        return true;
      }
    } else {
      return true;
    }
  };

  const handleSubmit = () => {
    if (validateForm()) {
      if (updateKeyInfo !== null || updateKeyInfo !== undefined) {
        updateKeyInfo({
          variables: {
            churchId: church.id,
            googleApiKey: googleApiKey,
            stripeSecretKey: stripeSecretKey,
            stripePublishableKey: stripePublishableKey,
            onesignalAppId: onesignalAppId,
            onesignalApiKey: onesignalApiKey,
          },
        });
      }
    }
  };
  return (
    <GridContainer justify="center" alignItems="center">
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardContent className={classes.cardContent}>
            <h3 className={classes.formTitle}>Key Info</h3>
            <GridContainer>
              <GridItem xs={12} sm={12} md={12}>
                <CustomInput
                  error={googleApiKeyState === "error"}
                  success={googleApiKeyState === "success"}
                  labelText="Google Api Key"
                  className={classes.textField}
                  formControlProps={{
                    style: {
                      width: "50ch",
                    },
                  }}
                  inputProps={{
                    onChange: (e) => {
                      if (e.target.value.length === 0) {
                        setGoogleApiKeyState("error");
                      } else {
                        setGoogleApiKeyState("success");
                      }
                      setGoogleApiKey(e.target.value);
                    },
                    defaultValue: church ? church.googleApiKey : "",
                  }}
                  labelProps={{
                    style: { fontSize: 16, paddingBottom: 20 },
                  }}
                  helperText="Google Api Key for Youtube Data Api"
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={12}>
                <CustomInput
                  error={stripeSecretKeyState === "error"}
                  success={stripeSecretKeyState === "success"}
                  labelText="Stripe Secret Key"
                  className={classes.textField}
                  formControlProps={{
                    style: {
                      width: "50ch",
                    },
                  }}
                  inputProps={{
                    onChange: (e) => {
                      if (e.target.value.length === 0) {
                        setStripeSecretKeyState("error");
                      } else {
                        setStripeSecretKeyState("success");
                      }
                      setStripeSecretKey(e.target.value);
                    },
                    defaultValue: church ? church.stripeSecretKey : "",
                  }}
                  labelProps={{
                    style: { fontSize: 16, paddingBottom: 20 },
                  }}
                  helperText="Stripe secret key to get paid"
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={12}>
                <CustomInput
                  error={stripePublishableKeyState === "error"}
                  success={stripePublishableKeyState === "success"}
                  labelText="Stripe public key"
                  className={classes.textField}
                  formControlProps={{
                    style: {
                      width: "50ch",
                    },
                  }}
                  inputProps={{
                    onChange: (e) => {
                      if (e.target.value.length === 0) {
                        setStripePublishableKeyState("error");
                      } else {
                        setStripePublishableKeyState("success");
                      }
                      setStripePublishableKey(e.target.value);
                    },
                    defaultValue: church ? church.stripePublishableKey : "",
                  }}
                  labelProps={{
                    style: { fontSize: 16, paddingBottom: 20 },
                  }}
                  helperText="Stripe public key"
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={12}>
                <CustomInput
                  error={onesignalAppIdState === "error"}
                  success={onesignalAppIdState === "success"}
                  labelText="One Signal App Id"
                  className={classes.textField}
                  formControlProps={{
                    style: {
                      width: "50ch",
                    },
                  }}
                  inputProps={{
                    onChange: (e) => {
                      if (e.target.value.length === 0) {
                        setOnesignalAppIdState("error");
                      } else {
                        setOnesignalAppIdState("success");
                      }
                      setOnesignalAppId(e.target.value);
                    },
                    defaultValue: church ? church.onesignalAppId : "",
                  }}
                  labelProps={{
                    style: { fontSize: 16, paddingBottom: 20 },
                  }}
                  helperText="One Signal App Id for push notification"
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={12}>
                <CustomInput
                  error={onesignalApiKeyState === "error"}
                  success={onesignalApiKeyState === "success"}
                  labelText="One Signal Api Key"
                  className={classes.textField}
                  formControlProps={{
                    style: {
                      width: "50ch",
                    },
                  }}
                  inputProps={{
                    onChange: (e) => {
                      if (e.target.value.length === 0) {
                        setOnesignalApiKeyState("error");
                      } else {
                        setOnesignalApiKeyState("success");
                      }
                      setOnesignalApiKey(e.target.value);
                    },
                    defaultValue: church ? church.onesignalApiKey : "",
                  }}
                  labelProps={{
                    style: { fontSize: 16, paddingBottom: 20 },
                  }}
                  helperText="One Signal Api Key for sending push notification from web"
                />
              </GridItem>
            </GridContainer>
            <Button color="danger" onClick={() => history.goBack()}>
              취소
            </Button>
            <Button
              color="rose"
              disabled={!validateForm()}
              onClick={() => handleSubmit()}
            >
              완료
            </Button>
          </CardContent>
        </Card>
      </GridItem>
    </GridContainer>
  );
};
