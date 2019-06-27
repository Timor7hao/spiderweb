<template>
    <div id="Search">
        <i class="fa fa-search"></i>
        <h1 style="font-family:sans-serif">Search</h1>
        <el-card style="width:99%">
        <el-tabs style="padding:15px">
            <el-tab-pane label="Conditional-Search">

        <el-card class="box-card">
            <h3>Basic Search</h3>
            <el-form :model="dynamicValidateForm" ref="dynamicValidateForm" class="demo-dynamic">
                <el-form-item prop="enter">
                    <el-col :span="1">&nbsp;</el-col>
                    <el-col :span="14">
                        <el-input v-model="formInline[0].value">
                            <el-button slot="suffix" icon="el-icon-error" @click="deleteForm"></el-button>
                        </el-input>
                    </el-col>
                    <el-col :span="5">
                        <el-select v-model="formInline[0].field" placeholder="choose">
                            <el-option
                                v-for="item in searchTypes"
                                :key="item.key"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                            <div slot="empty" style="padding:10px;">NO DATA</div>
                        </el-select>
                    </el-col>
                </el-form-item>

                <el-form-item 
                    v-for="(domain, index) in dynamicValidateForm.domains"
                    :prop="'domains.' + index + '.value'"
                    :key="index">
                    <el-col :span="1">&nbsp;</el-col>
                    <el-col :span="2">
                        <el-select v-model="domain.relation1" placeholder="choose" empty-text="NO DATA">
                            <el-option label="AND" value="and"></el-option>
                            <el-option label="OR" value="or"></el-option>
                            <div slot="empty" style="padding:10px;">NO DATA</div>
                        </el-select>
                    </el-col>
                    <el-col :span="12">
                        <el-input style="padding-left:6%;" v-model="domain.value">
                            <el-button slot="suffix" icon="el-icon-error" @click="domain.value=''"></el-button>
                        </el-input>
                    </el-col>
                    <el-col :span="5">
                        <el-select v-model="domain.relation2" placeholder="choose">
                            <el-option
                            v-for="item in searchTypes"
                            :key="item.key"
                            :label="item.label"
                            :value="item.value"></el-option>
                            <div slot="empty" style="padding:10px;">NO DATA</div>
                        </el-select>
                    </el-col>
                    <el-button  @click.prevent="removeDomain(domain)" type="danger" icon="el-icon-delete" style="margin-right:20px;" circle></el-button>
                </el-form-item>

                <el-form-item style="text-align: right">
                    <el-button @click="addDomain(dynamicValidateForm.domains)" type="text" style="margin-right:260px;">+ AddLine</el-button>
                </el-form-item>
                
                <h3>Time search</h3>
                <el-form-item
                    v-for="(domain, index) in dynamicValidateForm.domains2"
                    :prop="'domains2.' + index + '.value'"
                    :key="domain.key">
                    <el-col :span="1">&nbsp;</el-col>
                    <el-col :span="2">
                        <el-select v-model="domain.relation3" placeholder="choose">
                            <el-option label="AND" value="and"></el-option>
                            <el-option label="OR" value="or"></el-option>
                            <div slot="empty" style="padding:10px;">NO DATA</div>
                        </el-select>
                    </el-col>
                    <el-col :span="3">
                        <el-select v-model="domain.timeselect" style="padding-left:35px" placeholder="choose">
                            <el-option label="InsertStamp" value="inserttimestampInt"></el-option>
                            <el-option label="TimeStamp" value="timestampInt"></el-option>
                            <div slot="empty" style="padding:10px;">NO DATA</div>
                        </el-select>
                    </el-col>
                    <el-col :span="1">&nbsp;</el-col>
                    <el-col :span="6" style="margin-left:-20px">
                        <el-date-picker type="date" placeholder="start date" v-model="domain.date1" style="width: 60%;float:left" format="yyyy-MM-dd" value-format="yyyy-MM-dd"></el-date-picker>
                        <el-time-picker placeholder="time" v-model="domain.date2" style="width: 40%;" format="HH:mm" value-format="HH:mm"></el-time-picker>
                    </el-col>
                    <el-col class="line" :span="1">-</el-col>
                    <el-col :span="6">
                        <el-date-picker type="date" placeholder="end date" v-model="domain.date3" style="width: 60%;float:left" format="yyyy-MM-dd" value-format="yyyy-MM-dd"></el-date-picker>
                        <el-time-picker placeholder="time" v-model="domain.date4" style="width: 40%;" format="HH:mm" value-format="HH:mm"></el-time-picker>
                    </el-col>
                    <el-button  @click.prevent="removeDomain2(domain)" type="danger" icon="el-icon-delete" style="margin-right:0px;" circle></el-button>
                </el-form-item>

                <el-form-item style="text-align: right">
                    <el-button @click="addDomain2(dynamicValidateForm.domains2)" type="text" style="margin-right:50px;">+ AddLine</el-button>
                    <el-button class="ripple" @click="resetForm('dynamicValidateForm')" style="border:1px solid #e0e0e0">Reset</el-button>
                    <el-button class="ripple" type="primary" @click="SearchList" style="margin-right:20px;background: #2E8B57">Search</el-button>
                </el-form-item>
            </el-form>
        </el-card>
        
        <el-card class="box-card">
            <h3>Search Result</h3>
            <el-tabs type="border-card">
                <el-tab-pane>
                    <span slot="label"><i class="el-icon-date"></i> UserInfo</span>
                    <el-table id="tableData1" :data="tableData1" stripe style="width: 100%" height="500" border empty-text="NO DATA">
                        <el-table-column prop="#" label="#" width="50" type="index" fixed></el-table-column>
                        <el-table-column prop="user_id" label="user_id" width="180" fixed></el-table-column>
                        <el-table-column prop="nick_name" label="nick_name" width="120"></el-table-column>
                        <!-- <el-table-column label="avatar" width="150">
                            <template slot-scope="scope">
                                <el-popover
                                    placement="right"
                                    trigger="hover">
                                    <img v-if="scope.row" :src="getAvatar(scope.row)" width=100% height=100%>
                                    <img slot="reference" :src="getAvatar(scope.row)" :alt="getAvatar(scope.row)" width=100% height=100%>
                                </el-popover>
                            </template>
                        </el-table-column> -->
                        <el-table-column prop="img_url" label="img_url" width="700"></el-table-column>
                        <el-table-column prop="verified" label="verified" width="120"></el-table-column>
                        <el-table-column prop="screen_name" label="screen_name" width="180"></el-table-column>
                        <el-table-column prop="desc" label="desc" width="400"></el-table-column>
                        <el-table-column prop="location" label="location" width="200"></el-table-column>
                        <el-table-column prop="site" label="site" width="300"></el-table-column>
                        <el-table-column prop="join_date" label="join_date" width="200"></el-table-column>
                        <el-table-column prop="tweets" label="tweets" width="120"></el-table-column>
                        <el-table-column prop="following" label="following" width="120"></el-table-column>
                        <el-table-column prop="followers" label="followers" width="120"></el-table-column>
                        <el-table-column prop="favorites" label="favorites" width="120"></el-table-column>
                        <el-table-column prop="lists" label="lists" width="120"></el-table-column>
                        <el-table-column prop="timestamp" label="timestamp" width="200"></el-table-column>
                    </el-table>
                </el-tab-pane>
                <el-tab-pane label="Follow">
                    <el-table id="tableData2" :data="tableData2" stripe style="width: 100%" height="500" border empty-text="NO DATA">
                        <el-table-column prop="#" label="#" width="50" type="index" fixed></el-table-column>
                        <el-table-column prop="user_id" label="user_id" width="180" fixed></el-table-column>
                        <el-table-column prop="screen_name" label="screen_name" width="200"></el-table-column>
                        <el-table-column prop="fan_id" label="fan_id" width="180"></el-table-column>
                        <el-table-column prop="fan_url" label="fan_url" width="400"></el-table-column>
                        <el-table-column prop="fan_screen_name" label="fan_screen_name" width="200"></el-table-column>
                        <el-table-column prop="timestamp" label="timestamp" width="200"></el-table-column>
                    </el-table>
                </el-tab-pane>
                <el-tab-pane label="Tweets">
                    <el-table id="tableData3" :data="tableData3" stripe style="width: 100%" height="500" border empty-text="NO DATA">
                        <el-table-column prop="#" label="#" width="50" type="index" fixed></el-table-column>
                        <el-table-column prop="user_id" label="user_id" width="180" fixed></el-table-column>
                        <el-table-column prop="screen_name" label="screen_name" width="180"></el-table-column>
                        <el-table-column prop="textMute" label="textMute" width="120"></el-table-column>
                        <el-table-column prop="itemId" label="itemId" width="200"></el-table-column>
                        <el-table-column prop="timestamp" label="timestamp" width="200"></el-table-column>
                        <el-table-column prop="textStr" label="textStr" width="500"></el-table-column>
                        <el-table-column prop="links" label="links" width="200"></el-table-column>
                        <el-table-column prop="imgs" label="imgs" width="300"></el-table-column>
                        <el-table-column prop="retweet" label="retweet" width="120"></el-table-column>
                        <el-table-column prop="favorite" label="favorite" width="120"></el-table-column>
                        <el-table-column prop="retweetFromScreenName" label="retweetFromScreenName" width="180"></el-table-column>
                        <el-table-column prop="retweetFromUserId" label="retweetFromUserId" width="180"></el-table-column>
                        <el-table-column prop="ats" label="ats" width="120"></el-table-column>
                        <el-table-column prop="retweetId" label="retweetId" width="120"></el-table-column>
                        <el-table-column prop="inserttimestamp" label="inserttimestamp" width="200"></el-table-column>
                    </el-table>
                </el-tab-pane>
            </el-tabs>
            <el-button class="ripple" type="primary" @click="ExportList" style="float:right;margin:15px;background: #2E8B57">Export</el-button>
        </el-card>

        <el-dialog
            title="NOTICE"
            :visible.sync="ExportDialogVisible"
            width="33%"
            center
            style="margin-bottom:100px;padding-top:150px;">
            <span>You are about to export the data for this table.</span>
            <span>Please select the format you want to export:</span>
            <span slot="footer" class="dialog-footer">
                <el-button class="ripple" type="primary" @click="ExportDialogVisible = false;Export1()" style="background: #2E8B57">JSON</el-button>
                <el-button class="ripple" type="primary" @click="ExportDialogVisible = false;Export2()" style="background: #2E8B57">CSV</el-button>
                <el-button class="ripple" type="primary" @click="ExportDialogVisible = false;Export3()" style="background: #2E8B57">XLSX</el-button>
                <el-button @click="ExportDialogVisible = false">Cancel</el-button>
            </span>
        </el-dialog>

        </el-tab-pane>
        <el-tab-pane label="CommonFollow-Search" name="second">
            <el-card class="box-card">
                <h3>Common Follow Search</h3>
                &nbsp;
                <el-form class="demo-dynamic" :model="ruleForm2" ref="ruleForm2">
                    <el-col :span="1">&nbsp;</el-col>
                    <el-col :span="23">
                        <el-form-item label="CollectionName：" prop="num">
                            <el-select v-model="ruleForm2.value" @change="selectGet" filterable placeholder="Please select a collection" style="width:260px;float:left">
                                <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value" >
                                </el-option>
                                <div slot="empty" style="padding:10px;">NO DATA</div>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="ScreenName1: ">
                            <el-input v-model="ruleForm2.screenname1" style="width:240px;float:left;padding-left:23px"></el-input>
                        </el-form-item>
                        <el-form-item label="ScreenName2: ">
                            <el-input v-model="ruleForm2.screenname2" style="width:240px;float:left;padding-left:23px"></el-input>
                        </el-form-item>
                        <el-form-item style="text-align: right">
                            <el-button class="ripple" @click="ruleForm2.value='';ruleForm2.screenname1='';ruleForm2.screenname2=''" style="border:1px solid #e0e0e0">Reset</el-button>
                            <el-button class="ripple" type="primary" @click="SearchCommonFollow()" style="margin-right:20px;background: #2E8B57">Search</el-button>
                        </el-form-item>
                    </el-col>
                    <!-- <el-col :span="15">&nbsp;</el-col> -->
                </el-form>
            </el-card> 
            <el-card class="box-card">
                <h3>Search Result</h3>
                <el-table id="tableData6" :data="tableData6" stripe style="width: 100%" height="500" border empty-text="NO DATA">
                    <el-table-column prop="#" label="#" width="50" type="index" fixed></el-table-column>
                    <el-table-column prop="user_id" label="user_id" width="180" fixed></el-table-column>
                    <el-table-column prop="screen_name" label="screen_name" width="200"></el-table-column>
                    <el-table-column prop="fan_id" label="fan_id" width="180"></el-table-column>
                    <el-table-column prop="fan_url" label="fan_url" width="400"></el-table-column>
                    <el-table-column prop="fan_screen_name" label="fan_screen_name" width="200"></el-table-column>
                    <el-table-column prop="timestamp" label="timestamp" width="200"></el-table-column>
                </el-table>
            </el-card> 
            <el-button class="ripple" type="primary" @click="ExportList2" style="float:right;margin:15px;margin-right:80px;background: #2E8B57">Export</el-button>  
        </el-tab-pane>

        <el-dialog
            title="NOTICE"
            :visible.sync="ExportDialogVisible2"
            width="33%"
            center
            style="margin-bottom:100px;padding-top:150px;">
            <span>You are about to export the data for this table.</span>
            <span>Please select the format you want to export:</span>
            <span slot="footer" class="dialog-footer">
                <el-button class="ripple" type="primary" @click="ExportDialogVisible2 = false;CommonFollowExport1()" style="background: #2E8B57">JSON</el-button>
                <el-button class="ripple" type="primary" @click="ExportDialogVisible2 = false;CommonFollowExport2()" style="background: #2E8B57">CSV</el-button>
                <el-button class="ripple" type="primary" @click="ExportDialogVisible2 = false;CommonFollowExport3()" style="background: #2E8B57">XLSX</el-button>
                <el-button @click="ExportDialogVisible2 = false">Cancel</el-button>
            </span>
        </el-dialog>
    </el-tabs>
    </el-card>
    </div>
</template>

<script>
import FileSaver from "file-saver"
import XLSX from "xlsx"
export default {
    name: 'Search',
    inject:['reload'],
    data() {
        return {
        //固定行
        formInline: [{
            field: 'user_id',
            value: '',
            type: 5
        }],
        //动态行
        dynamicValidateForm: {
            domains: [{
                relation1: 'and',
                value: '',
                relation2: 'user_id'
            }],
            domains2: [{
                relation3: 'and',
                timeselect: 'timestampInt',
                date1: '',
                date2: '',
                date3: '',
                date4: ''
            }]
        },
        searchTypes: [
            { label: 'UserId', value: 'user_id'},
            { label: 'ScreenName', value: 'screen_name'},
            { label: 'NickName', value: 'nick_name'},
            { label: 'Location', value: 'location'},
            { label: 'Description', value: 'desc'},
            { label: 'FanId', value: 'fan_id'},
            { label: 'FanScreenName', value: 'fan_screen_name'},
            { label: 'RetweetFromUserId', value: 'retweetFromUserId'},
            { label: 'RetweetFromScreenName', value: 'retweetFromScreenName'},
        ],
        //传输json至后台交互
        searchData: { 
            list: [],
            andOr: '',
            collectionName:''
        },
        //查询数据库成功得到的表返回数据
        tableData1: [],
        tableData2: [],
        tableData3: [],
        tableData4: [],
        tableData5: [],
        //放置头像图片数据
        picture: [],   
        //导出数据的提示框
        ExportDialogVisible: false,
        ExportDialogVisible2: false,
        //各表格的json数据串
        tableData1_jsondata: [],
        tableData2_jsondata: [],
        tableData3_jsondata: [],
        tableData6_jsondata: [],
        //以下为查询共同好友所用到参数
        //下拉框取值
        options: [],
        value: '',
        ruleForm2: {
            value:'',
            screenname1: '',
            screenname2: ''
        },
        collectionName2: '',
        tableData6: []
      }
    },
    mounted () {
        this.$nextTick( function(){
            this.getTaskIDList(1)
            // if(this.tableData1.length!=0)
            //     this.getPicture(1)
        })
    },
    methods: {
        // getPicture(){
        //     console.log("hah")
        //     var Params = {
        //         id: this.tableData1.id
        //     }
        //     this.$ajax({
        //         url: '/api/img/pictures',
        //         method: 'get',
        //         contentType: "application/json; charset=utf-8",
        //         params: Params
        //     }).then( res => {
        //         this.picture = res.data.data
        //     }).catch( error => {
        //         console.log()
        //     })
        // },
        // getAvatar(row) {
        // for(var i=0;i<this.picture.length;i++)
        //     if(this.picture[i].indexOf(row.user_id)!=-1)
        //         return this.picture[i]
        // },
        SearchList() {
            //List数组的构建
            var _this = this
            var data = [];
            var k = 0;
            var c = 0;
            var dos =  _this.dynamicValidateForm.domains;
            var dos2 = _this.dynamicValidateForm.domains2;
            if(_this.formInline[0].value != '')
                data.push(_this.formInline);
            else 
                k--;
            //判断若全部为and,则主体为and查询,传递的andOr为0,只要有1个or,则主体为or查询
            for(let i=0; i<dos.length; i++){
                if(dos[i].relation1 == "and")
                    c++;
            }
            for(let j=0;j<dos2.length;j++){
                if(dos2[j].relation3 == "and")
                    c++;
            }
            if(c == dos.length+dos2.length) _this.searchData.andOr = 0;
            else _this.searchData.andOr = 1;
            console.log(_this.searchData.andOr)
            //basic search中数据
            for(let i=0; i<dos.length; i++){
                let item = {
                    field: dos[i].relation2,
                    value: dos[i].value,
                    type: 5 
                };
                if(item.value!=''){
                    if(_this.searchData.andOr == 0 || dos[i].relation1 == "or") {
                        data.push([]);
                        k++;
                    }
                    data[k].push(item);
                }
            }
            console.log(data)
            //time search中的数据
            for(let i=0; i<dos2.length; i++){
                var startdata = dos2[i].date1+' '+dos2[i].date2
                var startseconds = new Date(startdata).getTime()
                let item2 = {
                    field: dos2[i].timeselect,
                    value: startseconds,
                    type: 3 
                };
                if(dos2[i].date1!=''&&dos2[i].date2!=''&&startseconds!=null){    //为空时不读
                    if(_this.searchData.andOr == 0 || dos2[i].relation3 == "or") {
                        data.push([]);
                        k++;
                    }
                    data[k].push(item2);
                }
            }
            for(let i=0; i<dos2.length; i++){
                var enddata = dos2[i].date3+' '+dos2[i].date4
                var endseconds = new Date(enddata).getTime()
                let item3 = {
                    field: dos2[i].timeselect,
                    value: endseconds,
                    type: 4
                };
                console.log(item3)
                if(dos2[i].date3!=''&&dos2[i].date4!=''&&endseconds!=null){   //为空时不读
                    if(_this.searchData.andOr == 0 || dos2[i].relation3 == "or") {
                        data.push([]);
                        k++;
                    }
                    data[k].push(item3);
                }
            }
            console.log(data)
            for(var i=0;i<data.length;i++)
            {
                console.log(data[i][0].value)
                if(isNaN(data[i][0].value)&&typeof(data[i][0].value)!='string')
                {
                    console.log("hahah")
                    data.splice(i,1)
                    i=i-1;
                }
            }
            console.log(data)
            _this.searchData.list = data;

            //之前写的List数组的构建
            // var _this = this
            // console.log(_this.dynamicValidateForm.domains)
            // console.log(_this.dynamicValidateForm.domains2)
            // var data = [];
            // var k = 0;
            // var c = 0;
            // var dos = _this.dynamicValidateForm.domains;
            // data.push(_this.formInline);
            // console.log(data)
            // for(let i=0; i<dos.length; i++){
            //     if(dos[i].relation1 == "and")
            //         c++;
            // }
            // if(c == dos.length) _this.searchData.andOr = 0;
            // else _this.searchData.andOr = 1;
            // for(let i=0; i<dos.length; i++){
            //     let item = {
            //         field: dos[i].relation2,
            //         value: dos[i].value,
            //         type: 5 
            //     };
            //     if(_this.searchData.andOr == 0 || dos[i].relation1 == "or") {
            //         data.push([]);
            //         k++;
            //     }
            //     data[k].push(item);
            // }
            // _this.searchData.list = data;
            
            //读取数据库中所有的表，循环查数据
            var collectiondata1 = []    //userinfo的表
            var collectiondata2 = []    //follow的表  
            var collectiondata3 = []    //tweets的表
            var Params = {}
            this.$ajax({
                url: '/two/twitter/db/getCollections',
                method: 'get',
                contentType: "application/json; charset=utf-8",
                params: Params
            }).then( res => {
                for(let i=0;i<res.data.data.length;i++)
                {
                    if(res.data.data[i]=="facebook_userinfo")
                        collectiondata1.push(res.data.data[i])
                    if(res.data.data[i]=="facebook_follow")
                        collectiondata2.push(res.data.data[i])
                    if(res.data.data[i]=="facebook_tweets")
                        collectiondata3.push(res.data.data[i])
                }
                //userinfo的表
                _this.tableData1 = []
                var json = []
                for(let i=0;i<collectiondata1.length;i++){
                    var obj = {}
                    obj.list = _this.searchData.list
                    obj.andOr = _this.searchData.andOr
                    obj.collectionName = collectiondata1[i];
                    var Params = obj
                    this.$ajax({
                        url: '/two/twitter/db/field_query',
                        method: 'post',
                        contentType: "application/json; charset=utf-8",
                        data: Params
                    }).then( res => {
                        json=json.concat(res.data.data)
                        _this.tableData1_jsondata=json
                        for(let i=0;i<res.data.data.length;i++)
                            _this.tableData1.push(res.data.data[i])
                        //判断布尔型verified，转换成字符串显示
                        for(var i=0;i<_this.tableData1.length;i++)
                            if(_this.tableData1[i].verified)
                                _this.tableData1[i].verified="true";
                            else
                                _this.tableData1[i].verified="false";
                    }).catch( error => {
                        console.log()
                    })
                }
                //follow的表
                _this.tableData2 = []
                var json2 = []
                for(let i=0;i<collectiondata2.length;i++){
                    var obj = {}
                    obj.list = _this.searchData.list
                    obj.andOr = _this.searchData.andOr
                    obj.collectionName = collectiondata2[i];
                    var Params = obj
                    this.$ajax({
                        url: '/two/twitter/db/field_query',
                        method: 'post',
                        contentType: "application/json; charset=utf-8",
                        data: Params
                    }).then( res => {
                        json2=json2.concat(res.data.data)
                        _this.tableData2_jsondata=json2
                        for(let i=0;i<res.data.data.length;i++)
                            _this.tableData2.push(res.data.data[i])
                    }).catch( error => {
                        console.log()
                    })
                }
                //tweets的表
                _this.tableData3 = []
                var json3 = []
                for(let i=0;i<collectiondata3.length;i++){
                    var obj = {}
                    obj.list = _this.searchData.list
                    obj.andOr = _this.searchData.andOr
                    obj.collectionName = collectiondata3[i];
                    var Params = obj
                    this.$ajax({
                        url: '/two/twitter/db/field_query',
                        method: 'post',
                        contentType: "application/json; charset=utf-8",
                        data: Params
                    }).then( res => {
                        json3=json3.concat(res.data.data)
                        _this.tableData3_jsondata=json3
                        for(let i=0;i<res.data.data.length;i++)
                            _this.tableData3.push(res.data.data[i])
                        //判断布尔型textMute，转换成字符串显示
                        for(var i=0;i<this.tableData3.length;i++)
                            if(this.tableData3[i].textMute)
                                this.tableData3[i].textMute="true";
                            else
                                this.tableData3[i].textMute="false";
                    }).catch( error => {
                        console.log()
                    })
                }
            }).catch( error => {
                console.log()
            })
        },
        //Basic Search
        deleteForm() {
            this.formInline[0].value="";
        },
        addDomain(data) {
            if(data.length<4){
                this.dynamicValidateForm.domains.push({
                    value: '',
                    relation1: "and",
                    relation2: "user_id"
                });
            }
        },
        removeDomain(item) {
            var index = this.dynamicValidateForm.domains.indexOf(item)
            if (index !== -1) {
                this.dynamicValidateForm.domains.splice(index, 1)
            }
        },
        //Time Search
        addDomain2(data) {
            if(data.length<3){
                this.dynamicValidateForm.domains2.push({
                    value: '',
                    relation3: "and",
                    key: Date.now()
                });
            }
        },
        removeDomain2(item) {
            var index = this.dynamicValidateForm.domains2.indexOf(item)
            if (index !== -1) {
                this.dynamicValidateForm.domains2.splice(index, 1)
            }
        },
        resetForm(formName) {
            this.reload();  
        },

        //以下为查找共同好友模块
        //获取数据库中各表名
        getTaskIDList(){
            var _this = this
            var Params = {}
            this.$ajax({
                url: '/two/twitter/db/getCollections',
                method: 'get',
                contentType: "application/json; charset=utf-8",
                params: Params
            }).then( res => {
                for(var i=0;i<res.data.data.length;i++)
                {
                    if(res.data.data[i].indexOf("follow")>0)
                    {
                        var model = res.data.data[i];
                        var item = {};
                        item.id =  model;
                        item.value = model;
                        _this.options.push(item);
                    }
                }
                // console.log(_this.options)
            }).catch( error => {
                console.log()
            })
        },
        //下拉框取值
        selectGet(vId){
            console.log(vId)
            this.collectionName2 = vId;
        },
        //查询共同粉丝
        SearchCommonFollow()
        {
            console.log(this.collectionName2)
            console.log(this.ruleForm2.screenname1)
            console.log(this.ruleForm2.screenname2)
            var params = {
                collectionName: this.collectionName2,
                name1: this.ruleForm2.screenname1,
                name2: this.ruleForm2.screenname2
            }
            this.$ajax({
                url: '/two/twitter/db/commonFollow',
                method: 'get',
                contentType: "application/json; charset=utf-8",
                params: params
            }).then( res => {
                this.tableData6_jsondata = res.data.data
                this.tableData6 = res.data.data
            }).catch( error => {
                console.log()
            })
        },
        //导出查询的数据
        ExportList() {
            this.ExportDialogVisible = true;
        },
        //输出JSON格式数据下载
        Export1() {
            var blob = new Blob([JSON.stringify(this.tableData1_jsondata, null, 2)],{type:'application/json,charset=utf-8;'});
            saveAs(blob, "result_userinfo" + '.json');
            var blob = new Blob([JSON.stringify(this.tableData2_jsondata, null, 2)],{type:'application/json,charset=utf-8;'});
            saveAs(blob, "result_follow" + '.json');
            var blob = new Blob([JSON.stringify(this.tableData3_jsondata, null, 2)],{type:'application/json,charset=utf-8;'});
            saveAs(blob, "result_tweets" + '.json');
        },
        //输出CSV格式数据下载
        Export2() {
            //对应3个爬虫类型,输出3个csv文件,userinfo
            var fix = document.querySelector('.el-table__fixed');
            let table = document.querySelector("#tableData1").cloneNode(true);
            if(fix)
                var wb = XLSX.utils.table_to_book(table.removeChild(table.querySelector(".el-table__fixed")))
            else
                var wb = XLSX.utils.table_to_book(table)
            var wbout = XLSX.write(wb, { bookType: 'csv', bookSST: true, type: 'array' })
            try {
                FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), 'result_userinfo.csv')
            } catch (e) { 
                if (typeof console !== 'undefined') console.log(e, wbout) 
            }
            //follow
            let table2 = document.querySelector("#tableData2").cloneNode(true);
            if(fix)
                var wb = XLSX.utils.table_to_book(table2.removeChild(table2.querySelector(".el-table__fixed")))
            else
                var wb = XLSX.utils.table_to_book(table2)
            var wbout = XLSX.write(wb, { bookType: 'csv', bookSST: true, type: 'array' })
            try {
                FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), 'result_follow.csv')
            } catch (e) { 
                if (typeof console !== 'undefined') console.log(e, wbout) 
            }
            //tweets
            let table3 = document.querySelector("#tableData3").cloneNode(true);
            if(fix)
                var wb = XLSX.utils.table_to_book(table3.removeChild(table3.querySelector(".el-table__fixed")))
            else
                var wb = XLSX.utils.table_to_book(table3)
            var wbout = XLSX.write(wb, { bookType: 'csv', bookSST: true, type: 'array' })
            try {
                FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), 'result_tweets.csv')
            } catch (e) { 
                if (typeof console !== 'undefined') console.log(e, wbout) 
            }
        },
        //输出XLSX格式数据下载
        Export3() {
            //workbook拥有3个sheet,分别对应3个爬虫类型
            var fix = document.querySelector('.el-table__fixed');
            var workbook = XLSX.utils.book_new();
            if(fix){
                let table = document.querySelector("#tableData1").cloneNode(true);
                var ws1 = XLSX.utils.table_to_sheet(table.removeChild(table.querySelector(".el-table__fixed")));
                XLSX.utils.book_append_sheet(workbook, ws1, "Sheet1");
                let table2 = document.querySelector("#tableData2").cloneNode(true);
                var ws2 = XLSX.utils.table_to_sheet(table2.removeChild(table2.querySelector(".el-table__fixed")));
                XLSX.utils.book_append_sheet(workbook, ws2, "Sheet2");
                let table3 = document.querySelector("#tableData3").cloneNode(true);
                var ws3 = XLSX.utils.table_to_sheet(table3.removeChild(table3.querySelector(".el-table__fixed")));
                XLSX.utils.book_append_sheet(workbook, ws3, "Sheet3");
            }
            else{
                var ws1 = XLSX.utils.table_to_sheet(document.querySelector("#tableData1"));
                XLSX.utils.book_append_sheet(workbook, ws1, "Sheet1");
                var ws2 = XLSX.utils.table_to_sheet(document.querySelector("#tableData2"));
                XLSX.utils.book_append_sheet(workbook, ws2, "Sheet2");
                var ws3 = XLSX.utils.table_to_sheet(document.querySelector("#tableData3"));
                XLSX.utils.book_append_sheet(workbook, ws3, "Sheet3");
            }
            var wbout = XLSX.write(workbook, {
                bookType: "xlsx",
                bookSST: true,
                type: "array"
            });
            try {
                FileSaver.saveAs(
                    new Blob([wbout], { type: "application/octet-stream" }),
                    "result.xlsx"
                );
            } catch (e) {
                if (typeof console !== "undefined") console.log(e, wbout);
            }
            return wbout;
        },

        //导出查询的共同粉丝的数据
        ExportList2() {
            this.ExportDialogVisible2 = true;
        },
        //输出JSON格式数据下载
        CommonFollowExport1() {
            var blob = new Blob([JSON.stringify(this.tableData6_jsondata, null, 2)],{type:'application/json,charset=utf-8;'});
            saveAs(blob, "commonfollow_result" + '.json');
        },
        //输出CSV格式数据下载
        CommonFollowExport2() {
            var fix = document.querySelector('.el-table__fixed');
            let table = document.querySelector("#tableData6").cloneNode(true);
            if(fix)
                var wb = XLSX.utils.table_to_book(table.removeChild(table.querySelector(".el-table__fixed")))
            else
                var wb = XLSX.utils.table_to_book(table)
            var wbout = XLSX.write(wb, { bookType: 'csv', bookSST: true, type: 'array' })
            try {
                FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), 'commonfollow_result.csv')
            } catch (e) { 
                if (typeof console !== 'undefined') console.log(e, wbout) 
            }
        },
        //输出XLSX格式数据下载
        CommonFollowExport3() {
            var fix = document.querySelector('.el-table__fixed');
            let table = document.querySelector("#tableData6").cloneNode(true);
            if(fix)
                var wb = XLSX.utils.table_to_book(table.removeChild(table.querySelector(".el-table__fixed")))
            else
                var wb = XLSX.utils.table_to_book(table)
            var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
            try {
                FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), 'commonfollow_result.xlsx')
            } catch (e) { 
                if (typeof console !== 'undefined') console.log(e, wbout) 
            }
        }
    }
}
</script>

<style lang="scss" scoped>
#Search {
    min-width: 1000px;
    height:100%;
    h1 {
        font-size: 25px;
        margin: 30px;
        padding-left: 0px;
        float:left;
    }
    .fa-search { 
        color: rgb(231, 73, 73) ;
        font-size: 30px;
        float: left;
        margin-left: 40px;
        margin-top: 28px;
    }
    .box-card {
        width:95%;
        margin-left:30px;
        background: white;
        padding: 20px;
        padding-bottom: 0px;
        margin-bottom: 20px;
        /* height: 500px; */
    }
    h3 {
        text-align: left;
        padding-left: 4%;
        padding-bottom: 20px;
    }
}
</style>
<style>
.el-input__suffix {
    right: 0px;
}
</style>
