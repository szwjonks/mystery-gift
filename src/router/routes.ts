import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: '0',
        component: () => import('pages/IndexPage.vue'),
      },
      {
        path: '1',
        name: '1',
        component: () => import('pages/1_EncryptedDescription.vue'),
      },
      {
        path: '2',
        name: '2',
        component: () => import('pages/2_FirstHint.vue'),
      },
      {
        path: '3',
        name: '3',
        component: () => import('pages/3_SecondHint.vue'),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
