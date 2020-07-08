import EventService from '@/services/EventService'

export default {
  namespaced: true,
  state: {
    events: [],
    eventsTotal: 0,
    event: {}
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
    createEvent({ commit, dispatch, rootState }, event) {
      // rootstate give me acess to the root of my Vuex state  rootstate.module.state.nae
      console.log('User creating Event is ' + rootState.user.user.name)
      dispatch('actionToCall') // we don't need to mention what module actionToCall is in , This is becaus by default all our actions mutations and getters are located in the global namespaces
      return EventService.postEvent(event).then(() =>
        commit('ADD_EVENT', event)
      )
    },
    fetchEvents({ commit }, { perPage, page }) {
      // commit stand for context object
      EventService.getEvents(perPage, page)
        .then(response => {
          commit('SET_EVENTS', response.data)
          commit('SET_EVENTS_TOTAL', response.headers['x-total-count'])
        })
        .catch(error => console.log(error))
    },
    fetchEvent({ commit, getters }, id) {
      const event = getters.getEventById(id)
      if (event) {
        commit('SET_EVENT', event)
      } else {
        EventService.getEvent(id)
          .then(response => {
            commit('SET_EVENT', response.data)
          })
          .catch(error => {
            console.log('There was an error :', error.response)
          })
      }
    }
  },

  getters: {
    getEventById: state => id => {
      return state.events.find(event => event.id === id)
    }
  }
}
