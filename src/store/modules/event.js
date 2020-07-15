import EventService from '@/services/EventService'

export default {
  namespaced: true,
  state: {
    events: [],
    eventsTotal: 0,
    event: {},
    perPage: 3
  },

  mutations: {
    ADD_EVENT(state, event) {
      state.events.push(event)
    },
    SET_EVENTS(state, events) {
      state.events = events
    },
    SET_EVENTS_TOTAL(state, eventsTotal) {
      state.eventsTotal = eventsTotal
    },
    SET_EVENT(state, event) {
      state.event = event
    }
  },

  actions: {
    createEvent({ commit, dispatch }, event) {
      return EventService.postEvent(event)
        .then(() => {
          commit('ADD_EVENT', event)
          const notification = {
            type: 'success',
            message: 'Your event has been created !'
          }
          dispatch('notification/add', notification, { root: true })
        })
        .catch(error => {
          const notification = {
            type: 'error',
            message: 'There was a problem creating your event :' + error.message
          }
          dispatch('notification/add', notification, { root: true })
          throw error // We’ll also need to throw the error so that we can propagate it up to our component
        })
    },
    fetchEvents({ commit, dispatch, state }, { page }) {
      // We add a return to our EventService so we can only render our EventList component when the call is finished
      return EventService.getEvents(state.perPage, page)
        .then(response => {
          commit('SET_EVENTS', response.data)
          commit(
            'SET_EVENTS_TOTAL',
            parseInt(response.headers['x-total-count'])
          )
        })
        .catch(error => {
          const notification = {
            type: 'error',
            message: 'There was a problem fetching events: ' + error.message
          }
          // we pass the notification as payload wher we are dispatching the Action Since our notification module is namespaced we  dispatch the add Action
          // with 'notification/add', The third argument here , { root: true } is important, This tells dispatch to look for a notification/add action at the root of our store instead of just looking for it inside the module we're currently in
          dispatch('notification/add', notification, { root: true })
        })
    },
    fetchEvent({ commit, getters }, id) {
      const event = getters.getEventById(id)
      if (event) {
        commit('SET_EVENT', event)
        return event
      } else {
        return EventService.getEvent(id)
          .then(response => {
            commit('SET_EVENT', response.data)
          })
          // .catch(error => {
          //   const notification = {
          //     type: 'error',
          //     message:
          //       'There was a problem fetching this event: ' + error.message
          //   }
          //   dispatch('notification/add', notification, { root: true })
          // })
      }
    }
  },

  getters: {
    getEventById: state => id => {
      return state.events.find(event => event.id === id)
    }
  }
}
