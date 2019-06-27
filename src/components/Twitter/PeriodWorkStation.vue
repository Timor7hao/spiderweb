<template>
    <div id="Periodworkstation">
        <i class="el-icon-refresh"></i>
        <h1 style="font-family:sans-serif">PeriodicworkStatus</h1>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span class="period">Next Jobs</span>
            </div>
            <el-table :data="tableData1" :header-cell-style="tableHeaderColor" stripe style="width: 99%" empty-text="NO DATA">
                <!-- <el-table-column type="expand">
                    <template slot-scope="props">
                        <el-form label-position="left" inline class="demo-table-expand">
                            <el-form-item label="SpiderInformation">
                                <span>{{ props.row.spiderinformation }}</span>
                            </el-form-item>
                        </el-form>
                    </template>
                </el-table-column> -->
                <el-table-column prop="name" label="TaskName" width="120" align="center"></el-table-column>
                <el-table-column prop="number" label="Number" width="120" type="index" align="center"></el-table-column>
                <el-table-column prop="id" label="TaskID" width="120" align="center"></el-table-column>
                <el-table-column prop="type" label="IsPeriodic" width="150" align="center"></el-table-column>
                <el-table-column prop="periodicTime" label="PeriodicTime" width="150" align="center"></el-table-column>
                <el-table-column prop="allname" label="AllSpider" width="300" align="center"></el-table-column>
                <el-table-column prop="parameter" label="Args" width="180" align="center">
                    <template slot-scope="props">
                        <el-popover
                            placement="right"
                            width="490"
                            trigger="click">
                            <el-table :data="argstable" empty-text="NO DATA">
                                <el-table-column prop="sleep" label="CrawlRate" width="90" align="center"></el-table-column>
                                <el-table-column prop="followHop" label="HopCount" width="90" align="center"></el-table-column>
                                <el-table-column prop="workTimeEnable" label="WorkTimeEnable" width="90" align="center"></el-table-column>
                                <el-table-column prop="timeZone" label="TimeZone" width="90" align="center"></el-table-column>
                                <el-table-column prop="workTimeRange" label="WorkTimeRange" width="100" align="center"></el-table-column>
                            </el-table>
                            <el-button type="text" slot="reference" @click="getRowid(props.row)">Details</el-button>
                        </el-popover>
                    </template>
                </el-table-column>
                <el-table-column prop="command" label="Command" width="180" align="center">
                    <template slot-scope="props">
                        <el-button
                            size="mini"
                            @click="deleteRow(props.row);">Delete</el-button>
                        <el-button
                            size="mini"
                            type="success"
                            @click="startRow(props.row)">Start</el-button>
                    </template>
                </el-table-column>
            </el-table>
            </el-card>
            
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span class="period">Running Jobs</span>
                </div>
                <el-table :data="tableData2" :header-cell-style="tableHeaderColor" stripe style="width: 99%" empty-text="NO DATA">
                <el-table-column prop="name" label="TaskName" width="90" align="center"></el-table-column>
                <el-table-column prop="id" label="TaskID" width="80" align="center"></el-table-column>
                <el-table-column prop="number" label="Number" width="70" type="index" align="center"></el-table-column>
                <el-table-column prop="spidername" label="Spider" width="90" align="center"></el-table-column>
                <el-table-column prop="periodicTime" label="PeriodicTime" width="110" align="center"></el-table-column>
                <el-table-column prop="parameter" label="Args" width="70" align="center">
                    <template slot-scope="props">
                        <el-popover
                            placement="right"
                            width="490"
                            trigger="click">
                            <el-table :data="argstable" empty-text="NO DATA">
                                <el-table-column prop="sleep" label="CrawlRate" width="90" align="center"></el-table-column>
                                <el-table-column prop="followHop" label="HopCount" width="90" align="center"></el-table-column>
                                <el-table-column prop="workTimeEnable" label="WorkTimeEnable" width="90" align="center"></el-table-column>
                                <el-table-column prop="timeZone" label="TimeZone" width="90" align="center"></el-table-column>
                                <el-table-column prop="workTimeRange" label="WorkTimeRange" width="100" align="center"></el-table-column>
                            </el-table>
                            <el-button type="text" slot="reference" @click="getRowid(props.row)">Details</el-button>
                        </el-popover>
                    </template>
                </el-table-column>
                <el-table-column prop="runtime" label="RunTime" width="140" align="center"></el-table-column>
                <el-table-column prop="startTime" label="StartTime" width="140" align="center"></el-table-column>
                <el-table-column prop="workstate" label="WorkResult" width="105" align="center"></el-table-column>
                <el-table-column prop="log" label="Log" width="95" align="center">
                    <template slot-scope="props">
                        <el-button
                            size="mini"
                            @click="downloadLogs(props.row)">download</el-button>
                    </template>
                </el-table-column>
                <el-table-column prop="status" label="SpiderStatus" width="110" align="center"></el-table-column>
                <el-table-column prop="command" label="Command" width="270" align="center">
                    <template slot-scope="props">
                        <el-button
                            size="mini"
                            type="success"
                            @click="startRow(props.row)"
                            :disabled="props.row.status === 'running'">
                            <i class="fa fa-play" aria-hidden="true"></i>
                        </el-button>
                        <el-button
                            size="mini"
                            type="warning"
                            @click="pauseRow(props.row)"
                            :disabled="props.row.status === 'pause'">
                            <i class="fa fa-pause" aria-hidden="true"></i>
                        </el-button>
                        <el-button
                            size="mini"
                            type="danger"
                            @click="stopRow(props.row)">
                            <i class="fa fa-square" aria-hidden="true"></i>
                        </el-button>
                        <el-button
                            size="mini"
                            @click="deleteRow(props.row)">Delete
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>

        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span class="period">Completed Jobs</span>
            </div>
            <el-table :data="tableData3" :header-cell-style="tableHeaderColor" stripe style="width: 99%" empty-text="NO DATA">
                <el-table-column prop="name" label="TaskName" width="100" align="center"></el-table-column>
                <el-table-column prop="id" label="TaskID" width="100" sortable align="center"></el-table-column>
                <el-table-column prop="number" label="Number" width="110" type="index" align="center"></el-table-column>
                <el-table-column prop="spidername" label="Spider" width="110" align="center"></el-table-column>
                <el-table-column prop="periodicTime" label="PeriodicTime" width="150" align="center"></el-table-column>
                <el-table-column prop="parameter" label="Args" width="100" align="center">
                    <template slot-scope="props">
                        <el-popover
                            placement="right"
                            width="490"
                            trigger="click">
                            <el-table :data="argstable3" empty-text="NO DATA">
                                <el-table-column prop="workTimeEnable" label="WorkTimeEnable" width="140" align="center"></el-table-column>
                                <el-table-column prop="timeZone" label="TimeZone" width="120" align="center"></el-table-column>
                                <el-table-column prop="workTimeRange" label="WorkTimeRange" width="180" align="center"></el-table-column>
                            </el-table>
                            <el-button type="text" slot="reference" @click="getRowid(props.row)">Details</el-button>
                        </el-popover>
                    </template>
                </el-table-column>
                <el-table-column prop="runtime" label="Runtime" width="160" align="center"></el-table-column>
                <el-table-column prop="startTime" label="StartTime" width="160" align="center"></el-table-column>
                <el-table-column prop="workstate" label="WorkStatus" width="120" align="center"></el-table-column>
                <el-table-column prop="status" label="Status" width="130" align="center"></el-table-column>
                <el-table-column prop="command" label="Command" width="130" align="center">
                    <template slot-scope="props">
                        <el-button
                            size="mini"
                            @click="deleteCompletedRow(props.row)">Delete</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>

        <!-- 删除任务或删除任务及数据库内容提示框 -->
        <el-dialog
            title="NOTICE"
            :visible.sync="DeleteDialogVisible"
            width="33%"
            center
            style="margin-bottom:100px;padding-top:150px;">
        <span>Are you sure to delete this task's data in MongoDB database?</span>
        <span slot="footer" class="dialog-footer">
            <el-button @click="DeleteDialogVisible = false">Cancel</el-button>
            <el-button type="primary" @click="DeleteDialogVisible = false;Delete1()">DeleteJobOnly</el-button>
            <el-button type="primary" @click="DeleteDialogVisible = false;Delete2()">DeleteDatabase</el-button>
        </span>
        </el-dialog>

        <!-- 启动任务时发现若是定时任务提示框 -->
        <el-dialog
            title="NOTICE"
            :visible.sync="StartDialogVisible"
            width="33%"
            center
            style="margin-bottom:100px;padding-top:150px;">
        <span>The task is a timed task. If it is forced to open, please choose to climb to the next working time period or end the timed attribute of the task?</span>
        <span slot="footer" class="dialog-footer">
            <el-button @click="StartDialogVisible = false">Cancel</el-button>
            <el-button type="primary" @click="StartDialogVisible = false;Start1()">ToNextWorkingTime</el-button>
            <el-button type="primary" @click="StartDialogVisible = false;Start2()">EndTiming</el-button>
        </span>
        </el-dialog>

        <!-- 停止任务时发现若是定时任务提示框 -->
        <el-dialog
            title="NOTICE"
            :visible.sync="StopDialogVisible"
            width="33%"
            center
            style="margin-bottom:100px;padding-top:150px;">
        <span>The task is a timed task. If it is forced to open, please choose to climb to the next working time period or end the timed attribute of the task?</span>
        <span slot="footer" class="dialog-footer">
            <el-button @click="StopDialogVisible = false">Cancel</el-button>
            <el-button type="primary" @click="StopDialogVisible = false;Pause1()">ToNextWorkingTime</el-button>
            <el-button type="primary" @click="StopDialogVisible = false;Pause2()">EndTiming</el-button>
        </span>
        </el-dialog>
    </div>
</template>


<script>
export default {
    name: 'PeriodWorkStation',
    inject:['reload'],
    data () {
        return {
            tableData1: [],
            tableData2: [],
            tableData3: [],
            tableData: [],
            argstable: [],
            argstable3: [],
            disabled: true,
            disabled: true,
            DeleteDialogVisible: false,
            StartDialogVisible: false,
            StopDialogVisible: false,
            Deleteid: '',
            Startid: '',
            Stopid: '',
            //计时器
            intervalId: 0
        }
    },
    mounted () {
        this.$nextTick( function(){
            this.getWorkStatusInformation(1)
            this.getCompletedTable(1)
            this.getRunTime(1)
            this.getWorkStatus(1)
        })
    },
    methods: {
    //所有方法重写优化,加载job/list数据
    getWorkStatusInformation() {
        var _this = this
        var Params = {}
        this.$ajax({
            url: '/two/twitter/job/list',
            method: 'get',
            contentType: "application/json; charset=utf-8",
            params: Params
        }).then( res => {
            for(var i=0;i<res.data.data.length;i++)
            {
                var iddata = res.data.data[i].id
                var obj = {}
                obj.iddata = res.data.data[i].id
                obj.namedata = res.data.data[i].name
                obj.hostMapdata = res.data.data[i].hostMap
                obj.configdata = res.data.data[i].config
                obj.startTimedata = res.data.data[i].startTime
                obj.stopTotalTimedata = res.data.data[i].stopTotalTime
                obj.runTimedata = res.data.data[i].runTime
                obj.srartUsersdata = res.data.data[i].srartUsers
                obj.workTimeEnabledata = res.data.data[i].workTimeEnable
                obj.timeZonedata = res.data.data[i].timeZone
                obj.workTimeRangedata = res.data.data[i].workTimeRange
                obj.typedata = res.data.data[i].type
                obj.periodicTimedata = res.data.data[i].periodicTime
                if(res.data.data[i].type == 1)    //周期性任务只改了这里
                    _this.tableData.push(obj)
            }
            for(var i=0;i<_this.tableData.length;i++)
            {
                _this.tableData1 = []
                _this.tableData2 = []
                this.getNextAndRunningTable(_this.tableData[i])
            }
        }).catch( error => {
            console.log()
        })
    },
    //把数值写进前两张表
    getNextAndRunningTable(Data) {
        var _this = this
        var Params = {
            id : Data.iddata
        }
        this.$ajax({
            url: '/two/twitter/job/spider_status',
            method: 'get',
            contentType: "application/json; charset=utf-8",
            params: Params
        }).then( res1 => {
            if(JSON.stringify(res1.data.data) == '{}')
            {
                //Next Jobs
                var jsonObj=JSON.parse(JSON.stringify(Data.hostMapdata))
                var jsonObj2=JSON.parse(JSON.stringify(Data.configdata))
                let obj = {}
                obj.id = Data.iddata
                obj.name = Data.namedata
                if(Data.typedata == 1)
                    obj.type = "true"
                else
                    obj.type = "false"
                obj.periodicTime = Data.periodicTimedata
                obj.spiderinformation = jsonObj
                obj.configinformation = jsonObj2
                for(var p in jsonObj)
                {
                    obj.allname=obj.allname+", "+p;
                    obj.allname=obj.allname.replace("undefined,","");
                }
                _this.tableData1.push(obj);
            }
            else
            {
                //Running Jobs
                let obj2 = {};
                obj2.name = Data.namedata;
                obj2.id = Data.iddata;
                obj2.startTime = Data.startTimedata;
                obj2.stopTotalTime = Data.stopTotalTimedata;
                obj2.runTime = Data.runTimedata;
                var jsonObj=JSON.parse(JSON.stringify(Data.hostMapdata))
                for(var p in jsonObj){
                    let obj2 = {};
                    obj2.name = Data.namedata;
                    obj2.id = Data.iddata;
                    obj2.spidername = p;
                    obj2.startTime = Data.startTimedata;
                    obj2.periodicTime = Data.periodicTimedata
                    obj2.stopTotalTime = Data.stopTotalTimedata;
                    obj2.runTime = Data.runTimedata;
                    if( p == "userinfo")
                    {
                        if(res1.data.data.userinfo == "running")
                            obj2.status = "running"
                        if(res1.data.data.userinfo == "stopped")
                            obj2.status = "pause"
                    }
                    if( p == "follow")
                    {
                        if(res1.data.data.follow == "running")
                            obj2.status = "running"
                        if(res1.data.data.follow == "stopped")
                            obj2.status = "pause"
                    }
                    if( p == "tweets")
                    {
                        if(res1.data.data.tweets == "running")
                            obj2.status = "running"
                        if(res1.data.data.tweets == "stopped")
                            obj2.status = "pause"
                    }
                    _this.tableData2.push(obj2);
                } 
            }
        }).catch( error => {
            console.log()
        })
    },
    //把数据写进第三张表
    getCompletedTable(){
        //Completed Jobs
        var Params = {}
        this.$ajax({
            url: '/two/twitter/job/queryComplete',
            method: 'get',
            contentType: "application/json; charset=utf-8",
            params: Params
        }).then( res => {
            console.log(res.data.data)
            for(var i=0;i<res.data.data.length;i++)
            {
                let obj2 = {};
                obj2.name = res.data.data[i].name;
                obj2.id = res.data.data[i].jobId;
                var spider = res.data.data[i].spider
                var jsonObj=JSON.parse(JSON.stringify(res.data.data[i].spider))
                for(var p in jsonObj){
                    // console.log(jsonObj[p])
                    let obj2 = {};
                    obj2.name = res.data.data[i].name;
                    obj2.id = res.data.data[i].jobId;
                    obj2.spidername = p;
                    obj2.startTime = res.data.data[i].startTime;
                    obj2.status = "completed"
                    obj2.runtime = res.data.data[i].runTime
                    obj2.workTimeEnable = res.data.data[i].workTimeEnable
                    obj2.timeZone = res.data.data[i].timeZone
                    obj2.workTimeRange = res.data.data[i].workTimeRange
                    obj2.workstate = jsonObj[p].workResult
                    obj2.type = res.data.data[i].type
                    obj2.periodicTime = res.data.data[i].periodicTime
                    if(obj2.type == 1)
                        this.tableData3.push(obj2);
                }
            }
        }).catch( error => {
            console.log()
        }) 
    },
    //获取任务运行时间，规定每1秒刷新一次
    // getRunTime() {
    //     setInterval(() => {
    //         var datenow = new Date();
    //         for(let i=0;i<this.tableData2.length;i++)
    //         {
    //             var secondsTime2 = new Date(this.tableData2[i].startTime).getTime();
    //             var seconds = datenow.getTime()-secondsTime2;
    //             // this.tableData2[i].runtime=(this.timeDifference(seconds))
    //             //$set方法实时动态刷新
    //             this.$set(this.tableData2[i],"runtime",this.timeDifference(seconds)) 
    //         }
    //     },1000)
    // },
    getRunTime() {
        // this.reload();
        var interval = setInterval(() => {
            var datenow = new Date();
            for(let i=0;i<this.tableData2.length;i++)
            {
                if(this.tableData2[i].status == "running")
                {
                    this.$set(this.tableData2[i],"startTime",this.tableData2[i].startTime) 
                    var secondsTime2 = new Date(this.tableData2[i].startTime).getTime();
                    var seconds = datenow.getTime()-secondsTime2+this.tableData2[i].runTime;
                    // this.tableData2[i].runtime=(this.timeDifference(seconds))
                    //$set方法实时动态刷新
                    this.$set(this.tableData2[i],"runtime",this.timeDifference(seconds)) 
                }
                else
                {
                    this.$set(this.tableData2[i],"startTime",this.tableData2[i].startTime) 
                    this.$set(this.tableData2[i],"runtime",this.timeDifference(this.tableData2[i].runTime)) 
                }
            }
        },1000)
    },
    //获取tabledata2[]中任务进度workstatus数据,规定每10秒刷新一次
    getWorkStatus() {
        this.intervalId = setInterval(() => {
            for(let i=0;i<this.tableData2.length;i++)
            {
                if(this.tableData2[i].status == "running")
                {
                    this.$ajax({
                        url: '/two/twitter/job/spider_progress',
                        method: 'get',
                        contentType: "application/json; charset=utf-8",
                        params: {id: this.tableData2[i].id},
                    }).then( res => {
                        for(var p2 in res.data.data)
                        {
                            if(p2===this.tableData2[i].spidername)
                            // this.tableData2[i].workstate = res.data.data[p2]
                            this.$set(this.tableData2[i],"workstate",res.data.data[p2])
                        }
                    }).catch( error => {
                        console.log()
                    }) 
                } 
                else
                {
                    this.getWorkStatusStoped();
                    clearInterval(this.intervalId)
                    return;
                } 
            }
        },10000)
    },
    //得到暂停或停止时的爬取情况
    getWorkStatusStoped()
    {
        for(let i=0;i<this.tableData2.length;i++)
        {
            this.$ajax({
                url: '/api/job/spider_progress',
                method: 'get',
                contentType: "application/json; charset=utf-8",
                params: {id: this.tableData2[i].id},
            }).then( res => {
                for(var p2 in res.data.data)
                {
                    if(p2===this.tableData2[i].spidername)
                    this.tableData2[i].workstate = res.data.data[p2]
                    // this.$set(this.tableData2[i],"workstate",res.data.data[p2])
                }
            }).catch( error => {
                console.log()
            }) 
        }
    },
    //得到Args的参数信息
    getRowid(row) {
        console.log(row.id)
        var _this = this
        //前两张表的Args的参数信息
        for(var i=0;i<_this.tableData.length;i++)
        {
            if(row.id == _this.tableData[i].iddata)
            {
                //放在Args中的数据
                _this.argstable = []
                let obj = {}
                obj.sleep = _this.tableData[i].configdata.sleep
                obj.followHop = _this.tableData[i].configdata.followHop;
                obj.workTimeEnable = JSON.stringify(_this.tableData[i].workTimeEnabledata);
                if(_this.tableData[i].timeZonedata == null)
                    obj.timeZone = "/";
                else 
                    obj.timeZone = _this.tableData[i].timeZonedata
                obj.workTimeRange = _this.tableData[i].workTimeRangedata;
                _this.argstable.push(obj)
            }
        }
        //第三张表的参数信息
        for(var i=0;i<_this.tableData3.length;i++)
        {
            if(row.id == _this.tableData3[i].id)
            {
                //放在Args中的数据
                _this.argstable3 = []
                let obj = {}
                obj.workTimeEnable = JSON.stringify(_this.tableData3[i].workTimeEnable);
                if(_this.tableData3[i].timeZone == null)
                    obj.timeZone = "/";
                else 
                    obj.timeZone = _this.tableData3[i].timeZone
                obj.workTimeRange = _this.tableData3[i].workTimeRange+" ";
                console.log(obj)
                _this.argstable3.push(obj)
            }
        }
    },
    //删除一个任务
    deleteRow(row){
        this.DeleteDialogVisible = true;
        this.Deleteid = row.id
    },
    //仅删除该任务
    Delete1() {
        var Params = {
            id: this.Deleteid,
            isMongoDelete: false
        }
        this.$ajax({
            url: '/two/twitter/job/remove',
            method: 'get',
            contentType: "application/json; charset=utf-8",
            params: Params,
        }).then( res => {
            //删除成功做的动作   
            this.$message({
                type: 'success',
                message: 'Delete this job only successfully' 
            });
        }).catch( error => {
            console.log()
        })   
        this.reload();  
    },
    //删除该任务以及其保存在数据库中的数据
    Delete2() {
        var Params = {
            id: this.Deleteid,
            isMongoDelete: true
        }
        this.$ajax({
            url: '/two/twitter/job/remove',
            method: 'get',
            contentType: "application/json; charset=utf-8",
            params: Params,
        }).then( res => {
            //删除成功做的动作   
            this.$message({
                type: 'success',
                message: 'Delete this job in database successfully' 
            });
        }).catch( error => {
            console.log()
        })   
        this.reload(); 
    },
    //删除已完成任务列表数据
    deleteCompletedRow(row) {
        console.log(row.id)
        this.$confirm('Are you sure to delete this data?','NOTICE',{
            confirmButtonText: 'Confirm',
            cancelButtonText: 'Cancel',
            type: 'warning'
        }).then(() => {
            var Params = {
                id: row.id,
            }
            console.log(row.id) 
            this.$ajax({
                url: '/two/twitter/job/completeRemove',
                method: 'get',
                contentType: "application/json; charset=utf-8",
                params: Params,
            }).then( res => {
                //删除成功做的动作  
                console.log(row.id) 
                this.$message({
                    type: 'success',
                    message: 'Delete this job data in database successfully' 
                });
            }).catch( error => {
                console.log()
            })    
            this.reload();   
        }).catch( error => {
            console.log()
        })
    },
    //启动一个任务
    startRow(row){
        this.Startid = row.id
        var Params = {}
        this.$ajax({
            url: '/two/twitter/job/list',
            method: 'get',
            contentType: "application/json; charset=utf-8",
            params: Params,
        }).then( res => {
            var workTimeEnable
            for(var i=0;i<res.data.data.length;i++)
            {
                if(res.data.data[i].id == row.id)
                    workTimeEnable = res.data.data[i].workTimeEnable
            }
            console.log(workTimeEnable)
            if(workTimeEnable == true)
                this.StartDialogVisible = true;
            else
            {
                var Params = {
                    id: row.id,
                    type: 0
                }
                this.$ajax({
                    url: '/two/twitter/job/start',
                    method: 'get',
                    contentType: "application/json; charset=utf-8",
                    params: Params,
                }).then( res => {
                    //普通任务启动成功做的动作   
                    this.$message({
                        type: 'success',
                        message: 'Start successfully' 
                    });
                }).catch( error => {
                    console.log()
                })    
                this.reload(); 
            }
        }).catch( error => {
            console.log()
        })   
    },
    //强制启动定时任务时至下一个工作时间停止
    Start1() {
        var Params = {
            id: this.Startid,
            type: 0
        }
        this.$ajax({
            url: '/two/twitter/job/start',
            method: 'get',
            contentType: "application/json; charset=utf-8",
            params: Params,
        }).then( res => {
            //删除成功做的动作   
            this.$message({
                type: 'success',
                message: 'Start successfully,it will stop in the next working time period.' 
            });
        }).catch( error => {
            console.log()
        })   
        this.reload();  
    },
    //强制启动定时任务时至用户手动停止（让该任务不再定时）
    Start2() {
        var Params = {
            id: this.Startid,
            type: 1
        }
        this.$ajax({
            url: '/two/twitter/job/start',
            method: 'get',
            contentType: "application/json; charset=utf-8",
            params: Params,
        }).then( res => {
            //删除成功做的动作   
            this.$message({
                type: 'success',
                message: 'Start successfully,this task no longer has timing properties.' 
            });
        }).catch( error => {
            console.log()
        })   
        this.reload(); 
    },
    //暂停一个任务
    pauseRow(row){
        this.Stopid = row.id
        var Params = {}
        this.$ajax({
            url: '/two/twitter/job/list',
            method: 'get',
            contentType: "application/json; charset=utf-8",
            params: Params,
        }).then( res => {
            var workTimeEnable
            for(var i=0;i<res.data.data.length;i++)
            {
                if(res.data.data[i].id == row.id)
                    workTimeEnable = res.data.data[i].workTimeEnable
            }
            console.log(workTimeEnable)
            if(workTimeEnable == true)
                this.StopDialogVisible = true;
            else
            {
                var Params = {
                    id: row.id,
                    type: 0
                }
                this.$ajax({
                    url: '/two/twitter/job/stop',
                    method: 'get',
                    contentType: "application/json; charset=utf-8",
                    params: Params,
                }).then( res => {
                    this.$message({
                        type: 'success',
                        message: 'Pause successfully' 
                        });
                }).catch( error => {
                    console.log()
                })    
                this.reload(); 
            }
        }).catch( error => {
            console.log()
        })   
    },
    //强制停止定时任务时至下一个工作时间开启
    Pause1() {
        var Params = {
            id: this.Stopid,
            type: 0
        }
        this.$ajax({
            url: '/two/twitter/job/stop',
            method: 'get',
            contentType: "application/json; charset=utf-8",
            params: Params,
        }).then( res => {
            this.$message({
                type: 'success',
                message: 'Pause successfully,it will start in the next working time period.' 
            });
        }).catch( error => {
            console.log()
        })   
        this.reload();  
    },
    //强制停止定时任务时至用户手动停止（让该任务不再开启）
    Pause2() {
        var Params = {
            id: this.Stopid,
            type: 1
        }
        this.$ajax({
            url: '/two/twitter/job/stop',
            method: 'get',
            contentType: "application/json; charset=utf-8",
            params: Params,
        }).then( res => {
            //删除成功做的动作   
            this.$message({
                type: 'success',
                message: 'Pause successfully,this task no longer has timing properties.' 
            });
        }).catch( error => {
            console.log()
        })   
        this.reload(); 
    },
    //停止一个任务
    stopRow(row){
        this.$confirm('Are you sure to force this task to be terminated?','NOTICE',{
            confirmButtonText: 'Confirm',
            cancelButtonText: 'Cancel',
            type: 'warning'
        }).then(() => {
            var Params = {
                id: row.id,
            }
            this.$ajax({
                url: '/two/twitter/job/finish',
                method: 'get',
                contentType: "application/json; charset=utf-8",
                params: Params,
            }).then( res => {
                this.$message({
                    type: 'success',
                    message: 'Finish successfully.' 
                });
            }).catch( error => {
                console.log()
            })  
            this.reload(); 
        }).catch( error => {
            console.log()
        })
    },
    //下载日志文件
    downloadLogs(row){
        this.$confirm('Are you sure to download logs of this task?','NOTICE',{
            confirmButtonText: 'Confirm',
            cancelButtonText: 'Cancel',
            type: 'warning'
        }).then(() => {
            var Params = {
                id: row.id,
            }
            this.$ajax({
                url: '/two/twitter/job/spider_log',
                method: 'get',
                contentType: "application/json; charset=utf-8",
                params: Params,
            }).then( res => {
                if(row.spidername === "userinfo")
                    window.location.href=res.data.data.userinfo;
                if(row.spidername === "follow")
                    window.location.href=res.data.data.follow;
                if(row.spidername === "tweets")
                    window.location.href=res.data.data.tweets;
                //下载成功做的动作   
                this.$message({
                    type: 'success',
                    message: 'Check the log download address successfully.' 
                });
            }).catch( error => {
                console.log()
            })    
        }).catch( error => {
            console.log()
        }) 
    },
    // 修改table header的背景色
    tableHeaderColor({ row, column, rowIndex, columnIndex }) {
        if (rowIndex === 0) {
            return 'background-color: lightblue;color: #fff;font-weight: 800;font-family: YouYuan'
        }
    },
    //计算时间差方法
    timeDifference(date)
    {
        //计算出相差天数
        var days=Math.floor(date/(24*3600*1000))
        //计算出小时数
        var leave1=date%(24*3600*1000)    //计算天数后剩余的毫秒数
        var hours=Math.floor(leave1/(3600*1000))
        //计算相差分钟数
        var leave2=leave1%(3600*1000)        //计算小时数后剩余的毫秒数
        var minutes=Math.floor(leave2/(60*1000))
        //计算相差秒数
        var leave3=leave2%(60*1000)      //计算分钟数后剩余的毫秒数
        var seconds=Math.round(leave3/1000)
        if(days==0)
            return hours+"h"+minutes+"m"+seconds+"s"
        else if(days==1)
            return days+"day"+hours+"h"+minutes+"m"+seconds+"s"
        else
            return days+"days"+hours+"h"+minutes+"m"+seconds+"s"
    },
    }
}
</script>
    
<style lang="scss" scoped>
#Periodworkstation {
    min-width: 1000px;
    height:100%;
    h1{
        font-size: 25px;
        margin: 30px;
        padding-left: 0px;
        float: left;
    }
    .el-icon-refresh{
        color: #EECBAD;
        font-size: 30px;
        float: left;
        margin-left: 32px;
        margin-top: 30px;
    }
    .button1 .el-button {
        background: #2E8B57 ;
        color: white !important;
        position: relative;
        float: right;
        margin-right:15px;
    }
    .box-card {
        width:95%;
        margin-left:40px;
        background: white;
        padding: 30px;
        padding-bottom: 0px;
        margin-bottom: 20px;
    }
    .period {
        float:left;
        font-size: 16px;
        font-weight: 1000;
        color: rgb(107, 185, 216);
        font-family: YouYuan;
    }
}
</style>
<style>
.clearfix:before,
.clearfix:after {
    display: table;
    content: "";
}
.clearfix:after {
    clear: both
}
</style>