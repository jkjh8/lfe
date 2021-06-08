<template>
  <div class="row search justify-end">
    <div class="absolute-left text-subtitle1 text-teal q-mt-sm q-ml-lg">
      지점 선택
    </div>
    <div class="row q-mr-md">
      <q-select
        outlined
        v-model="model"
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
    <div class="absolute-right">
      <q-btn class="q-ma-xs" round size="sm" @click="exit">
        <q-icon name="close" />
      </q-btn>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  computed: {
    ...mapState({
      locals: state => state.zones.locals
    }),
    ...mapGetters({
      localsName: 'zones/localsName'
    })
  },
  data () {
    return {
      model: null,
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
      if (this.model) {
        this.$store.commit('eventlog/updateZone', this.model.join(','))
      } else {
        this.$store.commit('eventlog/updateZone', '')
      }
      this.$store.dispatch('eventlog/getLog')
    },
    clearZones () {
      console.log(this.model)
    },
    exit () {
      console.log('exit')
      this.model = null
      this.$store.commit('eventlog/updateZone', '')
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
