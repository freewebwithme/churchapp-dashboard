import { ChurchInfoPage } from "pages/ChurchInfoPage.js";
import { EmployeePage } from "pages/EmployeePage.js";
import { NewsPage } from "pages/NewsPage.js";
import { LatestVideosPage } from "pages/LatestVideosPage.js";
import { PushNotificationPage } from "pages/PushNotificationPage.js";
import { SubscriptionPage } from "pages/SubscriptionPage";
import { AppRequestPage } from "pages/AppRequestPage";
import { ContactPage } from "pages/ContactPage";
import Loading from "pages/components/Loading.js";
import NotificationsActiveIcon from "@material-ui/icons/NotificationsActive";
import GetAppIcon from "@material-ui/icons/GetApp";
import EmailIcon from "@material-ui/icons/Email";
import PaymentIcon from '@material-ui/icons/Payment';
import {
  ImportContacts,
  AttachMoney,
  Group,
  Announcement,
  ExitToApp,
  VideoLibrary,
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
    path: "/latest-videos",
    name: "최근 영상",
    icon: VideoLibrary,
    component: LatestVideosPage,
    layout: "/dashboard",
  },
  {
    path: "/push-notification",
    name: "Push Notification",
    icon: NotificationsActiveIcon,
    component: PushNotificationPage,
    layout: "/dashboard",
  },
  {
    path: "/subscription",
    name: "Subscription",
    icon: PaymentIcon,
    component: SubscriptionPage,
    layout: "/dashboard",
  },
  {
    path: "/app-request",
    name: "앱 신청하기",
    icon: GetAppIcon,
    component: AppRequestPage,
    layout: "/dashboard",
  },
  {
    path: "/contact",
    name: "관리자에게 연락하기",
    icon: EmailIcon,
    component: ContactPage,
    layout: "/dashboard",
  },
  //{
  //  path: "/offering",
  //  name: "연보",
  //  icon: AttachMoney,
  //  component: Loading,
  //  layout: "/dashboard",
  //},

  {
    path: "/log-out",
    name: "Log out",
    icon: ExitToApp,
    component: Loading,
    layout: "/dashboard",
  },
];
export default dashRoutes;
