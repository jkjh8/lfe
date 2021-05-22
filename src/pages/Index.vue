<template>
  <q-page class="flex flex-center">
    <div class="fit row justify-center text-h6">{{ time }}</div>
    <div style="max-width: 800px;">
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
    </div>
  </q-page>
</template>

<script>
import clock from '../mixins/clock'

export default {
  name: 'PageIndex',
  mixins: [clock],
  mounted () {
    this.clock()
  }
}
</script>
