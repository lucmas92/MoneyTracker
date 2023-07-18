<template>
  <v-bottom-navigation
      v-model="temp"
      class="justify-space-between"
      height="60"
      app
      grow>
    <v-btn class="flex-grow-1" v-for="item in items" :value="item.link" :to="{name:item.link}">
      <span>{{ item.name }}</span>
      <v-icon>{{ item.icon }}</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>

<script>
import {collection, addDoc} from "firebase/firestore";
import {db} from "@/firebase";

export default {
  name: 'BottomNavigation',
  mounted() {
    this.$root.$on('toggleAddForm', () => {
      this.showAddForm = !this.showAddForm;
    });
  },
  data() {
    return {
      temp: '',
      items: [
        {name: 'Home', link: 'home', icon: 'mdi-home'},
        {name: 'List', link: 'list', icon: 'mdi-format-list-bulleted'},
        {name: 'Settings', link: 'settings', icon: 'mdi-cog'},
      ]
    }
  },
}
</script>
