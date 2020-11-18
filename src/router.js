import Vue from 'vue'
import Router from 'vue-router'
import Home from "@/components/Home";
import App from "@/App";
import Login from "@/components/Login";
import Register from "@/components/Register";
import Landing from "@/components/Landing";
import Profile from "@/components/Profile";
import Client from "@/components/Client";
import Product from "@/components/Product";
import Operation from "@/components/Operation";

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        { path: '/', name: 'root', redirect: 'index', component: App },
        { path: '/index', name: 'index', component: Landing },
        { path: '/home', name: 'home', component: Home},
        { path: '/login', name: 'login', component: Login },
        { path: '/register', name: 'register', component: Register },
        { path: '/profile', name: 'profile', component: Profile },
        { path: '/client/:id', name: 'client', component: Client },
        { path: '/product', name: 'product', component: Product },
        { path: '/bill/:id', name: 'bill', component: Operation }
    ]
})
