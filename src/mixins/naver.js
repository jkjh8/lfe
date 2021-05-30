export default {
  data () {
    return {
      naverLogin: null
    }
  },
  mounted () {
    if (!window.naver) { this.initNaver() }
  },
  methods: {
    initNaver () {
      const script = document.createElement('script')
      script.onload = () => this.loadNaver()
      script.src = 'https://static.nid.naver.com/js/naveridlogin_js_sdk_2.0.0.js'
      document.head.appendChild(script)
    },
    loadNaver () {
      console.log(window.naver)
      this.naverLogin = new window.naver.LoginWithNaverId({
        clientId: process.env.NAVER_ID,
        callbackUrl: 'http://localhost:8080/login/naverCallback',
        callbackHandle: true,
        isPopup: true
      })
      this.naverLogin.init()
    },
    async loginNaver () {
      this.naverLogin.reprompt()
    }
  }
}
