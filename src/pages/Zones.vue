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
              총 {{ totalZones }}개의 지역
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
            <q-card class="q-ma-sm">
              <q-card-section class="q-py-sm">
                <div class="row items-center">
                  <div class="text-subtitle1">지점</div>
                  <q-space />
                  <div>
                    <q-btn round flat size="md" class="q-pa-none">
                      <q-icon name="add_circle_outline" />
                    </q-btn>
                  </div>
                </div>
              </q-card-section>
              <q-separator />
              <q-card-section class="q-pa-none">
                <q-scroll-area ref="scrollArea" style="height: 600px;">
                  <q-list>
                    <q-item
                      v-for="zone in zones"
                      :key="zone.id"
                      clickable
                      v-ripple
                      :active="zone.id === selected"
                      @click="$store.commit('zones/updateSelected', zone.id)"
                      active-class="zone-active-link"
                    >
                      <q-item-section avatar>
                        <q-avatar color="teal-14" text-color="white" size="30px">
                          {{ zone.id }}
                        </q-avatar>
                      </q-item-section>
                      <q-item-section>
                        <q-item-label>{{ zone.name }}</q-item-label>
                      </q-item-section>
                    </q-item>
                  </q-list>
                </q-scroll-area>
              </q-card-section>
            </q-card>
          </template>

          <template v-slot:separator>
            <q-avatar color="primary" text-color="white" size="30px" icon="drag_indicator" />
          </template>

          <template v-slot:after>
            지역설정
          </template>
        </q-splitter>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { mapState } from 'vuex'

// import EventLogTable from '../components/eventlog/eventlogTable'

export default {
  // components: { EventLogTable },
  computed: {
    ...mapState({
      zones: state => state.zones.zones,
      selected: state => state.zones.selected
    }),
    totalZones () {
      return this.zones.length
    }
  },
  data () {
    return {
      splitterModel: 50
    }
  },
  mounted () {
    this.get()
  },
  methods: {
    get () {
      this.$axios.get('/zones/get').then(res => {
        this.$store.commit('zones/updateZones', res.data.zones)
      })
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
