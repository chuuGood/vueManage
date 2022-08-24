import VueRouter from "vue-router"
import Main from "../pages/Main"
import Home from "../pages/home"
import User from "../pages/user"
import Mall from "../pages/mall"
import pageOne from "../pages/other/pageOne"
import pageTwo from "../pages/other/pageTwo"
import Login from "../pages/login"
const router = new VueRouter({
    mode:'history',
    routes:[
        {
            name:'Main',
            path:'/',
            redirect:'/home',
            component:Main,
            children:[
                // {
                //     name:'home',
                //     path:'/home',
                //     component:Home
                // },
                // {
                //     name:'user',
                //     path:'/user',
                //     component:User
                // },
                // {
                //     name:'mall',
                //     path:'/mall',
                //     component:Mall
                // },
                // {
                //     name:'page1',
                //     path:'/page1',
                //     component:pageOne
                // },
                // {
                //     name:'page2',
                //     path:'/page2',
                //     component:pageTwo
                // }
            ]
        },
        {
            name:'login',
            path:'/login',
            component:Login
        }
    ]
})
export default router