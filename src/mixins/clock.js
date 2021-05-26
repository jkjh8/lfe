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
      setInterval(() => {
        this.time = moment()
      }, 1000)
    }
  }
}
