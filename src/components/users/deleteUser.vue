<template>
  <q-card style="width: 400px">
    <q-card-section class="q-pb-sm">
      <div class="text-h6">
        사용자 삭제
      </div>
    </q-card-section>
    <q-card-section class="q-py-sm">
      <q-item>
        <q-item-section>
          <div>{{ currentUser.email }}</div>
          <div>
            <span>정말 삭제 하시겠습니까?</span>
          </div>
        </q-item-section>

      </q-item>
    </q-card-section>

    <q-separator />

    <q-card-actions align="right">
      <q-btn
        class="q-px-sm"
        label="확인"
        color="teal-14"
        @click="submit"
        v-close-popup
      />
      <q-btn
        class="q-px-sm"
        label="취소"
        color="teal-14"
        flat
        v-close-popup
      />
    </q-card-actions>
  </q-card>
</template>

<script>
export default {
  props: ['currentUser'],
  methods: {
    submit () {
      this.$axios.post('/auth/deleteUser', this.currentUser).then((res) => {
        this.$store.commit('user/updateUsers', res.data.users)
      })
    }
  }
}
</script>

<style scoped>

</style>
