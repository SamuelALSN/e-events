import Vue from 'vue'
import VueRouter from 'vue-router'
import EventList from '../views/EventList'
import EventShow from '../views/EventShow'
import EventCreate from '../views/EventCreate'
import NotFound from '../components/NotFound'
import NProgress from 'nprogress'
import store from '@/store/'
import NetworkIssue from '../components/NetworkIssue'
import Example from '../views/Example'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'event-list',
    component: EventList,
    props: true // route => ({
    //   page: route.params.page,
    //   perPage: route.params.perPage,
    //   events: route.params.event,
    //   eventsTotal: route.params.eventsTotal
    // })
  },
  {
    path: '/event/:id',
    name: 'event-show',
    component: EventShow,
    props: true,
    beforeEnter(routeTo, routeFrom, next) {
      // Per route guards
      store
        .dispatch('event/fetchEvent', routeTo.params.id)
        .then(event => {
          routeTo.params.event = event
          next()
        })
        .catch(error => {
          if (error.response && error.response.status === 404) {
            next({ name: '404', params: { resource: 'event' } })
          } else {
            next({ name: 'network-issue' })
          }
        })
    }
  },
  {
    path: '/event/create',
    name: 'event-create',
    component: EventCreate
  },
  {
    path: '/404',
    name: '404',
    component: NotFound,
    props: true
  },
  {
    path: '/network-issue',
    name: 'network-issue',
    component: NetworkIssue
  },
  {
    path: '/example',
    component: Example
  },
  {
    path: '*',
    redirect: { name: '404', params: { resource: 'page' } }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((routeTo, routeFrom, next) => {
  NProgress.start()
  next()
})

router.afterEach(() => {
  NProgress.done()
})

export default router
