import { Navigate } from "react-router-dom";

import ListUsers from "../pages/users/ListUsers";
import UpdateUser from "../pages/users/UpdateUser";
import DeleteUser from "../pages/users/DeleteUser";

import ListGroups from "../pages/groups/ListGroups";
import UpdateGroup from "../pages/groups/UpdateGroup";
import DeleteGroup from "../pages/groups/DeleteGroup";

import ListLicenses from "../pages/licenses/ListLicenses";
import UpdateLicense from "../pages/licenses/UpdateLicense";
import DeleteLicense from "../pages/licenses/DeleteLicense";

import ListServers from "../pages/servers/ListServers";
import UpdateServer from "../pages/servers/UpdateServer";
import DeleteServer from "../pages/servers/DeleteServer";

import ListSTTLicenses from "../pages/stt_licenses/ListSTTLicenses";
import UpdateSTTLicense from "../pages/stt_licenses/UpdateSTTLicense";
import DeleteSTTLicense from "../pages/stt_licenses/DeleteSTTLicense";

import ListNMTLicenses from "../pages/nmt_licenses/ListNMTLicenses";
import UpdateNMTLicense from "../pages/nmt_licenses/UpdateNMTLicense";
import DeleteNMTLicense from "../pages/nmt_licenses/DeleteNMTLicense";

import ListSTTProducts from "../pages/stt_products/ListSTTProducts";
import UpdateSTTProduct from "../pages/stt_products/UpdateSTTProduct";
import DeleteSTTProduct from "../pages/stt_products/DeleteSTTProduct";

import ListNMTProducts from "../pages/nmt_products/ListNMTProducts";
import UpdateNMTProduct from "../pages/nmt_products/UpdateNMTProduct";
import DeleteNMTProduct from "../pages/nmt_products/DeleteNMTProduct";

import Dashboard from "../pages/Dashboard";

export const allRoutes = [
  { path: "/dashboard", element: <Dashboard /> },

  { path: "users/list", element: <ListUsers /> },
  { path: "users/update/:id", element: <UpdateUser /> },
  { path: "users/delete/:id", element: <DeleteUser /> },

  { path: "groups/list", element: <ListGroups /> },
  { path: "groups/update/:id", element: <UpdateGroup /> },
  { path: "groups/delete/:id", element: <DeleteGroup /> },

  { path: "licenses/list", element: <ListLicenses /> },
  { path: "licenses/update/:id", element: <UpdateLicense /> },
  { path: "licenses/delete/:id", element: <DeleteLicense /> },

  { path: "servers/list", element: <ListServers /> },
  { path: "servers/update/:id", element: <UpdateServer /> },
  { path: "servers/delete/:id", element: <DeleteServer /> },

  { path: "stt_licenses/list", element: <ListSTTLicenses /> },
  { path: "stt_licenses/update/:id", element: <UpdateSTTLicense /> },
  { path: "stt_licenses/delete/:id", element: <DeleteSTTLicense /> },

  { path: "nmt_licenses/list", element: <ListNMTLicenses /> },
  { path: "nmt_licenses/update/:id", element: <UpdateNMTLicense /> },
  { path: "nmt_licenses/delete/:id", element: <DeleteNMTLicense /> },

  { path: "stt_products/list", element: <ListSTTProducts /> },
  { path: "stt_products/update/:id", element: <UpdateSTTProduct /> },
  { path: "stt_products/delete/:id", element: <DeleteSTTProduct /> },

  { path: "nmt_products/list", element: <ListNMTProducts /> },
  { path: "nmt_products/update/:id", element: <UpdateNMTProduct /> },
  { path: "nmt_products/delete/:id", element: <DeleteNMTProduct /> },

  { path: "*", element: <Navigate to="/dashboard" /> },
];
