import Vue from 'vue'
import Router from 'vue-router'
import Home from "@/components/Home";
import App from "@/App";
import Login from "@/components/Login";
import Register from "@/components/Register";
import Landing from "@/components/Landing";

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        { path: '/', name: 'root', redirect: 'index', component: App },
        { path: '/index', name: 'index', component: Landing },
        { path: '/home', name: 'home', component: Home},
        { path: '/login', name: 'login', component: Login },
        { path: '/register', name: 'register', component: Register }
    ]
})