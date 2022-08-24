<template>
  <div class="manage">
    <div v-if="isShow">
      <el-dialog
      :title="operateType === 'add'?'新增用户':'更新用户'"
      :visible.sync="isShow"
      >
        <CommonForm
        :formLabel="operateFormLabel"
        :form="operateForm"
        :inline="inline"
        ></CommonForm>
        <div slot="footer" class="dialog-footer">
          <el-button @click="isShow=false">取消</el-button>
          <el-button type="primary" @click="confirm">确定</el-button>
        </div>
      </el-dialog>
    </div>
    <div class="manage-header">
      <el-button type="primary" @click="addUser">+新增</el-button>
      <CommonForm
      :formLabel="formLabel"
      :form="searchForm"
      :inline="inline"
      >
        <el-button type="primary" @click="getList(searchForm.keyword)">搜索</el-button>
      </CommonForm>
    </div>
    <CommonTable
    :tableData="tableData"
    :tableLabel="tableLabel"
    :config="config"
    @edit="editUser"
    @del="delUser"
    @changePage="getList"
    ></CommonTable>
  </div>
</template>

<script>
import CommonForm from "../../components/CommonForm"
import CommonTable from "../../components/CommonTable"
import { getUser } from "../../api/data"
    export default {
        name:'User',
        data(){
          return{
            operateType:'add',
            isShow:false,
            operateFormLabel:[
                    {
                        model: 'name',
                        label: '姓名',
                        type: 'input'
                    },
                    {
                        model: 'age',
                        label: '年龄',
                        type: 'input'
                    },
                    {
                        model: 'sex',
                        label: '性别',
                        type: 'select',
                        opts: [
                            {
                                label: '男',
                                value: 1
                            },
                            {
                                label: '女',
                                value: 0
                            }
                        ]
                    },
                    {
                        model: 'birth',
                        label: '出生日期',
                        type: 'date'
                    },
                    {
                        model: 'addr',
                        label: '地址',
                        type: 'input'
                    }
                ],
            operateForm:{
              name: "",
              addr: "",
              age: "",
              birth: "",
              sex: "",
            },
            inline:true,
            formLabel:[
              {
                model:'keyword',
                label:'',
                type:'input'
              }
            ],
            searchForm:{
              keyword:''
            },
            tableData:[],
            tableLabel:[
              {
                prop:'name',
                label:'姓名'
              },
              {
                prop:'age',
                label:'年龄'
              },
              {
                prop:'sexLabel',
                label:'性别'
              },
              {
                prop:'birth',
                label:'出生日期',
                width:200
              },
              {
                prop:'addr',
                label:'地址',
                width:320
              },
            ],
            config:{
              page:1,
              total:30,
              loading:false
            }
          }
        },
        methods:{
          confirm(){
            if(this.operateType === 'add'){
              this.$http.post('/user/add',this.operateForm).then(res=>{
                this.isShow = false
                console.log(res)
                this.getList()
              })
            }else{
              this.$http.post('/user/edit',this.operateForm).then(res=>{
                this.isShow = false
                console.log(res)
                this.getList()
              })
            }
          },
          addUser(){
            this.isShow = true
            
            this.operateType = 'add'
            this.operateForm = {
              name: "",
              addr: "",
              age: "",
              birth: "",
              sex: ""
            }
          },
          getList(name=''){     
            // console.log(page)      
            this.config.loading = true
            name ? (this.config.page = 1) : ''
            // this.config.page = page?page:1
            getUser({
              page:this.config.page,
              name
            }).then(res=>{
              // console.log(res)
              this.tableData = res.data.list.map(item=>{
                item.sexLabel = item.sex === 0?'女':'男'
                return item
              })
              this.config.total = res.data.count
              this.config.loading = false
            })
          },
          editUser(row){
            this.operateType = 'edit'
            this.isShow = true
            this.operateForm = {...row}
          },
          delUser(row){
            this.$confirm("此操作将永久删除该数据,是否继续？","提示",{
              confirmButtonText:'确定',
              cancelButtonText:'取消',
              type:'warning'
            }).then(()=>{
              const id = row.id
              this.$http.get('/user/del',{
                param:{ id }
              }).then(()=>{
                this.$message({
                  type:'success',
                  message:'删除成功'
                })
                this.getList()
              })
            })
          }
        },
        created(){
          this.getList()
        },
        components:{ CommonForm,CommonTable }
    }
</script>

<style lang="less" scoped>
.manage{
  height: 100%;
}
.manage-header{
  height: 12%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>