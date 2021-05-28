<template>
  <div class="q-mx-md">
    <q-tabs
      v-model="index"
      dense
      indicator-color="transparent"
      class="text-grey"
      active-color="teal"
    >
      <q-route-tab
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
  .active {
    color: teal;
  }
</style>
