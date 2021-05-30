<template>
  <q-page class="flex flex-center">
    <q-form
      @submit="onSubmit"
      @reset="onReset"
    >
      <q-card style="min-width: 500px;">
        <q-card-section class="bg-teal-14">
          <div class="text-h6 text-white">회원가입</div>
        </q-card-section>

        <q-separator />
        <q-card-section>
          <div class="q-mx-md q-mt-md">
            <div>
              <q-input
                outlined
                v-model="userInfo.name"
                label="이름"
                lazy-rules
                :rules="rules.name"
                @keyup.enter="onSubmit"
              />
            </div>
            <div class="q-mt-md">
              <q-input
                outlined
                v-model="userInfo.email"
                label="이메일"
                lazy-rules
                :rules="rules.email"
                @keyup.enter="onSubmit"
              />
            </div>
            <div class="q-mt-md">
              <q-input
                outlined
                v-model="userInfo.password"
                label="비밀번호"
                lazy-rules
                :rules="rules.password"
                :type="show ? 'text' : 'password'"
                @keyup.enter="onSubmit"
              >
                <template v-slot:append>
                  <q-icon :name="show ? 'mdi-eye' : 'mdi-eye-off'" @click="show=!show" />
                </template>
              </q-input>
            </div>
            <div class="q-mt-md">
              <q-input
                outlined
                v-model="userInfo.chkpassword"
                label="비밀번호 확인"
                lazy-rules
                :rules="rules.chkpassword"
                :type="chkshow ? 'text' : 'password'"
                @keyup.enter="onSubmit"
              >
                <template v-slot:append>
                  <q-icon :name="chkshow ? 'mdi-eye' : 'mdi-eye-off'" @click="chkshow=!chkshow" />
                </template>
              </q-input>
            </div>
          </div>
        </q-card-section>

        <q-separator />

        <q-card-actions align="right">
          <q-btn class="q-px-md" label="확인" type="submit" color="teal-14"/>
          <q-btn class="q-px-sm q-ml-sm" label="초기화" type="reset" color="teal-14" flat />
        </q-card-actions>
      </q-card>
    </q-form>
  </q-page>
</template>

<script>
export default {
  data () {
    return {
      show: false,
      chkshow: false,
      userInfo: {
        name: '',
        email: '',
        password: '',
        chkpassword: ''
      },
      rules: {
        name: [value => !!value || 'name is required'],
        email: [value => !!value || 'E-main is required', v => /.+@.+\..+/.test(v) || 'Not in E-mail format'],
        password: [v => v.length >= 8 || 'At least 8 characters are required'],
        chkpassword: [v => v.length >= 8 || 'At least 8 characters are required', v => v === this.userInfo.password || 'Passwords do not match.']
      }
    }
  },
  methods: {
    onSubmit () {
      this.$axios.post('/auth/local/register', this.userInfo).then((res) => {
        this.$q.notify({
          type: 'positive',
          message: '회원가입에 성공하였습니다. 로그인 페이지로 이동합니다.',
          position: 'center',
          timeout: 1000
        })
        setTimeout(() => {
          this.$router.push('/login')
        }, 1000)
      }).catch((err) => {
        this.$q.notify({
          type: 'negative',
          message: err.response.data.message,
          position: 'center',
          timeout: 1000
        })
      })
    },
    onReset () {
      this.userInfo = {
        name: '',
        email: '',
        password: '',
        chkpassword: ''
      }
    }
  }
}
</script>

<style>

</style>
