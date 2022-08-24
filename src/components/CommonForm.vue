<template>
    <el-form ref="form" label-width="100px" :model="formData" :inline="inline">
        <el-form-item v-for="item in formLabel" :key="item.label" :label="item.label">
        <!-- input框 -->
            <el-input 
            v-if="item.type === 'input'"
            v-model="formData[item.model]" 
            :placeholder="'请输入' + item.label"
            >
            </el-input>
            <!-- 选择日期 -->
            <el-date-picker 
            v-if="item.type === 'date'"
            v-model="formData[item.model]" 
            placeholder="选择日期"
            value-format="yyyy-MM-dd"
            format="yyyy年mm月dd日"
            >
            </el-date-picker>
            <!-- 选择性别 -->
            <el-select 
            v-if="item.type === 'select'"
            v-model="formData[item.model]" 
            placeholder="请选择"
            >
              <el-option
              v-for="item2 in item.opts"
              :key="item2.label"
              :label="item2.label" 
              :value="item2.value"
              >
              </el-option>
            </el-select>
        </el-form-item>
        <el-form-item><slot></slot></el-form-item>
    </el-form>
</template>

<script>
    export default {
        name:'CommonForm',
        data(){
            return{
                formData:this.form
            }
        },
        props:{
            formLabel:Array,
            form:Object,
            inline:Boolean
        }
    }
</script>

<style>

</style>