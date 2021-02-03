<template>
  <el-table
    class="table"
    header-row-class-name="table-header"
    cell-class-name="table-item"
    :data="tableData"
    height="100%"
    border
    style="width: 100%"
  >
    <el-table-column type="index" :index="index + 1"> </el-table-column>
    <el-table-column prop="date" label="日期"> </el-table-column>
    <el-table-column prop="league" label="联赛"> </el-table-column>
    <el-table-column prop="team" label="球队"> </el-table-column>
    <el-table-column prop="count" label="数量"> </el-table-column>
  </el-table>
</template>

<script>
import AJAX from "@/common/ajax";
import { Message } from "element-ui";

export default {
  data() {
    return {
      tableData: [
        {
          date: "2021-02-01",
          league: "英超",
          team: "利物浦",
          count: 1,
        },
        {
          date: "2021-02-01",
          league: "意甲",
          team: "尤文图斯",
          count: 3,
        },
        {
          date: "2021-02-01",
          league: "西甲",
          team: "皇家马德里",
          count: 4,
        },
        {
          date: "2021-02-01",
          league: "法甲",
          team: "巴黎圣日耳曼",
          count: 1,
        },
        {
          date: "2021-01-31",
          league: "德甲",
          team: "拜仁慕尼黑",
          count: 2,
        },
        {
          date: "2021-01-28",
          league: "意甲",
          team: "国际米兰",
          count: 2,
        },
        {
          date: "2021-01-25",
          league: "英超",
          team: "切尔西",
          count: 3,
        },
        {
          date: "2021-01-24",
          league: "西甲",
          team: "马德里竞技",
          count: 1,
        },
        {
          date: "2021-01-23",
          league: "英超",
          team: "热刺",
          count: 2,
        },

        {
          date: "2021-01-22",
          league: "法甲",
          team: "马赛",
          count: 5,
        },
        {
          date: "2021-01-21",
          league: "德甲",
          team: "拜仁慕尼黑",
          count: 6,
        },
        {
          date: "2021-01-21",
          league: "德甲",
          team: "多特蒙德",
          count: 9,
        },
      ],
    };
  },
  methods: {
    index(i) {
      return i;
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
};
</script>
<style >
.table {
  opacity: 0.7;
  background: lightblue;
}
.table-item {
  /* opacity: 0.3; */
  color: darkred;
  /* background-color: yellow; */
}
.table-header {
  opacity: 0.8;
  color: red;
  /* background-color: cornflowerblue; */
}
</style>