import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CustomInput from "components/CustomInput/CustomInput.js";

import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import {
  getUserFromSession,
  validateLength,
  initPropValue,
} from "../../helpers/helper.js";
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
export const ChurchInfoForm = (props) => {
  const history = useHistory();
  const classes = useStyles();
  const { title, create, update, church } = props;

  const [churchName, setChurchName] = React.useState(
    initPropValue(church, "name")
  );
  const [channelId, setChannelId] = React.useState(
    initPropValue(church, "channelId")
  );
  const [churchIntro, setChurchIntro] = React.useState(
    initPropValue(church, "intro")
  );

  const [churchAddressLineOne, setChurchAddressLineOne] = React.useState(
    initPropValue(church, "addressLineOne")
  );
  const [churchAddressLineTwo, setChurchAddressLineTwo] = React.useState(
    initPropValue(church, "addressLineTwo")
  );

  const [churchEmail, setChurchEmail] = React.useState(
    initPropValue(church, "email")
  );

  const [churchWebsite, setChurchWebsite] = React.useState(
    initPropValue(church, "website")
  );

  const [churchPhonenumber, setChurchPhonenumber] = React.useState(
    initPropValue(church, "phoneNumber")
  );

  const [
    churchNameValidationState,
    setChurchNameValidationState,
  ] = React.useState("");

  const [
    churchIntroValidationState,
    setChurchIntroValidationState,
  ] = React.useState("");

  const [
    channelIdValidationState,
    setChannelIdValidationState,
  ] = React.useState("");

  const [
    churchAddressLineOneState,
    setChurchAddressLineOneState,
  ] = React.useState("");
  const [
    churchAddressLineTwoState,
    setChurchAddressLineTwoState,
  ] = React.useState("");

  const [churchEmailState, setChurchEmailState] = React.useState("");

  const [churchPhonenumberState, setChurchPhonenumberState] = React.useState(
    ""
  );

  const validateForm = () => {
    if (
      churchNameValidationState === "error" ||
      churchNameValidationState === "" ||
      channelIdValidationState === "error" ||
      channelIdValidationState === "" ||
      churchIntroValidationState === "error" ||
      churchIntroValidationState === "" ||
      churchAddressLineOneState === "error" ||
      churchAddressLineOneState === "" ||
      churchAddressLineTwoState === "error" ||
      churchAddressLineTwoState === "" ||
      churchEmailState === "error" ||
      churchEmailState === "" ||
      churchPhonenumberState === "error" ||
      churchPhonenumberState === ""
    ) {
      if (
        churchName === "" ||
        churchIntro === "" ||
        channelId === "" ||
        churchAddressLineOne === "" ||
        churchAddressLineTwo === "" ||
        churchEmail === "" ||
        churchPhonenumber === ""
      ) {
        return false;
      } else {
        return true;
      }
    } else {
      return true;
    }
  };

  const currentUser = getUserFromSession();

  const handleSubmit = () => {
    if (validateForm()) {
      if (create !== undefined) {
        create({
          variables: {
            name: churchName,
            channelId: channelId,
            intro: churchIntro,
            addressLineOne: churchAddressLineOne,
            addressLineTwo: churchAddressLineTwo,
            email: churchEmail,
            website: churchWebsite,
            phoneNumber: churchPhonenumber,
            userId: currentUser.id,
          },
        });
      }
      if (update !== undefined) {
        update({
          variables: {
            churchId: church.id,
            name: churchName,
            channelId: channelId,
            intro: churchIntro,
            addressLineOne: churchAddressLineOne,
            addressLineTwo: churchAddressLineTwo,
            email: churchEmail,
            website: churchWebsite,
            phoneNumber: churchPhonenumber,
          },
        });
      }
    } else {
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
                        width: "50ch",
                      },
                    }}
                    inputProps={{
                      onChange: (e) => {
                        if (validateLength(churchName, 4, 16)) {
                          setChurchNameValidationState("success");
                        } else {
                          setChurchNameValidationState("error");
                        }
                        setChurchName(e.target.value);
                      },
                      defaultValue: church ? church.name : "",
                    }}
                    labelProps={{
                      style: { fontSize: 16, paddingBottom: 20 },
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
                        width: "50ch",
                      },
                    }}
                    inputProps={{
                      onChange: (e) => {
                        if (validateLength(channelId, 10, 30)) {
                          setChannelIdValidationState("success");
                        } else {
                          setChannelIdValidationState("error");
                        }
                        setChannelId(e.target.value);
                      },
                      defaultValue: church ? church.channelId : "",
                    }}
                    labelProps={{
                      style: { fontSize: 16, paddingBottom: 20 },
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
                        width: "50ch",
                      },
                    }}
                    inputProps={{
                      onChange: (e) => {
                        if (validateLength(churchIntro, 9, 249)) {
                          setChurchIntroValidationState("success");
                        } else {
                          setChurchIntroValidationState("error");
                        }
                        setChurchIntro(e.target.value);
                      },
                      multiline: true,
                      defaultValue: church ? church.intro : "",
                    }}
                    labelProps={{
                      style: { fontSize: 16, paddingBottom: 20 },
                    }}
                    helperText="교회 소개란에 표시될 내용을 적어주세요.(10자 이상, 250자 미만)"
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={12}>
                  <CustomInput
                    error={churchAddressLineOneState === "error"}
                    success={churchAddressLineOneState === "success"}
                    labelText="교회 주소 첫번째 라인"
                    className={classes.textField}
                    helperText="ex) 777 Vermon Ave"
                    formControlProps={{
                      style: {
                        width: "50ch",
                      },
                    }}
                    inputProps={{
                      onChange: (e) => {
                        if (validateLength(churchAddressLineOne, 3, 50)) {
                          setChurchAddressLineOneState("success");
                        } else {
                          setChurchAddressLineOneState("error");
                        }
                        setChurchAddressLineOne(e.target.value);
                      },
                      defaultValue: church ? church.addressLineOne : "",
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={12}>
                  <CustomInput
                    error={churchAddressLineTwoState === "error"}
                    success={churchAddressLineTwoState === "success"}
                    labelText="교회 주소 두번째 라인"
                    className={classes.textField}
                    helperText="ex) Los Angeles, CA 90020"
                    formControlProps={{
                      style: {
                        width: "50ch",
                      },
                    }}
                    inputProps={{
                      onChange: (e) => {
                        if (validateLength(churchAddressLineTwo, 3, 50)) {
                          setChurchAddressLineTwoState("success");
                        } else {
                          setChurchAddressLineTwoState("error");
                        }
                        setChurchAddressLineTwo(e.target.value);
                      },
                      defaultValue: church ? church.addressLineTwo : "",
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={12}>
                  <CustomInput
                    error={churchEmailState === "error"}
                    success={churchEmailState === "success"}
                    labelText="교회 이메일"
                    helperText="ex) church@email.com"
                    className={classes.textField}
                    formControlProps={{
                      style: {
                        width: "50ch",
                      },
                    }}
                    inputProps={{
                      onChange: (e) => {
                        if (validateLength(churchEmail, 5, 20)) {
                          setChurchEmailState("success");
                        } else {
                          setChurchEmailState("error");
                        }
                        setChurchEmail(e.target.value);
                      },
                      defaultValue: church ? church.email : "",
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={12}>
                  <CustomInput
                    labelText="교회 Website"
                    helperText="ex) www.mychurch.com"
                    className={classes.textField}
                    formControlProps={{
                      style: {
                        width: "50ch",
                      },
                    }}
                    inputProps={{
                      onChange: (e) => {
                        setChurchWebsite(e.target.value);
                      },
                      defaultValue: church ? church.website : "",
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={12}>
                  <CustomInput
                    error={churchPhonenumberState === "error"}
                    success={churchPhonenumberState === "success"}
                    labelText="교회 전화번호"
                    helperText="ex) 2134445555"
                    className={classes.textField}
                    formControlProps={{
                      style: {
                        width: "50ch",
                      },
                    }}
                    inputProps={{
                      onChange: (e) => {
                        if (validateLength(churchPhonenumber, 5, 15)) {
                          setChurchPhonenumberState("success");
                        } else {
                          setChurchPhonenumberState("error");
                        }
                        setChurchPhonenumber(e.target.value);
                      },
                      defaultValue: church ? church.phoneNumber : "",
                    }}
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
            </form>
          </CardContent>
        </Card>
      </GridItem>
    </GridContainer>
  );
};
