<template>
  <q-page>
    <q-card class="q-mx-sm" flat>
      <q-card-section class="q-py-xs">
        <div class="fit row">
          <div>
            <div
              class="text-h6 text-weight-bold"
            >
              지역 설정
            </div>
            <div
              class="text-caption"
            >
              총 {{ totalLocals }}개의 지역
            </div>
          </div>
          <q-space />
          <div class="self-center">
            <!-- <div class="row">
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
            </div> -->
          </div>
        </div>
      </q-card-section>
      <q-separator />

      <q-card-section class="q-pt-sm q-pb-none">
        <q-splitter
          v-model="splitterModel"
          class="spl"
          :separator-style="{ backgroundColor: '#FFFFFF' }"
        >
          <template v-slot:before>
            <Locals />
          </template>

          <!-- 구분자 -->
          <template v-slot:separator>
            <q-avatar color="primary" text-color="white" size="30px" icon="drag_indicator" />
          </template>

          <template v-slot:after>
            <ZonesRelays />
          </template>
        </q-splitter>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { mapState } from 'vuex'
import Locals from '../components/zones/locals'
import ZonesRelays from '../components/zones/zonesRelays'

// import EventLogTable from '../components/eventlog/eventlogTable'

export default {
  components: { Locals, ZonesRelays },
  computed: {
    ...mapState({
      locals: state => state.zones.locals,
      zones: state => state.zones.zones,
      relays: state => state.zones.relays,
      selected: state => state.zones.selected
    }),
    totalLocals () {
      return this.locals.length
    }
  },
  data () {
    return {
      splitterModel: 50,
      tab: 'zone',
      editValue: ''
    }
  },
  mounted () {
    this.get()
    this.$socket.on('zones', (data) => {
      // console.log('socket.io ', data)
      this.$store.dispatch('zones/update', data)
    })
  },
  methods: {
    get () {
      this.$axios.get('/zones/get').then(res => {
        this.$store.commit('zones/updateLocals', res.data.locals)
      })
    },
    select (id) {
      this.$store.commit('zones/updateSelected', id)
      // this.$store.commit('zones/updateZones', this.locals[id - 1].zones)
      // this.$store.commit('zones/updateRelays', this.locals[id - 1].relays)
    }
  }
}
</script>

<style>
.zone-active-link {
  color: white;
  background: rgb(76, 94, 94);
}
</style>
