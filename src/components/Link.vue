<template>
  <div class="q-mx-md">
    <q-tabs
      v-model="index"
      dense
      indicator-color="transparent"
      class="text-grey"
      active-color=
      "teal"
    >
      <q-route-tab
          class="qtb"
          to="/users"
          tag="li"
          exact
        >
          사용자 관리
      </q-route-tab>
      <q-route-tab
        class="qtb"
        to="/zones"
        tag="li"
        exact
      >
        지역 설정
      </q-route-tab>
      <q-route-tab
        class="qtb"
        to="/logs"
        tag="li"
        exact
      >
        이벤트 로그
      </q-route-tab>
    </q-tabs>
  </div>
</template>

<script>
export default {
  data () {
    return {
      index: null
    }
  }
}
</script>

<style scoped>
  .qtb {
    max-width: 120px;
  }
  .active {
    color: teal;
  }
</style>
