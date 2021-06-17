<template>
  <q-card style="width: 800px; max-width: 80vw;">
    <q-card-section class="q-pb-sm">
      <div class="text-h6">
        로그 다운로드
      </div>
    </q-card-section>
    <q-card-section class="q-py-sm">
      <q-item>
        <q-item-section>
          <div>
            <div class="row no-wrap q-mr-md justify-between">
              <q-checkbox
                right-label
                v-model="zonesEnable"
                label="지역 활성화"
                color="teal-14"
              ></q-checkbox>
              <q-select
                outlined
                v-model="zones"
                :disable="!zonesEnable"
                dense
                clearable
                use-input
                use-chips
                multiple
                color="teal-14"
                input-debounce="0"
                label="Select Zones"
                :options="options"
                @filter="filterFn"
                popup-content-style="height: 400px"
                @input="selZones"
                @clear="clearZones"
              >
                <template v-slot:no-option>
                  <q-item>
                    <q-item-section class="text-grey">
                      No results
                    </q-item-section>
                  </q-item>
                </template>
              </q-select>
            </div>

            <div class="row no-wrap justify-between q-mr-md q-mt-md">
              <q-checkbox
                right-label
                v-model="dateEnable"
                label="날짜 검색 활성화"
                color="teal-14"
                />
              <div class="row no-wrap" >
                <q-input
                  v-model="start"
                  class="q-ml-xs"
                  :rules="['date']"
                  :disable="!dateEnable"
                  dense
                  outlined
                  label="시작날짜"
                  color="teal-14"
                  hide-bottom-space
                >
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                        <q-date v-model="start" color="grey-10">
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
                  :disable="!dateEnable"
                  dense
                  outlined
                  label="종료날짜"
                  color="teal-14"
                  hide-bottom-space
                >
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                        <q-date v-model="end" color="grey-10">
                          <div class="row items-center justify-end">
                            <q-btn v-close-popup label="확인" color="teal-14" flat />
                          </div>
                        </q-date>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>
            </div>
          </div>
        </q-item-section>

      </q-item>
    </q-card-section>

    <q-separator />

    <q-card-actions align="right">
      <q-btn
        class="q-px-sm"
        label="다운로드"
        color="teal-14"
        @click="submit"
        v-close-popup
      />
      <q-btn
        class="q-px-sm"
        label="취소"
        color="teal-14"
        flat
        v-close-popup
      />
    </q-card-actions>
  </q-card>
</template>

<script>
import moment from 'moment'
import { mapState, mapGetters } from 'vuex'

export default {
  computed: {
    ...mapState({
      locals: state => state.zones.locals
    }),
    ...mapGetters({
      localsName: 'zones/localsName'
    }),
    filename () {
      if (this.zonesEnable && this.dateEnable) {
        return `${moment().format('YYYY/MM/DD hh:mm:ss')}_${this.start}~${this.end}_${this.zones.join(',')}.csv`
      } else if (!this.zonesEnable && this.dateEnable) {
        return `${moment().format('YYYY/MM/DD hh:mm:ss')}_${this.start}~${this.end}.csv`
      } else if (this.zonesEnable && !this.dateEnable) {
        return `${moment().format('YYYY/MM/DD hh:mm:ss')}_${this.zones.join(',')}.csv`
      } else {
        return `${moment().format('YYYY/MM/DD hh:mm:ss')}.csv`
      }
    }
  },
  data () {
    return {
      dateEnable: false,
      zonesEnable: false,
      start: moment().format('YYYY/MM/DD'),
      end: moment().format('YYYY/MM/DD'),
      zones: [],
      options: this.localsName
    }
  },
  methods: {
    filterFn (val, update) {
      if (val === '') {
        update(() => {
          this.options = this.localsName
        })
        return
      }

      update(() => {
        const needle = val.toLowerCase()
        this.options = this.localsName.filter(v => v.toLowerCase().indexOf(needle) > -1)
      })
    },
    selZones () {
      console.log(this.zones)
    },
    clearZones () {
      console.log(this.zones)
    },
    submit () {
      this.$q.loading.show()
      this.$axios.get(`/log/getCsv?zones=${this.zones.join(',')}&date=${this.dateEnable}&start=${moment(this.start).format('x')}&end=${moment(this.end + ' 23:59:59').format('x')}`, { responseType: 'blob' }).then((res) => {
        const blob = new Blob([res.data])
        const link = document.createElement('a')
        link.href = URL.createObjectURL(blob)
        link.setAttribute('download', this.filename)
        document.body.appendChild(link)
        link.click()
        URL.revokeObjectURL(link.href)
      }).catch(err => {
        console.log(err)
      })
      this.$q.loading.hide()
    }
  }
}
</script>

<style scoped>

</style>
