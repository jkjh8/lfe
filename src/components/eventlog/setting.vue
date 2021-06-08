<template>
  <div class="row setting justify-end">
    <div class="absolute-left text-subtitle1 text-teal q-mt-sm q-ml-lg">
      부가 기능
    </div>
    <div class="row">
      <div class="row q-mx-md" style="width: 150px">
        <q-input
          v-model="page"
          dense
          outlined
          label="바로가기"
          color="teal-14"
        >
          <template v-slot:append>
            <q-icon
              class="cursor-pointer"
              name="send"
              size="sm"
              flat
              @click="directGo"
              @keyup.enter="directGo"
            >
            </q-icon>
          </template>
        </q-input>
      </div>
      <div>
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
      page: '',
      select: '',
      options: [5, 10, 15, 20, 30, 40, 50]
    }
  },
  mounted () {
    this.select = this.pages.limit
  },
  methods: {
    selValue (val) {
      this.$store.commit('eventlog/updatelimit', val)
      this.$store.dispatch('eventlog/getLog')
      this.$root.$emit('changeLimit')
    },
    directGo () {
      this.$root.$emit('changePage', this.page)
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
