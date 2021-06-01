<template>
  <q-page class="flex flex-center">
    <q-card style="min-width: 350px">
      <q-card-section class="row bg-teal-14 q-py-sm items-center">
        <div class="text-h6 text-white text-weight-bold">
          내 프로필
        </div>
        <q-space/>
      </q-card-section>

      <q-card-section v-if="user">
        <div class="flex flex-center column" style="position: relative">
          <div v-if="user && user.profile_image">
            <q-avatar size="100px">
              <img :src="user.profile_image" />
            </q-avatar>
          </div>
          <div v-else>
            <q-avatar size="100px">
              <q-icon name="account_circle" color="grey" size="100px" />
            </q-avatar>
          </div>
          <div>
            <span
              v-if="user && user.admin"
              class="text-body2"
            >
              관리자
            </span>
            <span class="text-orange">{{ user.level }}</span>
          </div>
          <div>
            <span class="text-h6">{{ user.name }}</span>
          </div>
          <div class="text-h6 text-grey">
            {{ user.email }}
          </div>
        </div>
        <q-list class="q-mt-md">
          <q-item>
            <q-item-section>
              <q-item-label
                class="text-grey"
                overline
              >
                서비스 제공자
              </q-item-label>
              <q-item-label
                style="text-transform: uppercase"
              >
                {{ user.provider }}
              </q-item-label>
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section>
              <q-item-label
                class="text-grey"
                overline
              >
                아이디
              </q-item-label>
              <q-item-label>{{ user.id }}</q-item-label>
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section>
              <q-item-label
                class="text-grey"
                overline
              >
                가입일
              </q-item-label>
              <q-item-label>{{ dateFormat(user.createAt) }}</q-item-label>
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section>
              <q-item-label
                class="text-grey"
                overline
              >
                최근 수정일
              </q-item-label>
              <q-item-label>{{ dateFormat(user.updateAt) }}</q-item-label>
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section>
              <q-item-label
                class="text-grey"
                overline
              >
                최근 로그인
              </q-item-label>
              <q-item-label>{{ dateFormat(user.loginAt) }}</q-item-label>
            </q-item-section>
          </q-item>

          <q-item
            clickable
            @click="logout"
          >
            <q-item-section>
              <q-item-label class="text-red">로그아웃</q-item-label>
            </q-item-section>
          </q-item>

          <q-item
            clickable
            @click="confirmDel(user)"
          >
            <q-item-section>
              <q-item-label class="text-red">회원 탈퇴 및 서비스 해지</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import moment from 'moment'
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
  },
  methods: {
    dateFormat (date) {
      return moment(date).format('YYYY-MM-DD hh-mm-ss a')
    },
    confirmDel (user) {
      this.$q.dialog({
        title: '확인',
        message: '정말 삭제하시겠습니까?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.deleteUser(user)
      }).onCancel(() => {
        // console.log('>>>> Cancel')
      }).onDismiss(() => {
        // console.log('I am triggered on both OK and Cancel')
      })
    }
  }
}
</script>

<style>

</style>
