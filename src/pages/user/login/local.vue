<template>
  <q-page class="flex flex-center">
    <q-form
      @submit="onSubmit"
      @reset="onReset"
    >
      <q-card style="min-width: 500px;">
        <q-card-section class="row bg-teal-14 q-py-sm items-center">
          <div class="text-h6 text-white text-weight-bold">
            <q-icon name='account_circle' size="md" />
            로그인
          </div>
          <q-space/>
          <q-btn round flat @click="$router.go(-1)">
            <q-icon color="white" name="navigate_before" />
          </q-btn>
        </q-card-section>

        <q-separator />
        <q-card-section>
          <div class="q-mx-md q-mt-md">
            <div>
              <q-input
                outlined
                v-model="userInfo.email"
                label="E-Mail"
                lazy-rules
                :rules="rules.email"
                @keyup.enter="onSubmit"
              />
            </div>
            <div class="q-mt-md">
              <q-input
                outlined
                v-model="userInfo.password"
                label="Password"
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
          </div>

          <div class="fit row justify-between q-ml-sm">
            <div class="column q-ml-sm">
              <q-checkbox
                v-model="idSave"
                dense
                label="아이디 저장"
                color="teal-14"
                @input="saveIdCheckbox"
              />
              <q-checkbox
                v-model="userInfo.keepLoggedIn"
                class="q-mt-sm"
                dense label="로그인 유지"
                color="orange-14"
              />
            </div>
            <q-btn flat color="orange-10" to="/register">회원가입</q-btn>
          </div>
        </q-card-section>

        <q-separator />

        <q-card-actions align="right">
          <q-btn class="q-px-sm" label="로그인" type="submit" color="teal-14" />
          <q-btn class="q-px-sm" label="초기화" type="reset" color="teal-14" flat />
        </q-card-actions>
      </q-card>
    </q-form>
  </q-page>
</template>

<script>
import users from '../../../mixins/users'

export default {
  mixins: [users],
  data () {
    return {
      show: false,
      idSave: false,
      userInfo: {
        email: '',
        password: '',
        keepLoggedIn: false
      },
      rules: {
        email: [value => !!value || 'E-main is required', v => /.+@.+\..+/.test(v) || 'Not in E-mail format'],
        password: [v => v.length >= 8 || 'At least 8 characters are required']
      }
    }
  },
  mounted () {
    this.checkIdSave()
  },
  methods: {
    onSubmit () {
      this.login('local', this.userInfo)
      if (this.idSave) this.setUserId()
    },
    onReset () {
      this.userInfo = { email: '', password: '', keepLoggedIn: false }
    },
    saveIdCheckbox (value) {
      if (value) {
        this.setIdSave()
      } else {
        this.clearUserId()
      }
    }
  }
}
</script>

<style>

</style>
