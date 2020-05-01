import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CustomInput from "components/CustomInput/CustomInput.js";

import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

import { getUserFromSession } from "../helpers/helper.js";

const useStyles = makeStyles(theme => ({
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "50ch"
  },
  formTitle: {
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(2),
    fontSize: 28
  },
  formSubtitle: {
    marginTop: theme.spacing(2)
  },
  cardContent: {
    padding: theme.spacing(5)
  }
}));
export const ChurchInfoForm = props => {
  const classes = useStyles();
  const { title, create, update } = props;

  const [churchName, setChurchName] = React.useState("");
  const [channelId, setChannelId] = React.useState("");
  const [churchIntro, setChurchIntro] = React.useState("");

  const [
    churchNameValidationState,
    setChurchNameValidationState
  ] = React.useState("");

  const [
    churchIntroValidationState,
    setChurchIntroValidationState
  ] = React.useState("");

  const [
    channelIdValidationState,
    setChannelIdValidationState
  ] = React.useState("");

  const validateLength = (prop, minLength, maxLength) => {
    if (prop.length < minLength || prop.length > maxLength) {
      return false;
    } else {
      return true;
    }
  };

  const validateForm = () => {
    if (
      churchNameValidationState === "error" ||
      churchNameValidationState === "" ||
      channelIdValidationState === "error" ||
      channelIdValidationState === "" ||
      churchIntroValidationState === "error" ||
      churchIntroValidationState === ""
    ) {
      return false;
    } else {
      return true;
    }
  };

  const currentUser = getUserFromSession();

  const handleSubmit = () => {
    console.log("Printing from handleSubmit: ");
    if (validateForm()) {
      create({
        variables: {
          name: churchName,
          channelId: channelId,
          intro: churchIntro,
          userId: currentUser.id
        }
      });
    } else {
      console.log("not validated form");
    }
  };
  return (
    <GridContainer justify="center" alignItems="center">
      <GridItem xs={8} sm={8} md={8}>
        <Card>
          <CardContent className={classes.cardContent}>
            <h3 className={classes.formTitle}>{title}</h3>
            <form>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <CustomInput
                    error={churchNameValidationState === "error"}
                    success={churchNameValidationState === "success"}
                    labelText="교회 이름이 무엇인가요?"
                    className={classes.textField}
                    formControlProps={{
                      style: {
                        width: "50ch"
                      }
                    }}
                    inputProps={{
                      onChange: e => {
                        if (validateLength(churchName, 4, 16)) {
                          setChurchNameValidationState("success");
                        } else {
                          setChurchNameValidationState("error");
                        }
                        setChurchName(e.target.value);
                      }
                    }}
                    labelProps={{
                      style: { fontSize: 16, paddingBottom: 20 }
                    }}
                    helperText="3자 이상 15자 이하로 적어주세요"
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={12}>
                  <CustomInput
                    error={channelIdValidationState === "error"}
                    success={channelIdValidationState === "success"}
                    labelText="교회 유투브 채널 아이디를 입력 하세요."
                    className={classes.textField}
                    formControlProps={{
                      style: {
                        width: "50ch"
                      }
                    }}
                    inputProps={{
                      onChange: e => {
                        if (validateLength(channelId, 10, 30)) {
                          setChannelIdValidationState("success");
                        } else {
                          setChannelIdValidationState("error");
                        }
                        setChannelId(e.target.value);
                      }
                    }}
                    labelProps={{
                      style: { fontSize: 16, paddingBottom: 20 }
                    }}
                    helperText="유투브에서 교회 채널에 들어가시면  https://www.youtube.com/channel/XXX 나옵니다.  channel/ 뒤에 나오는 XXX 부분이 채널 아이디 입니다."
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={12}>
                  <CustomInput
                    error={churchIntroValidationState === "error"}
                    success={churchIntroValidationState === "success"}
                    labelText="교회 소개를 써주세요"
                    className={classes.textField}
                    formControlProps={{
                      style: {
                        width: "50ch"
                      }
                    }}
                    inputProps={{
                      onChange: e => {
                        if (validateLength(churchIntro, 9, 249)) {
                          setChurchIntroValidationState("success");
                        } else {
                          setChurchIntroValidationState("error");
                        }
                        setChurchIntro(e.target.value);
                      },
                      multiline: true
                    }}
                    labelProps={{
                      style: { fontSize: 16, paddingBottom: 20 }
                    }}
                    helperText="교회 소개란에 표시될 내용을 적어주세요.(10자 이상, 250자 미만)"
                  />
                </GridItem>
              </GridContainer>

              <Button
                color="rose"
                disabled={!validateForm()}
                onClick={() => handleSubmit()}
              >
                Submit
              </Button>
            </form>
          </CardContent>
        </Card>
      </GridItem>
    </GridContainer>
  );
};
