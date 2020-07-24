/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

import Vue from 'vue'
import App from './views/App'
import router from './router'
import CoreuiVue from '@coreui/vue'
import { iconsSet as icons } from './assets/icons/icons.js'
import store from './store'

Vue.config.performance = true
Vue.use(CoreuiVue)

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

const app = new Vue({
    el: '#app',
    router,
    store,
    icons,
    template: '<App/>',
    components: { App },

});
