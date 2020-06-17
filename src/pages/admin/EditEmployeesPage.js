import React from "react";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardHeader from "components/Card/CardHeader.js";
import { makeStyles } from "@material-ui/core/styles";
import Button from "components/CustomButtons/Button.js";
import {
  getUserFromSession,
  setUserToSession,
  sortArray,
  hasChurch,
} from "../../helpers/helper.js";
import { DeleteForever, Edit } from "@material-ui/icons";
import { EmployeeForm } from "../components/EmployeeForm.js";
import { DeleteEmployeeModal } from "../components/DeleteEmployeeModal.js";
import { ProfileUploadModal } from "../components/ProfileUploadModal.js";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { useHistory, useParams } from "react-router-dom";
import {
  GET_USER,
  CREATE_EMPLOYEE,
  UPDATE_EMPLOYEE,
  DELETE_EMPLOYEE,
} from "../../queries/Query.js";

import Loading from "../components/Loading";

const useStyles = makeStyles((theme) => ({
  employeeCard: {
    height: 400,
    marginTop: 70,
  },
  employeePosition: {
    color: "grey",
  },
}));
const defaultProfileImage =
  "https://churchapp-la.s3-us-west-1.amazonaws.com/default-avatar.jpg";

export const EditEmployeesPage = () => {
  const classes = useStyles();
  const history = useHistory();
  // Need this state for updating information in modal.
  const [currentEmployee, setCurrentEmployee] = React.useState(null);

  // Modal state for Employee form
  const [createEmployeeModal, setCreateEmployeeModal] = React.useState(false);
  const [updateEmployeeModal, setUpdateEmployeeModal] = React.useState(false);
  const [deleteEmployeeModal, setDeleteEmployeeModal] = React.useState(false);

  // Modal state for Profile image upload form
  const [avatarModal, setAvatarModal] = React.useState(false);

  let { id } = useParams();

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
    onCompleted(data) {},
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
        refetchMe();
      },
      onError(error) {
        console.log("Printing update employee error", error);
      },
    }
  );

  const [deleteEmployee, { loading: deleteLoading }] = useMutation(
    DELETE_EMPLOYEE,
    {
      onCompleted(data) {
        console.log("Delete complete");
        refetchMe();
      },
      onError(error) {
        console.log("Printing delete employee error", error);
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
  if (userLoading || createLoading || updateLoading || deleteLoading) {
    return <Loading />;
  }

  // Get fetched User and Church
  let currentUser = userData.getUser;
  let church = userData.getUser.church;

  function employeeCreateModal() {
    return (
      <EmployeeForm
        title="교역자 추가하기"
        modal={createEmployeeModal}
        setModal={setCreateEmployeeModal}
        create={createEmployee}
        update={null}
        employee={null}
        user={currentUser}
      />
    );
  }

  // Draw employee update modal on request
  // I can draw when page load but in that way there is no way to pass
  // employee prop to EmployeeForm.

  function employeeUpdateModal(currentEmployee, setCurrentEmployee) {
    return (
      <EmployeeForm
        title="교역자 수정하기"
        modal={updateEmployeeModal}
        setModal={setUpdateEmployeeModal}
        create={null}
        update={updateEmployee}
        employee={currentEmployee}
        setEmployee={setCurrentEmployee}
        user={currentUser}
      />
    );
  }

  function profileUploadModal(currentEmployee, setCurrentEmployee) {
    return (
      <ProfileUploadModal
        title="교역자 프로필 사진"
        modal={avatarModal}
        setModal={setAvatarModal}
        employee={currentEmployee}
        refetch={refetchMe}
        setEmployee={setCurrentEmployee}
        user={currentUser}
      />
    );
  }

  // Must pass setCurrentEmployee callback to set null employee
  // in handleClose function in modal
  // In this way I can draw new modal with current selected employee.
  function employeeDeleteModal(currentEmployee, setCurrentEmployee) {
    return (
      <DeleteEmployeeModal
        employee={currentEmployee}
        setEmployee={setCurrentEmployee}
        deleteEmployee={deleteEmployee}
        modal={deleteEmployeeModal}
        setModal={setDeleteEmployeeModal}
      />
    );
  }

  let employees = church ? currentUser.church.employees : [];

  console.log("Printing employees: ", employees);
  const _employeePage = () => {
    if (employees.length === 0 || employees === null) {
      return (
        <>
          <GridContainer>
            <GridItem xs={12}>
              <Card>
                <CardHeader>
                  <h5>섬기는 분들</h5>
                </CardHeader>

                {hasChurch(currentUser) ? (
                  <CardBody>
                    <p>등록된 교역자분들이 없습니다.</p>
                    <Button
                      color="primary"
                      onClick={(e) => {
                        e.preventDefault();
                        setCreateEmployeeModal(true);
                      }}
                    >
                      교역자 추가
                    </Button>
                  </CardBody>
                ) : (
                  <CardBody>
                    <p>
                      교회 정보가 등록되어 있지 않습니다. 교회 정보를 먼저
                      등록하세요.
                    </p>
                    <Button
                      color="primary"
                      onClick={(e) => {
                        e.preventDefault();
                        let link =
                          "/dashboard/admin/edit-church-info/" + currentUser.id;
                        history.push(link);
                      }}
                    >
                      교회 등록 하러 가기
                    </Button>
                  </CardBody>
                )}
              </Card>
            </GridItem>
            {employeeCreateModal()}
          </GridContainer>
        </>
      );
    } else {
      return (
        <>
          <GridContainer>
            <GridItem xs={12}>
              <div>
                <h5>교역자 리스트</h5>
                <Button
                  color="primary"
                  onClick={(e) => {
                    e.preventDefault();
                    setCreateEmployeeModal(true);
                  }}
                >
                  교역자 추가
                </Button>
              </div>
            </GridItem>
            {employees.map((employee) => {
              return (
                <GridItem key={employee.id} xs={4} sm={4} md={4} lg={3}>
                  <Card profile className={classes.employeeCard}>
                    <CardAvatar profile>
                      <img src={employee.profileImage} alt="..." />
                    </CardAvatar>
                    <CardBody profile>
                      {employee.profileImage === defaultProfileImage ? (
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
                        <Button
                          simple
                          color="primary"
                          onClick={(e) => {
                            e.preventDefault();
                            setCurrentEmployee(employee);
                            setAvatarModal(true);
                          }}
                        >
                          사진 교체하기
                        </Button>
                      )}
                      <h4>{employee.name}</h4>
                      <h6 className={classes.employeePosition}>
                        {employee.position}
                      </h6>
                      <br />
                      <p>배열순서: {employee.order}</p>
                      <Button
                        color="primary"
                        justIcon
                        onClick={(e) => {
                          e.preventDefault();
                          // set selected employee to current employee
                          // to update info
                          setCurrentEmployee(employee);
                          setUpdateEmployeeModal(true);
                        }}
                      >
                        <Edit />
                      </Button>
                      <Button
                        justIcon
                        color="danger"
                        onClick={(e) => {
                          e.preventDefault();
                          setCurrentEmployee(employee);
                          setDeleteEmployeeModal(true);
                        }}
                      >
                        <DeleteForever />
                      </Button>
                    </CardBody>
                  </Card>
                </GridItem>
              );
            })}
          </GridContainer>
          {/* Draw employee update modal when current employee is set.
             So I can pass current employee to employee update modal.
            */}
          {currentEmployee &&
            employeeUpdateModal(currentEmployee, setCurrentEmployee)}
          {currentEmployee &&
            employeeDeleteModal(currentEmployee, setCurrentEmployee)}
          {employeeCreateModal()}
          {currentEmployee &&
            profileUploadModal(currentEmployee, setCurrentEmployee)}
        </>
      );
    }
  };
  return _employeePage();
};
