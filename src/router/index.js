import { createRouter, createWebHistory } from "vue-router";

const routes = [//路由规则
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: () => import('../views/home.vue')
  },
  {
    path: '/about',
    component: () => import('../views/about.vue')
  },
  {
    path: '/hello',
    component: () => import('../views/hello.vue')
  }
];
const router = createRouter({
  history: createWebHistory(),//根据业务切换
  routes
});
export default router;