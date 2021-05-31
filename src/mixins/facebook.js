export default {
  data () {
    return {
      facebookUserInfo: null
    }
  },
  mounted () {
    console.log('facebook')
    if (!window.FB) { this.initFacebook() }
  },
  methods: {
    initFacebook () {
      window.fbAsyncInit = function () {
        window.FB.init({
          appId: process.env.FACEBOOK_ID,
          cookie: true,
          xfbml: true,
          version: 'v10.0'
        })

        window.FB.AppEvents.logPageView()
      };

      (function (d, s, id) {
        // eslint-disable-next-line prefer-const
        let js, fjs = d.getElementsByTagName(s)[0]
        if (d.getElementById(id)) { return }
        // eslint-disable-next-line prefer-const
        js = d.createElement(s); js.id = id
        js.src = 'https://connect.facebook.net/en_US/sdk.js'
        fjs.parentNode.insertBefore(js, fjs)
      }(document, 'script', 'facebook-jssdk'))
    },
    loginFacebook (mode) {
      window.FB.getLoginStatus(() => {
        window.FB.login(response => {
          if (response.status === 'connected') {
            // const accessToken = response.authResponse.accessToken
            window.FB.api('/me', { fields: 'name, email, picture' }, res => {
              if (!res) return this.loginFailure()
              const userInfo = {
                id: res.id,
                name: res.name,
                nickname: res.name,
                profile_image: res.picture.data.url,
                email: res.email,
                provider: 'facebook',
                createAt: Date.now(),
                updateAt: Date.now()
              }
              console.log(res)
              console.log(mode)
              if (mode) {
                this.login('kakao', userInfo)
              } else {
                this.register(userInfo)
              }
            })
          }
        }, { scope: 'public_profile, email' })
      })
    },
    loginFailure () {
      this.$q.notify({
        type: 'negative',
        message: '로그인 할 수 없습니다. 다른 방법을 선택하거나 잠시 후에 시도해주세요.',
        position: 'center',
        timeout: 1000
      })
      return this.$router.go(-1)
    }
  }
}
