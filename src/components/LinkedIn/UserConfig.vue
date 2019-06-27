<template>
    <div id="UserConfig">
        <i class="el-icon-setting"></i>
        <h1 style="font-family:sans-serif">AccountConfig</h1>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span class="period">UserConfig</span>
                <div class="display" style="float:right;padding-right:10px">
                    <span>Password display:</span>
                    <el-switch v-model="delivery" active-color="#2E8B57" @change="passwordHidden"></el-switch>
                </div>
            </div>
            <el-table :data="tableData1" :header-cell-style="tableHeaderColor" empty-text="NO DATA">
                <el-table-column prop="number" label="Number" width="70" align="center" type="index"></el-table-column>
                <el-table-column prop="user" label="Account" width="120" align="center"></el-table-column>
                <el-table-column prop="password" label="Password" width="100" align="center"></el-table-column>
                <el-table-column prop="status" label="Status" width="100" align="center"></el-table-column>
                <el-table-column prop="lma" label="Frequency" width="100" align="center"></el-table-column>
                <el-table-column prop="host" label="Host" width="120" align="center"></el-table-column>
                <el-table-column prop="hostvisit" label="HostVisit" width="100" align="center"></el-table-column>
                <el-table-column prop="proxyEnable" label="ProxyEnable" width="120" align="center"></el-table-column>
                <el-table-column prop="proxy" label="Proxy" width="160" align="center"></el-table-column>
                <el-table-column prop="proxy_pass" label="ProxyPass" width="160" align="center"></el-table-column>
                <el-table-column prop="method" label="Operating" width="280" align="center">
                    <template slot-scope="props">
                        <el-button
                            @click="editRow(props.$index,props.row)"
                            type="primary"
                            size="small">
                            Edit
                        </el-button>
                        <el-button
                            @click="dialogFormVisible2 = true"
                            @click.native.prevent="getRow(props.row)"
                            size="small">
                            RefreshCookie
                        </el-button>
                        <el-button
                            @click.native.prevent="deleteRow(props.row)"
                            size="small">
                            Delete
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 添加账号弹出框 -->
            <div class="button2">
                <el-button class="ripple" @click="dialogFormVisible = true">Add</el-button>
                <el-dialog title="AddAccount" :visible.sync="dialogFormVisible" center style="margin-top:90px;width:1200px;margin:0 auto">
                    <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="140px" class="demo-ruleForm">
                        <el-form-item prop="user" label="Account：">
                            <el-input ref="user" v-model="ruleForm2.user" style="width:90%"></el-input>
                        </el-form-item>
                        <el-form-item prop="password" label="Password：">
                            <el-input ref="password" type="password" v-model="ruleForm2.password" auto-complete="off" style="width:90%"></el-input>
                        </el-form-item>
                        <el-form-item prop="lma" label="Frequency：">
                            <el-input ref="lma" v-model="ruleForm2.lma" style="width:90%"></el-input>
                        </el-form-item>
                        <el-form-item prop="host" label="Host：">
                            <el-select ref="host" v-model="ruleForm2.host" style="width:90%" @change="selectGet2" placeholder="Please select a host number">
                                <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item prop="hostvisits" label="HostVisits：">
                            <el-input ref="hostvisits" v-model="ruleForm2.hostvisits" style="width:90%"></el-input>
                        </el-form-item>
                        <el-form-item prop="proxyEnable" label="ProxyEnable：">
                            <el-select v-model="ruleForm2.proxyEnable" placeholder="choose" empty-text="NO DATA" @change="changeDisabled">
                                <el-option label="YES" value="true"></el-option>
                                <el-option label="NO" value="false"></el-option>
                                <div slot="empty" style="padding:10px;">NO DATA</div>
                            </el-select>
                            <!-- <el-input ref="proenable" v-model.number="ruleForm2.proenable" style="width:90%"></el-input> -->
                        </el-form-item>
                        <el-form-item prop="proxy" label="Proxy：">
                            <el-input ref="proxy" v-model="ruleForm2.proxy" style="width:90%" :disabled="disabled"></el-input>
                        </el-form-item>
                        <el-form-item prop="proxy_pass" label="ProxyPassword：">
                            <el-input ref="proxy_pass" v-model="ruleForm2.proxy_pass" style="width:90%" :disabled="disabled"></el-input>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer" style="height: 65px;">
                        <el-button class="ripple" @click="dialogFormVisible = false; resetForm('ruleForm2')" style="margin-top:0px;margin-right:150px;">Cancel</el-button>
                        <el-button class="ripple" type="primary" @click="submitForm('ruleForm2')"  style="margin-top:0px;margin-right:0px;">Save</el-button>
                    </div>
                </el-dialog>
                <!-- <el-button style="margin-right:0px;" @click.native.prevent="refreshAllCookieRow()">RefreshAllCookie</el-button> -->
                <!-- 编辑账号 -->
                <el-dialog title="EditAccount" :visible.sync="dialogFormVisible1" center style="margin-top:90px;width:1200px;margin:0 auto">
                    <el-form :model="ruleForm3" status-icon :rules="rules2" ref="ruleForm3" label-width="140px" class="demo-ruleForm">
                        <el-form-item prop="user" label="Account：">
                            <el-input ref="user" v-model="ruleForm3.user" style="width:90%"></el-input>
                        </el-form-item>
                        <el-form-item prop="password" label="Password：">
                            <el-input ref="password" type="password" v-model="ruleForm3.password" auto-complete="off" style="width:90%"></el-input>
                        </el-form-item>
                        <el-form-item prop="lma" label="Frequency：">
                            <el-input ref="lma" v-model="ruleForm3.lma" style="width:90%"></el-input>
                        </el-form-item>
                        <el-form-item prop="host" label="Host：">
                            <el-select ref="host" v-model="ruleForm3.host" style="width:90%" @change="selectGet3" placeholder="Please select a host number">
                                <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item prop="hostvisits" label="HostVisits：">
                            <el-input ref="hostvisits" v-model="ruleForm3.hostvisits" style="width:90%"></el-input>
                        </el-form-item>
                        <el-form-item prop="proxyEnable" label="ProxyEnable：">
                            <el-select v-model="ruleForm3.proxyEnable" placeholder="choose" empty-text="NO DATA" @change="changeDisabled1">
                                <el-option label="YES" value="true"></el-option>
                                <el-option label="NO" value="false"></el-option>
                                <div slot="empty" style="padding:10px;">NO DATA</div>
                            </el-select>
                        </el-form-item>
                        <el-form-item prop="proxy" label="Proxy：">
                            <el-input ref="proxy" v-model="ruleForm3.proxy" style="width:90%" :disabled="disabled"></el-input>
                        </el-form-item>
                        <el-form-item prop="proxy_pass" label="ProxyPassword：">
                            <el-input ref="proxy_pass" v-model="ruleForm3.proxy_pass" style="width:90%" :disabled="disabled"></el-input>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer" style="height: 65px;">
                        <el-button class="ripple" @click="dialogFormVisible1 = false; resetForm('ruleForm3')" style="margin-top:0px;margin-right:150px;">Cancel</el-button>
                        <el-button class="ripple" type="primary" @click="submitFormEdit('ruleForm3')"  style="margin-top:0px;margin-right:0px;">Save</el-button>
                    </div>
                </el-dialog>
            </div>
            <!-- 更新cookie选择主机弹出框 -->
            <el-dialog title="Please select the host and port required to update the cookie" :visible.sync="dialogFormVisible2" center style="margin-top:100px;width:70%;left:20%">
                <el-form :model="form">
                    <el-form-item label="Host：" prop="num">
                        <el-select v-model="value1" @change="selectGet1" placeholder="Please select a host number">
                            <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                            <div slot="empty" style="padding:10px;">NO DATA</div>
                        </el-select>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible2 = false">Cancel</el-button>
                    <el-button type="primary" @click="dialogFormVisible2 = false;refreshCookieRow()">Submit</el-button>
                </div>
            </el-dialog>
        </el-card>  
    </div>
</template>

<script>
var count=0;
export default {
    name: 'UserConfig',
    inject: ['reload'],
    data () {
        //弹出框方法
        var checkNum = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('Account cannot be empty'));
            }
            callback();
        };
        var validatePass = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('Please enter your password'));
            } else {
                callback();
            }
        };
        var validate = (rule, value, callback) => {
            if (value === '') {
                return callback(new Error('Sorry! It cannot be empty'));
            } else if (isNaN(value)){
                return callback(new Error('Sorry! Please fill in the number type'));
            }else {
                callback();
            }
        };
        var validateproxy = (rule, value, callback) => {
            let pattern=/^(?:(?:1[0-9][0-9]\.)|(?:2[0-4][0-9]\.)|(?:25[0-5]\.)|(?:[1-9][0-9]\.)|(?:[0-9]\.)){3}(?:(?:1[0-9][0-9])|(?:2[0-4][0-9])|(?:25[0-5])|(?:[1-9][0-9])|(?:[0-9]))$/; 
            if((this.dialogFormVisible == true &&this.ruleForm2.proxyEnable!='false')||(this.dialogFormVisible1 == true &&this.ruleForm3.proxyEnable!='false')){
                if (value === '') {
                    return callback(new Error('Sorry! It cannot be empty'));
                }else if(!pattern.test(value)){
                    callback("Sorry! Please enter the correct IP address format")
                }
                else{
                    callback()
                }
            }
            else{
                callback()
            }
        }
        return {
            tableData1: [],
            //密码显示
            delivery: false,
            //弹出框
            disabled: true,
            ruleForm2: {
                user: '',
                password: '',
                lma: '',
                proxyEnable: 'false',
                proxy: '',
                proxy_pass: ''
            },
            ruleForm3: {},
            rules2: {
                password: [
                    { validator: validatePass, trigger: 'blur' }
                ],
                user: [
                    { validator: checkNum, trigger: 'blur' }
                ],
                lma: [
                    { validator: validate, trigger: 'blur' }
                ],
                host: [
                    { validator: validate, trigger: 'blur' }
                ],
                hostvisits: [
                    { validator: validate, trigger: 'blur' }
                ],
                proxy: [
                    { validator: validateproxy, trigger: 'blur' }
                ]
            },
            dialogFormVisible: false,
            dialogFormVisible1: false,
            dialogFormVisible2: false,
            editRowinfo: {},
            editIndex: '',
            form: {
                select: '',
            },
            // 主机选择
            value1: 0,
            options:[],  //存放下拉框中baseUrl
            options1:[],   //存放IP和port
            options2:[],   //存放增加和编辑中的IP和port
            formLabelWidth: '120px',
            //得到更新单个cookie时向后台传递的user
            user: '',
            obj1: [],
            //存放添加和编辑中的所选中主机信息
            obj2: [],
            obj3: []
        };
    },
    mounted() {
        this.$nextTick( function(){
            this.getAccountInformation(1)
            this.getHostList(1)
        })
    },
    methods: {
    //账号列表
    getAccountInformation(){
        var _this = this
        var Params = {
            user: _this.tableData1.user,
            password: _this.tableData1.password,
            status: _this.tableData1.status,
        }
        this.$ajax({
            url: '/three/linkedin/acc/list',
            method: 'get',
            contentType: "application/json; charset=utf-8",
            params: Params
        }).then( res => {
            for(var i=0;i<res.data.data.length;i++){
                let obj = {}
                obj.user = res.data.data[i].user
                obj.lma = res.data.data[i].lma
                obj.proxyEnable = res.data.data[i].proxyEnable.toString()
                obj.proxy = res.data.data[i].proxy
                obj.proxy_pass = res.data.data[i].proxy_pass
                obj.host = res.data.data[i].host
                obj.hostvisits = res.data.data[i].visits
                if(res.data.data[i].status == "1")
                    obj.status = "Normal"
                else if(res.data.data[i].status == "2")
                    obj.status = "Cookie is invalid"
                else if(res.data.data[i].status == "3")
                    obj.status = "Blocked"
                obj.password = "********"
                _this.tableData1.push(obj)
            }
        }).catch( error => {
            console.log()
        })
    },
    //删除一个账号
    deleteRow(row){
        this.$confirm('Are you sure to delete this Account?','NOTICE',{
            confirmButtonText: 'Confirm',
            cancelButtonText: 'Cancel',
            type: 'warning'
        }).then(() => {
            var Params = {
                user: row.user,
            }
            // console.log(Params)
            this.$ajax({
                url: '/three/linkedin/acc/remove',
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
    //获取主机和IP地址
    getHostList(){
        var _this = this
        var Params = {}
        this.$ajax({
            url: '/three/linkedin/host/list',
            method: 'get',
            contentType: "application/json; charset=utf-8",
            params: Params
        }).then( res => {
            let obj = []
            for(var i=0;i<res.data.data.length;i++){
                var model = res.data.data[i];
                var item = {};
                //直接获取url
                item.label =  model.baseUrl;
                item.value = i;
                _this.options.push(item);
                //获取主机和端口
                var it = {};
                it.ip = model.ip;
                it.port = model.port;
                _this.options1.push(it);
                //获取增加和编辑中的主机和端口
                var is = {};
                is.name = model.name;
                is.ip = model.ip;
                is.port = model.port;
                _this.options2.push(is);
                // console.log(_this.options)
                // console.log(_this.options1)
            }
        }).catch( error => {
            console.log()
        })
    },
    //下拉框取值
    selectGet1(vId){
        let obj = {};
        obj = this.options.find((item)=>{//这里的options就是上面遍历的数据源
            return item.value === vId;//筛选出匹配数据
        });
        let obj1 = {}
        obj1 = this.options1[obj.value]
        this.obj1 = obj1;
    },
    selectGet2(vId){
        let obj = {};
        obj = this.options.find((item)=>{//这里的options就是上面遍历的数据源
            return item.value === vId;//筛选出匹配数据
        });
        let obj1 = {}
        obj1 = this.options2[obj.value]
        this.obj2 = obj1;
        console.log(this.obj2)
    },
    selectGet3(vId){
        let obj = {};
        obj = this.options.find((item)=>{//这里的options就是上面遍历的数据源
            return item.value === vId;//筛选出匹配数据
        });
        let obj1 = {}
        obj1 = this.options2[obj.value]
        this.obj3 = obj1;
        console.log(this.obj3)
    },
    //得到user
    getRow(row) {
        this.user = row.user
        console.log(this.user)
    },
    //更新单个cookie
    refreshCookieRow(){
        if(this.obj1.length === 0)
            this.obj1 = this.options1[0]
        //先查询所选主机是否在线
        var Params1 = {
            ip: this.obj1.ip,
            port: this.obj1.port,
        }
        this.$ajax({
            url: '/three/linkedin/host/status',
            method: 'post',
            contentType: "application/json; charset=utf-8",
            data: Params1
        }).then( res => {
            //主机若在线则执行刷新cookie
            if(res.data.data == "Online")
            {
                var Params2 = {
                    user: this.user,
                    host: this.obj1
                }
                this.$ajax({
                    url: '/three/linkedin/acc/updateOneCookie',
                    method: 'post',
                    contentType: "application/json; charset=utf-8",
                    data: Params2,
                }).then( res => {
                    this.$message({
                    type: 'success',
                    message: 'RefreshCookie successfully' 
                    });
                }).catch( error => {
                    console.log()
                })    
                this.reload();   
            }
            //选择主机未上线则给出提示
            if(res.data.data == null)
                this.$message({
                    type: 'success',
                    message: "Remote host is not online"
                });
        }).catch( error => {
            console.log()
        })
    },
    //更新所有cookie
    //暂时没用
    refreshAllCookieRow(){
        this.$confirm('Are you sure to refresh all Account\'s cookie?','NOTICE',{
            confirmButtonText: 'Confirm',
            cancelButtonText: 'Cancel',
            type: 'warning'
        }).then(() => {
            var Params = {}
            this.$ajax({
                url: '/three/linkedin/acc/updateAllCookie',
                method: 'get',
                contentType: "application/json; charset=utf-8",
                data: Params,
            }).then( res => {
                this.$message({
                type: 'success',
                message: 'RefreshAllCookie successfully' 
                });
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
    //密码隐藏
    passwordHidden(val) {
        var _this = this
        var Params = {
            user: _this.tableData1.user,
            password: _this.tableData1.password,
            status: _this.tableData1.status,
        }
        this.$ajax({
            url: '/three/linkedin/acc/list',
            method: 'get',
            contentType: "application/json; charset=utf-8",
            params: Params
        }).then( res => {
            console.log(res.data.data)
            for(var i=0;i<res.data.data.length;i++){
                if(val == false)
                    _this.tableData1[i].password="********"
                else
                    _this.tableData1[i].password=res.data.data[i].password
            }
        }).catch( error => {
            console.log()
        })
    },
    //判定proxyEnable，是否需要代理，若不需要，下两输入框disabled
    changeDisabled() {
        if(this.ruleForm2.proxyEnable === 'true')
            this.disabled = false
        else
            this.disabled = true
    },
    //判定proxyEnable，是否需要代理，若不需要，下两输入框disabled
    changeDisabled1() {
        if(this.ruleForm3.proxyEnable === 'true')
            this.disabled = false
        else
            this.disabled = true
    },
    //编辑账号
    editRow(number,row) {
        console.log(row)
        console.log(number)
        this.editIndex = number
        this.dialogFormVisible1 = true;
        // var arr = row.ip.split(".")
        this.ruleForm3={
            user: row.user,
            password: row.password,
            lma: row.lma,
            proxyEnable: row.proxyEnable,
            proxy: row.proxy,
            proxy_pass: row.proxy_pass,
            visit: row.hostvisits,
            host: row.host,
        }
        this.editRowinfo = row
        console.log(this.editRowinfo)
    },
    submitFormEdit(formName) {
        // alert("未实现")
        this.$refs[formName].validate((valid) => {
            if (valid) {
                //提交成功做的动作   
                this.$message({
                    type: 'success',
                    message: 'Edit successfully' 
                });
                this.dialogFormVisible1 = false;
                this.$refs[formName].resetFields();
                //添加一个账号
                var _this = this
                var QueryParams = {
                    index : _this.editIndex
                }
                var Params = {
                    user: _this.$refs.user.value,
                    password: _this.$refs.password.value,
                    lma: _this.$refs.lma.value,
                    proxy: _this.$refs.proxy.value,
                    proxy_pass: _this.$refs.proxy_pass.value,
                    proxyEnable: !_this.disabled,
                    visit: _this.$refs.hostvisits.value,
                    host: _this.obj3
                }
                this.$ajax({
                    url: '/three/linkedin/acc/edit',
                    method: 'post',
                    contentType: "application/json; charset=utf-8",
                    params: QueryParams,
                    data: Params,
                }).then( res => {
                    _this.tableData1 = res.data.data;
                }).catch( error => {
                    console.log()
                })       
                this.reload();
            } else {
                console.log('Error submit!!');
                return false;
            }
        }); 
    },
    //弹出框
    submitForm(formName) {
        this.$refs[formName].validate((valid) => {
        if (valid) {
        //提交成功做的动作   
        this.$message({
            type: 'success',
            message: 'Submitted successfully' 
        });
        this.dialogFormVisible = false;
        this.$refs[formName].resetFields();
        //添加一个账号
        var _this = this
        var Params = {
            user: _this.$refs.user.value,
            password: _this.$refs.password.value,
            lma: _this.$refs.lma.value,
            proxy: _this.$refs.proxy.value,
            proxy_pass: _this.$refs.proxy_pass.value,
            proxyEnable: !_this.disabled,
            visit: _this.$refs.hostvisits.value,
            host: _this.obj2
        }
        console.log(Params)
        this.$ajax({
            url: '/three/linkedin/acc/add',
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
        } else {
            console.log('Error submit!!');
            return false;
        }
        }); 
    },

    //重置
    resetForm(formName) {
        this.$refs[formName].resetFields();
    }
}
}
</script>

<style lang="scss" scoped>
#UserConfig {
    min-width: 1100px;
    height:100%;
    .el-icon-setting{
        color: #FF8C00;
        font-size: 30px;
        float: left;
        margin-left: 30px;
        margin-top:30px;
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
        font-weight: 1000;
        color: rgb(107, 185, 216);
        font-family: YouYuan;
    }
    .button2 .el-button {
        background: #2E8B57 ;
        color: white !important;
        position: relative;
        float: right;
        margin: 50px;
        margin-right:10px;
    }
    .fa-eye {
        background:rgba(255, 255, 255, 0) !important;
        border:0px !important;
        color:white;
        margin-left:-25px;
        padding-top:0px;
        padding-bottom:0px;
    }
    .fa-eye:hover {
        color:#2E8B57 !important;
    }
}
</style>

<style>
.el-dialog__header {
    padding: 50px 20px 10px;
}
</style>