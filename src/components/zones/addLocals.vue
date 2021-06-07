<template>
  <q-card style="width: 600px">
    <q-card-section class="q-pb-sm">
      <div class="row items-center">
        <div class="text-h6">
          지점 추가
        </div>
        <q-space />
        <q-btn round flat icon="add_circle_outline" @click="addItem"></q-btn>
      </div>
    </q-card-section>
    <q-card-section class="q-py-sm">
      <q-scroll-area ref="scrollArea" style="height: 300px;">
        <q-list v-if="addLocals">
          <q-item
            v-for="(local, idx) in addLocals"
            :key="local.id"
            class="q-py-none"
            dense
          >
            <q-item-section avatar>
              <q-avatar
                color="teal-14"
                text-color="white"
                size="30px"
              >
                {{ local.id }}
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <div>
                <q-input
                  v-model="addLocals[idx].name"
                  label="Local Name"
                  :hint="addLocals[idx].code"
                  color="teal-14"
                  dense
                  @keyup="checkCode(idx)"
                  @blur="checkCode(idx)"
                />
              </div>
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
import strToHex from '../../mixins/strToHex'

export default {
  mixins: [strToHex],
  computed: {
    ...mapState({
      locals: state => state.zones.locals,
      selected: state => state.zones.selected
    })
  },
  data () {
    return {
      addLocals: []
    }
  },
  mounted () {
    //
  },
  methods: {
    addItem () {
      let id
      if (this.addLocals.length === 0) {
        id = this.locals.length + 1
      } else {
        id = this.addLocals[this.addLocals.length - 1].id + 1
      }
      this.addLocals.push({
        id: id,
        name: '',
        code: ''
      })
    },
    checkCode (idx) {
      this.addLocals[idx].code = this.encodeUTF16(this.addLocals[idx].name)
    },
    submit () {
      this.$store.dispatch('zones/addLocals', this.addLocals)
    }
  }
}
</script>

<style scoped>

</style>
