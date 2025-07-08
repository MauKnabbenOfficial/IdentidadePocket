import { createRouter, createWebHistory } from "@ionic/vue-router";
import { RouteRecordRaw } from "vue-router";
import Login from "@/views/Login.vue";
import TabsPage from "@/views/TabsPage.vue";
import { isLoggedIn, isLoggedInAsync } from "@/utils/auth";
import PrimeiroAcessoPage from "@/views/PrimeiroAcessoPage.vue";
import ColetaPage from "@/views/ColetaPage.vue";

const routes: Array<RouteRecordRaw> = [
  { path: "/", redirect: "/login" },
  { path: "/login", component: Login },
  // {
  //   path: '/tabs/',
  //   component: TabsPage,
  //   children: [
  //     { path: 'etapa1', component: () => import('@/views/Tab1Page.vue') },
  //     { path: 'etapa2', component: () => import('@/views/Tab2Page.vue') },
  //     { path: 'etapa3', component: () => import('@/views/Tab3Page.vue') }
  //   ]
  // },
  { path: "/primeiroAcesso", component: PrimeiroAcessoPage },
  { path: "/coletaPage", component: ColetaPage },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const isLoggedIn = await isLoggedInAsync();

  debugger;

  if (
    (to.path.startsWith("/primeiroAcesso") ||
      to.path.startsWith("/coletaPage")) &&
    !isLoggedIn
  ) {
    next("/login");
  } else if (to.path.startsWith("/primeiroAcesso")) {
    if (sessionStorage.getItem("userInfo")) next("/coletaPage");
    else next();
  } else if (to.path.startsWith("/coletaPage")) {
    if (sessionStorage.getItem("userInfo")) next();
    else next("/primeiroAcesso");
  } else next();
});

export default router;
