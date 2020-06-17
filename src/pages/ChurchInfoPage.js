import React from "react";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

import NavPills from "components/NavPills/NavPills.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "@material-ui/core/Card";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Fab from "@material-ui/core/Fab";
import EditIcon from "@material-ui/icons/Edit";
import { useHistory } from "react-router-dom";

import { useMutation, useQuery } from "@apollo/react-hooks";

import {
  getUserFromSession,
  setUserToSession,
  sortArray,
} from "../helpers/helper.js";
import { CREATE_CHURCH, ME } from "../queries/Query.js";
import { ChurchInfoForm } from "./components/ChurchInfoForm.js";
import Loading from "./components/Loading.js";
import { cardTitle } from "assets/jss/material-dashboard-pro-react.js";

import gql from "graphql-tag";

const useStyles = makeStyles((theme) => ({
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "50ch",
  },
  multitextField: {
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
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  headerText: {
    fontWeight: "bold",
  },
  cardTitle,
}));

export function ChurchInfoPage() {
  let currentUser = getUserFromSession();
  const classes = useStyles();
  const history = useHistory();
  const [user, setUser] = React.useState(currentUser);
  const [church, setChurch] = React.useState(currentUser.church);

  console.log("Printing current user: ", currentUser);
  const {
    loading: loadingMe,
    error: errorMe,
    data: dataMe,
    refetch: refetchMe,
    client,
    networkStatus,
  } = useQuery(ME, {
    notifyOnNetworkStatusChange: true,
    fetchPolicy: "cache-and-network",
    onCompleted(data) {
      setUserToSession(data.me);
      currentUser = getUserFromSession();
      // set user for updating UI
      setUser(currentUser);
      setChurch(data.me.church);
      console.log("Printing church info: ", data.me.church);
    },
  });

  const [createChurch, { loading }] = useMutation(CREATE_CHURCH, {
    onCompleted(data) {
      console.log("Printing from onCompleted: ", data);
      refetchMe();
      history.push("/dashboard");
    },
    onError(error) {
      console.log("Printing from onError: ", error);
    },
  });

  if (networkStatus === 4) {
    return (
      <GridContainer>
        <GridItem xs={12}>
          <Loading />
        </GridItem>
        <GridItem xs={12}>
          <p>새로운 정보를 불러오는 중입니다...</p>;
        </GridItem>
      </GridContainer>
    );
  }
  if (loading || loadingMe) return <Loading />;

  return (
    <GridContainer>
      {user.church ? (
        <GridItem xs={12} sm={8} md={8} lg={6}>
          <Card>
            <CardHeader>
              <h4 className={classes.cardTitle}>
                교회 정보 <small> - 앱에 표시되는 기본 정보입니다</small>
              </h4>
            </CardHeader>
            <CardBody>
              <NavPills
                color="primary"
                tabs={[
                  {
                    tabButton: "기본정보",
                    tabContent: (
                      <span>
                        <h5 className={classes.headerText}>교회 이름</h5>
                        <h6>{church.name}</h6>
                        <br />
                        <h5 className={classes.headerText}>
                          Youtube 채널 아이디
                        </h5>
                        <h6>{church.channelId}</h6>
                        <br />
                        <h5 className={classes.headerText}>교회 소개</h5>
                        <p>{church.intro}</p>
                        <br />
                        <br />
                        <Fab
                          onClick={() => history.push("/dashboard/edit-church")}
                          variant="extended"
                          color="primary"
                          aria-label="edit"
                        >
                          <EditIcon className={classes.extendedIcon} />
                          수정하기
                        </Fab>
                        <br />
                      </span>
                    ),
                  },
                  {
                    tabButton: "교회 주소",
                    tabContent: (
                      <span>
                        <h5 className={classes.headerText}>교회 주소</h5>
                        {church.addressLineOne && church.addressLineTwo ? (
                          <span>
                            <h6>{church.addressLineOne}</h6>
                            <h6>{church.addressLineTwo}</h6>
                          </span>
                        ) : (
                          <h6>등록된 주소가 없습니다.</h6>
                        )}
                        <br />
                        <br />
                        <Fab
                          onClick={() => history.push("/dashboard/edit-church")}
                          variant="extended"
                          color="primary"
                          aria-label="edit"
                        >
                          <EditIcon className={classes.extendedIcon} />
                          수정하기
                        </Fab>
                      </span>
                    ),
                  },
                  {
                    tabButton: "연락처",
                    tabContent: (
                      <span>
                        <h5 className={classes.headerText}>이메일</h5>
                        {church.email ? (
                          <h6>{church.email}</h6>
                        ) : (
                          <h6>등록된 이메일이 없습니다.</h6>
                        )}
                        <br />
                        <h5 className={classes.headerText}>전화번호</h5>
                        {church.phoneNumber ? (
                          <p>
                            <span>({church.phoneNumber.slice(0, 3)})</span>
                            <span> {church.phoneNumber.slice(3, 6)}</span>
                            <span> - </span>
                            <span>{church.phoneNumber.slice(6, 10)}</span>
                          </p>
                        ) : (
                          <h6>등록된 전화번호가 없습니다.</h6>
                        )}
                        <br />
                        <br />
                        <Fab
                          onClick={() => history.push("/dashboard/edit-church")}
                          variant="extended"
                          color="primary"
                          aria-label="edit"
                        >
                          <EditIcon className={classes.extendedIcon} />
                          수정하기
                        </Fab>
                      </span>
                    ),
                  },
                  {
                    tabButton: "예배시간",
                    tabContent: (
                      <span>
                        <h5 className={classes.headerText}>예배 시간 안내</h5>
                        <br />
                        {church.schedules.length === 0 ? (
                          <span>
                            <h6>
                              등록된 내용이 없습니다. 예배 시간을 등록 하세요.
                            </h6>
                            <br />
                            <br />
                            <Fab
                              onClick={() =>
                                history.push("/dashboard/edit-service-info")
                              }
                              variant="extended"
                              color="primary"
                              aria-label="edit"
                            >
                              <EditIcon className={classes.extendedIcon} />
                              등록하기
                            </Fab>
                          </span>
                        ) : (
                          <span>
                            {church.schedules.map((info) => (
                              <li key={info.order.toString()}>
                                {info.serviceName} - {info.serviceTime}
                              </li>
                            ))}

                            <br />
                            <Fab
                              onClick={() =>
                                history.push("/dashboard/edit-service-info")
                              }
                              variant="extended"
                              color="primary"
                              aria-label="edit"
                            >
                              <EditIcon className={classes.extendedIcon} />
                              수정하기
                            </Fab>
                          </span>
                        )}
                      </span>
                    ),
                  },
                ]}
              />
            </CardBody>
          </Card>
        </GridItem>
      ) : (
        <GridItem xs={12}>
          <ChurchInfoForm
            title="교회 정보가 없습니다. 교회 정보를 등록하세요"
            create={createChurch}
            church={church}
          />
        </GridItem>
      )}
    </GridContainer>
  );
}
