import Vue from 'vue'
import VueRouter from 'vue-router'

const TheContainer = () => import('@/containers/TheContainer')
import Dashboard from './views/Dashboard'
import Home from './views/Home'
import Login from './views/Login'
import Blog from './views/Blog'

Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'hash',
    linkActiveClass: 'active',
    scrollBehavior: () => ({ y: 0 }),
    routes: [
        {
            path: '/',
            name: 'Home',
            component: TheContainer,
            children: [
              {
                path: '/dashboard',
                name: 'Dashboard',
                component: Dashboard,
                meta: { requiresAuth: true }
              },
              {
                path: '/blog',
                name: 'Blog',
                component: Blog,
                meta: { requiresAuth: true }
              }
            ],
            meta: { requiresAuth: true }
        },
        {
          path: '/login',
          name: 'Login',
          component: Login
        },
        // {
        //     path: '/dashboard',
        //     name: 'dashboard',
        //     component: Dashboard,
        //     meta: { requiresAuth: true }
        // },
        // {
        //     path: '/blog',
        //     name: 'blog',
        //     component: Blog,
        //     meta: { requiresAuth: true }
        // },
    ],
});

function isLoggedIn() {
    return localStorage.getItem('isLoggedIn')
}

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
      // this route requires auth, check if logged in
      // if not, redirect to login page.
      if (!isLoggedIn()) {
        next({
          path: '/login'
        })
      } else {
        next()
      }
    } else {
      next() // make sure to always call next()!
    }
})

export default router
