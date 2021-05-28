import { Store } from '../store'
const routes = [
  {
    path: '/',
    component: () => import('layouts/DefaultLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') }
    ]
  },
  {
    path: '/login',
    component: () => import('layouts/DefaultLayout.vue'),
    children: [
      { path: '', component: () => import('pages/user/login.vue') }
    ]
  },
  {
    path: '/register',
    component: () => import('layouts/DefaultLayout.vue'),
    children: [
      { path: '', component: () => import('pages/user/register.vue') }
    ]
  },
  {
    path: '/logs',
    component: () => import('layouts/DefaultLayout.vue'),
    children: [
      { path: '', component: () => import('pages/LogView.vue') }
    ],
    beforeEnter: async (to, from, next) => {
      const r = await Store.getters['user/user']
      console.log('before Enter', r)
      next()
    }
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
