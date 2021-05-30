<template>
  <div class="row setting justify-end">
    <div class="row">
      <q-select
        class="q-mr-md"
        style="width: 100px;"
        v-model="select"
        :options="options"
        outlined
        dense
        color="teal-14"
        label="표시 갯수"
        @input="selValue"
      ></q-select>
    </div>
    <div class="absolute-right">
      <q-btn class="q-ma-xs" round size="sm" @click="$emit('close')">
        <q-icon name="close" />
      </q-btn>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      pages: state => state.eventlog.pages,
      logs: state => state.eventlog.logs
    })
  },
  data () {
    return {
      select: '',
      options: [5, 10, 15, 20, 30, 40, 50]
    }
  },
  mounted () {
    this.select = this.pages.limit
  },
  methods: {
    async selValue (val) {
      console.log(val)
      await this.$store.commit('eventlog/updatelimit', val)
      this.$store.dispatch('eventlog/getLog')
    }
  }
}
</script>

<style>
.setting {
  background: #F2FCFC;
  padding: 15px;
  border-radius: 20px;
}
</style>
