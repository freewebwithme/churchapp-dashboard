import { ChurchInfoPage } from "pages/ChurchInfoPage.js";
import { EmployeePage } from "pages/EmployeePage.js";
import { NewsPage } from "pages/NewsPage.js";
import Loading from "pages/components/Loading.js";

// @material-ui/icons
import {
  ImportContacts,
  AttachMoney,
  Group,
  Announcement,
} from "@material-ui/icons";

var dashRoutes = [
  {
    path: "/",
    name: "교회 정보",
    icon: ImportContacts,
    component: ChurchInfoPage,
    layout: "/dashboard",
  },
  {
    path: "/employee",
    name: "섬기는 분들",
    icon: Group,
    component: EmployeePage,
    layout: "/dashboard",
  },
  {
    path: "/news",
    name: "교회 소식",
    icon: Announcement,
    component: NewsPage,
    layout: "/dashboard",
  },
  {
    path: "/offering",
    name: "연보",
    icon: AttachMoney,
    component: Loading,
    layout: "/dashboard",
  },
];
export default dashRoutes;
