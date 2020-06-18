import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { useHistory, useParams } from "react-router-dom";
import { getUserFromSession, setUserToSession } from "../../helpers/helper.js";
import {
  UPDATE_SERVICE_INFO,
  CREATE_CHURCH,
  UPDATE_CHURCH,
} from "../../queries/Query.js";
import { GET_USER, UPDATE_KEY_INFO } from "../../queries/AdminQuery";
import { ChurchInfoForm } from "../components/ChurchInfoForm";
import { ServiceInfoForm } from "../components/ServiceInfoForm";
import { KeyInfoForm } from "../components/KeyInfoForm";
import Loading from "../components/Loading";

import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import NavPills from "components/NavPills/NavPills.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";

import { cardTitle } from "assets/jss/material-dashboard-pro-react.js";

const styles = {
  cardTitle,
  pageSubcategoriesTitle: {
    color: "#3C4858",
    textDecoration: "none",
    textAlign: "center",
  },
  cardCategory: {
    margin: "0",
    color: "#999999",
  },
};

const useStyles = makeStyles(styles);

export const EditChurchInfoPage = () => {
  const classes = useStyles();
  const history = useHistory();
  const [user, setUser] = React.useState(null);
  const [church, setChurch] = React.useState(null);

  let { id } = useParams();
  console.log("Printing id: ", id);

  const redirectUrl = "/dashboard/admin";
  const {
    loading: userLoading,
    error: userError,
    data: userData,
    refetch: refetchMe,
    networkStatus,
  } = useQuery(GET_USER, {
    notifyOnNetworkStatusChange: true,
    fetchPolicy: "cache-and-network",
    variables: {
      Id: id,
    },
    onCompleted(data) {
      setUser(data.getUser);
      setChurch(data.getUser.church);
    },
  });

  const [
    updateServiceInfo,
    { loading: updateServiceInfoLoading },
  ] = useMutation(UPDATE_SERVICE_INFO, {
    onCompleted(data) {
      console.log("Printing update service info result: ", data);
      refetchMe();
      history.push(redirectUrl);
    },
    onError(error) {
      console.log("Printing update service info error: ", error);
    },
  });

  const [createChurch, { loading: createLoading }] = useMutation(
    CREATE_CHURCH,
    {
      onCompleted(data) {
        console.log("Printing from onCompleted: ", data);
        refetchMe();
        history.push(redirectUrl);
      },
      onError(error) {
        console.log("Printing from onError: ", error);
      },
    }
  );

  // Update Church
  const [updateChurch, { loading: updateLoading }] = useMutation(
    UPDATE_CHURCH,
    {
      onCompleted(data) {
        console.log("Printing from onCompleted updateChurch: ", data);
        refetchMe();
        history.push(redirectUrl);
      },
      onError(error) {
        console.log("Printing from onError updateChurch: ", error);
      },
    }
  );

  // Update key info
  const [updateKeyInfo, { loading: updateKeyLoading }] = useMutation(
    UPDATE_KEY_INFO,
    {
      onCompleted(data) {
        console.log("Printing from onCompleted updateChurch: ", data);
        refetchMe();
        history.push(redirectUrl);
      },
      onError(error) {
        console.log("Printing from onError updateChurch: ", error);
      },
    }
  );

  if (networkStatus === 4) return <p>새로운 정보를 불러오는 중입니다...</p>;
  if (
    userLoading ||
    updateServiceInfoLoading ||
    createLoading ||
    updateLoading ||
    updateKeyLoading
  )
    return <Loading />;

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader>
            <h4 className={classes.cardTitle}>
              {userData.getUser.name} <small> - {userData.getUser.email}</small>
            </h4>
            <p className={classes.cardTitle}>
              고유 번호 :{" "}
              {userData.getUser.church ? userData.getUser.church.uuid : ""}
            </p>
          </CardHeader>
          <CardBody>
            <NavPills
              color="primary"
              tabs={[
                {
                  tabButton: "Church Info",
                  tabContent: userData.getUser.church ? (
                    <ChurchInfoForm
                      title="교회 정보 수정"
                      church={userData.getUser.church}
                      update={updateChurch}
                    />
                  ) : (
                    <ChurchInfoForm
                      title="교회 정보 등록"
                      create={createChurch}
                    />
                  ),
                },
                {
                  tabButton: "예배 시간",
                  tabContent: userData.getUser.church ? (
                    <ServiceInfoForm
                      user={userData.getUser}
                      updateServiceInfo={updateServiceInfo}
                    />
                  ) : (
                    <p>
                      교회 정보가 등록되어 있지 않습니다. 교회 정보부터 먼저
                      등록하세요.
                    </p>
                  ),
                },
                {
                  tabButton: "Keys Info",
                  tabContent: userData.getUser.church ? (
                    <KeyInfoForm
                      user={userData.getUser}
                      updateKeyInfo={updateKeyInfo}
                    />
                  ) : (
                    <p>
                      교회 정보가 등록되어 있지 않습니다. 교회 정보부터 먼저
                      등록하세요.
                    </p>
                  ),
                },
              ]}
            />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
};
