<template>
    <div id="HostConfig">
        <i class="fa fa-server"></i>
        <h1 style="font-family:sans-serif">HostConfig</h1>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span class="period">HostConfig</span>
            </div>
            <div class="a">
                <el-table :data="tableData1" :header-cell-style="tableHeaderColor" empty-text="NO DATA" max-width="982px">
                    <el-table-column prop="number" label="Number" width="100" align="center" type="index"></el-table-column>
                    <el-table-column prop="name" label="HostName" width="140" align="center"></el-table-column>
                    <el-table-column prop="ip" label="Host" width="200" align="center"></el-table-column>
                    <el-table-column prop="port" label="Port" width="160" align="center"></el-table-column>
                    <el-table-column prop="status" label="HostStatus" width="200" align="center">
                        <template slot-scope="props">
                            <el-button
                                @click="getHostStatus(props.row)"
                                size="small"
                                type="text">
                                Search
                            </el-button>
                        </template>
                    </el-table-column>
                    <el-table-column prop="method" label="Operating" width="180" align="center">
                        <template slot-scope="props">
                            <el-button
                                @click="editRow(props.$index,props.row)"
                                type="primary"
                                size="small">
                                Edit
                            </el-button>
                            <el-button
                                @click="deleteRow(props.row)"
                                size="small">
                                Delete
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <!-- 添加主机 -->
            <div class="button2">
                <el-button class="ripple" @click="dialogFormVisible = true">Add</el-button>
                <el-dialog title="AddHost" :visible.sync="dialogFormVisible" center style="margin-top:90px;width:1200px;margin:0 auto">
                    <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
                        <el-form-item prop="name" label="Name：">
                            <el-input ref="name" v-model.number="ruleForm2.name" style="width:90%"></el-input>
                        </el-form-item>
                        <el-form-item label="Host：">
                            <el-form-item prop="pass1" style="float:left">
                                <el-input ref="pass1" v-model.number="ruleForm2.pass1" auto-complete="off" style="width:80px;"></el-input>
                                <span style="font-weight: bold"> .&nbsp;</span>
                            </el-form-item>
                            <el-form-item prop="pass2" style="float:left">
                                <el-input ref="pass2" v-model.number="ruleForm2.pass2" auto-complete="off" style="width:80px"></el-input>
                                <span style="font-weight: bold"> .&nbsp;</span>
                            </el-form-item>
                            <el-form-item prop="pass3" style="float:left">
                                <el-input ref="pass3" v-model.number="ruleForm2.pass3" auto-complete="off" style="width:80px"></el-input>
                                <span style="font-weight: bold"> .&nbsp;</span>
                            </el-form-item>
                            <el-form-item prop="pass4" style="float:left">
                                <el-input ref="pass4" v-model.number="ruleForm2.pass4" auto-complete="off" style="width:80px"></el-input>
                            </el-form-item>
                        </el-form-item>
                        <el-form-item prop="port" label="Port：">
                            <el-input ref="port" v-model.number="ruleForm2.port" style="width:90%"></el-input>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer" style="height: 65px;" center>
                        <el-button class="ripple" @click="dialogFormVisible = false; resetForm('ruleForm2')" style="margin-top:0px;margin-right:150px;">Cancel</el-button>
                        <el-button class="ripple" type="primary" @click="submitForm('ruleForm2')"  style="margin-top:0px;margin-right:0px;">Save</el-button>
                    </div>
                </el-dialog>
                
                <!-- 编辑主机 -->
                <el-dialog title="EditHost" :visible.sync="dialogFormVisible1" center style="margin-top:90px;width:1200px;margin:0 auto">
                    <el-form :model="ruleForm3" status-icon :rules="rules2" ref="ruleForm3" label-width="100px" class="demo-ruleForm">
                        <el-form-item prop="name" label="Name：">
                            <el-input ref="name" v-model.number="ruleForm3.name" style="width:90%"></el-input>
                        </el-form-item>
                        <el-form-item label="Host：">
                            <el-form-item prop="pass1" style="float:left">
                                <el-input ref="pass1" v-model.number="ruleForm3.pass1" auto-complete="off" style="width:80px;"></el-input>
                                <span style="font-weight: bold"> .&nbsp;</span>
                            </el-form-item>
                            <el-form-item prop="pass2" style="float:left">
                                <el-input ref="pass2" v-model.number="ruleForm3.pass2" auto-complete="off" style="width:80px"></el-input>
                                <span style="font-weight: bold"> .&nbsp;</span>
                            </el-form-item>
                            <el-form-item prop="pass3" style="float:left">
                                <el-input ref="pass3" v-model.number="ruleForm3.pass3" auto-complete="off" style="width:80px"></el-input>
                                <span style="font-weight: bold"> .&nbsp;</span>
                            </el-form-item>
                            <el-form-item prop="pass4" style="float:left">
                                <el-input ref="pass4" v-model.number="ruleForm3.pass4" auto-complete="off" style="width:80px"></el-input>
                            </el-form-item>
                        </el-form-item>
                        <el-form-item prop="port" label="Port：">
                            <el-input ref="port" v-model.number="ruleForm3.port" style="width:90%"></el-input>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer" style="height: 65px;">
                        <el-button class="ripple" @click="dialogFormVisible1 = false; resetForm('ruleForm3')" style="margin-top:0px;margin-right:150px;">Cancel</el-button>
                        <el-button class="ripple" type="primary" @click="submitFormEdit('ruleForm3')"  style="margin-top:0px;margin-right:0px;">Save</el-button>
                    </div>
                </el-dialog>
            </div>
        </el-card>   
    </div>
</template>

<script>
export default {
    name: 'HostConfig',
    inject:['reload'],
    data () {
        //弹出框方法
        var hostName = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('Host name cannot be empty'));
            }
            setTimeout(() => {
                callback();
            }, 1000);
        };
        var checkNum = (rule, value, callback) => {
            if(!value){
                return callback(new Error('please enter the port'));
            }
            callback();
        };
        var validatePass = (rule, value, callback) => {
            if (value === '') {
                return callback(new Error('Please enter the host number'));
            } else {
                if (value !== '') { 
                    var reg=/^(25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))$/;
                    if(!reg.test(value)){
                        callback(new Error('Input error'));
                    }
                }
                callback();
            }
        };
        return {
            tableData1: [],
            //弹出框
            loginPower:false,
            ruleForm2: {},
            ruleForm3: {},
            rules2: {
                name: [
                    { validator: hostName, trigger: 'blur' }
                ],
                pass1: [
                    { validator: validatePass, trigger: 'blur' }
                ],
                pass2: [
                    { validator: validatePass, trigger: 'blur' }
                ],
                pass3: [
                    { validator: validatePass, trigger: 'blur' }
                ],            
                pass4: [
                    { validator: validatePass, trigger: 'blur' }
                ],
                port: [
                    { validator: checkNum, trigger: 'blur' }
                ]
            },
            dialogFormVisible: false,
            dialogFormVisible1: false,
            editRowinfo: {},
            editIndex: '',
        };
    },
    mounted () {
        this.$nextTick( function(){
            this.getHostInformation(1)
        })
    },
    methods: {
    //主机列表
    getHostInformation(){
        var _this = this
        var Params = {}
        // console.log(Params)
        this.$ajax({
            url: '/api/host/list',
            method: 'get',
            contentType: "application/json; charset=utf-8",
            params: Params
        }).then( res => {
            console.log(res.data.data)
            _this.tableData1 = res.data.data;
        }).catch( error => {
            console.log()
        })
    },
    //状态列表
    getHostStatus(row){
        var Params = {
            ip: row.ip,
            port: row.port,
        }
        // console.log(Params)
        this.$ajax({
            url: '/api/host/status',
            method: 'post',
            contentType: "application/json; charset=utf-8",
            data: Params
        }).then( res => {
            var messagedata 
            if(res.data.data == "Online")
                messagedata = "Online"
            if(res.data.data == null)
                messagedata = "Remote host is not online"
            this.$message({
                type: 'success',
                message: messagedata
            });
        }).catch( error => {
            console.log()
        })
    },
    //编辑一个主机
    submitFormEdit(formName)
    {
        this.$refs[formName].validate((valid) => {
            if (valid) {
                //提交成功做的动作   
                this.$message({
                    type: 'success',
                    message: 'Edit successfully' 
                });
                this.dialogFormVisible1 = false;
                this.$refs[formName].resetFields();
                // this.form.region =  null;
                //添加主机
                var _this = this
                var QueryParams = {
                    index : _this.editIndex
                }
                var Params = {
                    name: _this.$refs.name.value,
                    ip: _this.$refs.pass1.value+"."+_this.$refs.pass2.value+"."+_this.$refs.pass3.value+"."+_this.$refs.pass4.value,
                    port: _this.$refs.port.value
                }
                console.log(Params)
                this.$ajax({
                    url: '/api/host/edit',
                    method: 'post',
                    contentType: "application/json; charset=utf-8",
                    params: QueryParams,
                    data: Params,
                }).then( res => {
                    _this.tableData1 = res.data.data;
                    // var Params2 = {
                    //     ip: _this.editRowinfo.ip,
                    //     port: _this.editRowinfo.port
                    // }
                    // console.log(Params2)
                    // this.$ajax({
                    //     url: '/api/host/remove',
                    //     method: 'post',
                    //     contentType: "application/json; charset=utf-8",
                    //     data: Params2,
                    // }).then( res2 => {
                    //     _this.tableData1 = res2.data.data;
                    // }).catch( error => {
                    //     console.log()
                    // })    
                    // this.reload();
                }).catch( error => {
                    console.log()
                })  
                this.reload();     
            } else {
                console.log('Error submit!!');
                return false;
            }
        })
    },
    editRow(number,row) {
        console.log(row)
        console.log(number)
        this.editIndex = number
        this.dialogFormVisible1 = true;
        var arr = row.ip.split(".")
        this.ruleForm3={
            name: row.name,
            port: row.port,
            pass1: arr[0],
            pass2: arr[1],
            pass3: arr[2],
            pass4: arr[3],
        }
        this.editRowinfo = row
        console.log(this.editRowinfo)
    },
    //删除一个主机
    deleteRow(row) {
        this.$confirm('Are you sure to delete this host?','NOTICE',{
            confirmButtonText: 'Confirm',
            cancelButtonText: 'Cancel',
            type: 'warning'
        }).then(() => {
            var Params = {
                ip: row.ip,
                port: row.port
            }
            // console.log(Params)
            this.$ajax({
                url: '/api/host/remove',
                method: 'post',
                contentType: "application/json; charset=utf-8",
                data: Params,
            }).then( res => {
                // console.log(res)
                _this.tableData1 = res.data.data;
            }).catch( error => {
                console.log()
            })    
            this.reload();   
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
    //弹出框
    submitForm(formName) {
        console.log(formName)
        this.$refs[formName].validate((valid) => {
            if (valid) {
                //提交成功做的动作   
                this.$message({
                    type: 'success',
                    message: 'Submitted successfully' 
                });
                this.dialogFormVisible = false;
                this.$refs[formName].resetFields();
                // this.form.region =  null;
                //添加主机
                var _this = this
                var Params = {
                    name: _this.$refs.name.value,
                    ip: _this.$refs.pass1.value+"."+_this.$refs.pass2.value+"."+_this.$refs.pass3.value+"."+_this.$refs.pass4.value,
                    port: _this.$refs.port.value
                }
                // console.log(Params)
                this.$ajax({
                    url: '/api/host/add',
                    method: 'post',
                    contentType: "application/json; charset=utf-8",
                    data: Params,
                }).then( res => {
                    // console.log(res)
                    _this.tableData1 = res.data.data;
                    this.reload();
                }).catch( error => {
                    console.log()
                })       
                
            } else {
                    console.log('Error submit!!');
                    return false;
            }
        })
    },
    resetForm(formName) {
        this.$refs[formName].resetFields();
        // this.form.region =  null;
    }
}
}
</script>

<style>
.el-dialog__header {
    padding: 50px 20px 10px;
}
</style>

<style lang="scss" scoped>
#HostConfig {
    min-width: 1100px;
    height:100%;
    .fa-server{
        color: #2E8B57;
        font-size: 30px;
        float: left;
        margin-left: 32px;
        margin-top: 30px;
    }
    h1{
        font-size: 25px;
        padding-left: 0px;
        margin: 30px;
        float: left;
    }
    .box-card {
        width:95%;
        margin-left:30px;
        background: white;
        padding: 30px;
        padding-bottom: 0px;
        margin-bottom: 20px;
    }
    .period {
        float:left;
        font-size: 16px;
        font-weight: 600;
        color: rgb(107, 185, 216);
    }
    .button2 .el-button {
        background: #2E8B57 ;
        color: white !important;
        position: relative;
        float: right;
        margin: 50px;
        margin-right: 0px;
    }
    .a {
        text-align: center;
        margin: 0 auto;
        width:982px;
    }
}
</style>