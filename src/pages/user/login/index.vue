<template>
  <q-page class="flex flex-center">
    <div class="column">

<!-- 로컬 이메일 로그인 -->
      <q-btn
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
        class="q-px-xl q-py-sm q-my-sm"
        outline
        color="yellow-14"
        @click="loginKakao"
      >
        <div>
          <q-avatar size="34px">
            <img src="https://developers.kakao.com/assets/img/about/logos/kakaolink/kakaolink_btn_medium.png" />
          </q-avatar>
        </div>
        <q-item-section>
          <div class="text-h6 q-ml-lg q-mr-sm text-amber-8">
            카카오로 로그인
          </div>
        </q-item-section>
      </q-btn>

<!-- 네이버 로그인 -->
      <q-btn
        class="q-px-xl q-py-sm q-my-sm"
        outline
        color="green"
        @click="loginNaver"
      >
        <div>
          <q-avatar size="34px">
            <img src="~/assets/naver.png" />
          </q-avatar>
        </div>
        <div>
          <div class="text-h6 q-ml-lg q-mr-sm">
            네이버로 로그인
          </div>
        </div>
      </q-btn>

<!-- 회원 가입 -->
      <router-link
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

export default {
  mixins: [userApi, kakaoApi, naverApi],
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
  },
  methods: {
    //
  }
}
</script>

<style>

</style>
