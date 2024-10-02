import Realtime from "views/Realtime";
import Warnings from "views/Warnings";
import Debug from "views/Debug";
import Info from "views/Info";
import Day from "views/Day";
import Error from "views/Error";

var routes = [
  {
    path: "/dashboard",
    name: "Realtime",
    icon: "nc-icon nc-bank",
    component: <Realtime />,
    layout: "/admin",
  },
  {
    path: "/warnings",
    name: "Warnings",
    icon: "nc-icon nc-tile-56",
    component: <Warnings />,
    layout: "/admin",
  },
  {
    path: "/debug",
    name: "Debug",
    icon: "nc-icon nc-diamond",
    component: <Debug />,
    layout: "/admin",
  },
  {
    path: "/info",
    name: "Info",
    icon: "nc-icon nc-pin-3",
    component: <Info />,
    layout: "/admin",
  },
  {
    path: "/error",
    name: "Error",
    icon: "nc-icon nc-bell-55",
    component: <Error />,
    layout: "/admin",
  },
  {
    path: "/per-day",
    name: "Por dia",
    icon: "nc-icon nc-single-02",
    component: <Day />,
    layout: "/admin",
  },
];
export default routes;
