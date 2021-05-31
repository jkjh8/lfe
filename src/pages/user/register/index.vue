<template>
  <q-page class="flex flex-center">
    <div class="column">

<!-- 이메일 회원가입 -->
      <q-btn
        class="q-my-sm"
        rounded
        color="blue-grey-9"
        @click="$router.push('/register/local')"
      >
        <div class="fit row flex">
          <div>
            <q-avatar icon="email" color="blue-grey-9" text-color="white" size="34px" font-size="14px"/>
          </div>
          <div class="text-subtitle1 absolute-center">
            이메일로 회원가입
          </div>
        </div>
      </q-btn>

<!-- 카카오 회원가입 -->
      <q-btn
        class="kakao q-my-sm"
        rounded
        @click="registerKakao(false)"
      >
        <div class="fit row flex">
          <div>
            <q-avatar size="34px">
              <img src="https://developers.kakao.com/assets/img/about/logos/kakaolink/kakaolink_btn_medium.png" />
            </q-avatar>
          </div>
          <div>
            <div class="text-subtitle1 absolute-center">
              카카오로 회원가입
            </div>
          </div>
        </div>
      </q-btn>

<!-- 네이버 회원가입 -->
      <q-btn
        class="naver q-my-sm"
        rounded
        @click="loginNaver(false)"
      >
        <div class="fit row flex">
          <div>
            <q-avatar size="34px">
              <img src="~/assets/naver.png" />
            </q-avatar>
          </div>
          <div>
            <div class="text-subtitle1 absolute-center text-white">
              네이버로 회원가입
            </div>
          </div>
        </div>
      </q-btn>

<!-- 네이버 회원가입 -->
      <q-btn
        class="facebook q-my-sm"
        rounded
        @click="loginFacebook(false)"
      >
        <div class="fit row flex">
          <div>
            <q-avatar size="34px">
              <img src="~/assets/facebook.png" />
            </q-avatar>
          </div>
          <div>
            <div class="text-subtitle1 absolute-center text-white">
              페이스북으로 회원가입
            </div>
          </div>
        </div>
      </q-btn>

<!-- 회원 가입 취소 -->
      <router-link
        class="q-mt-sm"
        to="/login"
      >
        <div class="fit row flex flex-center text-body2">
          회원가입 취소
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
      this.loginFromNaver(false)
    } else {
      this.initLoginFromNaver(false)
    }
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
