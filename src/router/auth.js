const auth = [
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
  }
]

export default auth
