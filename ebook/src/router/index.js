import Vue from 'vue'
import Router from 'vue-router'
import Cookies from 'js-cookie'

Vue.use(Router)
function loadView (view) {
  return () => import(/* webpackChunkName: "view-[request]" */ `../components/${view}.vue`)
}

Vue.use(Router)

const router = new Router({
  // ordinary user pages
  routes: [
    {
      path: '/',
      component: loadView('user/layout'),
      children: [
        {
          path: '',
          name: 'homepage',
          component: loadView('user/display/homepage')
        },
        {
          path: 'market',
          name: 'market',
          component: loadView('user/display/market')
        },
        {
          path: 'book_detail/:id',
          name: 'book',
          component: loadView('user/display/book_detail')
        },
        {
          path: 'search_for/:keyword',
          name: 'search_for',
          component: loadView('user/display/search/search_res')
        },
        {
          path: 'collections',
          name: 'collections',
          component: loadView('user/display/collections/collection')
        },
        {
          path: 'sell',
          name: 'sell',
          component: loadView('user/display/sellers/sell')
        },
        {
          path: 'account',
          name: 'account',
          component: loadView('user/display/account/index')
        }
      ]
    },
    // user account pages
    {
      path: '/user/register',
      name: 'register',
      component: loadView('user/user_sys/register')
    },
    {
      path: '/user/login',
      name: 'login',
      component: loadView('user/user_sys/login')
    },
    // admin pages
    {
      path: '/admin',
      component: loadView('admin/layout'),
      children: [
        {
          path: '',
          name: 'ad_index',
          component: loadView('admin/index')
        },
        {
          path: 'book',
          name: 'ad_book',
          component: loadView('admin/books/index')
        },
        {
          path: 'user',
          name: 'ad_user',
          component: loadView('admin/users/index')
        },
        {
          path: 'order',
          name: 'ad_order',
          component: loadView('admin/orders/index')
        },
        {
          path: 'data',
          name: 'ad_data',
          component: loadView('admin/data/index')
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.name !== 'login' && to.name !== 'register' && to.name.substr(0, 2) !== 'ad') {
    const isLogin = Cookies.get('login')
    if (isLogin === 'USER' || isLogin === 'ADMIN') {
      next()
    } else {
      router.push({name: 'login'})
    }
  } else if (to.name.substr(0, 2) === 'ad') {
    const isLogin = Cookies.get('login')
    if (isLogin === 'ADMIN') {
      next()
    } else {
      router.push({name: 'homepage'})
    }
  } else {
    next()
  }
})

export default router
