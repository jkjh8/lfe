<template>
  <q-page class="flex flex-center">
    <div class="column items-center">
      <div class="text-h4 text-weight-bold text-teal-10">{{ days }}</div>
      <div class="text-h6 text-weight-bolder text-cyan-9">{{ wDays }}</div>
      <div>
        <span class="text-h2 text-weight-regular">{{ times }}</span>
        <span class="text-h6">{{ ampm }}</span>
      </div>
    </div>
    <!-- <div style="max-width: 800px;">
      <q-btn class="q-ma-lg q-pa-md" size="xl" icon="mic" color="blue-grey-6">Booth 1</q-btn>
      <q-btn class="q-ma-lg q-pa-md" size="xl" icon="mic" color="blue-grey-6">Booth 2</q-btn>
      <q-btn class="q-ma-lg q-pa-md" size="xl" icon="mic" color="blue-grey-6">Booth 3</q-btn>
      <q-btn class="q-ma-lg q-pa-md" size="xl" icon="mic" color="blue-grey-6">Booth 4</q-btn>
      <q-btn class="q-ma-lg q-pa-md" size="xl" icon="mic" color="blue-grey-6">Booth 5</q-btn>
      <q-btn class="q-ma-lg q-pa-md" size="xl" icon="mic" color="blue-grey-6">Booth 6</q-btn>
      <q-btn class="q-ma-lg q-pa-md" size="xl" icon="mic" color="blue-grey-6">Booth 7</q-btn>
      <q-btn class="q-ma-lg q-pa-md" size="xl" icon="mic" color="deep-orange-10">Booth 8</q-btn>
      <q-btn class="q-ma-lg q-pa-md" size="xl" icon="mic" color="deep-orange-10">Booth 9</q-btn>
      <q-btn class="q-ma-lg q-pa-md" size="xl" icon="mic" color="teal-10">Main Desk</q-btn>
    </div> -->
  </q-page>
</template>

<script>
import { mapGetters } from 'vuex'
import userFn from '../mixins/users'

export default {
  name: 'PageIndex',
  mixins: [userFn],
  computed: {
    ...mapGetters({
      days: 'clock/days',
      wDays: 'clock/wDays',
      times: 'clock/times',
      ampm: 'clock/ampm'
    })
  },
  mounted () {
    // console.log('main page')
    // this.getUserInfo()
  }
}
</script>
