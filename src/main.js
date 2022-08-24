import Vue from 'vue'
import App from './App.vue'
import VueRouter from "vue-router"
import {
  Container,Aside,Header,Main,Menu,Submenu,MenuItemGroup,
  MenuItem,Button,Dropdown,DropdownItem,DropdownMenu,
  Row,Col,Card,Table,TableColumn,Breadcrumb,BreadcrumbItem,
  Tag,Form,FormItem,Input,Select,Option,DatePicker,Dialog,
  Pagination,MessageBox,Message
} from "element-ui"
import router from "./router"
import store from "./store"
import axios from "axios"
import "./api/mock.js"
// import "./assets/less/home.less"
Vue.config.productionTip = false
Vue.prototype.$http = axios;
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$message = Message
Vue.use(VueRouter)
//element插件
Vue.use(Container)
Vue.use(Aside)
Vue.use(Header)
Vue.use(Main)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItemGroup)
Vue.use(MenuItem)
Vue.use(Button)
Vue.use(Dropdown)
Vue.use(DropdownItem)
Vue.use(DropdownMenu)
Vue.use(Row)
Vue.use(Col)
Vue.use(Card)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Tag)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Select)
Vue.use(Option)
Vue.use(DatePicker)
Vue.use(Dialog)
Vue.use(Pagination)

router.beforeEach((to, from, next) => {
  store.commit('user/getToken')
  const token = store.state.user.token
  if(!token && to.name !== 'login'){
    next({name:'login'})
  }else if(token && to.name === 'login'){
    next({name:'home'})
  }else{
    next()
  }
})
new Vue({
  render: h => h(App),
  router,
  store,
  created(){
    store.commit('tab/addMenu',router)
  }
}).$mount('#app')
