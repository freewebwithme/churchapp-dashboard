import React from "react";
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

import { getUserFromSession } from "../helpers/helper.js";

const useStyles = makeStyles((theme) => ({
  cardHeaderText: {
    color: "white",
  },
}));

export function NewsPage() {
  const classes = useStyles();
  let currentUser = getUserFromSession();

  const [createModal, setCreateModal] = React.useState(false);
  const [updateModal, setUpdateModal] = React.useState(false);
  const [deleteModal, setDeleteModal] = React.useState(false);

  function createNewsModal() {}

  function updateNewsModal() {}

  function deleteNewsModa() {}
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12} lg={8}>
          <Card>
            <CardHeader color="success" text>
              <CardText color="success">
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
                <Button
                  size="sm"
                  color="primary"
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                >
                  새소식 등록
                </Button>
              </CardText>
            </CardHeader>
            <CardBody>
              <Card>
                <CardBody>
                  <Badge color="primary">2020년 6월 1일</Badge>
                  <br />
                  <br />
                  이번주는 부활주일입니다. 본당에서 11시에 예배와 성찬이
                  있습니다. 이번주는 부활주일입니다. 본당에서 11시에 예배와
                  성찬이
                </CardBody>
                <CardActions disableSpacing>
                  <IconButton aria-label="edit">
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton aria-label="delete">
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </CardActions>
              </Card>
              <Card>
                <CardBody>
                  <Badge color="primary">2020년 6월 1일</Badge>
                  <br />
                  <br />
                  이번주는 부활주일입니다. 본당에서 11시에 예배와 성찬이
                  있습니다. 이번주는 부활주일입니다. 본당에서 11시에 예배와
                  성찬이 이번주는 부활주일입니다. 본당에서 11시에 예배와 성찬이
                  있습니다. 이번주는 부활주일입니다. 본당에서 11시에 예배와
                  성찬이
                </CardBody>
                <CardActions disableSpacing>
                  <IconButton aria-label="edit">
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton aria-label="delete">
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </CardActions>
              </Card>
              <Card>
                <CardBody>
                  <Badge color="primary">2020년 6월 1일</Badge>
                  <br />
                  <br />
                  이번주는 부활주일입니다. 본당에서 11시에 예배와 성찬이
                  있습니다. 이번주는 부활주일입니다. 본당에서 11시에 예배와
                  성찬이
                </CardBody>
                <CardActions disableSpacing>
                  <IconButton aria-label="edit">
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton aria-label="delete">
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </CardActions>
              </Card>
              <Card>
                <CardBody>
                  <Badge color="primary">2020년 6월 1일</Badge>
                  <br />
                  <br />
                  이번주는 부활주일입니다. 본당에서 11시에 예배와 성찬이
                  있습니다. 이번주는 부활주일입니다. 본당에서 11시에 예배와
                  성찬이
                </CardBody>
                <CardActions disableSpacing>
                  <IconButton aria-label="edit">
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton aria-label="delete">
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </CardActions>
              </Card>
              <Card>
                <CardBody>
                  <Badge color="primary">2020년 6월 1일</Badge>
                  <br />
                  <br />
                  이번주는 부활주일입니다. 본당에서 11시에 예배와 성찬이
                  있습니다. 이번주는 부활주일입니다. 본당에서 11시에 예배와
                  성찬이
                </CardBody>
                <CardActions disableSpacing>
                  <IconButton aria-label="edit">
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton aria-label="delete">
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </CardActions>
              </Card>
              <Card>
                <CardBody>
                  <Badge color="primary">2020년 6월 1일</Badge>
                  <br />
                  <br />
                  이번주는 부활주일입니다. 본당에서 11시에 예배와 성찬이
                  있습니다. 이번주는 부활주일입니다. 본당에서 11시에 예배와
                  성찬이
                </CardBody>
                <CardActions disableSpacing>
                  <IconButton aria-label="edit">
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton aria-label="delete">
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </CardActions>
              </Card>
            </CardBody>
            <CardFooter>
              <Paginations
                pages={[
                  { text: "이전" },
                  { text: 1, active: true },
                  { text: 2 },
                  { text: 3 },
                  { text: 4 },
                  { text: "다음" },
                ]}
                color="primary"
              />
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={12} lg={6}></GridItem>
      </GridContainer>
    </div>
  );
}
