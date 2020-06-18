import React from "react";
import { useHistory } from "react-router-dom";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardText from "components/Card/CardText.js";
import CardBody from "components/Card/CardBody.js";
import Badge from "components/Badge/Badge.js";
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-dashboard-pro-react/cardImagesStyles.js";
import Link from "@material-ui/core/Link";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { ME, REFETCH_VIDEOS } from "../queries/Query";
import Loading from "./components/Loading";
import {
  getUserFromSession,
  setUserToSession,
  hasChurch,
} from "../helpers/helper.js";

const useStyles = makeStyles(styles);

export function LatestVideosPage() {
  const classes = useStyles();
  const history = useHistory();

  let currentUser = getUserFromSession();
  const initLatestVideos = () => {
    if (currentUser.church === null) {
      return [];
    }
    if (currentUser.church.latestVideos === null) {
      return [];
    }
    return currentUser.church.latestVideos;
  };
  const [user, setUser] = React.useState(null);
  const [latestVideos, setLatestVideos] = React.useState(initLatestVideos());
  const [modal, setModal] = React.useState(false);
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
      let user = data.me;
      setUserToSession(user);
      currentUser = getUserFromSession();
      // set user for updating UI
      setUser(currentUser);
      if (user.church != null) {
        setLatestVideos(user.church.latestVideos);
      }
    },
  });
  const [refetchVideos, { loading: loadingVideos }] = useMutation(
    REFETCH_VIDEOS,
    {
      onCompleted(data) {
        //  after refresh latest video from youtube
        // call Me Query to fresh current latest video page
        refetchMe();
      },
      onError(error) {},
    }
  );

  if (loadingMe || loadingVideos) {
    return <Loading />;
  }

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
    setModal(false);
    refetchVideos({
      variables: {
        userId: currentUser.id,
        churchId: currentUser.church.id,
      },
    });
  };

  const _emptyLatestVideos = () => {
    if (hasChurch(currentUser)) {
      if (!currentUser.church.hasKey) {
        return (
          <Card>
            <CardBody>
              <Badge color="primary">관리자에게 연락하기</Badge>
              <br />
              <br />
              데모앱이나 앱 사용자만 사용할 수 있습니다. 데모앱이나 앱을
              신청하세요.
              <div>
                <Button
                  color="primary"
                  onClick={() => history.push("/dashboard/app-request")}
                  size="sm"
                >
                  앱 신청 페이지 가기
                </Button>
              </div>
            </CardBody>
          </Card>
        );
      } else {
        return (
          <Card>
            <CardBody>
              <Badge color="primary"> 동영상 없음</Badge>
              <br />
              <br />
              YouTube에 등록된 설교 영상이 없거나 불러오지 않았습니다. 한번도
              영상을 불러온 적이 없는 경우 영상 불러오기 버튼을 눌러주세요.
            </CardBody>
          </Card>
        );
      }
    } else {
      return (
        <Card>
          <CardBody>
            <Badge color="primary"> 교회 정보 없음</Badge>
            <br />
            <br />
            교회 정보가 등록되어 있지 않습니다. 교회 정보부터 등록하세요.
          </CardBody>
        </Card>
      );
    }
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

  const handleClose = () => {
    setModal(false);
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
                    disabled={!currentUser.church.hasKey}
                    size="sm"
                    color="danger"
                    onClick={() => setModal(true)}
                  >
                    영상 불러오기
                  </Button>
                ) : (
                  <Button
                    size="sm"
                    color="primary"
                    onClick={() => history.push("/dashboard")}
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

      <Dialog open={modal} onClose={handleClose}>
        <DialogTitle>{"영상을 다시 불러오시겠습니까?"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            [이럴 경우만 불러오세요] <br />
            <br /> 1. 최근에 업로드한 영상중에 삭제한 영상이 있었을 경우. <br />{" "}
            2. 영상에 오류가 있어서 삭제한 영상이 있었을 경우.
            <br />
            <br />
            [이런 경우에는 사용하지 마세요] <br />
            <br /> 1. 방금 영상을 업로드 했을 경우(몇분후 자동으로 데이터가
            업데이트 됩니다. 다시 로그인하세요). <br />
            2. 업로드한 영상 Title 이나 Description을 수정했을 경우(자동으로
            업데이트 됩니다.)
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="danger" autoFocus>
            취소
          </Button>
          <Button onClick={refetchLatestVideos} color="primary">
            불러오기
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
