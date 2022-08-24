<template>
  <el-menu default-active="1-4-1" class="el-menu-vertical-demo" background-color="#545c64"  text-color="#fff" active-text-color="#ffd04b" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
    <h4>{{isCollapse?'后台':'通用后台管理系统'}}</h4>
    <el-menu-item @click="clickMenu(item)" v-for="item in noChildren" :key="item.path" :index="item.path+''">
        <i :class="'el-icon-'+item.icon"></i>
        <span slot="title">{{item.label}}</span>
    </el-menu-item>
    <el-submenu v-for="item in hasChildren" :key="item.path" :index="item.path+''">
        <template slot="title">
            <i :class="'el-icon-'+item.icon"></i>
            <span slot="title">{{item.label}}</span>
        </template>
        <el-menu-item-group v-for="subItem in item.children" :key="subItem.path">
            <el-menu-item @click="clickMenu(subItem)" :index="subItem.path+''">{{subItem.label}}</el-menu-item>
        </el-menu-item-group>
    </el-submenu>
    </el-menu>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
    export default {
        name:'CommonAside',
        data() {
            return {
            }
        },
        computed:{
            noChildren(){
                return this.menu.filter(item=> !item.children)
            },
            hasChildren(){
                return this.menu.filter(item=> item.children)
            },
            // ...mapState('tab',['isCollapse'])
            isCollapse(){
                return this.$store.state.tab.isCollapse
            },
            menu(){
                return this.$store.state.tab.menu
            }
        },
        methods: {
            handleOpen(key, keyPath) {
                // console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            },
            clickMenu(item){
                this.$router.push({
                    name:item.name
                })
                this.$store.commit('tab/selectMenu',item) 
            },
            // ...mapMutations('tab',{clickMenu:'selectMenu',item})
        }
    }
</script>

<style lang="less" scoped>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .el-menu{
    height: 100%;
    border:none;
    h4{
        color: #fff;
        text-align: center;
        line-height: 48px;
    }
  }
</style>