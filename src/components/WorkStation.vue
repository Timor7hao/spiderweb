<template>
  <div id="workstation">
        <i class="el-icon-document"></i>
        <h1>爬虫工作状态</h1>
        <!-- <div class="button1">
            <el-button  router :default-active="$route.path" index="/NewTask">新建项目</el-button>
        </div> -->
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span class="period">待爬取任务列表</span>
                <div class="button1">
                    <el-button  @click="toNewTask">新建项目</el-button>
                </div>
            </div>
            <el-table :data="tableData1" :header-cell-style="tableHeaderColor" stripe style="width: 99%">
            <el-table-column prop="number" label="序号" width="100"></el-table-column>
            <el-table-column prop="taskid" label="任务ID" width="120"></el-table-column>
            <el-table-column prop="allname" label="所有爬虫名" width="690"></el-table-column>
            <el-table-column prop="parameter" label="参数" width="300"></el-table-column>
            <el-table-column prop="command" label="命令">
                <template slot-scope="scope">
                    <el-button
                        size="mini"
                        @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button
                        size="mini"
                        type="success"
                        @click="handleDelete(scope.$index, scope.row)">启动</el-button>
                </template>
            </el-table-column>
        </el-table>
        </el-card>
        
      <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span class="period">爬取中</span>
            </div>
            <el-table :data="tableData2" :header-cell-style="tableHeaderColor" stripe style="width: 99%">
            <el-table-column prop="number" label="序号" width="100"></el-table-column>
            <el-table-column prop="taskid" label="任务ID" width="120"></el-table-column>
            <el-table-column prop="name" label="爬虫名" width="180"></el-table-column>
            <el-table-column prop="parameter" label="参数" width="120"></el-table-column>
            <el-table-column prop="runtime" label="运行时长" width="160"></el-table-column>
            <el-table-column prop="starttime" label="启动时间" width="180"></el-table-column>
            <el-table-column prop="log" label="日志" width="140"></el-table-column>
            <el-table-column prop="spiderstate" label="爬虫状态" width="140"></el-table-column>
            <el-table-column prop="workstate" label="任务状态" width="140"></el-table-column>
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

        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span class="period">已完成任务</span>
            </div>
            <el-table :data="tableData3" :header-cell-style="tableHeaderColor" stripe style="width: 99%">
            <el-table-column prop="number" label="序号" width="100"></el-table-column>
            <el-table-column prop="taskid" label="任务ID" width="120"></el-table-column>
            <el-table-column prop="name" label="爬虫名" width="220"></el-table-column>
            <el-table-column prop="parameter" label="参数" width="180"></el-table-column>
            <el-table-column prop="runtime" label="运行时长" width="200"></el-table-column>
            <el-table-column prop="starttime" label="启动时间" width="220"></el-table-column>
            <el-table-column prop="log" label="日志" width="200"></el-table-column>
            <el-table-column prop="state" label="状态" width="130"></el-table-column>
        </el-table>
        </el-card>
    </div>
</template>

<script>
import NewTask from '@/components/NewTask'
export default {
    name: 'WorkStation',
    components: {
    NewTask
    },
    data () {
        return {
        tableData1: [{
          number: '1',
          taskid: '1',
          allname: '用户信息爬虫、好友信息爬虫',
          parameter: '',
          command: ''
        }, {
          number: '2',
          taskid: '1',
          allname: '帖子信息爬虫、点赞信息爬虫',
          parameter: '',
          command: ''
        }, {
          number: '3',
          taskid: '1',
          allname: '用户信息爬虫、好友信息爬虫、评论信息爬虫、帖子信息爬虫、点赞信息爬虫',
          parameter: '',
          command: ''
        }],
        tableData2: [{
          number: '1',
          taskid: '1',
          name: '用户信息爬虫',
          parameter: '',
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
          parameter: '',
          runtime: '23小时50分钟',
          starttime: '2019/3/10 21:45',
          log: 'main.log',
          spiderstate: '异常',
          workstate: '帖子数量',
          command: ''
        }],
        tableData3: [{
          number: '1',
          taskid: '1',
          name: '用户信息爬虫',
          parameter: '',
          runtime: '23小时15分钟',
          starttime: '2019/3/10 21:43',
          log: 'main.log',
          state: '已完成'
        }, {
          number: '2',
          taskid: '1',
          name: '帖子信息爬虫',
          parameter: '',
          runtime: '23小时50分钟',
          starttime: '2019/3/10 21:45',
          log: 'main.log',
          state: '已完成'
        }]
      }
    },
    methods: {
    // tableRowStyle({ row, rowIndex }) {
    // return 'background-color: pink'
    // },
    // 修改table header的背景色
    tableHeaderColor({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return 'background-color: lightblue;color: #fff;font-weight: 800;font-family: YouYuan'
      }
    },
    toNewTask: function() {
        this.$router.push({path:'/NewTask'})
    }
}
}
</script>

<style>
#workstation {
    height: 810px;
    overflow-y: auto;
}

#workstation h1{
    font-size: 25px;
    margin: 30px;
    margin-left: 10px !important;
    font-family: YouYuan;
    float: left;
}

.button1 .el-button {
    background: #2E8B57 ;
    color: white !important;
    position: relative;
    float: right;
    /* margin: 20px; */
    margin-right:15px;
}

#workstation .el-icon-document{
    color: #AB82FF;
    font-size: 30px;
    float: left;
    margin-left: 32px;
    margin-top: 28px;
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
    margin-left:30px;
    background: white;
    padding: 30px;
    padding-bottom: 0px;
    margin-bottom: 20px;
}

#workstation .period {
    float:left;
    font-size: 16px;
    font-weight: 1000;
    color: rgb(107, 185, 216);
    font-family: YouYuan;
}

</style>