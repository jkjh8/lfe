import Vue from 'vue'
import io from 'socket.io-client'

const socket = io(`http://${window.location.hostname}:3000`, {
  withCredentials: true
})

Vue.prototype.$socket = socket
