import ChurchInfoPage from "pages/ChurchInfoPage.js";
import Loading from "pages/components/Loading.js";

// @material-ui/icons
import ImportContacts from "@material-ui/icons/ImportContacts";
import AttachMoney from "@material-ui/icons/AttachMoney";

var dashRoutes = [
  {
    path: "/",
    name: "교회 정보",
    icon: ImportContacts,
    component: ChurchInfoPage,
    layout: "/dashboard",
  },
  // {
  //   path: "/slide-image",
  //   name: "슬라이드 이미지",
  //   icon: BurstMode,
  //   component: SlideImagePage,
  //   layout: "/dashboard",
  // },
  {
    path: "/offering",
    name: "연보",
    icon: AttachMoney,
    component: Loading,
    layout: "/dashboard",
  },
];
export default dashRoutes;
