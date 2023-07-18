<template>
  <v-container fluid class="px-0">
    <v-toolbar class="mt-2 mt-lg-0">
      <v-spacer></v-spacer>
      <v-menu offset-y rounded="0">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
              icon
              class="mx-4"
              v-bind="attrs"
              v-on="on">
            <v-icon>mdi-filter</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item>
            <v-list-item-title>Categoria</v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>Account</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <v-menu offset-y rounded="0">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
              icon
              class="mx-4"
              v-bind="attrs"
              v-on="on">
            <v-icon>mdi-sort</v-icon>
            <span v-if="sortBy !== null">*</span>
          </v-btn>
        </template>

        <v-list>
          <v-list-item link @click="setSortBy('importo')" :class="{'blue-grey':sortBy === 'importo'}">
            <v-list-item-title>Importo</v-list-item-title>
          </v-list-item>
          <v-list-item link @click="setSortBy('name')" :class="{'blue-grey':sortBy === 'name'}">
            <v-list-item-title>Nome</v-list-item-title>
          </v-list-item>
          <v-list-item link @click="setSortBy('category')" :class="{'blue-grey':sortBy === 'category'}">
            <v-list-item-title>Categoria</v-list-item-title>
          </v-list-item>
          <v-list-item link @click="setSortBy('account')" :class="{'blue-grey':sortBy === 'account'}">
            <v-list-item-title>Account</v-list-item-title>
          </v-list-item>
          <v-list-item link @click="setSortBy('date')" :class="{'blue-grey':sortBy === 'date'}">
            <v-list-item-title>Data</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <v-menu offset-y rounded="0">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
              icon
              class="mx-4"
              v-bind="attrs"
              v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item link @click="setSortBy(null)">
            <v-list-item-title>Reset</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-spacer></v-spacer>

    </v-toolbar>
    <v-list v-if="items.length > 0" color="transparent">
      <swipe-list
          ref="list"
          class="mt-0"
          :disabled="!enabled"
          :items="listItems ?? []"
          item-key="id"
      >
        <template v-slot="{ item, index, revealLeft, revealRight, close }">
          <v-list-item link class="my-2">
            <v-list-item-content>
              <v-list-item-title>{{ item.data().name }}</v-list-item-title>
              <v-list-item-subtitle>
                {{ item.data().data }} - {{ item.data().categoria }} - {{ item.data().account }}
              </v-list-item-subtitle>
              <v-list-item-subtitle>&euro; {{ item.data().importo }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </template>
        <template v-slot:left="{ item, close }">
          <div class="d-flex my-2 align-center blue-grey">
            <v-btn height="100" elevation="0" color="transparent" class="rounded-0 swipeout-action d-flex align-center"
                   @click="editExpense(item)">
              <v-icon class="mx-8">mdi-pencil</v-icon>
            </v-btn>
          </div>
        </template>
        <template v-slot:right="{ item }">
          <div class="d-flex my-2 align-center red">
            <v-btn height="100" elevation="0" color="transparent" class="rounded-0 swipeout-action d-flex align-center"
                   @click="removeExpense(item.id)">
              <v-icon class="mx-8">mdi-trash-can</v-icon>
            </v-btn>
          </div>
        </template>
      </swipe-list>
    </v-list>
  </v-container>
</template>

<script>
import {SwipeList, SwipeOut} from 'vue-swipe-actions';
import 'vue-swipe-actions/dist/vue-swipe-actions.css';
import {collection, deleteDoc, doc, onSnapshot, query} from "firebase/firestore";
import {db} from "@/firebase";


export default {
  components: {
    SwipeOut,
    SwipeList
  },
  name: 'List',
  data() {
    return {
      enabled: true,
      items: [],
      sortBy: null
    };
  },
  computed: {
    listItems() {
      if (this.sortBy === 'importo') {
        return this.items.sort((a, b) => {
          return b.data().importo - a.data().importo;
        });
      } else if (this.sortBy === 'name') {
        return this.items.sort((a, b) => {
          return a.data().name.localeCompare(b.data().name);
        });
      } else if (this.sortBy === 'category') {
        return this.items.sort((a, b) => {
          return a.data().categoria.localeCompare(b.data().categoria);
        });
      } else if (this.sortBy === 'account') {
        return this.items.sort((a, b) => {
          return a.data().account.localeCompare(b.data().account);
        });
      } else if (this.sortBy === 'date') {
        return this.items.sort((a, b) => {
          return b.data().data.localeCompare(a.data().data);
        });
      }
      return this.items
    }
  },
  mounted() {
    this.$root.$emit('setTitle', 'Lista Spese');
    this.$root.$emit('showLoading');
    this.loadExpenses()
  },
  methods: {
    loadExpenses() {
      const q = query(collection(db, "expenses"));
      onSnapshot(q, (querySnapshot) => {
        this.items = [];
        debugger;
        querySnapshot.forEach((doc) => {
          this.items.push(doc);
        });
        // ordino per data
        this.items.sort((a, b) => {
          return new Date(b.data().data) - new Date(a.data().data);
        });

        this.$root.$emit('hideLoading');
      });
    },
    editExpense(item) {
      this.$root.$emit('toggleEditForm', item);
    },
    async removeExpense(item_id) {
      this.deleting = true
      const conf = confirm('Sei sicuro di voler eliminare questa spesa?')
      if (conf)
        await deleteDoc(doc(db, 'expenses', item_id))
            .catch((error) => {
              console.error("Error adding document: ", error);
            });
      this.deleting = false
    },
    setSortBy(sortBy) {
      this.sortBy = sortBy
    },

  }
}
</script>
