
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/PageHome.vue'),name:'Home' },
      { path: '/Test', component: () => import('src/pages/Test.vue') },
      { path: '/Test2', component: () => import('src/pages/Test2.vue') },
      { path: '/about', component: () => import('src/pages/PageAbout.vue'),name:'About' }
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
