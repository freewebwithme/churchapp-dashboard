import React from "react";
import { REFETCH_VIDEOS } from "../../queries/Query";
import { GET_USER } from "../../queries/AdminQuery";
import { useHistory, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/react-hooks";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardText from "components/Card/CardText.js";
import CardBody from "components/Card/CardBody.js";
import Badge from "components/Badge/Badge.js";
import { makeStyles } from "@material-ui/core/styles";
import Link from "@material-ui/core/Link";

import Loading from "../components/Loading";
import { hasChurch } from "../../helpers/helper";
import styles from "assets/jss/material-dashboard-pro-react/cardImagesStyles.js";

const useStyles = makeStyles(styles);

export const EditLatestVideosPage = () => {
  const classes = useStyles();
  let { id } = useParams();
  const history = useHistory();

  const [latestVideos, setLatestVideos] = React.useState([]);

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
      if (data.getUser.church !== null) {
        setLatestVideos(data.getUser.church.latestVideos);
      }
    },
  });
  const [refetchVideos, { loading: videoLoading }] = useMutation(
    REFETCH_VIDEOS,
    {
      onCompleted(data) {
        //  after refresh latest video from youtube
        // call Me Query to fresh current latest video page
        console.log("Refetch completed");
        refetchMe();
      },
      onError(error) {},
    }
  );

  if (userLoading || videoLoading) {
    return <Loading />;
  }

  let currentUser = userData.getUser;

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

  const refetchLatestVideos = () => {
    refetchVideos({
      variables: {
        userId: userData.getUser.id,
        churchId: userData.getUser.church.id,
      },
    });
  };

  const _emptyLatestVideos = () => {
    return (
      <Card>
        {hasChurch(currentUser) ? (
          <CardBody>
            <Badge color="primary"> 동영상 없음</Badge>
            <br />
            <br />
            YouTube에 등록된 설교 영상이 없습니다.
          </CardBody>
        ) : (
          <CardBody>
            <Badge color="primary"> 교회 정보 없음</Badge>
            <br />
            <br />
            교회 정보가 등록되어 있지 않습니다. 교회 정보부터 등록하세요.
          </CardBody>
        )}
      </Card>
    );
  };

  const _displayLatestVideos = (latestVideos) => {
    return latestVideos.map((video) => {
      let videoUrl = "https://www.youtube.com/watch?v=" + video.videoId;
      return (
        <GridItem key={video.id} xs={6} sm={6} md={6} lg={3}>
          <Link href={videoUrl} target="_blank" rel="noopener">
            <Card>
              <img className={classes.cardImgTop} src={video.thumbnailUrl} />
              <CardBody>
                <Badge color="primary">{video.publishedAt}</Badge>
                <br />
                <br />
                <h6>{video.title}</h6>
                <p>{video.description}</p>
              </CardBody>
            </Card>
          </Link>
        </GridItem>
      );
    });
  };
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12} lg={12}>
          <Card>
            <CardHeader text color="success">
              <CardText color="success">
                <h4>최근 설교 영상</h4>
                앱에 표시될 최신 영상입니다. 영상은 최대 25개까지 앱에
                표시됩니다.
                <br />
                <br />
                <small>
                  이곳에 표시되는 최신 영상 리스트와 YouTube 영상 리스트가
                  다르다면 이 버튼을 이 버튼을 눌러서 영상을 다시 불러 오십시오.
                </small>
                <br />
                {hasChurch(currentUser) ? (
                  <Button
                    size="sm"
                    color="danger"
                    onClick={() => refetchLatestVideos()}
                  >
                    영상 다시 불러오기
                  </Button>
                ) : (
                  <Button
                    size="sm"
                    color="primary"
                    onClick={() => {
                      let link =
                        "/dashboard/admin/edit-church-info/" + currentUser.id;
                      history.push(link);
                    }}
                  >
                    교회 정보 등록 하기
                  </Button>
                )}
              </CardText>
            </CardHeader>
            <CardBody>
              <GridContainer>
                {latestVideos.length === 0 || latestVideos === null
                  ? _emptyLatestVideos()
                  : _displayLatestVideos(latestVideos)}
              </GridContainer>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
};
