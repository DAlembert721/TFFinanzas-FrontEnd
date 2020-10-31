import Vue from 'vue'
import Router from 'vue-router'
import Home from "@/components/Home";
import App from "@/App";
import Login from "@/components/Login";
import Register from "@/components/Register";

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        { path: '/', name: 'root', redirect: 'home', component: App },
        { path: '/home', name: 'home', component: Home},
        { path: '/login', name: 'login', component: Login },
        { path: '/register', name: 'register', component: Register }
    ]
})