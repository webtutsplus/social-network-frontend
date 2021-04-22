import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import SignUp from '../views/SignUp.vue'
import UserList from '../views/ListUsers.vue'
import ListFriends from "../views/ListFriends";
import Chat from "@/views/Chat";
import Homefb from "@/views/Homefb";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Homefb
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUp
  },{
    path: '/listusers',
    name: 'ListUsers',
    component: UserList
  },
  {
    path: '/friends',
    name: 'Friends',
    component: ListFriends
  },
  {
    path: '/chat',
    name: 'Chat',
    component: Chat
  },{
    path: '/posts',
    name: 'Posts',
    component: Homefb
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
