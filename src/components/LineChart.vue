<template>
  <v-container>
    <Lchart style="max-height: 400px"
        :data="chartData"
        :options="chartOptions"
    />
  </v-container>
</template>

<script>
import {Line as Lchart} from 'vue-chartjs'

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'

export default {
  name: 'LineChart',
  components: {Lchart, LinearScale, PointElement, LineElement},
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