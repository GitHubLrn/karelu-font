import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Home from "@/views/Home";
import Square from "@/views/Square/Square";
import TreeHollow from "@/views/TreeHollow/TreeHollow";
import MessageView from "@/views/MessageView/MessageView"
import UserCenter from "@/views/userCenter/UserCenter";
import MainPage from "@/views/MainPage";
import AdminPage from "@/views/Admin/AdminPage";
import testRabbit from "@/views/testRabbit";


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/admin',
    name: 'Admin',
    component: AdminPage
  },
  {
    path: '/chattest',
    name: 'chattest',
    component: testRabbit
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    children:[
      {
        path: '/square',
        name: 'Square',
        component: Square
      }, ,
      {
        path: '/treeHollow',
        name: 'treeHollow',
        component: TreeHollow
      }
      ,{
        path: '/message',
        name: 'message',
        component: MessageView
      }
      ,{
        path: '/userCenter',
        name: 'userCenter',
        component: UserCenter
      },{
        path: '/mainPage',
        name: 'mainPage',
        component: MainPage
      }
    ]
  }
]

const router = new VueRouter({
  routes,
  mode:"hash"
})

export default router
