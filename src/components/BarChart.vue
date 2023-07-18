<template>
  <v-container>
    <Bar style="max-height: 400px"
        :data="chartData"
        :options="chartOptions"
    />
  </v-container>
</template>

<script>
import {Bar} from 'vue-chartjs'
import {Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  name: 'BarChart',
  components: {Bar},
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
        maintainAspectRatio: true,
        plugins: {
          legend: {
            display: false
          }
        }
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
