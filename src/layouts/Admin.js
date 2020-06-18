import React from "react";
import cx from "classnames";
import { Switch, Route } from "react-router-dom";
// creates a beautiful scrollbar
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// core components
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import FixedPlugin from "components/FixedPlugin/FixedPlugin.js";

import { ChurchInfoPage } from "pages/ChurchInfoPage.js";
import { EmployeePage } from "pages/EmployeePage.js";
import { NewsPage } from "pages/NewsPage.js";
import { EditChurchInfoPage } from "pages/EditChurchInfoPage";
import { ProfilePage } from "pages/ProfilePage";
import { EditProfilePage } from "pages/EditProfilePage";
import { ChangePasswordPage } from "pages/ChangePasswordPage";
import { EditServiceInfoPage } from "pages/EditServiceInfoPage";
import { PushNotificationPage } from "pages/PushNotificationPage";
import { LogoutPage } from "pages/LogoutPage";
import { LatestVideosPage } from "pages/LatestVideosPage.js";
import { AppRequestPage } from "pages/AppRequestPage";
import { ContactPage } from "pages/ContactPage";

import { getUserFromSession, setUserToSession } from "../helpers/helper.js";
import dashRoutes from "routes.js";

import styles from "assets/jss/material-dashboard-pro-react/layouts/adminStyle.js";

var ps;

const useStyles = makeStyles(styles);

export default function Dashboard(props) {
  let currentUser = getUserFromSession();

  const { ...rest } = props;
  // states and functions
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [miniActive, setMiniActive] = React.useState(false);
  const [image, setImage] = React.useState(require("assets/img/sidebar-2.jpg"));
  const [color, setColor] = React.useState("blue");
  const [bgColor, setBgColor] = React.useState("black");
  // const [hasImage, setHasImage] = React.useState(true);
  const [fixedClasses, setFixedClasses] = React.useState("dropdown");
  const [logo, setLogo] = React.useState(require("assets/img/logo-white.svg"));
  // styles
  const classes = useStyles();
  const mainPanelClasses =
    classes.mainPanel +
    " " +
    cx({
      [classes.mainPanelSidebarMini]: miniActive,
      [classes.mainPanelWithPerfectScrollbar]:
        navigator.platform.indexOf("Win") > -1,
    });
  // ref for main panel div
  const mainPanel = React.createRef();
  // effect instead of componentDidMount, componentDidUpdate and componentWillUnmount
  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(mainPanel.current, {
        suppressScrollX: true,
        suppressScrollY: false,
      });
      document.body.style.overflow = "hidden";
    }
    window.addEventListener("resize", resizeFunction);

    // Specify how to clean up after this effect:
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
      }
      window.removeEventListener("resize", resizeFunction);
    };
  });
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const getActiveRoute = (routes) => {
    let activeRoute = "Church App";
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].collapse) {
        let collapseActiveRoute = getActiveRoute(routes[i].views);
        if (collapseActiveRoute !== activeRoute) {
          return collapseActiveRoute;
        }
      } else {
        if (
          window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1
        ) {
          return routes[i].name;
        }
      }
    }
    return activeRoute;
  };
  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/dashboard") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };
  const sidebarMinimize = () => {
    setMiniActive(!miniActive);
  };
  const resizeFunction = () => {
    if (window.innerWidth >= 960) {
      setMobileOpen(false);
    }
  };

  return (
    <div className={classes.wrapper}>
      <Sidebar
        routes={dashRoutes}
        logoText={"Church App"}
        logo={logo}
        image={image}
        handleDrawerToggle={handleDrawerToggle}
        open={mobileOpen}
        color={color}
        bgColor={bgColor}
        miniActive={miniActive}
        user={currentUser}
        {...rest}
      />
      <div className={mainPanelClasses} ref={mainPanel}>
        <AdminNavbar
          sidebarMinimize={sidebarMinimize.bind(this)}
          miniActive={miniActive}
          brandText={getActiveRoute(dashRoutes)}
          handleDrawerToggle={handleDrawerToggle}
          {...rest}
        />
        <div className={classes.content}>
          <div className={classes.container}>
            <Switch>
              <Route path="/dashboard" exact component={ChurchInfoPage} />
              <Route
                path="/dashboard/edit-church"
                exact
                component={EditChurchInfoPage}
              />
              <Route
                path="/dashboard/edit-service-info"
                exact
                component={EditServiceInfoPage}
              />
              <Route
                path="/dashboard/employee"
                exact
                component={EmployeePage}
              />
              <Route path="/dashboard/news" exact component={NewsPage} />
              <Route
                path="/dashboard/latest-videos"
                exact
                component={LatestVideosPage}
              />
              <Route
                path="/dashboard/push-notification"
                exact
                component={PushNotificationPage}
              />
              <Route path="/dashboard/profile" exact component={ProfilePage} />
              <Route
                path="/dashboard/edit-profile"
                exact
                component={EditProfilePage}
              />
              <Route
                path="/dashboard/change-password"
                exact
                component={ChangePasswordPage}
              />
              <Route
                path="/dashboard/app-request"
                exact
                component={AppRequestPage}
              />
              <Route path="/dashboard/contact" exact component={ContactPage} />
              <Route path="/dashboard/log-out" exact component={LogoutPage} />
            </Switch>
          </div>
        </div>
      </div>
    </div>
  );
}
