<template>
  <div class="row search justify-end">
    <div class="absolute-left text-subtitle1 text-teal q-mt-sm q-ml-lg">
      검색
    </div>
    <div class="row q-mr-md">
      <div class="row">
        <div class="q-gutter-sm">
          <q-checkbox
            class="q-ml-xs"
            left-label
            v-model="enable"
            label="날짜 검색 활성화"
            color="teal-14"
            @input="updateEnable"
            />
        </div>
        <q-input
          v-model="start"
          class="q-ml-xs"
          :rules="['date']"
          :disable="!enable"
          dense
          outlined
          label="시작날짜"
          color="teal-14"
          hide-bottom-space
          @input="updateStart"
        >
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                <q-date v-model="start" color="grey-10" @input="updateStart">
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="확인" color="teal-14" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
        <q-input
          v-model="end"
          class="q-ml-xs"
          :rules="['date']"
          :disable="!enable"
          dense
          outlined
          label="종료날짜"
          color="teal-14"
          hide-bottom-space
          @input="updateEnd"
        >
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                <q-date v-model="end" color="grey-10" @input="updateEnd">
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="확인" color="teal-14" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
        <q-btn
          class="q-ml-xs"
          unelevated
          color="teal-14"
          :disable="!enable"
          @click="startSearch"
        >
          적용
        </q-btn>
      </div>

      <q-separator class="q-mx-md" vertical />

      <div class="row">
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
    </div>
    <div class="absolute-right">
      <q-btn class="q-ma-xs" round size="sm" @click="exit">
        <q-icon name="close" />
      </q-btn>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import moment from 'moment'
export default {
  computed: {
    ...mapState({
      date: state => state.eventlog.date
    })
  },
  data () {
    return {
      search: '',
      start: moment().format('YYYY/MM/DD'),
      end: moment().format('YYYY/MM/DD'),
      enable: false
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
      this.$store.commit('eventlog/updateDateEnable', false)
      this.$store.commit('eventlog/updateSearch', '')
      this.$store.dispatch('eventlog/getLog')
      this.$emit('close')
    },
    updateStart (value) {
      this.$store.commit('eventlog/updateDateStart', moment(value).format('x'))
      console.log(value, typeof value)
    },
    updateEnd (value) {
      this.$store.commit('eventlog/updateDateEnd', moment(value + ' 23:59:59').format('x'))
    },
    updateEnable (value) {
      this.$store.commit('eventlog/updateDateEnable', value)
      this.$store.commit('eventlog/updateDateStart', moment(this.start).format('x'))
      this.$store.commit('eventlog/updateDateEnd', moment(this.end + ' 23:59:59').format('x'))
      if (!value) {
        this.$store.dispatch('eventlog/getLog')
      }
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
