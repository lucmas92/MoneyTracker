<template>
  <v-bottom-sheet v-model="showEditForm">
    <v-sheet v-if="expenseId !== null">
      <v-toolbar
          color="primary"
          flat
          dark>
        <v-toolbar-title>Modifica Spesa</v-toolbar-title>
        <v-spacer/>
        <v-btn icon @click="showEditForm = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-form @submit.prevent="updateExpense">
        <section class="pa-6 pa-lg-12">

          <v-overlay :value="updating">
            <v-progress-circular
                indeterminate
                size="64"
            ></v-progress-circular>
          </v-overlay>
          <v-row>
            <v-col class="py-0" cols="12" lg="6">
              <v-text-field type="text" v-model="expenseData.name" label="Nome"></v-text-field>
            </v-col>
            <v-col class="py-0" cols="12" lg="6">
              <v-text-field type="number" step="0.01" min="0" v-model="expenseData.importo"
                            label="Importo"></v-text-field>
            </v-col>
            <v-col class="py-0" cols="12" lg="6">
              <v-select label="Account"
                        :items="['cash', 'revolut','bank']"
                        v-model="expenseData.account"/>
            </v-col>
            <v-col class="py-0" cols="12" lg="6">
              <v-select label="Categoria"
                        :items="['auto', 'moto','cibo','svago','carburante','altro']"
                        v-model="expenseData.categoria"/>
            </v-col>
          </v-row>
          <v-date-picker
              locale="it-IT"
              full-width
              no-title
              v-model="expenseData.data"/>
        </section>
        <v-btn block height="60" type="submit">Salva</v-btn>
      </v-form>
    </v-sheet>
  </v-bottom-sheet>
</template>

<script>
import {doc, updateDoc} from "firebase/firestore";
import {db} from "@/firebase";

export default {
  name: 'EditForm',
  mounted() {
    this.$root.$on('toggleEditForm', (expense) => {
      this.expenseData = expense.data();
      this.expenseId = expense.id;
      this.showEditForm = !this.showEditForm;
    });
  },
  data() {
    return {
      expenseData: null,
      expenseId: null,
      showEditForm: false,
      updating: false
    }
  },
  methods: {
    async updateExpense() {
      this.updating = true;
      const docRef = doc(db, 'expenses', this.expenseId)
      await updateDoc(docRef, this.expenseData)
          .catch((error) => {
            console.error("Error adding document: ", error);
          });
      setTimeout(() => {
        this.updating = false;
        this.showEditForm = false;
      }, 500);
    },
  }
}
</script>
