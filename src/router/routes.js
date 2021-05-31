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
  {
    path: '/user/profile',
    component: () => import('layouts/DefaultLayout.vue'),
    children: [
      { path: '', component: () => import('pages/user/profile.vue') }
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
