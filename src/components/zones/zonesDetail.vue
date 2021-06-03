<template>
  <q-scroll-area ref="scrollArea" style="height: 600px;">
    <q-list>
      <q-item
        v-for="zone in zones"
        :key="zone.id"
      >
        <q-item-section avatar>
          <q-avatar color="light-blue-6" text-color="white" size="30px">
            {{ zone.id + 1 }}
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label>{{ zone.name }}</q-item-label>
          <q-item-label caption>{{ zone.code }}</q-item-label>
        </q-item-section>

        <q-item-section side>
          <div class="row">
            <q-btn
              flat
              round
              size="sm"
            >
              <q-icon name="edit" />
            </q-btn>
            <q-btn
              flat
              round
              size="sm"
            >
              <q-icon name="delete" />
            </q-btn>
          </div>
        </q-item-section>
      </q-item>
    </q-list>
  </q-scroll-area>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState({
      locals: state => state.zones.locals,
      zones: state => state.zones.zones,
      selected: state => state.zones.selected
    })
  }
}
</script>
