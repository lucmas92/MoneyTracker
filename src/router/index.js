import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ListView from "@/views/ListView.vue";
import SettingsView from "@/views/SettingsView.vue";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView
    },
    {
        path: '/list',
        name: 'list',
        component: ListView
    },
    {
        path: '/settings',
        name: 'settings',
        component: SettingsView
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
