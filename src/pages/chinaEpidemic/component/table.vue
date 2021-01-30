<template>
  <el-table
  class="table"
    header-row-class-name="table-header"
    cell-class-name="table-item"
    :data="tableData"
    height="100%"
    border
    style="width: 100%">
     <el-table-column
      type="index"
      :index="index">
      </el-table-column>
    <el-table-column
      prop="date"
      label="日期"
      >
    </el-table-column>
    <el-table-column
      prop="name"
      label="姓名"
      >
    </el-table-column>
    <el-table-column
      prop="address"
      label="地址">
    </el-table-column>
  </el-table>
</template>

<script>
import {AJAX} from '@/common/ajax';


export default {
    data() {
      return {
        tableData: [{
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-08',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-06',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }]
      }
    },
    methods:{
        index(i){
            return i;
        }
    },
    beforeMount(){
         const ajax = new AJAX();
          const listURL = 'http://localhost:7001/china/city';
          ajax.get(listURL)
              .then((lData) => {
                  this.tableData = lData.data;
              })
              .catch(e=>console.log(e));
    }
}
</script>
<style >
    .table{
        opacity: 0.7;
        background: lightblue;
    }
    .table-item{
      /* opacity: 0.3; */
      color:darkred;
      /* background-color: yellow; */
    }
    .table-header{
        opacity: 0.8;
        color: red;
        /* background-color: cornflowerblue; */
    }
</style>