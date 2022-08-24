<template>
  <el-row class="home" :gutter="20">
    <el-col :span="8" style="margin-top:20px">
      <el-card shadow="hover">
        <div class="user">
          <img :src="userImg">
          <div class="userInfo">
            <p class="name">Admin</p>
            <p class="access">超级管理员</p>
          </div>
        </div>
        <div class="login-info">
          <p>上次登陆时间：<span>2021-7-19</span></p>
          <p>上次登陆地点：<span>武汉</span></p>
        </div>
      </el-card>
      <el-card style="margin-top:20px; height: 460px;">
        <el-table :data="tableData">
          <el-table-column
           v-for="(value,key) in tableLabel"
          :key="key"
          :prop="key"
          :label="value"
          >
          </el-table-column>
        </el-table>
      </el-card>
    </el-col>
    <el-col :span="16" style="margin-top:20px">
      <div class="num">
        <el-card v-for="item in countData" :key="item.name" :body-style="{ display:'flex',padding:0}">
         <i class="icon" :class="`el-icon-${item.icon}`" :style="{ background:item.color}"></i>
         <div class="detail">
          <p class="num">￥{{item.value}}</p>
          <p class="txt">￥{{item.name}}</p>
         </div>
        </el-card>
      </div>
      <el-card style="height:280px">
      <!-- <div style="height:280px" ref="echarts"></div> -->
      <Echart style="height:280px" :chartData="echartData.order" :isAxisChart="true"/>
      </el-card>
      <div class="graph">
        <el-card style="height:260px">
          <!-- <div style="height:240px" ref="userEcharts"></div> -->
          <Echart style="height:240px" :chartData="echartData.user" :isAxisChart="true"/>
        </el-card>
        <el-card style="height:260px">
          <!-- <div style="height:240px" ref="videoEcharts"></div> -->
          <Echart style="height:240px" :chartData="echartData.video" :isAxisChart="false"/>
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import Echart from "../../components/Echart"
import {getData} from "../../api/data"
    export default {
        name:'Home',
        data(){
          return{
            userImg:require("../../assets/images/user.png"),
            tableData:[],
            tableLabel:{
              name:'课程',
              todayBuy:'今日购买',
              monthBuy:'本月购买',
              totalBuy:'总购买'
            },
            countData:[
              {
                name: "今日支付订单",
                value: 1234,
                icon: "success",
                color: "#2ec7c9",
              },
              {
                name: "今日收藏订单",
                value: 210,
                icon: "star-on",
                color: "#ffb980",
              },
              {
                name: "今日未支付订单",
                value: 1234,
                icon: "s-goods",
                color: "#5ab1ef",
              },
              {
                name: "本月支付订单",
                value: 1234,
                icon: "success",
                color: "#2ec7c9",
              },
              {
                name: "本月收藏订单",
                value: 210,
                icon: "star-on",
                color: "#ffb980",
              },
              {
                name: "本月未支付订单",
                value: 1234,
                icon: "s-goods",
                color: "#5ab1ef",
              },
            ],
            echartData:{
              order:{
                xData:[],
                series:[]
              },
              user:{
                xData:[],
                series:[]
              },
              video:{
                series:[]
              }
            }
          }
        },
        mounted(){
          getData().then(res=>{
            // console.log(res)
            const {code,data} = res.data
            if(code===20000){
              this.tableData=data.tableData
              const order = data.orderData
              //现状图
              const keyArry = Object.keys(order.data[0])
              const series=[]
              keyArry.forEach(key=>{
                series.push({
                  name:key,
                  type:'line',
                  data:order.data.map(item=>item[key])
                })
              })
              // const option = {
              //   xAxis:{
              //     data:order.date
              //   },
              //   yAxis:{},
              //   tooltip: {},
              //   legend:{
              //     data:keyArry
              //   },
              //   series
              // }
              // const E =echarts.init(this.$refs.echarts)
              // E.setOption(option)
              this.echartData.order.xData = order.date
              this.echartData.order.series = series
              //柱状图
              // const userOption={
              //   legend: {
              //     // 图例文字颜色
              //     textStyle: {
              //       color: "#333",
              //     },
              //   },
              //   grid: {
              //     left: "20%",
              //   },
              //   // 提示框
              //   tooltip: {
              //     trigger: "axis",
              //   },
              //   xAxis: {
              //     type: "category", // 类目轴
              //     data: data.userData.map(item=>item.date),
              //     axisLine: {
              //       lineStyle: {
              //         color: "#17b3a3",
              //       },
              //     },
              //     axisLabel: {
              //       interval: 0,
              //       color: "#333",
              //     },
              //   },
              //   yAxis: [
              //     {
              //       type: "value",
              //       axisLine: {
              //         lineStyle: {
              //           color: "#17b3a3",
              //         },
              //       },
              //     },
              //   ],
              //   color: ["#2ec7c9", "#b6a2de"],
                // series: [
                //   {
                //     name:'新增用户',
                //     type:'bar',
                //     data:data.userData.map(item=>item.new)
                //   },
                //   {
                //     name:'活跃用户',
                //     type:'bar',
                //     data:data.userData.map(item=>item.active)
                //   }
                // ],
              // }
              // const U = echarts.init(this.$refs.userEcharts)
              // U.setOption(userOption)
              this.echartData.user.xData = data.userData.map(item=>item.date),
              this.echartData.user.series = [
                  {
                    name:'新增用户',
                    type:'bar',
                    data:data.userData.map(item=>item.new)
                  },
                  {
                    name:'活跃用户',
                    type:'bar',
                    data:data.userData.map(item=>item.active)
                  }
                ]
              //饼状图
              // const videoOption = {
              //   tooltip: {
              //   trigger: "item",
              // },
              // color: [
              //   "#0f78f4",
              //   "#dd536b",
              //   "#9462e5",
              //   "#a6a6a6",
              //   "#e1bb22",
              //   "#39c362",
              //   "#3ed1cf",
              // ],
              // series: [
              //   {
              //     data:data.videoData,
              //     type:'pie'
              //   }
              // ],
              // }
              // const P = echarts.init(this.$refs.videoEcharts)
              // P.setOption(videoOption)
              this.echartData.video.series = [
                {
                  data:data.videoData,
                  type:'pie'
                }
              ]
            }
          })
        },
        components:{
          Echart
        }
    }
</script>

<style lang="less" scoped>
.home{
  .user{
    display: flex;
    align-items: center;
    border-bottom: 1px solid #ccc;
    padding-bottom: 20px;
    margin-bottom: 20px;
    img{
      width: 140px;
      height: 140px;
      border-radius: 50%;
    }
    &Info{
      margin-left: 40px;
      .name{
        font-size: 26px;
        margin-bottom: 2px;
      }
      .access{
        font-size: 12px;
        color: #999999;
      }
    }
  }
  .login-info{
    p{
      font-size: 13px;
      color: #999999;
      margin-bottom: 10px;
      span{
        color: #666666;
        margin-left: 40px;
      }
    }
  }
  .num{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .el-card{
      margin-bottom: 15px;
      width: 32%;
    }
    .icon{
      width: 80px;
      height: 80px;
      color: #fff;
      text-align: center;
      line-height: 80px;
      font-size: 26px;
    }
    .detail{
      margin-left: 15px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      .num{
        font-size: 25px;
        margin-bottom: 5px;
      }
      .txt{
        font-size: 13px;
        color: #999999;
      }
    }
  }
  .graph{
    display: flex;
    .el-card{
      width: 50%;
    }
  }
}
</style>