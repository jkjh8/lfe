export default {
  methods: {
    login (userInfo) {
      this.$axios.post('/auth/local', userInfo).then((res) => {
        console.log(res.data)
      })
    }
  }
}
