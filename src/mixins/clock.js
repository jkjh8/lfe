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
        this.time = moment().format('YYYY-MM-DD h:mm:ss a dddd')
      }, 1000)
    }
  }
}
