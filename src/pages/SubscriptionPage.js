import React from "react";
import { useHistory } from "react-router-dom";

import Grid from "@material-ui/core/Grid";
import Button from "components/CustomButtons/Button.js";
import { CREATE_SESSION_LINK } from "../queries/Query";

import { useMutation } from "@apollo/react-hooks";
import { getUserFromSession } from "helpers/helper";

export const SubscriptionPage = () => {
  let currentUser = getUserFromSession();
  const history = useHistory();
  const [message, setMessage] = React.useState(null);

  const [createSessionLink, { loading }] = useMutation(CREATE_SESSION_LINK, {
    onCompleted(data) {
      console.log(data);
      window.location.replace(data.createStripeRedirectUrl.url);
    },
    onError(error) {
      console.log(error);
      setMessage(error.message);
    },
  });
  const handleClick = (e) => {
    e.preventDefault();
    createSessionLink({
      variables: {
        stripeId: currentUser.stripeId,
      },
    });
  };
  return (
    <Grid container>
      <Grid item xs={12}>
        <h5>섭스크립션 및 빌링 관리</h5>
        <Button color="primary" onClick={(e) => handleClick(e)}>
          관리하러 가기
        </Button>
        <br />
        <p>{message}</p>
      </Grid>
    </Grid>
  );
};
