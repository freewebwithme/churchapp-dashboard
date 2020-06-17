import { MasterAdminPage } from "pages/admin/MasterAdminPage.js";
import { Person, ExitToApp } from "@material-ui/icons";
import Loading from "pages/components/Loading.js";

var adminRoutes = [
  {
    path: "/admin",
    name: "Users",
    icon: Person,
    component: MasterAdminPage,
    layout: "/dashboard",
  },
  {
    path: "/log-out",
    name: "Log out",
    icon: ExitToApp,
    component: Loading,
    layout: "/dashboard",
  },
];

export default adminRoutes;
