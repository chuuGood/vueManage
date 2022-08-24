<template>
    <el-form
    :model="form"
    status-icon
    :rules="rules"
    ref="form"
    label-width="50px"
    class="login-container"
    >
    <h3>系统登录</h3>
    <el-form-item
    label="用户名"
    label-width="80px"
    prop="username"
    class="username"
    >
        <el-input
        type="text"
        v-model="form.username"
        autocomplete="off"
        placeholder="请输入账号"
        ></el-input>
    </el-form-item>
    <el-form-item
    label="密码"
    label-width="80px"
    prop="password"
    >
        <el-input
        type="password"
        v-model="form.password"
        autocomplete="off"
        placeholder="请输入密码"
        @keyup.enter.native="login()"
        ></el-input>
    </el-form-item>
    <el-form-item class="login-submit">
        <el-button type="primary" @click="login" class="login-submit">登录</el-button>
    </el-form-item>
    </el-form>
</template>

<script>
import Mock from "mockjs"
import { getMenu } from "../../api/data"
    export default {
        name:'Login',
        data(){
            return{
                form:{},
                rules:{
                    username:[
                        {required:true,message:'请输入用户名',trigger:'blur'},
                        {
                            min:3,
                            message:'用户名长度不能小于3位',
                            trigger:'blur'
                        }
                    ],
                    password:[
                        {required:true,message:'请输入密码',trigger:'blur'},
                    ]
                }
            }
        },
        methods:{
            login(){
                getMenu(this.form).then(({data:res})=>{
                    console.log(res)
                    if(res.code === 20000){
                        this.$store.commit('tab/clearMenu')
                        this.$store.commit('tab/setMenu',res.data.menu)
                        this.$store.commit('user/setToken',res.data.token)
                        this.$store.commit('tab/addMenu',this.$router)
                        this.$router.push({name:'home'})
                    }else{
                        this.$message.warning(res.data.message)
                    }
                })
            }
        }
    }
</script>

<style lang="less" scoped>
.login-container{
    border-radius: 15px;
    width: 350px;
    margin: 180px auto;
    /* background-clip: padding-box; */
    background-color:#ccc;
    border: 1px solid #eaeaea;
    padding: 35px 25px 15px 5px;
    h3{
        text-align: center;
        margin-bottom: 30px;
    }
    .login-submit{
        margin-left: 50px;
    }
}
</style>