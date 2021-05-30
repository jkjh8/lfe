<template>
  <q-page>
  </q-page>
</template>

<script>
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
      const scriptNaver = document.createElement('script')
      scriptNaver.onload = () => this.onloaded()
      scriptNaver.src = 'https://static.nid.naver.com/js/naveridlogin_js_sdk_2.0.0.js'
      document.head.appendChild(scriptNaver)
    },
    onloaded () {
      console.log(window.naver)
      this.naverLogin = new window.naver.LoginWithNaverId({
        clientId: process.env.NAVER_ID
      })
      this.naverLogin.init()
      this.naverLogin.getLoginStatus(res => {
        console.log(res, this.naverLogin.user)
      })
    }
  }
}
</script>
