<template>
    <div id="UserConfig">
        <i class="el-icon-setting"></i>
        <h1>账号密码配置</h1>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span class="period">账号密码配置</span>
            </div>
            <el-table :data="tableData1" :header-cell-style="tableHeaderColor" stripe style="width: 86%">
            <el-table-column prop="" label="" width="40"></el-table-column>
            <el-table-column prop="number" label="账号" width="250"></el-table-column>
            <el-table-column prop="passward" label="密码" width="230"></el-table-column>
            <el-table-column prop="state" label="状态" width="200"></el-table-column>
            <el-table-column prop="method" label="操作" width="300">
                <template slot-scope="scope">
                    <el-button
                        @click.native.prevent="deleteRow(scope.$index, tableData4)"
                        size="small">
                        删除
                    </el-button>
                    <el-button
                        @click.native.prevent="deleteRow(scope.$index, tableData4)"
                        size="small">
                        更新cookie
                    </el-button>
                    <el-button
                        @click.native.prevent="deleteRow(scope.$index, tableData4)"
                        size="small">
                        编辑
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="button2">
            <el-button @click="dialogFormVisible = true">添加</el-button>
            <el-dialog title="新增爬虫账号密码" :visible.sync="dialogFormVisible" center style="margin-top:150px;width:70%;left:20%">
                <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="账号：" prop="num">
                        <el-input v-model.number="ruleForm2.num" style="width:90%"></el-input>
                    </el-form-item>
                    <el-form-item label="密码：" prop="pass">
                        <el-input type="password" v-model="ruleForm2.pass" auto-complete="off" style="width:90%"></el-input>
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
    name: 'UserConfig',
    data () {
        //弹出框方法
        var checkNum = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('账号不能为空'));
            }
            setTimeout(() => {
                if (!Number.isInteger(value)) {
                    callback(new Error('请输入数字值'));
                } else {
                // var myreg=/^[1][3,4,5,7,8][0-9]{9}$/;
                // if (!myreg.test(value) ) {
                //     callback(new Error('请输入正确的手机号码'));
                // } else {
                //     callback();
                // }
                callback();
            }
            }, 1000);
        };
        var validatePass = (rule, value, callback) => {
            if (value === '') {
            callback(new Error('请输入密码'));
            } else {
            callback();
            }
        };
        return {
            tableData1: [{
            number: '1122334',
            passward: '123',
            state: '正常'
        }, {
            number: '182050190',
            passward: '123',
            state: '被封'
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
            { validator: checkNum, trigger: 'blur' }
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
        } else {
            console.log('error submit!!');
            return false;
        }
        }); 
    },
    resetForm(formName) {
        this.$refs[formName].resetFields();
    }
}
}
</script>

<style>
#UserConfig {
    height: 780px;
}

#UserConfig .el-icon-setting{
    color: #FF8C00;
    font-size: 30px;
    float: left;
    margin-left: 30px;
}

#UserConfig h1{
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

.box-card {
    width:95%;
    margin-left:30px;
    background: white;
    padding: 30px;
    padding-bottom: 0px;
    margin-bottom: 20px;
}

#UserConfig .period {
    float:left;
    font-size: 16px;
    font-weight: 1000;
    color: rgb(107, 185, 216);
    font-family: YouYuan;
}

#UserConfig .el-table {
    /* margin-left: 100px; */
    padding-left: 180px;
}

.button2 .el-button {
    background: #2E8B57 ;
    color: white !important;
    position: relative;
    float: right;
    margin: 50px;
    margin-right:14%;
}

.el-dialog__header {
    padding: 50px 20px 10px;
}
</style>