<template>
  <div class="row search justify-end">
    <div class="row q-mr-md">
      <q-input
        v-model="search"
        outlined
        dense
        clearable
        color="teal-14"
        hide-bottom-space
        @keyup.enter="startSearch"
        @clear="clearSearch"
      ></q-input>
      <q-btn
        class="q-ml-xs"
        unelevated
        color="teal-14"
        @click="startSearch"
      >
        검색
      </q-btn>
    </div>
    <div class="absolute-right">
      <q-btn class="q-ma-xs" round size="sm" @click="exit">
        <q-icon name="close" />
      </q-btn>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      search: ''
    }
  },
  methods: {
    startSearch () {
      this.$store.commit('eventlog/updateSearch', this.search)
      this.$store.dispatch('eventlog/getLog')
    },
    clearSearch () {
      this.$store.commit('eventlog/updateSearch', '')
      this.$store.dispatch('eventlog/getLog')
    },
    exit () {
      this.$store.commit('eventlog/updateSearch', '')
      this.$store.dispatch('eventlog/getLog')
      this.$emit('close')
    }
  }
}
</script>

<style>
.search {
  background: #F2FCFC;
  padding: 15px;
  border-radius: 20px;
}
</style>
