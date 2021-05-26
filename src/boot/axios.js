import Vue from 'vue'
import axios from 'axios'
axios.defaults.baseURL = `http://${window.location.hostname}:3000`
Vue.prototype.$axios = axios
