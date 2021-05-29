<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <q-toolbar class="bg-white text-grey-10">
        <q-btn
          flat
          round
          icon="home"
          color="teal-14"
          to="/"
        />

        <q-toolbar-title>
          <div>롯데 통합 방송 시스템</div>
        </q-toolbar-title>

        <Link />
        <!-- <div><q-btn to="/login">Login</q-btn></div> -->
        <UserStatus></UserStatus>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import clock from '../mixins/clock'
import user from '../mixins/users'
import UserStatus from '../components/users/loginState'
import Link from '../components/Link'

export default {
  name: 'MainLayout',
  mixins: [clock, user],
  components: { UserStatus, Link },
  created () {
    this.clock()
  },
  mounted () {
    this.getUserInfo()
  },
  methods: {
    //
  },
  beforeDestroy () {
    this.logout()
  }
}
</script>
