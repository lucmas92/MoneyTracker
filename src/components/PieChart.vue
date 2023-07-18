<template>
  <v-container>
    <Pie style="max-height: 400px"
        :data="chartData"
        :options="chartOptions"
    />
  </v-container>
</template>

<script>
import { Pie } from 'vue-chartjs'

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend)

export default {
  name: 'PieChart',
  components: {Pie},
  props: {
    data: {
      type: Object,
      required: false
    },
  },
  data() {
    return {
      chartOptions: {
        responsive: true,
        maintainAspectRatio: true
      }
    }
  },
  computed: {
    chartData() {
      return {
        labels: this.data && 'labels' in this.data ? this.data['labels'] : [],
        datasets: [
          {
            backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],
            data: this.data && 'datasets' in this.data ?  this.data['datasets'] : []
          }
        ]
      }
    }
  }
}

</script>