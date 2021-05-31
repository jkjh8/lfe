<template>
  <div>
    <q-btn
      v-if="!user"
      class="text-weight-bold text-teal-14"
      flat
      @click="$router.push('/login')"
    >
      로그인
    </q-btn>
    <q-btn
      v-else
      round
      flat
    >
      <q-avatar
        v-if="user && user.profile_image"
        color="teal-14"
        text-color="white"
      >
        <img :src="user.profile_image" />
      </q-avatar>
      <q-avatar
        v-else
        color="teal-14"
        text-color="white"
      >
        {{ nickName }}
      </q-avatar>

      <q-menu>
        <div
          class="column items-center q-my-md"
          style="width: 200px"
        >
          <q-avatar
            v-if="user && user.profile_image"
            color="teal-14"
            text-color="white"
            size="73px"
          >
            <img :src="user.profile_image" />
          </q-avatar>
          <q-avatar
            v-else
            color="teal-14"
            text-color="white"
            size="73px"
          >
            {{ nickName }}
          </q-avatar>
          <div class="q-my-md text-grey">{{ user.email }}</div>

          <q-btn
            class="q-my-sm q-px-md"
            flat
            rounded
            @click="$router.push('/user/profile')"
          >
            <div class="text-subtitle2 text-weight-bold">
              내 프로필
            </div>
          </q-btn>

          <q-btn
            class="q-px-md text-weight-bold"
            rounded
            color="teal-14"
            @click="logout"
          >
            로그아웃
          </q-btn>
        </div>
      </q-menu>
    </q-btn>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import userFn from '../../mixins/users'

export default {
  mixins: [userFn],
  computed: {
    ...mapState({
      user: state => state.user.user
    }),
    ...mapGetters({
      nickName: 'user/nickname'
    })
  },
  mounted () {
    console.log(this.user)
  }
}
</script>

<style>

</style>
