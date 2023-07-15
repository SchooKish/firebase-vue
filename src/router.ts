import {createRouter, createWebHistory, Router, RouterOptions} from "vue-router";
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import Registration from './views/Registration.vue'
import SettingsPage from './views/SettingsPage.vue'

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/registration',
        name: 'registration',
        component: Registration
    },
    {
        path: '/settings',
        name: 'settings',
        component: SettingsPage
    }
]

const router: Router = createRouter(<RouterOptions>{
    history: createWebHistory(),
    routes,
})

export default router;