<template>
  <v-app>
    <v-overlay :value="loading">
      <v-progress-circular
          indeterminate
          size="64"
      ></v-progress-circular>
    </v-overlay>
    <v-system-bar height="60" dark fixed>
      <v-btn
          fab
          color="transparent"
          small
          v-if="currentRoute !== 'home'"
          @click="goBack">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>

      <v-spacer></v-spacer>
      <v-toolbar-title :class="{'mr-12': !isHome}">{{ title ?? '' }}</v-toolbar-title>
      <v-spacer></v-spacer>

      <v-btn
          fab
          absolute
          right
          color="blue-grey"
          elevation="4"
          class="pl-1 mt-12"
          @click="toggleAddForm">
        <v-icon large>mdi-plus</v-icon>
      </v-btn>
    </v-system-bar>


    <v-main class="pt-10 pt-lg-12">

      <router-view/>
      <AddForm/>
      <EditForm/>
    </v-main>

    <v-footer>
      <BottomNavigation/>
    </v-footer>
  </v-app>
</template>

<script>

import AddForm from "@/components/AddForm.vue";
import BottomNavigation from "@/components/BottomNavigation.vue";
import EditForm from "@/components/EditForm.vue";

export default {
  name: 'App',
  components: {EditForm, BottomNavigation, AddForm},

  data: () => ({
    title: null,
    loading: false
  }),
  computed: {
    // current route name
    currentRoute() {
      return this.$route.name;
    },
    isHome() {
      return this.currentRoute === 'home';
    }
  },
  mounted() {

    this.$vuetify.theme.dark = localStorage.getItem("dark_theme") === 'true';

    this.title = localStorage.getItem("title") ?? '';
    // ascolto l'evento setTitle
    this.$root.$on('setTitle', (title) => {
      this.title = title;
      localStorage.setItem("title", title)
    });
    this.$root.$on('showLoading', () => this.loading = true)
    this.$root.$on('hideLoading', () => this.loading = false)
  },
  methods: {
    toggleAddForm() {
      this.$root.$emit('toggleAddForm');
    },
    goBack() {
      this.$router.go(-1);
    }
  }
};
</script>
