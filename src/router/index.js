import { createRouter, createWebHistory } from "vue-router";
import Login from "../components/Login.vue";
import Todos from "../components/Todos.vue";

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
  },
  {
    path: "/todos",
    name: "Todos",
    component: Todos,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
