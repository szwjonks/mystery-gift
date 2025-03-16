import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/IndexPage.vue'),
      },
      {
        path: '0',
        name: '0',
        component: () => import('pages/0_EncryptedDescription.vue'),
      },
      {
        path: '1',
        name: '1',
        component: () => import('pages/1_FamilyCrossword.vue'),
      },
      {
        path: '2',
        name: '2',
        component: () => import('pages/2_Radiator.vue'),
      },
      {
        path: '3',
        name: '3',
        component: () => import('pages/3_Recipe.vue'),
      },
      {
        path: '4_old',
        name: '4_old',
        component: () => import('pages/4_Glasshouse.vue'),
      },
      {
        path: '4',
        name: '4',
        component: () => import('pages/4_Capital.vue'),
      },
      {
        path: '5',
        name: '5',
        component: () => import('pages/5_Ducks.vue'),
      },
      {
        path: 'szyfr',
        name: 'encryption',
        component: () => import('pages/TheEncryption.vue'),
      },
      {
        path: 'morse',
        name: 'morse',
        component: () => import('pages/MorseCode.vue'),
      },
      {
        path: 'base64',
        name: 'base64',
        component: () => import('pages/Base64Encoded.vue'),
      },
      {
        path: 'piano',
        name: 'piano',
        component: () => import('pages/TestPiano.vue'),
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
