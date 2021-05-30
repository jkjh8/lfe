<template>
  <q-page class="flex flex-center">
    <div>
      <q-list>
        <q-item
          clickable
          v-ripple
          @click="$router.push('/register/local')"
        >
          <q-item-section avatar>
            <q-avatar icon="email" color="primary" text-color="white" />
          </q-item-section>
          <q-item-section>
            <div class="text-h6">
              이메일로 회원 가입
            </div>
          </q-item-section>
        </q-item>

        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-avatar>
              <img src="https://developers.kakao.com/assets/img/about/logos/kakaolink/kakaolink_btn_medium.png" />
            </q-avatar>
          </q-item-section>
          <q-item-section>
            <div class="text-h6">
              카카오톡으로 회원 가입
            </div>
          </q-item-section>
        </q-item>
      </q-list>
    </div>
  </q-page>
</template>

<script>
export default {
  data () {
    return {
      //
    }
  },
  mounted () {
    //
  },
  methods: {
    //
  }
}
</script>

<style>

</style>
