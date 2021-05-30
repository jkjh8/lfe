import { Store } from '../store'
import axios from 'axios'
axios.defaults.baseURL = `http://${window.location.hostname}:3000`

async function getUser (to, from, next) {
  const r = await Store.getters['user/user']
  if (!r) {
    axios.get('/auth/get').then((res) => {
      Store.commit('user/updateUser', res.data.user)
    })
  }
}

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
      { path: '', component: () => import('src/pages/user/login/index.vue') }
    ]
  },
  {
    path: '/login/local',
    component: () => import('layouts/DefaultLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/user/login/local.vue') }
    ]
  },
  {
    path: '/login/callback/naver',
    component: () => import('layouts/DefaultLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/user/login/callback/naver.vue') }
    ]
  },
  {
    path: '/register',
    component: () => import('layouts/DefaultLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/user/register/index.vue') }
    ]
  },
  {
    path: '/register/local',
    component: () => import('layouts/DefaultLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/user/register/local.vue') }
    ]
  },
  {
    path: '/register/callback/naver',
    component: () => import('layouts/DefaultLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/user/register/callback/naver.vue') }
    ]
  },
  {
    path: '/logs',
    component: () => import('layouts/DefaultLayout.vue'),
    children: [
      { path: '', component: () => import('pages/LogView.vue') }
    ],
    beforeEnter: async (to, from, next) => {
      getUser(to, from, next)
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
