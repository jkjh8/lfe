<template>
  <q-page class="flex flex-center">
    <div>
      <q-list>

<!-- 로컬 이메일 로그인 -->
        <q-item
          clickable
          v-ripple
          @click="$router.push('/login/local')"
        >
          <q-item-section avatar>
            <q-avatar icon="email" color="primary" text-color="white" />
          </q-item-section>
          <q-item-section>
            <div class="text-h6">
              이메일로 로그인
            </div>
          </q-item-section>
        </q-item>

<!-- 카카로 로그인 -->
        <q-item
          clickable
          v-ripple
          @click="loginKakao"
        >
          <q-item-section avatar>
            <q-avatar>
              <img src="https://developers.kakao.com/assets/img/about/logos/kakaolink/kakaolink_btn_medium.png" />
            </q-avatar>
          </q-item-section>
          <q-item-section>
            <div class="text-h6">
              카카오톡으로 로그인
            </div>
          </q-item-section>
        </q-item>

<!-- 네이버 로그인 -->
        <q-item
          clickable
          v-ripple
          @click="loginNaver"
        >
          <q-item-section avatar>
            <q-avatar>
              <img src="~/assets/naver.png" />
            </q-avatar>
          </q-item-section>
          <q-item-section>
            <div class="text-h6">
              네이버로 로그인
            </div>
          </q-item-section>
        </q-item>

<!-- 회원 가입 -->
        <q-item clickable v-ripple @click="$router.push('/register')">
          <q-item-section>
            <div class="fit row flex flex-center text-body2">
              회원 가입
            </div>
          </q-item-section>
        </q-item>
      </q-list>
    </div>
  </q-page>
</template>

<script>
import kakaoApi from '../../../mixins/kakao'
import naverApi from '../../../mixins/naver'

export default {
  mixins: [kakaoApi, naverApi],
  data () {
    return {
      //
    }
  },
  mounted () {
    if (!window.naver) { this.loginFromNaver('login') }
  },
  methods: {
    //
  }
}
</script>

<style>

</style>
