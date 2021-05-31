export default {
  data () {
    return {
      kakaoUserInfo: null
    }
  },
  mounted () {
    console.log('kakao')
    if (!window.Kakao) { this.initKakao() }
  },
  methods: {
    initKakao () {
      const scriptKakao = document.createElement('script')
      scriptKakao.onload = () => this.loadKakao()
      scriptKakao.src = 'https://developers.kakao.com/sdk/js/kakao.js'
      document.head.appendChild(scriptKakao)
    },
    loadKakao () {
      window.Kakao.init(process.env.KAKAO_ID)
    },
    getKakaoUserInfo (mode) {
      if (window.Kakao.isInitialized()) {
        window.Kakao.Auth.login({
          scope: 'account_email',
          success: () => {
            window.Kakao.API.request({
              url: '/v2/user/me',
              success: res => {
                if (res.kakao_account.has_email) {
                  const userInfo = {
                    id: res.id,
                    name: res.properties.nickname,
                    nickname: res.properties.nickname,
                    profile_image: res.properties.profile_image,
                    email: res.kakao_account.email,
                    provider: 'kakao',
                    createAt: Date.now(),
                    updateAt: Date.now()
                  }
                  if (mode) {
                    this.login('kakao', userInfo)
                  } else {
                    this.register(userInfo)
                  }
                } else {
                  this.$q.notify({
                    type: 'negative',
                    message: '계정 정보에 이메일 정보가 없습니다. 다른 방법을 시도해 주세요',
                    position: 'center',
                    timeout: 1000
                  })
                  return this.$router.push('/register')
                }
              }
            })
          }
        })
      } else {
        this.$q.notify({
          type: 'negative',
          message: '에러가 발생했습니다. 잠시후에 다시 시도해 주세요',
          position: 'center',
          timeout: 1000
        })
      }
    },
    async loginKakao () {
      this.getKakaoUserInfo('login')
    },
    registerKakao () {
      this.getKakaoUserInfo('register')
    }
  }
}
