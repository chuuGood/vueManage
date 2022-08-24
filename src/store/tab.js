import Cookie from "js-cookie"
export default{
    namespaced:true,
    state:{
        isCollapse:false,
        tabsList:[
            {
                path: '/home',
                name: 'home',
                label: '首页',
                icon: 's-home',
            }
        ],
        currentMenu:null,
        menu:[]
    },
    mutations:{
        collapseMenu(state){
            state.isCollapse = !state.isCollapse
        },
        selectMenu(state,val){
            if(val.name !== 'home'){
                state.currentMenu = val
                const result = state.tabsList.findIndex(item => item.name===val.name)
                if(result === -1){
                    state.tabsList.push(val)
                }
            }else{
                state.currentMenu = null
            }
        },
        closeTag(state,val){
            const result = state.tabsList.findIndex(item => item.name===val.name)
            state.tabsList.splice(result,1)
        },
        setMenu(state,val){
            state.menu = val
            Cookie.set('menu',JSON.stringify(val))
        },
        clearMenu(state){
            state.menu = []
            Cookie.remove('menu')
        },
        addMenu(state,router){
            if(!Cookie.get('menu')){
                return 
            }
            state.menu = JSON.parse(Cookie.get('menu'))
            const menuArray = []
            state.menu.forEach(item => {
                if(item.children){
                    item.children = item.children.map(item2=>{
                        item2.component=()=>import(`../pages/${item2.url}`)
                        return item2
                    })
                    menuArray.push(...item.children)
                }else{
                    item.component=()=>import(`../pages/${item.url}`)
                    menuArray.push(item)
                }
            });
            menuArray.forEach(item=>{
                router.addRoute('Main',item)
            })
        }
    }
}