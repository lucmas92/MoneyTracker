<template>
  <v-container fluid>
    <v-list class="mt-4" color="transparent">
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>
            Dark Mode
          </v-list-item-title>
          <v-list-item-subtitle>
            Imposta la Dark Mode
          </v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-switch v-model="darkMode" @change="toggleDarkMode"></v-switch>
        </v-list-item-action>
      </v-list-item>
      <v-divider/>
      <v-list-item class="mt-4 mb-0 pb-0">
        <v-list-item-content>
          <v-list-item-title>
            Chart Type
          </v-list-item-title>
          <v-list-item-subtitle>
            Imposta il tipo di grafico da mostrare nella home
          </v-list-item-subtitle>
          <v-select solo class="rounded-0"
              :items="['bar', 'doughnut','line']"
              v-model="chartType"
              @change="updateChartType"/>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>
            <strong>Chart Group By</strong>
          </v-list-item-title>
          <v-list-item-subtitle>
            Imposta il raggruppamento dei dati da mostrare nella home
          </v-list-item-subtitle>
          <v-select solo class="rounded-0"
              :items="['category', 'account']"
              v-model="chartGroup"
              @change="updateChartGroup"></v-select>
        </v-list-item-content>
      </v-list-item>
      <v-divider/>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>
            <strong>Export Excel Data</strong>
          </v-list-item-title>
          <v-list-item-subtitle>
            Esporta i dati in formato Excel
          </v-list-item-subtitle>
          <v-btn class="pa-0">

            <download-excel
                style="width: 100%"
                class="rounded-0"
                :data="json_data"
                name="export.xls">
              Download
              <v-icon>mdi-download</v-icon>
            </download-excel>
          </v-btn>
        </v-list-item-content>
      </v-list-item>

      <v-divider/>
    </v-list>
  </v-container>
</template>

<script>

import {collection, query, onSnapshot} from "firebase/firestore";
import {db} from "@/firebase";
import JsonExcel from "vue-json-excel";

export default {
  name: 'Settings',
  components: {
    DownloadExcel: JsonExcel
  },
  data() {
    return {
      items: [],
      settings: [],
      chartType: localStorage.getItem('chartType') || 'bar',
      chartGroup: localStorage.getItem('chartGroup') || 'category',
      darkMode: localStorage.getItem("dark_theme") === "true"
    }
  },
  mounted() {
    this.$root.$emit('setTitle', 'Impostazioni');
    const q = query(collection(db, "settings"));
    this.$root.$emit('showLoading');
    onSnapshot(q, (querySnapshot) => {
      this.settings = [];
      querySnapshot.forEach((doc) => {
        this.settings.push(doc);
      });
    });

    setTimeout(() => {
      this.loadExpenses()
      this.$root.$emit('hideLoading');
    }, 500)
  },
  computed: {
    json_data() {
      return this.items.map(item => {
        return {
          'Data': item.data().data,
          'Descrizione': item.data().name,
          'Categoria': item.data().categoria,
          'Account': item.data().account,
          'Importo': item.data().importo,
        }
      })
    }
  },
  methods: {
    loadExpenses() {
      const q = query(collection(db, "expenses"));
      onSnapshot(q, (querySnapshot) => {
        this.items = [];
        querySnapshot.forEach((doc) => {
          this.items.push(doc);
        });
        // ordino per data
        this.items.sort((a, b) => {
          return new Date(b.data().data) - new Date(a.data().data);
        });
      });
    },
    toggleDarkMode: function () {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
      localStorage.setItem("dark_theme", this.$vuetify.theme.dark.toString());
    },
    updateChartType: function () {
      localStorage.setItem('chartType', this.chartType);
    },
    updateChartGroup: function () {
      localStorage.setItem('chartGroup', this.chartGroup);
    }
  },

}
</script>
