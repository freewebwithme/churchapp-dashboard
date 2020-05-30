import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

import styles from "assets/jss/material-dashboard-pro-react/components/paginationStyle.js";

const useStyles = makeStyles(styles);

export default function Pagination(props) {
  const classes = useStyles();
  const {
    currentPageNumber,
    setCurrentPageNumber,
    color,
    contentsPerPage,
    contents,
  } = props;

  // Pagination props
  let numPages = Math.ceil(contents.length / contentsPerPage);

  let initPage = 1;
  let pages = Array(numPages)
    .fill()
    .map(() => {
      let active = initPage === currentPageNumber;
      let page = { text: initPage++, active: active };
      return page;
    });

  return (
    <ul className={classes.pagination}>
      {pages.map((prop, key) => {
        const paginationLink = cx({
          [classes.paginationLink]: true,
          [classes[color]]: prop.active,
          [classes.disabled]: prop.disabled,
        });
        return (
          <li className={classes.paginationItem} key={key}>
            {prop.onClick !== undefined ? (
              <Button onClick={prop.onClick} className={paginationLink}>
                {prop.text}
              </Button>
            ) : (
              <Button
                onClick={() => setCurrentPageNumber(prop.text)}
                className={paginationLink}
              >
                {prop.text}
              </Button>
            )}
          </li>
        );
      })}
    </ul>
  );
}

Pagination.defaultProps = {
  color: "primary",
};

Pagination.propTypes = {
  color: PropTypes.oneOf(["primary", "info", "success", "warning", "danger"]),
  recordsPerPage: PropTypes.number,
  contens: PropTypes.array,
};
