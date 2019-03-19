<template>
    <div id="Periodworkstation">
        <i class="el-icon-refresh"></i>
        <h1>周期性任务工作状态</h1>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span class="Period">周期性任务</span>
            </div>
            <el-table :data="tableData1" :header-cell-style="tableHeaderColor" stripe style="width: 99%">
            <el-table-column prop="number" label="序号" width="100"></el-table-column>
            <el-table-column prop="taskid" label="任务ID" width="100"></el-table-column>
            <el-table-column prop="name" label="爬虫名" width="160"></el-table-column>
            <el-table-column prop="isperiod" label="是否周期性" width="120"></el-table-column>
            <el-table-column prop="interval" label="间隔时间" width="120"></el-table-column>
            <el-table-column prop="periodtime" label="周期数" width="100"></el-table-column>
            <el-table-column prop="runtime" label="运行时长" width="140"></el-table-column>
            <el-table-column prop="starttime" label="启动时间" width="140"></el-table-column>
            <el-table-column prop="log" label="日志" width="100"></el-table-column>
            <el-table-column prop="spiderstate" label="爬虫状态" width="100"></el-table-column>
            <el-table-column prop="workstate" label="任务状态" width="120"></el-table-column>
            <el-table-column prop="command" label="命令">
                <template slot-scope="scope">
                    <el-button
                        size="mini"
                        type="danger"
                        @click="handleDelete(scope.$index, scope.row)">停止</el-button>
                </template>
            </el-table-column>
        </el-table>
        </el-card>   
    </div>
</template>

<script>
export default {
    name: 'PeriodWorkStation',
    data () {
        return {
          tableData1: [{
          number: '1',
          taskid: '1',
          name: '用户信息爬虫',
          isperiod: '是',
          interval: '24小时',
          periodtime: '5',
          runtime: '23小时15分钟',
          starttime: '2019/3/10 21:43',
          log: 'main.log',
          spiderstate: '正常',
          workstate: '用户数量',
          command: ''
        }, {
          number: '2',
          taskid: '1',
          name: '帖子信息爬虫',
          isperiod: '是',
          interval: '24小时',
          periodtime: '5',
          runtime: '23小时50分钟',
          starttime: '2019/3/10 21:45',
          log: 'main.log',
          spiderstate: '异常',
          workstate: '帖子数量',
          command: ''
        }]
        }
    },
    methods: {
    // 修改table header的背景色
    tableHeaderColor({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return 'background-color: lightblue;color: #fff;font-weight: 800;font-family: YouYuan'
      }
    }
}
}
</script>

<style>
#Periodworkstation {
    height: 810px;
    overflow-y: auto;
}

#Periodworkstation h1{
    font-size: 25px;
    margin: 30px;
    margin-left: 10px !important;
    font-family: YouYuan;
    float: left;
}

#Periodworkstation .el-icon-refresh{
    color: #EECBAD;
    font-size: 30px;
    float: left;
    margin-left: 32px;
    margin-top: 30px;
}

.clearfix:before,
.clearfix:after {
    display: table;
    content: "";
}

.clearfix:after {
    clear: both
}

/* .box-card {
    width: 95%;
    margin-bottom: 20px;
} */
.box-card {
    width:95%;
    margin-left:40px;
    background: white;
    padding: 30px;
    padding-bottom: 0px;
    margin-bottom: 20px;
}

#Periodworkstation .Period {
    float:left;
    font-size: 16px;
    font-weight: 1000;
    color: rgb(107, 185, 216);
    font-family: YouYuan;
}

</style>