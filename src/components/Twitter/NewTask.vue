<template>
    <div id="newtask">
        <i class="fa fa-pencil-square-o"></i>
        <h1 style="font-family:sans-serif">NewCrawlerTask</h1>
        <el-card class="box-card">
            <el-form :model="ruleForm2" :rules="rules" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
                <el-form-item label="TaskName:" prop="taskname">
                    <el-col :span="1">&nbsp;</el-col>
                    <el-col :span="14">
                        <el-input v-model="ruleForm2.taskname" placeholder="Please input your task name.">
                            <el-button slot="suffix" icon="el-icon-error" @click="deleteForm()"></el-button>
                        </el-input>
                    </el-col>    
                </el-form-item>
            </el-form>
        </el-card>

        <el-card class="box-card">
            <el-form :model="dynamicValidateForm" ref="dynamicValidateForm" label-width="100px" class="demo-dynamic">
                <el-form-item
                    v-for="(domain, index) in dynamicValidateForm.domains"
                    :label="'TargetID ' + index + ':'"
                    :key="domain.key"
                    :prop="'domains.' + index + '.value'"
                    :rules="rules2">
                    <el-col :span="1">&nbsp;</el-col>
                    <el-col :span="14">
                        <el-input v-model="domain.value" placeholder="Please input your target ID.Can be added."></el-input>
                    </el-col>
                    <el-col :span="1">&nbsp;</el-col>
                    <el-button @click.prevent="removeDomain(domain)" type="danger" icon="el-icon-delete" circle></el-button>
                </el-form-item>
                <el-form-item style="margin-bottom:0px">
                    <div class="button2">
                        <el-button class="ripple" @click="addDomain">ADD ID</el-button>
                    </div>
                </el-form-item>
            </el-form>
            <!-- 文件上传 -->
            <el-form label-width="100px" style="padding-top:30px;">
                <el-form-item label="FileUpload:" prop="upload" label-width="90px" style="padding-left:15px;">
                    <el-col :span="1">&nbsp;</el-col>
                    <el-col :span="20">
                        <el-upload
                            drag
                            action="123"
                            multiple
                            :auto-upload="false"
                            :on-change="loadJsonFromFile"
                            :limit="1"
                            :on-exceed="handleExceed"
                            :on-remove="handleRemove"
                            :file-list="uploadFiles"
                            accept="text/plain">
                        <i class="el-icon-upload"></i>
                        <div class="el-upload__text">Drag files here, or <em>click Upload</em></div>
                        <div class="el-upload__tip" slot="tip">（Only supports .txt files.The content format is["Name1","Name2",...]）</div>
                        </el-upload>
                    </el-col>
                </el-form-item>
            </el-form>
        </el-card>

        <el-card class="box-card">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="Settings:" style="margin-left:-10px;">
                    <el-form-item label="HopCount:" prop="name1" style="padding-bottom:15px">
                        <el-input v-model="ruleForm.name1" placeholder="0-10" style="margin-left:24px;width:100px;"></el-input>  ( 0 means unlimited crawing )
                    </el-form-item>
                    <el-form-item label="CrawlRate:" prop="name2" style="padding-bottom:15px">
                        <el-radio-group v-model="radio">
                            <el-radio style="padding-right:30px">
                                <el-input v-model="ruleForm.name2" style="width:100px" prop="crawlrate"></el-input> times/minute
                            </el-radio>  
                            <el-radio label="Adaptive(1 times/minute)"></el-radio>
                        </el-radio-group>
                    </el-form-item>

                    <el-form-item prop="PeriodEnable" label="PeriodEnable：" style="padding-bottom:15px;float:left">
                        <el-select v-model="ruleForm.PeriodEnable" placeholder="choose" empty-text="NO DATA" @change="changeDisabled" style="margin-left:24px;width:100px">
                            <el-option label="YES" value="true"></el-option>
                            <el-option label="NO" value="false"></el-option>
                            <div slot="empty" style="padding:10px;">NO DATA</div>
                        </el-select>
                    </el-form-item>
                    <el-form-item prop="Period" label="Period：" style="padding-left:340px;">
                        <el-input v-model="ruleForm.Period" style="width:100px;" :disabled="disabled"></el-input>&nbsp;day
                    </el-form-item>
                    <el-form-item prop="WorkTimeEnable" label="WorkTimeEnable：" style="padding-bottom:15px;float:left">
                        <el-select v-model="ruleForm.WorkTimeEnable" placeholder="choose" empty-text="NO DATA" @change="changeDisabled2" style="margin-left:24px;width:100px">
                            <el-option label="YES" value="true"></el-option>
                            <el-option label="NO" value="false"></el-option>
                            <div slot="empty" style="padding:10px;">NO DATA</div>
                        </el-select>
                    </el-form-item>
                    <el-form-item prop="TimeZone" label="TimeZone：" style="padding-left:340px;">
                        <el-select v-model="ruleForm.TimeZone" placeholder="choose" filterable empty-text="NO DATA" style="width:150px" :disabled="disabled2">
                            <el-option
                                v-for="item in options2"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                            <div slot="empty" style="padding:10px;">NO DATA</div>
                        </el-select>
                    </el-form-item>

                    <el-form-item
                        v-for="(domain, index) in ruleForm.domains"
                        :label="'Range ' + index + ' :'"
                        :key="domain.key"
                        :prop="'domains.' + index + '.value'"
                        style="padding-left:340px;padding-bottom:15px;">
                        <el-col :span="14">
                            <el-time-picker placeholder="Start" v-model="domain.date1" style="width: 100px;" format="HH:mm" value-format="HH:mm" :disabled="disabled2"></el-time-picker> -
                            <el-time-picker placeholder="End" v-model="domain.date2" style="width: 100px;" format="HH:mm" value-format="HH:mm" :disabled="disabled2"></el-time-picker>
                        </el-col>
                        <el-col :span="1">&nbsp;</el-col>
                        <el-button  @click.prevent="removeDomain2(domain)" type="danger" icon="el-icon-delete" circle :disabled="disabled2"></el-button>
                    </el-form-item>
                    <el-form-item style="text-align: right">
                        <el-button @click="addDomain2(ruleForm.domains)" type="text" style="margin-right:200px;" :disabled="disabled2">+ AddLine</el-button>
                    </el-form-item>

                </el-form-item>
            </el-form>
        </el-card>

        <el-card class="box-card">
            <el-form :model="ruleForm" :rules="rules3" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="CrawlContent:" prop="contentconfig" style="padding-left:15px;">
                    <el-col :span="1">&nbsp;</el-col>
                    <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange" style="font-weight: bold">SelectAll</el-checkbox>
                    <div class="card1">
                        <el-col :span="17">
                            <el-checkbox label="UserInfo (required)" name="type" style="font-weight: bold" v-model="checkedinfo" disabled></el-checkbox>  
                        </el-col>
                        <!-- 主机端口选择 -->
                        <el-col :span="7">
                            <el-form-item label="Host：" prop="value1">
                                <el-select v-model="value1" @change="selectGet1" multiple placeholder="Please select a host number">
                                    <el-option
                                        v-for="item in options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                    <div slot="empty" style="padding:10px;">NO DATA</div>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <li>Basic information: user name, account name, marriage, date of joining.</li>
                        <li>Introduction: work and education, places where people live, contact information and basic conditions, family members, detailed information, life rules.</li>
                    </div> 

                    <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">   
                        <div class="card1" v-for="(item,index) in commentData" :key="index">
                            <el-col :span="17">
                                <el-checkbox 
                                    :label="item.name" 
                                    :id="item.name" 
                                    name="type" 
                                    style="font-weight: bold" 
                                    @selection-change='handleSelectionChange'
                                    @change="selectChange">
                                </el-checkbox>
                            </el-col>
                            <!-- 主机端口选择 -->
                            <el-col :span="7">
                                <el-form-item label="Host：">
                                    <el-select v-model="item.des" @change="selectGet2(item.des,item.name)" multiple placeholder="Please select a host number">
                                        <el-option
                                            v-for="item1 in options"
                                            :key="item1.value"
                                            :label="item1.label"
                                            :value="item1.value">
                                        </el-option>
                                        <div slot="empty" style="padding:10px;">NO DATA</div>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <li>{{ item.msg }}</li>
                        </div>
                    </el-checkbox-group>
                </el-form-item>
            </el-form>
        </el-card>

        <div class="button3">
            <el-button class="ripple" style="margin-right:40px;" @click="resetForm()">Reset</el-button>
            <el-button class="ripple" type="primary" @click="submitAllForm()" style="background: #2E8B57">Submit</el-button>
        </div>

    </div>
</template>

<script>
const cityOptions = ['Follow', 'Tweets'];
export default {
    name: 'NewTask',
    inject:['reload'],
    data() {
        //弹出框方法
        var tasknameVerify = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('Taskname cannot be empty'));
            }
            callback();
        };
        var hopVerify = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('HopCount cannot be empty'));
            }
            else if(!/^[0-9]*[1-9][0-9]*$/.test(value)){
                if(value!=0)
                    return callback(new Error('HopCount is not in the correct format'));
                else
                    callback();
            }
            callback();
            
        };
        var rateVerify = (rule, value, callback) => {
            if(this.radio!='Adaptive(1 times/minute)')
            {
                if (!value) {
                    return callback(new Error('CrawlRate cannot be empty'));
                }
                else if(!/^[0-9]*[1-9][0-9]*$/.test(value))
                    return callback(new Error('CrawlRate is not in the correct format'));
                callback();
            }
        };
        var periodVerify = (rule, value, callback) => {
            if(this.ruleForm.PeriodEnable === "true")
            {
                if (!value) {
                    return callback(new Error('Period cannot be empty'));
                }
                else if(!/^[0-9]*[1-9][0-9]*$/.test(value))
                    return callback(new Error('Period is not in the correct format'));
                callback();
            }
            else
                callback();
        };
        var targetidVerify = (rule, value, callback) => {
            if(this.uploadFiles.length==0)
            {
                if (!value) {
                    return callback(new Error('TargetID cannot be empty'));
                }
                else
                    callback();
            }
            else
                callback();
        };
        var hostVerify = (rule, value, callback) => {
            if (this.value1.length==0) {
                return callback(new Error('Host cannot be empty'));
            }
            else
                callback();
        };
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
            //upload文件上传数据
            uploadFilename: null,
            uploadFiles: [],
            Filescontent: [],
            //判断文件是否删除
            removed: false,
            //爬取速率
            radio: 'Adaptive(1 times/minute)',
            //爬取内容配置
            checkAll: false,
            checkedinfo: true,
            checkList:[],
            checkedCities: ['Follow', 'Tweets'],
            cities: cityOptions,
            isIndeterminate: true,
            ruleForm: {
                name1:'0',
                rate: '',
                config: '',
                contentconfig: '',
                domains: [{
                    value: '',
                    date1:'',
                    date2:''
                }],
                PeriodEnable: "false",
                Period: '',
                WorkTimeEnable: "false",
            },
            disabled: false,
            disabled2: true,
            ruleForm2: {
                taskname: ''
            },
            rules: {
                    taskname: [
                        { validator: tasknameVerify, trigger:'blur' }
                    ],
                    name1: [
                        { validator: hopVerify, trigger:'blur' }
                    ],
                    name2: [
                        { validator: rateVerify, trigger:'blur' }
                    ],
                    Period: [
                        { validator: periodVerify, trigger:'blur' }
                    ]
                },
                rules2: {
                    validator: targetidVerify, trigger: 'blur'
                },
                rules3: {
                    value1: [
                        { validator: hostVerify, trigger:'blur' }
                    ],
                },
            // 主机选择
            value1: [0],
            options:[],  //存放下拉框中baseUrl
            options1:[],   //存放IP和port
            options2: [{
                    value: 'Asia/Shanghai',
                    label: 'Asia/Shanghai'   
                }, {
                    value: 'Asia/Hong_Kong',
                    label: 'Asia/Hong_Kong'  
                }, {
                    value: 'Asia/Taipei',
                    label: 'Asia/Taipei'    
                }, {
                    value: 'Asia/Seoul',
                    label: 'Asia/Seoul'     
                }, {
                    value: 'Asia/Tokyo',
                    label: 'Asia/Tokyo'    
                },{
                    value: 'America/New_York',
                    label: 'America/New_York' 
                },{
                    value: 'America/Denver',
                    label: 'America/Denver'     
                },{
                    value: 'America/Costa_Rica',
                    label: 'America/Costa_Rica'     
                },{
                    value: 'America/Chicago',
                    label: 'America/Chicago'
                },{
                    value: 'America/Mexico_City',
                    label: 'America/Mexico_City'
                },{
                    value: 'America/Regina',
                    label: 'America/Regina'
                },{
                    value: 'America/Los_Angeles',
                    label: 'America/Los_Angeles'
                },{
                    value: 'Pacific/Majuro',
                    label: 'Pacific/Majuro'
                },{
                    value: 'Pacific/Midway',
                    label: 'Pacific/Midway'
                },{
                    value: 'Pacific/Honolulu',
                    label: 'Pacific/Honolulu'
                },{
                    value: 'America/Anchorage',
                    label: 'America/Anchorage'
                },{
                    value: 'America/Tijuana',
                    label: 'America/Tijuana'
                },{
                    value: 'America/Phoenix',
                    label: 'America/Phoenix'
                },{
                    value: 'America/Chihuahua',
                    label: 'America/Chihuahua'
                },{
                    value: 'America/Bogota',
                    label: 'America/Bogota'
                },{
                    value: 'America/Caracas',
                    label: 'America/Caracas'
                },{
                    value: 'America/Barbados',
                    label: 'America/Barbados'
                },{
                    value: 'America/Manaus',
                    label: 'America/Manaus'
                },{
                    value: 'America/St_Johns',
                    label: 'America/St_Johns'
                },{
                    value: 'America/Santiago',
                    label: 'America/Santiago'
                },{
                    value: 'America/Argentina/Buenos_Aires',
                    label: 'America/Argentina/Buenos_Aires'
                },{
                    value: 'America/Godthab',
                    label: 'America/Godthab'
                },{
                    value: 'America/Montevideo',
                    label: 'America/Montevideo'
                },{
                    value: 'America/Sao_Paulo',
                    label: 'America/Sao_Paulo'
                },{
                    value: 'Atlantic/South_Georgia',
                    label: 'Atlantic/South_Georgia'
                },{
                    value: 'Atlantic/Azores',
                    label: 'Atlantic/Azores'
                },{
                    value: 'Atlantic/Cape_Verde',
                    label: 'Atlantic/Cape_Verde'
                },{
                    value: 'Africa/Casablanca',
                    label: 'Africa/Casablanca'
                },{
                    value: 'Europe/London',
                    label: 'Europe/London'
                },{
                    value: 'Europe/Amsterdam',
                    label: 'Europe/Amsterdam'
                },{
                    value: 'Europe/Belgrade',
                    label: 'Europe/Belgrade'
                },{
                    value: 'Europe/Brussels',
                    label: 'Europe/Brussels'
                },{
                    value: 'Europe/Sarajevo',
                    label: 'Europe/Sarajevo'
                },{
                    value: 'Africa/Brazzaville',
                    label: 'Africa/Brazzaville'
                },{
                    value: 'Africa/Windhoek',
                    label: 'Africa/Windhoek'
                },{
                    value: 'Asia/Amman',
                    label: 'Asia/Amman'
                },{
                    value: 'Europe/Athens',
                    label: 'Europe/Athens'
                },{
                    value: 'Asia/Beirut',
                    label: 'Asia/Beirut'
                },{
                    value: 'Africa/Cairo',
                    label: 'Africa/Cairo'
                },{
                    value: 'Europe/Helsinki',
                    label: 'Europe/Helsinki'
                },{
                    value: 'Asia/Jerusalem',
                    label: 'Asia/Jerusalem'
                },{
                    value: 'Africa/Harare',
                    label: 'Africa/Harare'
                },{
                    value: 'Europe/Minsk',
                    label: 'Europe/Minsk'
                },{
                    value: 'Asia/Baghdad',
                    label: 'Asia/Baghdad'
                },{
                    value: 'Europe/Moscow',
                    label: 'Europe/Moscow'
                },{
                    value: 'Asia/Kuwait',
                    label: 'Asia/Kuwait'
                },{
                    value: 'Africa/Nairobi',
                    label: 'Africa/Nairobi'
                },{
                    value: 'Asia/Tehran',
                    label: 'Asia/Tehran'
                },{
                    value: 'Asia/Baku',
                    label: 'Asia/Baku'
                },{
                    value: 'Asia/Tbilisi',
                    label: 'Asia/Tbilisi'
                },{
                    value: 'Asia/Yerevan',
                    label: 'Asia/Yerevan'
                },{
                    value: 'Asia/Dubai',
                    label: 'Asia/Dubai'
                },{
                    value: 'Asia/Kabul',
                    label: 'Asia/Kabul'
                },{
                    value: 'Asia/Karachi',
                    label: 'Asia/Karachi'
                },{
                    value: 'Asia/Oral',
                    label: 'Asia/Oral'
                },{
                    value: 'Asia/Yekaterinburg',
                    label: 'Asia/Yekaterinburg'
                },{
                    value: 'Asia/Calcutta',
                    label: 'Asia/Calcutta'
                },{
                    value: 'Asia/Colombo',
                    label: 'Asia/Colombo'
                },{
                    value: 'Asia/Katmandu',
                    label: 'Asia/Katmandu'
                },{
                    value: 'Asia/Almaty',
                    label: 'Asia/Almaty'
                },{
                    value: 'Asia/Rangoon',
                    label: 'Asia/Rangoon'
                },{
                    value: 'Asia/Krasnoyarsk',
                    label: 'Asia/Krasnoyarsk'
                },{
                    value: 'Asia/Bangkok',
                    label: 'Asia/Bangkok'
                },{
                    value: 'Asia/Irkutsk',
                    label: 'Asia/Irkutsk'
                },{
                    value: 'Asia/Kuala_Lumpur',
                    label: 'Asia/Kuala_Lumpur'
                },{
                    value: 'Australia/Perth',
                    label: 'Australia/Perth'
                },{
                    value: 'Asia/Yakutsk',
                    label: 'Asia/Yakutsk'
                },{
                    value: 'Australia/Darwin',
                    label: 'Australia/Darwin'
                },{
                    value: 'Australia/Brisbane',
                    label: 'Australia/Brisbane'
                },{
                    value: 'Asia/Vladivostok',
                    label: 'Asia/Vladivostok'
                },{
                    value: 'Pacific/Guam',
                    label: 'Pacific/Guam'
                },{
                    value: 'Australia/Adelaide',
                    label: 'Australia/Adelaide'
                },{
                    value: 'Australia/Hobart',
                    label: 'Australia/Hobart'
                },{
                    value: 'Australia/Sydney',
                    label: 'Australia/Sydney'
                },{
                    value: 'Asia/Magadan',
                    label: 'Asia/Magadan'
                },{
                    value: 'Pacific/Auckland',
                    label: 'Pacific/Auckland'
                },{
                    value: 'Pacific/Fiji',
                    label: 'Pacific/Fiji'
                },{
                    value: 'Pacific/Tongatapu',
                    label: 'Pacific/Tongatapu'
            }],
            obj1:[],
            obj2:[],
            obj3:[],
            // obj4:[],
            // obj5:[],
            //验证合法性
            ruleFormValid: false,
            ruleForm2Valid: false,
            dynamicValidateFormValid: false,
            commentData: [
                { name: 'Follow', des: [0], msg: 'User\'s fan information, including fan name, account number and avatar.'},
                { name: 'Tweets', des: [0], msg: 'User\'s tweet information, including tweet content, links, images, likes, reprints, reprint sources, etc.'}
            ]
        }
    },
    mounted () {
        this.$nextTick( function(){
            this.getHostList(1)
        })
    },
    methods: {
        //删除第一个taskname内容
        deleteForm() {
            this.ruleForm2.taskname="";
        },
        //读取文件内容，目前仅支持读取一个文件
        loadJsonFromFile (file, fileList) {
            this.uploadFilename = file.name
            this.uploadFiles = fileList
            if (this.uploadFiles) {
                let file = this.uploadFiles[0]
                let reader = new FileReader()
                reader.onload = async (e) => {
                    try {
                        let document = JSON.parse(e.target.result)
                        console.log(document)
                        this.Filescontent = document
                    } catch (err) {
                        this.$message({
                        type: 'error',
                        message: 'Unexpected end of JSON input' 
                    });
                    }
                }
                reader.readAsText(file.raw)
            }
        },
        //获取主机和IP地址
        getHostList(){
            var _this = this
            var Params = {}
            this.$ajax({
                url: '/two/twitter/host/list',
                method: 'get',
                contentType: "application/json; charset=utf-8",
                params: Params
            }).then( res => {
                let obj = []
                // console.log(res.data.data)
                for(var i=0;i<res.data.data.length;i++){
                    var model = res.data.data[i];
                    var item = {};
                    item.label =  model.baseUrl;
                    item.value = i;
                    _this.options.push(item);
                    //超级有用
                    var it = {};
                    it.ip = model.ip;
                    it.port = model.port;
                    _this.options1.push(it);
                }
                // console.log(_this.options)
                // console.log(_this.options1)
            }).catch( error => {
                console.log()
            })
        },
        // 获取表格选中时的数据
        handleSelectionChange (val) {
            this.selectionData = val
        },
        //复选框状态改变
        changeFun(val) {
            this.multipleSelection = val;
        },
        selectChange(val) {
            console.log(val)
            // console.log(this.selectionData)
            console.log(this.checkList)
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$message({
                        type: 'success',
                        message: 'Submitted successfully' 
                    });
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
            this.removed = true;
            this.uploadFiles = []
            console.log(file, fileList);
        },
        handleExceed(files, fileList) {
            this.$message.warning(`The current limit selects 1 files, this time selected ${files.length} files, a total of  ${files.length + fileList.length} files were selected.`);
        },
        //参数配置
        //爬取内容配置
        handleCheckAllChange(val) {
            this.checkedCities = val ? cityOptions : [];
            this.isIndeterminate = false;
        },
        handleCheckedCitiesChange(value) {
            let checkedCount = value.length;
            this.checkAll = checkedCount === this.cities.length;
            this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
        },
        changeDisabled() {
            this.ruleForm.Period = ''
            // if(this.ruleForm.PeriodEnable === 'true')
            //     this.disabled = false
            // else
            //     {
            //         this.ruleForm.Period = ''
            //         this.disabled = true
            //     }
        },
        changeDisabled2() {
            if(this.ruleForm.WorkTimeEnable === 'true')
                this.disabled2 = false
            else
                {
                    this.ruleForm.TimeZone = ""
                    for(var i=0;i<this.ruleForm.domains.length;i++)
                    {
                        this.ruleForm.domains[i].date1 = null
                        this.ruleForm.domains[i].date2 = null
                    }
                    this.disabled2 = true
                }
        },
        addDomain2() {
            this.ruleForm.domains.push({
                value: '',
                key: Date.now()
            });
        },
        removeDomain2(item) {
            var index = this.ruleForm.domains.indexOf(item)
            if (index !== -1) {
                this.ruleForm.domains.splice(index, 1)
            }
        },
        //下拉框取值,支持多选
        selectGet1(vId){
            let obj=[]
            for(let i in vId)
            {
                obj.push(this.options[vId[i]])
            }
            let obj1 = []
            for(let i in obj)
                obj1[i] = this.options1[obj[i].value]
            this.obj1 = obj1;
        },
        selectGet2(vId,index){
            if(index === "Follow")
            {
                this.obj2 = []
                for(let i in vId)
                    this.obj2[i] = this.options1[vId[i]]
            }
            if(index === "Tweets")
            {
                this.obj3 = []
                for(let i in vId)
                    this.obj3[i] = this.options1[vId[i]]
            }
        },
        //创建任务时向后台传送的数据
        submitAllForm() {
            console.log(this.options)
            //判断主机是否存在
            if(this.options.length==0)
            {
                this.$confirm('No host is available!', 'Sorry', {
                    distinguishCancelAndClose: true,
                    confirmButtonText: 'Continue',
                    cancelButtonText: 'Add the host'
                })
                    .then(() => {
                })
                .catch(action => {
                    this.$router.push({path:'/twitter/HostConfig'})
                });
            }
            //先验证合法性
            this.$refs.ruleForm2.validate((valid) => {
                if (valid) {
                    this.ruleForm2Valid = true
                    console.log("1")
                }
            })
            this.$refs.dynamicValidateForm.validate((valid) => {
                if (valid) {
                    this.dynamicValidateFormValid = true
                    console.log("2")
                }
            })
            this.$refs.ruleForm.validate((valid) => {
                if (valid) {
                    this.ruleFormValid = true
                    console.log("3")
                }
            })
            if(this.ruleForm2Valid && this.dynamicValidateFormValid && this.ruleFormValid) {
                //  alert("保存成功")
                var namedata = this.ruleForm2.taskname
                var startUsersdata = []
                var configdata = {}
                var hostMapdata = {}
                var hopcount
                var rate
                var userinfo = []
                for(var i=0;i<this.dynamicValidateForm.domains.length;i++)
                    startUsersdata.push(this.dynamicValidateForm.domains[i].value)
                // console.log(this.Filescontent)
                //若未输入账号，则读取文件中
                let k=0
                for(let i=0;i<startUsersdata.length;i++)
                    if(startUsersdata[i]==='')
                        k++
                if(k==startUsersdata.length)
                    startUsersdata = []
                //如果文件中含有账号，则读取输入加文件
                if(this.Filescontent!='')
                    startUsersdata = startUsersdata.concat(this.Filescontent)
                var FilescontentData=[]
                FilescontentData = this.Filescontent
                //判断是否删除了该文件,若是，则从数组里删除
                 if(this.removed==true)
                {
                    for(let i=0;i<FilescontentData.length;i++){
                        for(let j=0;j<startUsersdata.length;j++){
                            if(startUsersdata[j]== FilescontentData[i]){
                                startUsersdata.splice(j, 1);
                                j--;
                            }
                        }
                    }
                }
                this.removed=false
                // console.log(startUsersdata)
                hopcount = this.ruleForm.name1
                if(this.radio==='Adaptive(1 times/minute)')
                    rate = '1'
                else
                    rate = this.ruleForm.name2
                // console.log(hopcount)
                // console.log(rate)
                configdata.sleep = rate
                configdata.followHop = hopcount
                // console.log(configdata)
                if(this.obj1.length === 0)
                    this.obj1 = this.options1[0]
                hostMapdata.userinfo = this.obj1
                for(var i=0;i<this.checkedCities.length;i++){
                    if(this.checkedCities[i]==="Follow")
                    {
                        if(this.obj2.length === 0)
                            this.obj2 = this.options1[0]
                        hostMapdata.follow = this.obj2
                    }
                    if(this.checkedCities[i]==="Tweets")
                    {
                        if(this.obj3.length === 0)
                            this.obj3 = this.options1[0]
                        hostMapdata.tweets = this.obj3
                    }
                    // if(this.checkedCities[i]==="Like")
                    // {
                    //     if(this.obj4.length === 0)
                    //         this.obj4 = this.options1[0]
                    //     hostMapdata.like = this.obj4
                    // }
                    // if(this.checkedCities[i]==="Comment")
                    // {
                    //     if(this.obj5.length === 0)
                    //         this.obj5 = this.options1[0]
                    //     hostMapdata.comments = this.obj5
                    // }
                }
                //周期性任务和自启性任务数据（新加）
                var periodtype
                if(this.ruleForm.PeriodEnable === 'false')
                    periodtype = 0
                else
                    periodtype = 1
                var periodicTimedata = null
                if(this.ruleForm.Period!='')
                    periodicTimedata = parseInt(this.ruleForm.Period)
                var worktimeenabledata
                if(this.ruleForm.WorkTimeEnable === 'false')
                    worktimeenabledata = false
                else
                    worktimeenabledata = true
                var worktimerangedata1 = []  
                var worktimerangedata2 = [] 
                var worktimerangedata = []
                for(var i=0;i<this.ruleForm.domains.length;i++)
                {
                    worktimerangedata1.push(this.ruleForm.domains[i].date1)
                    worktimerangedata2.push(this.ruleForm.domains[i].date2)
                }
                for(var i=0;i<worktimerangedata1.length&&i<worktimerangedata2.length;i++)
                    worktimerangedata.push(worktimerangedata1[i]+"/"+worktimerangedata2[i])
                console.log(worktimerangedata)
                //新建任务
                var Params = {
                    name : namedata,
                    startUsers : startUsersdata,
                    config : configdata,
                    hostMap : hostMapdata,
                    type : periodtype,
                    periodicTime : periodicTimedata,
                    workTimeEnable : worktimeenabledata,
                    timeZone : this.ruleForm.TimeZone,
                    workTimeRange : worktimerangedata
                }
                console.log(Params)
                this.$ajax({
                    url: '/two/twitter/job/create',
                    method: 'post',
                    contentType: "application/json; charset=utf-8",
                    data: Params
                }).then( res => {
                    if(periodtype==0)
                        this.WheatherToWorkStatus();
                    else
                        this.WheatherToPeriodWorkStatus();
                    this.$message({
                        type: 'success',
                        message: 'Submitted successfully' 
                    });
                }).catch( error => {
                    this.$message.error('The creation task failed. Please check if it is filled out.');
                    console.log()
                })  
                this.reload();   
            }
            else {
                newtask.scrollIntoView();
                this.$message.error('Please check your input');
            }
        },
        resetForm() {
            this.reload();   
        },
        WheatherToWorkStatus() {
            this.$confirm('Submitted successfully', 'Task Creation Successful', {
                distinguishCancelAndClose: true,
                confirmButtonText: 'Continue',
                cancelButtonText: 'To WorkStatus'
            })
                .then(() => {
            })
            .catch(action => {
                this.$router.push({path:'/twitter/WorkStation'})
            });
        },
        WheatherToPeriodWorkStatus() {
            this.$confirm('Submitted successfully', 'Task Creation Successful', {
                distinguishCancelAndClose: true,
                confirmButtonText: 'Continue',
                cancelButtonText: 'To PeriodWorkStatus'
            })
                .then(() => {
            })
            .catch(action => {
                this.$router.push({path:'/twitter/PeriodWorkStation'})
            });
        }
    }
}
</script>

<style lang="scss" scoped>
#newtask {
    min-width: 1000px;
    height:100%;
    .fa-pencil-square-o{
        color: #009ACD;
        font-size: 30px;
        float: left;
        margin-left: 30px;
        margin-top:30px;
    }
    h1{
        font-size: 25px;
        padding-left: 0px;
        margin: 30px;
        float:left;
    }
    .box-card {
        width:95%;
        margin-left:30px;
        background: white;
        padding: 30px;
        padding-bottom: 0px;
        margin-bottom: 20px;
    }
    .el-form-item {
        text-align: left;
    }
    .demo-dynamic {
        border-bottom: dashed 1px rgba(43, 41, 41, 0.1);
    }
    .button2 .el-button {
        background: #2E8B57;
        color: white !important;
        float: right;
        margin-right: 30px !important;
        margin: 0px;
        margin-bottom:20px;
    }
    .el-upload {
        float:right;
    }
    .el-checkbox {
        clear:both;
        position: relative;
        display: inline;
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
        margin-left:-80px;
        border:1px solid rgb(240, 233, 233);
    }
}
</style>

<style>
.el-upload-dragger {
    border:1px dashed #d9d9d9;
    height:160px;
    width:300px;
}
.el-upload__input {
    visibility:hidden !important; 
    position: absolute;
}
.clearfix:before,
.clearfix:after {
    display: table;
    content: "";
}
.clearfix:after {
    clear: both
}
.el-input__suffix {
    right: 0px;
}
.spical_elform .el-form-item__error {
    top:70%;
}
</style>