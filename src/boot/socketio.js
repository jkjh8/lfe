import Vue from 'vue'
import io from 'socket.io-client'

const socket = io(`http://${window.location.hostname}:3000`, {
  withCredentials: true,
  reconnectionDelayMax: 1000,
  autoConnect: false
})

socket.on('connect', () => {
  console.log('connect', socket.connected, socket.id)
})

Vue.prototype.$socket = socket
