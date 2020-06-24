import React from "react";
import { useHistory } from "react-router-dom";

import { useMutation, useQuery } from "@apollo/react-hooks";
import { ME, CREATE_NEWS, UPDATE_NEWS, DELETE_NEWS } from "../queries/Query";
import { makeStyles } from "@material-ui/core/styles";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardText from "components/Card/CardText.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import Badge from "components/Badge/Badge.js";
import Paginations from "./components/Pagination.js";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Loading from "./components/Loading";
import { NewsModal } from "./components/NewsModal";
import { DeleteNewsModal } from "./components/DeleteNewsModal";

import {
  getUserFromSession,
  setUserToSession,
  hasChurch,
} from "../helpers/helper.js";

const useStyles = makeStyles((theme) => ({
  cardHeaderText: {
    color: "white",
  },
}));
export function NewsPage() {
  const classes = useStyles();
  const history = useHistory();

  let currentUser = getUserFromSession();

  function initNews() {
    if (currentUser.church === null) {
      return [];
    }
    if (currentUser.church.news === null) {
      return [];
    }
    if (currentUser.church.news.length === 0) {
      return currentUser.church.news;
    }
    return currentUser.church.news;
  }
  // Need a currentNews for update or delete.
  const [currentNews, setCurrentNews] = React.useState(null);
  const [churchNews, setChurchNews] = React.useState(initNews());
  const [createModal, setCreateModal] = React.useState(false);
  const [updateModal, setUpdateModal] = React.useState(false);
  const [deleteModal, setDeleteModal] = React.useState(false);

  const [currentPageNumber, setCurrentPageNumber] = React.useState(1);
  const contentsPerPage = 10;

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
      setChurchNews(data.me.church ? data.me.church.news : []);
    },
  });

  const [createNews, { loading: createLoading }] = useMutation(CREATE_NEWS, {
    onCompleted(data) {
      console.log("Printing completed on Create news", data);
      setCreateModal(false);
      refetchMe();
    },
    onError(error) {
      console.log("Printing error on Create news", error);
    },
  });
  const [updateNews, { loading: updateLoading }] = useMutation(UPDATE_NEWS, {
    onCompleted(data) {
      console.log("Printing completed on Update news", data);
      setCurrentNews(null);
      setUpdateModal(false);
      refetchMe();
    },
    onError(error) {
      console.log("Printing error on Update news", error);
    },
  });
  const [deleteNews, { loading: deleteLoading }] = useMutation(DELETE_NEWS, {
    onCompleted(data) {
      console.log("Printing completed on Delete news", data);
      setCurrentNews(null);
      setDeleteModal(false);
      refetchMe();
    },
    onError(error) {
      console.log("Printing error on Delete news", error);
    },
  });

  function paginate(array, pageNumber) {
    return array.slice(
      (pageNumber - 1) * contentsPerPage,
      pageNumber * contentsPerPage
    );
  }
  function createNewsModal() {
    return (
      <NewsModal
        news={null}
        setNews={null}
        modal={createModal}
        setModal={setCreateModal}
        createNews={createNews}
        updateNews={null}
        user={currentUser}
      />
    );
  }

  function updateNewsModal(currentNews, setCurrentNews) {
    return (
      <NewsModal
        news={currentNews}
        setNews={setCurrentNews}
        modal={updateModal}
        setModal={setUpdateModal}
        createNews={null}
        updateNews={updateNews}
        user={currentUser}
      />
    );
  }

  function deleteNewsModal(currentNews, setCurrentNews) {
    return (
      <DeleteNewsModal
        news={currentNews}
        setNews={setCurrentNews}
        modal={deleteModal}
        setModal={setDeleteModal}
        deleteNews={deleteNews}
        user={currentUser}
      />
    );
  }

  if (networkStatus === 4) return <p>새로운 정보를 불러오는 중입니다...</p>;

  if (createLoading || updateLoading || deleteLoading || loadingMe) {
    return <Loading />;
  }

  function _emptyNewsPage() {
    return (
      <Card>
        {hasChurch(currentUser) ? (
          <CardBody>
            <Badge color="primary">뉴스없음 :(</Badge>
            <br />
            <br />
            등록된 교회 소식이 없습니다. 교회 소식을 등록하셔서 성도들에게
            알리세요.
          </CardBody>
        ) : (
          <CardBody>
            <Badge color="primary">등록된 교회 없음 :(</Badge>
            <br />
            <br />
            교회를 등록하지 않았습니다. 먼저 교회 정보를 등록하세요.
          </CardBody>
        )}
      </Card>
    );
  }

  function _newsPage(pageNumber) {
    let paginatedNews = paginate(churchNews, pageNumber);
    return paginatedNews.map((newsItem) => {
      return (
        <Card key={newsItem.id}>
          <CardBody>
            <Badge color="primary">{newsItem.createdAt}</Badge>
            <br />
            <br />
            {newsItem.content}
          </CardBody>
          <CardActions disableSpacing>
            <IconButton
              aria-label="edit"
              onClick={(e) => {
                e.preventDefault();
                setCurrentNews(newsItem);
                setUpdateModal(true);
              }}
            >
              <EditIcon fontSize="small" />
            </IconButton>
            <IconButton
              aria-label="delete"
              onClick={(e) => {
                e.preventDefault();
                setCurrentNews(newsItem);
                setDeleteModal(true);
              }}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </CardActions>
        </Card>
      );
    });
  }

  return (
    <>
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12} lg={8}>
            <Card>
              <CardHeader color="primary" text>
                <CardText color="primary">
                  <h4 className={classes.cardHeaderText}>교회 소식</h4>
                  교회소식을 등록하세요. 교회소식은 앱에 처음페이지에 등록순으로
                  표시됩니다.
                  <br />
                  <br />
                  <small>
                    교회 소식은 최대 100개까지 저장되며, 100개가 넘으면 오래된
                    순서대로 자동 삭제됩니다.
                  </small>
                  <br />
                  {hasChurch(currentUser) ? (
                    <Button
                      size="sm"
                      color="info"
                      onClick={(e) => {
                        e.preventDefault();
                        setCreateModal(true);
                      }}
                    >
                      새소식 등록
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      color="primary"
                      onClick={(e) => {
                        e.preventDefault();
                        history.push("/dashboard");
                      }}
                    >
                      교회 등록하러 가기
                    </Button>
                  )}
                </CardText>
              </CardHeader>
              <CardBody>
                {churchNews.length === 0 || churchNews === null
                  ? _emptyNewsPage()
                  : _newsPage(currentPageNumber)}
              </CardBody>
              <CardFooter>
                <Paginations
                  contents={churchNews}
                  contentsPerPage={contentsPerPage}
                  color="primary"
                  currentPageNumber={currentPageNumber}
                  setCurrentPageNumber={setCurrentPageNumber}
                />
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={12} lg={6}></GridItem>
        </GridContainer>
      </div>
      {createNewsModal()}
      {currentNews && updateNewsModal(currentNews, setCurrentNews)}
      {currentNews && deleteNewsModal(currentNews, setCurrentNews)}
    </>
  );
}
