<template>
  <q-card style="width: 600px">
    <q-card-section class="q-pb-sm">
      <div class="row items-center">
        <div class="text-h6">
          릴레이 채널 추가
        </div>
        <q-space />
        <q-btn round flat icon="add_circle_outline" @click="addItem"></q-btn>
      </div>
    </q-card-section>
    <q-card-section class="q-py-sm">
      <q-scroll-area ref="scrollArea" style="height: 300px;">
        <q-list v-if="addRelay">
          <q-item
            v-for="(relay, idx) in addRelay"
            :key="relay.id"
            class="q-py-none"
            dense
          >
            <q-item-section avatar>
              <q-avatar
                color="teal-14"
                text-color="white"
                size="30px"
              >
                {{ relay.id }}
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-input
                v-model="addRelay[idx].name"
                label="Relay Name"
                :hint="addRelay[idx].code"
                color="teal-14"
                dense
                @keyup="checkCode(idx)"
              />
            </q-item-section>

            <q-item-section side>
              <q-toggle
                v-model="addRelay[idx].value"
                checked-icon="check"
                color="green"
                unchecked-icon="clear"
              />
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-card-section>
    <q-separator />
    <q-card-actions align="right">
      <q-btn
        class="q-px-sm"
        label="확인"
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
import { mapState } from 'vuex'
import strToHex from '../../../mixins/strToHex'

export default {
  mixins: [strToHex],
  props: ['selectedRelay'],
  computed: {
    ...mapState({
      locals: state => state.zones.locals,
      relays: state => state.zones.relays,
      selected: state => state.zones.selected
    })
  },
  data () {
    return {
      addRelay: []
    }
  },
  mounted () {
    //
  },
  methods: {
    addItem () {
      let id
      if (this.addRelay.length === 0) {
        id = this.relays.length
      } else {
        id = this.addRelay[this.addRelay.length - 1].id + 1
      }
      this.addRelay.push({
        id: id,
        name: '',
        code: '',
        value: false
      })
    },
    checkCode (idx) {
      this.addRelay[idx].code = this.encodeUTF16(this.addRelay[idx].name)
    },
    submit () {
      this.$store.dispatch('zones/addRelays', this.addRelay)
    }
  }
}
</script>

<style scoped>

</style>
