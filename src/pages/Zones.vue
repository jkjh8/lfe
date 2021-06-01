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
            <q-card class="q-ma-sm">
              <!-- 제목 라인 -->
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
              <!-- 리스트 시작 -->
              <q-card-section class="q-pa-none">
                <q-scroll-area ref="scrollArea" style="height: 600px;">
                  <q-list>
                    <q-item
                      v-for="local in locals"
                      :key="local.id"
                      clickable
                      v-ripple
                      :active="local.id === selected"
                      @click="select(local.id)"
                      active-class="zone-active-link"
                    >
                      <q-item-section avatar>
                        <q-avatar color="teal-14" text-color="white" size="30px">
                          {{ local.id }}
                        </q-avatar>
                      </q-item-section>
                      <q-item-section>
                        <q-item-label>{{ local.name }}</q-item-label>
                        <q-item-label caption>{{ local.code }}</q-item-label>
                      </q-item-section>
                    </q-item>
                  </q-list>
                </q-scroll-area>
              </q-card-section>
            </q-card>
          </template>

          <!-- 구분자 -->
          <template v-slot:separator>
            <q-avatar color="primary" text-color="white" size="30px" icon="drag_indicator" />
          </template>

          <template v-slot:after>
            <q-card class="q-ma-sm">
              <q-card-section class="q-mt-sm q-pb-none q-pt-sm">
                <q-tabs
                  v-model="tab"
                  dense
                  class="text-blue-grey-4"
                  active-color="grey-10"
                  indicator-color="teal-14"
                  align="justify"
                >
                  <q-tab class="row" name="zone">
                    <div class="row items-center">
                      <div>방송구간</div>
                      <q-btn flat round>
                        <q-icon name="add_circle_outline" />
                      </q-btn>
                    </div>
                  </q-tab>
                  <q-tab name="relay">
                    <div class="row items-center">
                      <div>릴레이</div>
                      <q-btn flat round>
                        <q-icon name="add_circle_outline" />
                      </q-btn>
                    </div>
                  </q-tab>
                </q-tabs>
              </q-card-section>

              <q-separator />

              <q-card-section class="q-py-none">
                <q-tab-panels v-model="tab" animated>
                  <q-tab-panel name="zone" class="q-pa-none">
                    <q-scroll-area ref="scrollArea" style="height: 600px;">
                      <q-list>
                        <q-item
                          v-for="zone in zones"
                          :key="zone.idx"
                        >
                          <q-item-section avatar>
                            <q-avatar color="light-blue-6" text-color="white" size="30px">
                              {{ zone.idx + 1 }}
                            </q-avatar>
                          </q-item-section>
                          <q-item-section>
                            <q-item-label>{{ zone.name }}</q-item-label>
                            <q-item-label caption>{{ zone.code }}</q-item-label>
                          </q-item-section>
                        </q-item>
                      </q-list>
                    </q-scroll-area>
                  </q-tab-panel>

                  <q-tab-panel name="relay" class="q-pa-none">
                    <q-scroll-area ref="scrollArea" style="height: 600px;">
                      <q-list>
                        <q-item
                          v-for="relay in relays"
                          :key="relay.idx"
                        >
                          <q-item-section avatar>
                            <q-avatar color="light-green-6" text-color="white" size="30px">
                              {{ relay.idx + 1 }}
                            </q-avatar>
                          </q-item-section>
                          <q-item-section>
                            <q-item-label>{{ relay.name }}</q-item-label>
                            <q-item-label caption>{{ relay.code }}</q-item-label>
                          </q-item-section>
                          <q-item-section side>
                            <q-btn round size="sm" @click="edit('relay', selected, relay)">
                              <q-icon name="edit" />
                            </q-btn>
                          </q-item-section>
                        </q-item>
                      </q-list>
                    </q-scroll-area>
                  </q-tab-panel>
                </q-tab-panels>
              </q-card-section>
            </q-card>
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
  },
  methods: {
    get () {
      this.$axios.get('/zones/get').then(res => {
        console.log(res.data.locals)
        this.$store.commit('zones/updateLocals', res.data.locals)
      })
    },
    select (id) {
      this.$store.commit('zones/updateSelected', id)
      this.$store.commit('zones/updateZones', this.locals[id - 1].children)
      this.$store.commit('zones/updateRelays', this.locals[id - 1].relay)
    },
    edit (mode, id, value) {
      console.log(mode, id, value)
      this.$q.dialog({
        title: '수정',
        message: `${this.locals[id - 1].name} ${mode} ${value.idx}`,
        prompt: {
          model: value.name,
          type: 'text' // optional
        },
        cancel: true,
        persistent: true
      }).onOk(data => {
        console.log('>>>> OK, received', data)
      }).onCancel(() => {
        // console.log('>>>> Cancel')
      }).onDismiss(() => {
        // console.log('I am triggered on both OK and Cancel')
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
