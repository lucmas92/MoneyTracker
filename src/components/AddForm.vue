<template>
  <v-bottom-sheet v-model="showAddForm" overlay-color="black" overlay-opacity="0.8" scrollable>
    <v-sheet>
      <v-toolbar
          color="primary"
          flat
          dark>
        <v-toolbar-title>Aggiunta Nuova Spesa</v-toolbar-title>
        <v-spacer/>
        <v-btn icon @click="showAddForm = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-form @submit.prevent="addNewExpense" @keydown.enter="addNewExpense">
        <section class="pa-6 pa-lg-12">
          <v-overlay :value="saving">
            <v-progress-circular
                indeterminate
                size="64"
            ></v-progress-circular>
          </v-overlay>
          <v-row>
            <v-col class="py-0" cols="12" lg="6">
              <v-text-field type="text" v-model="expense.name" label="Nome"></v-text-field>
            </v-col>
            <v-col class="py-0" cols="12" lg="6">
              <v-text-field type="number" step="0.01" min="0" v-model="expense.importo" label="Importo"></v-text-field>
            </v-col>
            <v-col class="py-0" cols="12" lg="6">
              <v-select label="Account"
                        :items="['cash', 'revolut','bank']"
                        v-model="expense.account"/>
            </v-col>
            <v-col class="py-0" cols="12" lg="6">
              <v-select label="Categoria"
                        :items="['auto', 'moto','cibo','svago','carburante','altro']"
                        v-model="expense.categoria"/>
            </v-col>
          </v-row>
          <v-date-picker
              locale="it-IT"
              full-width
              no-title
              v-model="expense.data"
              class="rounded-0"/>
        </section>
        <v-btn block height="60" type="submit">Aggiungi</v-btn>
      </v-form>
    </v-sheet>
  </v-bottom-sheet>
</template>

<script>
import {collection, addDoc} from "firebase/firestore";
import {db} from "@/firebase";

export default {
  name: 'AddForm',
  mounted() {
    this.$root.$on('toggleAddForm', () => {
      this.showAddForm = !this.showAddForm;
    });
  },
  data() {
    return {
      saving: false,
      showAddForm: false,
      expense: {
        name: 'asd',
        amount: 10,
        date: new Date().toJSON().slice(0, 10),
        account: 'cash',
        category: 'auto'
      }
    }
  },
  methods: {
    async addNewExpense() {
      this.saving = true;
      await addDoc(collection(db, 'expenses'), this.expense).catch((error) => {
        console.error("Error adding document: ", error);
      });
      this.expense = {
        name: 'Spesa' + Math.random() * 100,
        amount: (Math.random() * 100).toFixed(2),
        date: new Date().toJSON().slice(0, 10),
        account: 'cash',
        category: 'auto'
      }
      setTimeout(() => {
        this.saving = false;
        this.showAddForm = false;
        const currentRoute = this.$router.currentRoute.name;
        if (currentRoute === 'settings')
          this.$router.push({name: 'list'});
      }, 500);
    },
  }
}
</script>
