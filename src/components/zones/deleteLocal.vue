<template>
  <q-card style="width: 400px">
    <q-card-section class="q-pb-sm">
      <div class="text-h6">
        지점 삭제
      </div>
    </q-card-section>
    <q-card-section class="q-py-sm">
      <q-item>
        <q-item-section avatar>
          <q-avatar
            color="teal-14"
            text-color="white"
            size="30px"
          >
            {{ locals[selectedLocal - 1].id }}
          </q-avatar>
        </q-item-section>

        <q-item-section avatar>
          <div>
            <span class="text-weight-bold">{{ locals[selectedLocal - 1].name }}</span>
            <span> 를 삭제 하시겠습니까?</span>
          </div>
        </q-item-section>

      </q-item>
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

export default {
  props: ['selectedLocal'],
  computed: {
    ...mapState({
      locals: state => state.zones.locals,
      selected: state => state.zones.selected
    })
  },
  data () {
    return {
      //
    }
  },
  mounted () {
    //
  },
  methods: {
    submit () {
      this.$store.dispatch('zones/deleteLocal', this.locals[this.selectedLocal - 1]._id)
    }
  }
}
</script>

<style scoped>

</style>
