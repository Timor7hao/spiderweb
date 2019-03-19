<template>
    <div id="newtask">
        <i class="fa fa-pencil-square-o"></i>
        <h1>新建任务</h1>
        <el-card class="box-card">
            <el-form :model="dynamicValidateForm" ref="dynamicValidateForm" label-width="100px" class="demo-dynamic">
                <el-form-item
                    v-for="(domain, index) in dynamicValidateForm.domains"
                    :label="'目标ID ' + index + ':'"
                    :key="domain.key"
                    :prop="'domains.' + index + '.value'"
                    :rules="{required: true, message: '目标ID不能为空', trigger: 'blur'}">
                    <el-col :span="1">&nbsp;</el-col>
                    <el-col :span="14">
                        <el-input v-model="domain.value"></el-input>
                    </el-col>
                    <el-col :span="1">&nbsp;</el-col>
                    <!-- <el-button @click.prevent="removeDomain(domain)">删除</el-button> -->
                    <el-button  @click.prevent="removeDomain(domain)" type="danger" icon="el-icon-delete" circle></el-button>
                </el-form-item>
                <el-form-item style="margin-bottom:0px">
                    <div class="button2">
                        <el-button type="primary" @click="submitForm('dynamicValidateForm')" style="background: #2E8B57">保存</el-button>
                        <el-button @click="addDomain">新增ID</el-button>
                    </div>
                </el-form-item>
            </el-form>
        </el-card>

        <el-card class="box-card">
            <el-form label-width="100px" class="demo-ruleForm">
                <el-form-item label="*"  class="redItem" style="float:left;margin-right:-75px;"></el-form-item>
                <el-form-item label="目标用户ID文件上传:" prop="upload" label-width="90px">
                    <el-col :span="1">&nbsp;</el-col>
                    <el-col :span="20">
                    <el-upload
                        class="upload-demo"
                        drag
                        action="https://jsonplaceholder.typicode.com/posts/"
                        multiple
                        :on-preview="handlePreview"
                        :on-remove="handleRemove"
                        :before-remove="beforeRemove"
                        :limit="3"
                        :on-exceed="handleExceed"
                        :file-list="fileList"
                        accept=".txt"
                        >
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                    <div class="el-upload__tip" slot="tip">（只能上传.txt文件）</div>
                    </el-upload>
                </el-col>
                </el-form-item>
                </el-form>
        </el-card>

        <el-card class="box-card">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="参数配置:" prop="config">
                <el-form-item label="好友跳数:" prop="jump" style="padding-bottom:15px">
                    <el-input v-model="ruleForm.name" placeholder="" style="margin-left:24px;width:100px;"></el-input>
                </el-form-item>
                <el-form-item label="爬取速率:" prop="rate">
                    <el-radio-group v-model="ruleForm.resource" >
                        <el-radio style="padding-right:30px">
                            <el-input v-model="ruleForm.name" placeholder="" style="width:100px"></el-input>次/分钟
                        </el-radio>  
                        <el-radio label="自适应"></el-radio>
                    </el-radio-group>
                </el-form-item>
                </el-form-item>
            </el-form>
        </el-card>

        <el-card class="box-card">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="爬取内容配置:" prop="contentconfig">
                    <el-col :span="1">&nbsp;</el-col>
                    <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange" style="font-weight: bold">全选</el-checkbox>
                    <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                        <div class="card1">
                            <el-checkbox label="用户信息" name="type" style="font-weight: bold"></el-checkbox>
                            <li>基本信息：用户名字、账号名、婚姻、加入日期。</li>
                            <li>简介：工作与学历、生活过的地方、联系方式和基本情况、家庭成员、详细资料、生活规律。</li>
                        </div>    
                        <div class="card1">
                            <el-checkbox label="好友" name="type" style="font-weight: bold"></el-checkbox>
                            <li>好友名字、好友账号、好友跳数。</li>
                        </div>
                        <div class="card1">
                            <el-checkbox label="时间线" name="type" style="font-weight: bold"></el-checkbox>
                            <li>发帖账号、帖子ID、内容、发表时间、是否是转帖、转帖人的名字。</li>  
                        </div>
                        <div class="card1">
                            <el-checkbox label="点赞" name="type" style="font-weight: bold"></el-checkbox>
                            <li>点赞人名字、点赞人头像、点赞人账号。</li>
                        </div>
                        <div class="card1">
                            <el-checkbox label="评论" name="type" style="font-weight: bold"></el-checkbox>
                            <li>评论人名字、评论内容、时间、是否回复。</li>
                        </div>
                    </el-checkbox-group>
                </el-form-item>
            </el-form>
        </el-card>

        <div class="button3">
            <el-button style="margin-right:40px;">重置</el-button>
            <el-button type="primary" @click="submitForm('dynamicValidateForm')" style="background: #2E8B57">提交</el-button>
        </div>

    </div>
</template>

<script>
const cityOptions = ['用户信息', '好友', '时间线', '点赞','评论'];
export default {
    data() {
      return {
        //目标ID
        dynamicValidateForm: {
        domains: [{
            value: ''
        }],
            email: ''
        },
        //目标用户ID文件上传
        limitNum: 1,
        formLabelWidth: '80px',
        form: {
            file:''
        },
        fileList: [],
        //爬取内容配置
        checkAll: false,
        checkedCities: ['用户信息', '好友', '时间线', '点赞','评论'],
        cities: cityOptions,
        isIndeterminate: true,
        ruleForm: {
          upload: '',
          jump: '',
          rate: '',
          config: '',
          contentconfig: ''
        },
        rules: {
            config:[
                { required: true, message:'',trigger:'change' }
            ],
            contentconfig: [
                { required: true, message:' ',trigger:'change' }
            ]
        }
      }
    },
    methods: {
        //目标ID
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
            if (valid) {
                alert('submit!');
            } else {
                console.log('error submit!!');
                return false;
            }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        removeDomain(item) {
            var index = this.dynamicValidateForm.domains.indexOf(item)
            if (index !== -1) {
            this.dynamicValidateForm.domains.splice(index, 1)
            }
        },
        addDomain() {
            this.dynamicValidateForm.domains.push({
            value: '',
            key: Date.now()
            });
        },
        //目标用户ID文件上传
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePreview(file) {
            console.log(file);
        },
        handleExceed(files, fileList) {
            this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
        },
        beforeRemove(file, fileList) {
            return this.$confirm(`确定移除 ${ file.name }？`);
        },
        //参数配置
        //爬取内容配置
        handleChange(file, fileList) {
            this.fileList3 = fileList.slice(-3);
        },
        handleCheckAllChange(val) {
            this.checkedCities = val ? cityOptions : [];
            this.isIndeterminate = false;
        },
        handleCheckedCitiesChange(value) {
            let checkedCount = value.length;
            this.checkAll = checkedCount === this.cities.length;
            this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
        }
    }
}
</script>

<style>
#newtask {
    height: 810px;
    overflow-y: auto;
} 

#newtask .fa-pencil-square-o{
    color: #009ACD;
    font-size: 30px;
    float: left;
    margin-left: 30px;
    margin-top: 30px;
}

#newtask h1{
    font-size: 25px;
    padding-left: 40px;
    margin: 30px;
    font-family: YouYuan;
}

#newtask .box-card {
    width:95%;
    margin-left:30px;
    background: white;
    padding: 30px;
    padding-bottom: 0px;
    margin-bottom: 20px;
}

#newtask .el-form-item {
    text-align: left;
}

#newtask .button2 .el-button {
    float: right;
    margin-right: 30px !important;
    margin: 0px;
}

#newtask .el-upload {
    float:left;
}

.el-upload__tip {
    padding-top: 150px;
    padding-left: 400px;
}

.el-upload__input {
    visibility: hidden;
    position: absolute;
}

.el-checkbox {
    clear:both;
    position: relative;
    display: inline;
}

.redItem .el-form-item__label {
    color: red !important;
    margin-left: -60px;
}  

li {
    font-size: 14px;
    text-align: left;
    margin-left: 20px;
    color: rgb(148, 141, 141);
}

.card1 {
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    padding: 15px;
    margin:35px;
    border:1px solid rgb(240, 233, 233);
}
</style>