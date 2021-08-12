<template>
  <q-page class="flex flex-center">
    <div class="column">

<!-- 로컬 이메일 로그인 -->
      <q-btn
        class="q-my-sm"
        rounded
        color="blue-grey-9"
        @click="$router.push('/login/local')"
      >
        <div class="fit row flex">
          <div>
            <q-avatar icon="email" color="blue-grey-9" text-color="white" size="34px" font-size="14px"/>
          </div>
          <div class="text-subtitle1 absolute-center">
            이메일로 로그인
          </div>
        </div>
      </q-btn>

<!-- 카카로 로그인 -->
      <q-btn
        class="kakao q-my-sm"
        rounded
        @click="loginKakao(true)"
      >
        <div class="fit row flex">
          <div>
            <q-avatar size="34px">
              <img src="https://developers.kakao.com/assets/img/about/logos/kakaolink/kakaolink_btn_medium.png" />
            </q-avatar>
          </div>
          <div>
            <div class="text-subtitle1 absolute-center">
              카카오로 로그인
            </div>
          </div>
        </div>
      </q-btn>

<!-- 네이버 로그인 -->
      <q-btn
        class="naver q-my-sm"
        rounded
        @click="loginNaver(true)"
      >
        <div class="fit row flex">
          <div>
            <q-avatar size="34px">
              <img src="~/assets/naver.png" />
            </q-avatar>
          </div>
          <div>
            <div class="text-subtitle1 absolute-center text-white">
              네이버로 로그인
            </div>
          </div>
        </div>
      </q-btn>

<!-- 페이스북으로 로그인 -->
      <q-btn
        class="facebook q-my-sm"
        rounded
        @click="loginFacebook(true)"
      >
        <div class="fit row flex">
          <div>
            <q-avatar size="34px">
              <img src="~/assets/facebook.png" />
            </q-avatar>
          </div>
          <div>
            <div class="text-subtitle1 absolute-center text-white">
              페이스북으로 로그인
            </div>
          </div>
        </div>
      </q-btn>

<!-- 회원 가입 -->
      <router-link
        class="q-mt-sm"
        to="/register"
      >
        <div class="fit row flex flex-center text-body2">
          회원 가입
        </div>
      </router-link>
    </div>
  </q-page>
</template>

<script>
import userApi from '../../../mixins/users'
import kakaoApi from '../../../mixins/kakao'
import naverApi from '../../../mixins/naver'
import facebookApi from '../../../mixins/facebook'

export default {
  mixins: [userApi, kakaoApi, naverApi, facebookApi],
  data () {
    return {
      //
    }
  },
  mounted () {
    if (!window.naver) {
      this.loginFromNaver(true)
    } else {
      this.initLoginFromNaver(true)
    }
    this.$socket.auth = { id: '1234' }
    this.$socket.connect()
  },
  beforeDestroy () {
    this.$socket.disconnect()
  },
  methods: {
    //
  }
}
</script>

<style>
.kakao {
  background: #FEE500;
  width: 400px;
}
.naver {
  background: #03C75A;
  width: 400px
}
.facebook {
  background: #4267b2;
  width: 400px
}
</style>
