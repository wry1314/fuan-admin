<template>
    <div>
      <el-table
        :data="tableData"
        :border="tableAttr.border"
        @selection-change="handleSelectionChange"
        style="width: 100%">
        <el-table-column v-if="tableAttr.check" type="selection">
        </el-table-column>
        <el-table-column
          v-for="(item,index) in tableHeader"
          :show-overflow-tooltip="true"
          :key="index"
          align="center"
          :index="index"
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
        >
          <template slot-scope="scope">
            <!--操作-->
            <div  v-if="item.type && item.type == 'operation'">
              <el-button @click="editFun(scope.row)" type="primary" size="mini">编辑</el-button>
              <el-button @click="deleteFun(scope.row)" class="orange" size="mini">删除</el-button>
            </div>
            <!--展示-->
            <div v-if="item.prop == 'id'">
              {{scope.$index+1}}
            </div>
            <div v-else>
              {{scope.row[item.prop]}}
            </div>
          </template>
        </el-table-column>

      </el-table>

    </div>
</template>

<script>
    export default {
      name: "tableContent",
      props:{
        tableHeader:{
          type:Array,
          default:[]
        },
        tableData:{
          type:Array,
          default:[]
        },
        idName:{
          type:String,
          default:''
        },
        tableAttr:{
          type:Object,
          default:function () {
            return {
              border:true,
              check:false
            }
          }
        }
      },
      data(){
        return {

        }
      },
      methods:{
        editFun(data){
          let vm = this;
          let id = data[vm.idName];
          this.$emit('editFun',{id:id})
        },
        deleteFun(data){
          let vm = this;
          let id = data[vm.idName];
          this.$emit('deleteFun',{id:id})
        },
        handleSelectionChange(val) {
          let idSum = this.getId(val);
          this.$emit('getDeteleId',{id:idSum})
        },
        getId(data){
          let sum = [];
          let vm = this;
          for(let i=0,len=data.length;i<len;i++){
            sum.push(data[i][vm.idName])
          }
          return sum
        }
      },
      mounted(){
      }
    }
</script>

<style scoped>

</style>
