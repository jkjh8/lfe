<template>
  <q-page>
    <q-card class="q-mx-sm" flat>
      <q-card-section class="q-py-xs">
        <div class="fit row">
          <div>
            <div class="row items-center">
              <span class="text-h6 text-weight-bold">
                이벤트 로그
              </span>
              <span>
                <q-btn
                  dense
                  flat
                  round
                  icon="refresh"
                  size="12px"
                  color="teal-14"
                  @click="$store.dispatch('eventlog/getLog')"
                ></q-btn>
              </span>
            </div>
            <div
              class="text-caption"
            >
              총 {{ pages.totalDocs }}개의 이벤트 로그
            </div>
          </div>
          <q-space />
          <div class="self-center">
            <div class="row no-wrap">
              <q-btn flat round @click="download=!download">
                <q-icon name="download" />
                <q-tooltip :delay="1000" content-class="bg-teal-14" :offset="[10, 10]">
                  다운로드
                </q-tooltip>
              </q-btn>
              <q-btn flat round @click="zones=!zones">
                <q-icon name="business" />
                <q-tooltip :delay="1000" content-class="bg-teal-14" :offset="[10, 10]">
                  지역 선택
                </q-tooltip>
              </q-btn>
              <q-btn flat round @click="search=!search">
                <q-icon name="search" />
                <q-tooltip :delay="1000" content-class="bg-teal-14" :offset="[10, 10]">
                  검색
                </q-tooltip>
              </q-btn>
              <q-btn flat round @click="settings=!settings">
                <q-icon name="settings" />
                <q-tooltip :delay="1000" content-class="bg-teal-14" :offset="[10, 10]">
                  설정
                </q-tooltip>
              </q-btn>
            </div>
          </div>
        </div>
      </q-card-section>
      <q-separator />
      <q-card-section v-if="zones" class="q-pt-sm q-pb-none">
        <ZoneSelect @close="zones=false" />
      </q-card-section>

      <q-card-section v-if="search" class="q-pt-sm q-pb-none">
        <Search @close="search=false" />
      </q-card-section>

      <q-card-section v-if="settings" class="q-pt-sm q-pb-none">
        <Settings @close="settings=false" />
      </q-card-section>

      <q-card-section class="q-pt-sm q-pb-none">
        <EventLogTable />
      </q-card-section>
    </q-card>

    <q-dialog v-model="download">
      <Download />
    </q-dialog>
  </q-page>
</template>

<script>
import { mapState } from 'vuex'

import EventLogTable from '../components/eventlog/eventlogTable'
import Download from '../components/eventlog/download.vue'
import ZoneSelect from '../components/eventlog/zoneSelect.vue'
import Search from '../components/eventlog/search'
import Settings from '../components/eventlog/setting'

export default {
  components: { ZoneSelect, Download, EventLogTable, Search, Settings },
  computed: {
    ...mapState({
      pages: state => state.eventlog.pages,
      logs: state => state.eventlog.logs
    })
  },
  data () {
    return {
      download: false,
      zones: false,
      search: false,
      settings: false
    }
  },
  mounted () {
    this.$store.dispatch('zones/get')
  },
  methods: {
    //
  }
}
</script>

<style>

</style>
