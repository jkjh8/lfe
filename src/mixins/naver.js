export default {
  data () {
    return {
      naverLogin: null,
      src: 'https://static.nid.naver.com/js/naveridlogin_js_sdk_2.0.0.js',
      loginCb: 'http://localhost:8080/login/callback/naver',
      registerCb: 'http://localhost:8080/register/callback/naver'
    }
  },
  mounted () {
    //
  },
  methods: {
    loginFromNaver (mode) {
      const script = document.createElement('script')
      script.onload = () => this.initLoginFromNaver(mode)
      script.src = this.src
      document.head.appendChild(script)
    },
    initLoginFromNaver (url) {
      this.naverLogin = new window.naver.LoginWithNaverId({
        clientId: process.env.NAVER_ID,
        callbackUrl: url ? this.loginCb : this.registerCb,
        callbackHandle: true,
        isPopup: true
      })
      this.naverLogin.init()
    },
    loginNaver () {
      this.naverLogin.reprompt()
    }
  }
}
