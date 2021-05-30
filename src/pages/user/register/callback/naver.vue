<template>
  <q-page class="flex flex-center">
    <div>
      로그인중입니다.
    </div>
  </q-page>
</template>

<script>
import naverApi from '../../../../mixins/naver'
export default {
  mixins: [naverApi],
  data () {
    return {
      naverLogin: null
    }
  },
  mounted () {
    this.naverLoginCb()
  },
  methods: {
    // initNaver () {
    //   const scriptNaver = document.createElement('script')
    //   scriptNaver.onload = () => this.onloaded()
    //   scriptNaver.src = 'https://static.nid.naver.com/js/naveridlogin_js_sdk_2.0.0.js'
    //   document.head.appendChild(scriptNaver)
    // },
    // onloaded () {
    //   console.log(window.naver)
    //   this.naverLogin = new window.naver.LoginWithNaverId({
    //     clientId: process.env.NAVER_ID
    //   })
    //   this.naverLogin.init()
    //   this.naverLogin.getLoginStatus(res => {
    //     console.log(res, this.naverLogin.user)
    //   })
    // }
  }
}
</script>
