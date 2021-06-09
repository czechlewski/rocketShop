import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/components/Home";
import LogIn from "@/components/LogIn";
import Basket from "@/components/Basket";

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
  }
]
const router = new VueRouter({
    mode: "history",
    //base: process.env.BASE_URL,
    routes
});
export default router;