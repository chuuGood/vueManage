<template>
  <header>
    <div class="l-context">
        <el-button @click="handleMenu" plain icon="el-icon-menu" size="mini"></el-button>
        <!-- <h3 style="color:#fff">首页</h3> -->
        <el-breadcrumb separator="/">
            <el-breadcrumb-item v-for="tab in tabsList" :key="tab.path" :to="{ path: tab.path }">{{tab.label}}</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
    <div class="r-context">
        <el-dropdown trigger="click" szie="mini">
            <span><img class="user" :src="userImg"></span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>个人中心</el-dropdown-item>
                <el-dropdown-item @click.native="leave">退出</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </div>
  </header>
</template>

<script>
import { mapMutations,mapState } from 'vuex'
    export default {
        name:'CommonHeader',
        data(){
            return{
                userImg:require("../assets/images/user.png")
            }
        },
        methods:{
            // ...mapMutations('tab',{handleMenu:'collapseMenu'})
            handleMenu(){
                this.$store.commit('tab/collapseMenu') 
            },
            leave(){
                this.$store.commit('user/clearToken')
                this.$store.commit('tab/clearMenu')
                this.$router.push({name:'login'})
            }
        },
        computed:{
            ...mapState('tab',['tabsList'])
            // tabsList(){
            //     return this.$store.state.tab.tabsList
            // }
        }
    }
</script>

<style lang="less" scoped>
header{
    display: flex;
    height: 100%;
    justify-content:space-between;
    align-items: center;
}
.l-context{
    display: flex;
    align-items: center;
    h3{
        margin-left: 5px;
    }
    .el-button{
        margin-left: 20px;
    }
}
.r-context{
    .user{
        width: 40px;
        height: 40px;
        border-radius: 50%;
    }
}
</style>