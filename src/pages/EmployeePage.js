import React from "react";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardHeader from "components/Card/CardHeader.js";
import { makeStyles } from "@material-ui/core/styles";
import Button from "components/CustomButtons/Button.js";
import styles from "assets/jss/material-dashboard-pro-react/views/userProfileStyles.js";
import { getUserFromSession, setUserToSession } from "../helpers/helper.js";
import { EmployeeForm } from "./components/EmployeeForm.js";
import { ProfileUploadModal } from "./components/ProfileUploadModal.js";

import { useMutation, useQuery } from "@apollo/react-hooks";
import { ME, CREATE_EMPLOYEE, UPDATE_EMPLOYEE } from "../queries/Query.js";

import Loading from "./components/Loading";

const useStyles = makeStyles(styles);
const defaultProfileImage =
  "https://churchapp-la.s3-us-west-1.amazonaws.com/default-avatar.jpg";

export const EmployeePage = () => {
  let currentUser = getUserFromSession();
  const classes = useStyles();
  const [user, setUser] = React.useState(currentUser);
  const [church, setChurch] = React.useState(currentUser.church);
  // Need this state for updating information in modal.
  const [currentEmployee, setCurrentEmployee] = React.useState(null);

  // Modal state for Employee form
  const [modal, setModal] = React.useState(false);

  // Modal state for Profile image upload form
  const [avatarModal, setAvatarModal] = React.useState(false);

  const {
    loading: meLoading,
    error: meError,
    data: meData,
    refetch: refetchMe,
    networkStatus,
  } = useQuery(ME, {
    notifyOnNetworkStatusChange: true,
    fetchPolicy: "cache-and-network",
    onCompleted(data) {
      setUserToSession(data.me);
      currentUser = getUserFromSession();

      setUser(currentUser);
      setChurch(currentUser.church);
    },
  });
  const [createEmployee, { loading: createLoading }] = useMutation(
    CREATE_EMPLOYEE,
    {
      onCompleted(data) {
        console.log("Printing create employee completed", data);
        refetchMe();
      },
      onError(error) {
        console.log("Printing create employee error", error);
      },
    }
  );
  const [updateEmployee, { loading: updateLoading }] = useMutation(
    UPDATE_EMPLOYEE,
    {
      onCompleted(data) {
        console.log("Printing update employee completed", data);
      },
      onError(error) {
        console.log("Printing update employee error", error);
      },
    }
  );

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
  if (createLoading || updateLoading) {
    return <Loading />;
  }

  const _employeePage = () => {
    if (
      currentUser.church.employees.length === 0 ||
      currentUser.church.employees === null
    ) {
      return (
        <>
          <GridContainer>
            <GridItem xs={12}>
              <Card>
                <CardHeader>
                  <h5>섬기는 분들</h5>
                </CardHeader>
                <CardBody>
                  <p>등록된 교역자분들이 없습니다.</p>
                  <Button
                    color="primary"
                    onClick={(e) => {
                      e.preventDefault();
                      setModal(true);
                    }}
                  >
                    등록하기
                  </Button>
                </CardBody>
              </Card>
            </GridItem>
          </GridContainer>
          <EmployeeForm
            title="교역자 등록하기"
            modal={modal}
            setModal={setModal}
            create={createEmployee}
            update={null}
          />
        </>
      );
    } else {
      return (
        <>
          <GridContainer>
            {currentUser.church.employees.map((employee) => {
              return (
                <GridItem key={employee.id} xs={4} sm={4} md={4} lg={3}>
                  <Card profile>
                    <CardAvatar profile>
                      <img src={employee.profile_image} alt="..." />
                    </CardAvatar>
                    <CardBody profile>
                      {employee.profile_image === defaultProfileImage ? (
                        <Button
                          simple
                          color="primary"
                          onClick={(e) => {
                            e.preventDefault();
                            setCurrentEmployee(employee);
                            setAvatarModal(true);
                          }}
                        >
                          사진 등록하기
                        </Button>
                      ) : (
                        <Button simple color="primary">
                          사진 교체하기
                        </Button>
                      )}
                      <h6 className={classes.cardCategory}>
                        {employee.position}
                      </h6>
                      <h4 className={classes.cardTitle}>{employee.name}</h4>
                      <br />
                      <p>배열순서: {employee.order}</p>
                      <Button
                        color="primary"
                        onClick={(e) => {
                          e.preventDefault();
                          setModal(true);
                        }}
                      >
                        수정하기
                      </Button>
                    </CardBody>
                  </Card>
                </GridItem>
              );
            })}
          </GridContainer>
          <EmployeeForm
            title="교역자 수정하기"
            modal={modal}
            setModal={setModal}
            update={updateEmployee}
            create={null}
          />
          <ProfileUploadModal
            title="교역자 프로필 사진"
            modal={avatarModal}
            setModal={setAvatarModal}
            employee={currentEmployee}
          />
        </>
      );
    }
  };
  return _employeePage();
};
