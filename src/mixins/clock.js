import moment from 'moment'
export default {
  data () {
    return {
      time: ''
    }
  },
  methods: {
    clock () {
      moment.locale('ko')
      this.$store.commit('clock/updateTime', moment())
      setInterval(() => {
        this.$store.commit('clock/updateTime', moment())
      }, 1000)
    }
  }
}
