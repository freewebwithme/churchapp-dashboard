import ChurchInfoPage from "pages/ChurchInfoPage.js";
import SlideImagePage from "pages/SlideImagePage.js";
import Loading from "pages/components/Loading.js";

import Widgets from "views/Widgets/Widgets.js";

// @material-ui/icons
import ImportContacts from "@material-ui/icons/ImportContacts";
import BurstMode from "@material-ui/icons/BurstMode";
import AttachMoney from "@material-ui/icons/AttachMoney";

var dashRoutes = [
  {
    path: "/",
    name: "교회 정보",
    icon: ImportContacts,
    component: ChurchInfoPage,
    layout: "/dashboard",
  },
  {
    path: "/slide-image",
    name: "슬라이드 이미지",
    icon: BurstMode,
    component: SlideImagePage,
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
