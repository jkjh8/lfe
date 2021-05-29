export default {
  data () {
    return {
      idSave: false,
      header: {},
      userInfo: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    login (userInfo) {
      this.$axios.post('/auth/local', userInfo).then(async (res) => {
        // await this.updateUserInfoToCookie(res.data)
        this.getUserInfo()
        this.$q.notify({
          type: 'positive',
          message: '로그인이 성공하였습니다.',
          position: 'center',
          timeout: 1000
        })
        setTimeout(() => {
          this.$router.push('/')
        }, 1500)
      }).catch((err) => {
        console.log(err.response.data)
        this.$q.notify({
          type: 'negative',
          message: err.response.data.info.message,
          position: 'center',
          timeout: 1000
        })
      })
    },
    updateUserInfoToCookie (data) {
      this.$cookie.set('accessToken', data.accessToken)
      this.$cookie.set('refreshToken', data.refreshToken)
      this.$store.commit('user/updateRefreshToken', data.refreshToken)
    },
    checkIdSave () {
      this.idSave = this.$cookie.get('idSave') === 'true'
      if (this.idSave) {
        this.userInfo.email = this.$cookie.get('userId')
      }
    },
    setIdSave () {
      this.$cookie.set('idSave', this.idSave)
      this.setUserId()
    },
    clearUserId () {
      this.$cookie.set('idSave', this.idSave)
      this.$cookie.delete('userId')
    },
    setUserId () {
      this.$cookie.set('userId', this.userInfo.email)
    },
    getUserInfo () {
      const accessToken = this.$cookie.get('accessToken')
      if (!accessToken) return this.getAccessToken()

      this.$axios.get('/auth/get', {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }).then((res) => {
        this.$store.commit('user/updateUser', res.data.user)
        // this.$store.commit('user/updateRefreshToken', res.data.user.refreshToken)
      }).catch((err) => {
        console.log(err.response.data)
      })
    },
    getAccessToken () {
      console.log('not token')
    },
    logout () {
      this.$axios.get('/auth/logout').then((res) => {
        console.log(res)
        this.$cookie.delete('accessToken')
        this.$store.commit('user/updateUser', null)
        this.$router.push('/')
        this.$q.notify({
          type: 'positive',
          message: '로그아웃 완료하였습니다.',
          position: 'center',
          timeout: 1000
        })
      })
    }
  }
}
