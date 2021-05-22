<template>
  <q-page class="flex flex-center">
    <q-form
      @submit="onSubmit"
      @reset="onReset"
    >
      <q-card style="min-width: 500px;">
        <q-card-section class="bg-teal-14">
          <div class="text-h6 text-white">Register</div>
        </q-card-section>

        <q-separator />
        <q-card-section>
          <div class="q-mx-md q-mt-md">
            <div>
              <q-input
                outlined
                v-model="userInfo.name"
                label="Your name"
                lazy-rules
                :rules="rules.name"
                @keyup.enter="onSubmit"
              />
            </div>
            <div class="q-mt-md">
              <q-input
                outlined
                v-model="userInfo.id"
                label="Your E-Mail"
                lazy-rules
                :rules="rules.email"
                @keyup.enter="onSubmit"
              />
            </div>
            <div class="q-mt-md">
              <q-input
                outlined
                v-model="userInfo.password"
                label="Your password"
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
                label="Check password"
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
          <q-btn label="Submit" type="submit" color="teal-14"/>
          <q-btn label="Reset" type="reset" color="teal-14" flat class="q-ml-sm" />
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
        id: '',
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
      console.log('ok')
    },
    onReset () {
      this.userInfo = { id: '', password: '' }
    }
  }
}
</script>

<style>

</style>
