export default {
  data () {
    return {
      //
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
      console.log('kakao onload')
      window.Kakao.init(process.env.KAKAO_ID)
    },
    loginKakao () {
      console.log(window.Kakao.isInitialized())
      window.Kakao.Auth.login({
        scope: 'account_email',
        success: this.getKakaoUserInfo
      })
    },
    getKakaoUserInfo () {
      window.Kakao.API.request({
        url: '/v2/user/me',
        success: res => {
          console.log(res)
        }
      })
    }
  }
}
