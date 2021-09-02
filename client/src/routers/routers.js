import Vue from "vue";
import VueRouter from "vue-router";
import { store } from '@/store/store';
import Home from "@/components/Home";
import LogIn from "@/components/LogIn";
import Register from "@/components/Register";
import Basket from "@/components/Basket";
import Order from "@/components/Order";
import User from "@/components/User";

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
    path: "/register",
    name: "Register",
    component: Register
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
  },
  {
    path: "/user",
    name: "User",
    component: User
  }

]
const router = new VueRouter({
    mode: "history",
    //base: process.env.BASE_URL,
    store,
    routes
});

router.beforeResolve((to, from, next) => {
  if ((to.name == 'User' || to.name == 'Order') && !(store.getters.isAuthenticated)) next({ name: 'LogIn' })
  else next()
})

export default router

  