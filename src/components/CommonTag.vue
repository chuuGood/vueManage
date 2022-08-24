<template>
  <div class="tabs">
    <el-tag 
    v-for="(tag,index) in tags"
    :key="tag.path"
    size="small"
    :closable="tag.name !== 'home'"
    :effect="tag.name === $route.name?'dark':'plain'"
    @click="changeMenu(tag)"
    @close="handleClose(tag,index)"
     >
     {{tag.label}}
    </el-tag>
  </div>
</template>

<script>
import { mapState,mapMutations } from 'vuex';
    export default {
        name:'CommonTag',
        computed:{
            ...mapState({
                tags:state=>state.tab.tabsList
            }),
        },
        methods:{
             ...mapMutations('tab',{
                close:'closeTag'
            }),
            changeMenu(tag){
                this.$router.push({
                    name:tag.name
                })
            },
            handleClose(tag,index){
                const length = this.tags.length - 1
                this.close(tag)
                if(tag.name !== this.$route.name){
                    return
                }
                if(index === length){
                    this.$router.push({
                        name:this.tags[index-1].name
                    })
                }else{
                    this.$router.push({
                        name:this.tags[index].name
                    })
                }
            }
        }
    }
</script>

<style lang="less" scoped>
.tabs{
    padding: 20px;
    .el-tag{
        margin-left: 15px;
        cursor: pointer;
    }
}
</style>