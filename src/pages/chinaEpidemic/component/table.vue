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
      label="省份"
      >
    </el-table-column>
    <el-table-column
      prop="address"
      label="地址">
    </el-table-column>
      <el-table-column
      prop="count"
      label="数量">
    </el-table-column>
  </el-table>
</template>

<script>
import AJAX from '@/common/ajax';
import {Message} from 'element-ui';


export default {
    data() {
      return {
        tableData: [{
          date: '2021-02-03',
          name: '黑龙江',
          address: '哈尔滨市南岗区西大直街92号',
          count: 3,
        },
        {
          date: '2021-02-03',
          name: '黑龙江',
          address: '哈尔滨市南岗区黄河路1号',
          count: 5,
        },
        {
          date: '2021-02-03',
          name: '黑龙江',
          address: '哈尔滨市香坊区文化录38号',
          count: 8,
        },
        {
          date: '2021-02-03',
          name: '山东',
          address: '威海市环翠区文化西路180号',
          count: 5,
        },
        {
          date: '2021-02-03',
          name: '黑龙江',
          address: '哈尔滨市南岗区黄河路1号',
          count: 5,
        },
        {
          date: '2021-02-03',
          name: '河北',
          address: '石家庄市新华区',
          count: 15,
        },
        {
          date: '2021-02-03',
          name: '河北',
          address: '邯郸市临漳县',
          count: 3,
        },
        {
          date: '2021-02-03',
          name: '河北',
          address: '石家庄市藁城区',
          count: 1,
        },
        {
          date: '2021-02-03',
          name: '河北',
          address: '石家庄市鹿泉区',
          count: 1,
        },
        
        {
          date: '2021-02-03',
          name: '河北',
          address: '石家庄市桥西区',
          count: 5,
        },
        {
          date: '2021-02-03',
          name: '广东',
          address: '深圳市南岗区',
          count: 7,
        },
        {
          date: '2021-02-03',
          name: '河北',
          address: '石家庄市桥西区',
          count: 9,
        }]
      }
    },
    methods: {
        index(i){
            return i+1;
        },
    },
    beforeMount() {
        //没找到数据
        //  const ajax = new AJAX();
        //   const listURL = 'http://localhost:7001/china/day';
        //   ajax.get(listURL)
        //       .then((req) => {
        //           const tData= req.data;
        //             if(tData.isOk){
        //                 this.table = tData.data;
        //             }else{
        //                 Message.error(cityData.error);
        //             }
        //       })
        //       .catch( (e) => {
        //           console.error('table');
        //           Message.error(e);
        //       });
    },
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