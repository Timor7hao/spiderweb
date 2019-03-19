<template>
    <div id="HostConfig">
        <i class="fa fa-server"></i>
        <h1>主机配置</h1>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span class="period">主机配置</span>
            </div>
            <el-table :data="tableData1" :header-cell-style="tableHeaderColor" stripe style="width: 80%">
                <el-table-column prop="" label="" width="50"></el-table-column>
                <el-table-column prop="name" label="爬虫名" width="300"></el-table-column>
                <el-table-column prop="host" label="主机" width="360"></el-table-column>
                <el-table-column prop="method" label="操作">
                    <template slot-scope="scope">
                        <el-button
                            @click.native.prevent="deleteRow(scope.$index, tableData4)"
                            size="small">
                            删除
                        </el-button>
                    </template>
                </el-table-column>
        </el-table>
        <div class="button2">
                <el-button @click="dialogFormVisible = true">添加</el-button>
                <el-dialog title="新增主机" :visible.sync="dialogFormVisible" center style="margin-top:150px;width:70%;left:20%">
                    <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
                        <el-form-item label="爬虫名：" prop="num">
                            <el-select v-model="form.region" placeholder="请选择爬虫类型" style="width:90%">
                                <el-option label="用户信息爬虫" value="spider1"></el-option>
                                <el-option label="好友信息爬虫" value="spider2"></el-option>
                                <el-option label="帖子信息爬虫" value="spider3"></el-option>
                                <el-option label="评论信息爬虫" value="spider4"></el-option>
                                <el-option label="点赞信息爬虫" value="spider5"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="主机：" prop="pass">
                            <el-input v-model.number="ruleForm2.pass" auto-complete="off" style="width:90%"></el-input>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer" style="height: 65px;">
                        <el-button @click="dialogFormVisible = false; resetForm('ruleForm2')" style="margin-top:0px;margin-right:85px;">取 消</el-button>
                        <el-button type="primary" @click="submitForm('ruleForm2')"  style="margin-top:0px;margin-right:0px;">保 存</el-button>
                    </div>
                </el-dialog>
            </div>
        </el-card>   
    </div>
</template>

<script>
export default {
    name: 'HostConfig',
    data () {
        //弹出框方法
        var checkNum = (rule, value, callback) => {
            if (!this.form.region){
                return callback(new Error('请选择所工作爬虫'));
            }
            callback();
        };
        var validatePass = (rule, value, callback) => {
            if (value === '') {
                return callback(new Error('请输入主机号'));
            }
            setTimeout(() => {
                if (!Number.isInteger(value)||!value.contains('.')) {
                    callback(new Error('请输入正确的主机号'));
                } else {
                callback();
            }
            }, 1000);
        };
        return {
            tableData1: [{
            name: '用户信息爬虫',
            host: '192.168.119.110'
        }, {
            name: '好友信息爬虫',
            host: '192.168.119.112'
        }, {
            name: '帖子信息爬虫',
            host: '192.168.119.112'
        }, {
            name: '评论信息爬虫',
            host: '192.168.119.112'
        }, {
            name: '点赞信息爬虫',
            host: '192.168.119.112'
        }],
        //弹出框
        loginPower:false,
        ruleForm2: {
            pass: '',
            num: '',
        },
        rules2: {
            pass: [
            { validator: validatePass, trigger: 'blur' }
        ],
            num: [
            { validator: checkNum, trigger: 'change' }
          ]
        },
        dialogTableVisible: false,
        dialogFormVisible: false,
        form: {
            name: '',
            type: [],
            resource: '',
            desc: ''
        },
        formLabelWidth: '120px' 
        };
    },
    methods: {
    // 修改table header的背景色
    tableHeaderColor({ row, column, rowIndex, columnIndex }) {
        if (rowIndex === 0) {
        return 'background-color: lightblue;color: #fff;font-weight: 800;font-family: YouYuan'
        }
    },
    //弹出框
    submitForm(formName) {
        this.$refs[formName].validate((valid) => {
        if (valid) {
        //提交成功做的动作   
        this.$message({
            type: 'success',
            message: '提交成功' 
        });
        this.dialogFormVisible = false;
        this.$refs[formName].resetFields();
        this.form.region =  null;
        } else {
            console.log('error submit!!');
            return false;
        }
        }); 
    },
    resetForm(formName) {
        this.$refs[formName].resetFields();
        this.form.region =  null;
    }
}
}
</script>

<style>
#HostConfig {
    height: 810px;
    overflow-y: auto;
}

#HostConfig .fa-server{
    color: #2E8B57;
    font-size: 30px;
    float: left;
    margin-left: 32px;
    margin-top: 30px;
}

#HostConfig h1{
    font-size: 25px;
    padding-left: 40px;
    margin: 30px;
    font-family: YouYuan;
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

#HostConfig .period {
    float:left;
    font-size: 16px;
    font-weight: 1000;
    color: rgb(107, 185, 216);
    font-family: YouYuan;
}

#HostConfig .el-table {
    /* margin-left: 100px; */
    padding-left: 280px;
}
/* .center th .cell{
    text-align: center !important;
} */

.button2 .el-button {
    background: #2E8B57 ;
    color: white !important;
    position: relative;
    float: right;
    margin: 50px;
    margin-right: 14%;
}

.el-dialog__header {
    padding: 50px 20px 10px;
}
</style>