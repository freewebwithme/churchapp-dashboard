import { MasterAdminPage } from "pages/admin/MasterAdminPage.js";
import { Person } from "@material-ui/icons";

var adminRoutes = [
  {
    path: "/",
    name: "Users",
    icon: Person,
    component: MasterAdminPage,
    layout: "/dashboard",
  },
];

export default adminRoutes;
