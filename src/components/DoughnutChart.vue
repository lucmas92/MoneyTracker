<template>
  <v-container>
    <Doughnut style="max-height: 400px"
        :data="chartData"
        :options="chartOptions"
    />
  </v-container>
</template>

<script>
import {Bar, Doughnut} from 'vue-chartjs'

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale)

export default {
  name: 'DoughnutChart',
  components: {Bar, Doughnut},
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