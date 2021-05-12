
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/PageHome.vue'),name:'Home' },
      { path: '/Test', component: () => import('src/pages/Test.vue') },
      { path: '/Login', component: () => import('src/pages/Login.vue') },
      { path: '/Register', component: () => import('src/pages/Register.vue') },
      { path: '/About', component: () => import('src/pages/PageAbout.vue'),name:'About' },
      { path: '/logout', component: () => import('src/pages/Logout.vue'),name:'Logout' },
    ]
  },
  

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
