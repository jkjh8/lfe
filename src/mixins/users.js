export default {
  data () {
    return {
      idSave: false,
      header: {},
      loginUrl: '/auth/local',
      userInfo: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    login (mode, userInfo) {
      if (mode === 'local') {
        this.loginUrl = '/auth/local'
      } else {
        this.loginUrl = '/auth/oauth'
      }
      this.$axios.post(this.loginUrl, userInfo).then(async (res) => {
        // await this.updateUserInfoToCookie(res.data)
        this.getUserInfo()
        this.$q.notify({
          type: 'positive',
          message: '로그인 성공하였습니다.',
          position: 'center',
          timeout: 1000
        })
        setTimeout(() => {
          this.$router.push('/')
        }, 1500)
      }).catch((err) => {
        this.$q.notify({
          type: 'negative',
          message: err.response.data.info.message,
          position: 'center',
          timeout: 1000
        })
        this.$router.push('/login')
      })
    },
    register (userInfo) {
      this.$axios.post('/auth/local/register', userInfo).then((res) => {
        console.log(res)
        this.$q.notify({
          type: 'positive',
          message: '회원가입에 성공하였습니다. 로그인 페이지로 이동합니다.',
          position: 'center',
          timeout: 1000
        })
        setTimeout(() => {
          this.$router.push('/login')
        }, 1000)
      }).catch((err) => {
        this.$q.notify({
          type: 'negative',
          message: err.response.data.message,
          position: 'center',
          timeout: 1000
        })
        this.$router.push('/register')
      })
    },
    checkIdSave () {
      this.idSave = localStorage.getItem('idSave') === 'true'
      if (this.idSave) {
        this.userInfo.email = localStorage.getItem('userId')
      }
    },
    setIdSave () {
      localStorage.setItem('idSave', this.idSave)
      this.setUserId()
    },
    clearUserId () {
      localStorage.setItem('idSave', this.idSave)
      localStorage.removeItem('userId')
    },
    setUserId () {
      localStorage.setItem('userId', this.userInfo.email)
    },
    getUserInfo () {
      this.$axios.get('/auth/get').then((res) => {
        this.$store.commit('user/updateUser', res.data.user)
      }).catch((err) => {
        console.log(err.response.data)
      })
    },
    getAccessToken () {
      console.log('not token')
    },
    logout () {
      this.$axios.get('/auth/logout').then((res) => {
        this.$store.commit('user/updateUser', null)
        this.$store.commit('eventlog/updateLog', [])
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
