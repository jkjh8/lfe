<template>
  <q-scroll-area ref="scrollArea" style="height: 600px;">
    <q-list>
      <q-item
        v-for="relay in relays"
        :key="relay.id"
      >
        <q-item-section avatar>
          <q-avatar color="light-green-6" text-color="white" size="30px">
            {{ relay.id + 1 }}
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label>{{ relay.name }}</q-item-label>
          <q-item-label caption>{{ relay.code }}</q-item-label>
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
      relays: state => state.zones.relays,
      selected: state => state.zones.selected
    })
  }
}
</script>
