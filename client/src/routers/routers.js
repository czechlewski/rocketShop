﻿import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/components/Home";
import LogIn from "@/components/LogIn";
import Basket from "@/components/Basket";
import Order from "@/components/Order";

Vue.use(VueRouter);

const routes = [
    {
      path: "/",
      name: "Home",
      component: Home
    },
    {
      path: "/login",
      name: "LogIn",
      component: LogIn
  },
  {
    path: "/basket",
    name: "Basket",
    component: Basket
  },
  {
    path: "/order",
    name: "Order",
    component: Order
  }

]
const router = new VueRouter({
    mode: "history",
    //base: process.env.BASE_URL,
    routes
});
export default router;