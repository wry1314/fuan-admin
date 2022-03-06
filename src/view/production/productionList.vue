<template>
    <div class="view">
        <title-content :titleText="'生产计划表'"></title-content>
        <div class="content">
        <div class="form-box">
          <el-form :inline="true">
            <el-form-item label="时间范围">
              <el-date-picker
                size="small"
                v-model="form.mounth"
                type="monthrange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                @change="onSearch">
                </el-date-picker>
            </el-form-item>
            <el-form-item class="add-btn">
              <el-button @click="onJumpPage" class="orange" size="small">新增计划</el-button>
            </el-form-item>
          </el-form>
        </div>
        <!--表格-->
        <div>
          <table-content
            @editFun="onEditFun"
            @deleteFun="onDeleteFun"
            :tableHeader="tableHeader"
            :tableData="tableData"></table-content>
        </div>
        <!--分页-->
        <el-pagination
          @size-change="onHandleSizeChange"
          @current-change="onHandleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
    </div>
</template>

<script>
    import titleContent from '@/components/common/title.vue'
    import tableContent from '@/components/common/table.vue'
    export default {
        components:{
            titleContent,
            tableContent
        },
        name: "login",
        data(){
            return {
                form:{
                    mounth:''
                },
                tableData:[],
                tableHeader:[],
                currentPage:1,
                pageSize:20,
                total:0,
            }
        },
        methods:{
            onSearch(){

            },
            onHandleSizeChange(){

            },
            onHandleCurrentChange(){

            },
            onEditFun(){

            },
            onDeleteFun(){

            },
            onJumpPage(){

            }

        }
    }
</script>

<style scoped>
.add-btn{
    float: right;
}
.el-form{
    margin-top: 10px;
}
.el-form-item{
    margin-bottom: 10px;
}


</style>