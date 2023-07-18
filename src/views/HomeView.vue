<template>
  <v-container fluid>
    <v-list class="mt-4" color="transparent">
      <v-list-item>
        <v-list-item-title>
          <strong>Totale Spese:</strong> &euro; {{ sumExpenses }}
        </v-list-item-title>
      </v-list-item>
    </v-list>
    <v-carousel>
      <v-carousel-item>
        <DoughnutChart ref="dngChart" :data="expenses"/>
      </v-carousel-item>
      <v-carousel-item>
        <BarChart ref="barChart" :data="expenses"/>
      </v-carousel-item>
      <v-carousel-item>
        <PieChart ref="barChart" :data="expenses"/>
      </v-carousel-item>
    </v-carousel>
  </v-container>
</template>

<script>

import {collection, query, onSnapshot} from "firebase/firestore";
import {db} from "@/firebase";
import BarChart from "@/components/BarChart.vue";
import DoughnutChart from "@/components/DoughnutChart.vue";
import LineChart from "@/components/LineChart.vue";
import PieChart from "@/components/PieChart.vue";

export default {
  name: 'Home',
  components: {PieChart, LineChart, DoughnutChart, BarChart},
  data() {
    return {
      items: [],
      chartType: null,
      expenses: null,
    }
  },
  computed: {
    sumExpenses() {
      const sum = this.items.reduce((a, b) => parseFloat(a) + (parseFloat(b['importo']) || 0), 0)
      return sum.toFixed(2);
    }
  },
  mounted() {
    this.chartType = localStorage.getItem('chartType') || 'bar';
    this.$root.$emit('setTitle', 'Money Tracker');

    this.$root.$emit('showLoading');
    setTimeout(() => {
      this.loadExpenses()
      this.$root.$emit('hideLoading');
    }, 500)
  },
  methods: {
    loadExpenses() {
      const q = query(collection(db, "expenses"));
      onSnapshot(q, (querySnapshot) => {
        this.items = [];
        querySnapshot.forEach((doc) => {
          this.items.push(doc.data());
        });


        this.expenses = this.getChartData()

        if (this.chartType === 'bar' && this.$refs.barChart) {
          this.$refs.barChart.$forceUpdate()
        } else if (this.chartType === 'doughnut' && this.$refs.dngChart) {
          this.$refs.dngChart.$forceUpdate()
        }
      });
    },
    getChartData() {
      const chartGroup = localStorage.getItem('chartGroup') || 'category';

      if (chartGroup === 'category') {

        // recupero l'elenco univoco delle categorie
        const categories = [...new Set(this.items.map(item => item.categoria))];

        // calcolo il totale per ogni categoria e lo salvo nella variabile totals
        const totals = categories.map(category => {
          const total = this.items.filter(item => item.categoria === category).reduce((a, b) => parseFloat(a) + (parseFloat(b['importo']) || 0), 0)
          return total.toFixed(2);
        });
        return {
          labels: categories,
          datasets: totals
        }
      }

      if (chartGroup === 'account') {
        // recupero l'elenco univoco degli account
        const accounts = [...new Set(this.items.map(item => item.account))];

        // calcolo il totale per ogni account e lo salvo nella variabile totals
        const totals = accounts.map(account => {
          const total = this.items.filter(item => item.account === account).reduce((a, b) => parseFloat(a) + (parseFloat(b['importo']) || 0), 0)
          return total.toFixed(2);
        });
        return {
          labels: accounts,
          datasets: totals
        }
      }


    }
  }
}
</script>
