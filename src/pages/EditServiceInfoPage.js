import React from "react";
import { UPDATE_SERVICE_INFO } from "../queries/Query.js";
import { useMutation } from "@apollo/react-hooks";
import { getUserFromSession, setUserToSession } from "../helpers/helper.js";
import { useHistory } from "react-router-dom";
import { ServiceInfoForm } from "./components/ServiceInfoForm";
import Loading from "./components/Loading.js";

export const EditServiceInfoPage = () => {
  const history = useHistory();
  let currentUser = getUserFromSession();
  const [updateServiceInfo, { loading }] = useMutation(UPDATE_SERVICE_INFO, {
    onCompleted(data) {
      console.log("Printing update service info result: ", data);
      history.push("/dashboard");
    },
    onError(error) {
      console.log("Printing update service info error: ", error);
    },
  });

  if (loading) return <Loading />;

  return (
    <ServiceInfoForm user={currentUser} updateServiceInfo={updateServiceInfo} />
  );
};
