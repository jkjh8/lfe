<template>
  <q-page>
  </q-page>
</template>

<script>
import userApi from '../../../../mixins/users'

export default {
  mixins: [userApi],
  data () {
    return {
      naverLogin: null,
      src: 'https://static.nid.naver.com/js/naveridlogin_js_sdk_2.0.0.js'
    }
  },
  mounted () {
    if (!window.naver) {
      this.initNaverCb(true)
    } else {
      this.setNaverCb(true)
    }
  },
  methods: {
    initNaverCb () {
      const scriptNaver = document.createElement('script')
      scriptNaver.onload = () => this.setNaverCb()
      scriptNaver.src = this.src
      document.head.appendChild(scriptNaver)
    },
    setNaverCb () {
      console.log(window.naver)
      this.naverLogin = new window.naver.LoginWithNaverId({
        clientId: process.env.NAVER_ID
      })
      this.naverLogin.init()
      this.naverLogin.getLoginStatus(() => {
        const userInfo = {
          id: this.naverLogin.user.id,
          name: this.naverLogin.user.name,
          nickname: this.naverLogin.user.nickname,
          email: this.naverLogin.user.email,
          profile_image: this.naverLogin.user.profile_image,
          provider: 'naver',
          createAt: Date.now(),
          updateAt: Date.now()
        }
        this.login('naver', userInfo)
      })
    }
  }
}
</script>
