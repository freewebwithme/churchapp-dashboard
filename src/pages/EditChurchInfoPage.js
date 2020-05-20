import React from "react";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { useHistory } from "react-router-dom";
import { getUserFromSession, setUserToSession } from "../helpers/helper.js";
import { ME, UPDATE_CHURCH } from "../queries/Query.js";
import { ChurchInfoForm } from "./ChurchInfoForm";
import Loading from "./components/Loading";

export const EditChurchInfoPage = () => {
  const history = useHistory();
  const [user, setUser] = React.useState(null);
  const {
    loading: loadingMe,
    error: errorMe,
    data: dataMe,
    refetch: refetchMe,
    networkStatus,
  } = useQuery(ME, {
    notifyOnNetworkStatusChange: true,
    fetchPolicy: "cache-and-network",
    onCompleted(data) {
      console.log("Printing church info: ", data);
      setUserToSession(data.me);
      setUser(data.me);
    },
  });

  // Update Church
  const [updateChurch, { loading: loadingUpdate }] = useMutation(
    UPDATE_CHURCH,
    {
      onCompleted(data) {
        console.log("Printing from onCompleted updateChurch: ", data);
        refetchMe();
        history.push("/dashboard");
      },
      onError(error) {
        console.log("Printing from onError updateChurch: ", error);
      },
    }
  );
  if (networkStatus === 4) return <p>새로운 정보를 불러오는 중입니다...</p>;
  if (loadingMe) return <Loading />;
  if (errorMe)
    return <p>"데이터를 불러오는데 에러가 발생했습니다. 다시 시도하세요"</p>;
  console.log("Printing dataME: ", dataMe);
  return (
    <ChurchInfoForm
      title="교회 정보 수정"
      church={dataMe.me.church}
      update={updateChurch}
    />
  );
};
