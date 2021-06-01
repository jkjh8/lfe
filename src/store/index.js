import Vue from 'vue'
import Vuex from 'vuex'

import user from './user'
import clock from './clock'
import eventlog from './eventlog'
import zones from './zones'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

const Store = new Vuex.Store({
  modules: {
    user,
    clock,
    eventlog,
    zones
  },
  namespaced: true,

  // enable strict mode (adds overhead!)
  // for dev mode only
  strict: process.env.DEBUGGING
})

export default function (/* { ssrContext } */) {
  return Store
}

export { Store }
