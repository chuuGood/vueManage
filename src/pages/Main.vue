<template>
    <el-container>
        <el-aside width="auto">
            <CommonAside></CommonAside>
        </el-aside>
        <el-container>
        <el-header>
            <CommonHeader></CommonHeader>
        </el-header>
        <CommonTag/>
        <el-main>
            <router-view></router-view>
        </el-main>
        </el-container>
    </el-container>
</template>

<script>
import CommonAside from "../components/CommonAside"
import CommonHeader from "../components/CommonHeader"
import CommonTag from "../components/CommonTag"
    export default {
        name:'Home',
        components:{ CommonAside, CommonHeader, CommonHeader, CommonTag, CommonTag }
    }
</script>

<style scoped> 
.el-header{
  background-color: black;
}
.el-main{
    padding-top: 0;
}
.el-container{
    height: 100%;
}
</style>