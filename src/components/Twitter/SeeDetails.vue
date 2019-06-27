<template>
    <div id="SeeDetails">
        <i class="fa fa-wpforms"></i>
        <h1 style="font-family:sans-serif">SeeDetails</h1>
        <el-card class="box-card">
            <h3 style="text-align: left;padding-left:55px">Please choose the collection name in database :</h3>
            <br>
            <el-form class="demo-dynamic">
                <el-col :span="1">&nbsp;</el-col>
                <el-col :span="10">
                    <el-form-item label="CollectionName：" prop="num">
                        <el-select v-model="value1" @change="selectGet1" filterable placeholder="Please select a collection" style="width:260px">
                            <el-option
                                v-for="item in options1"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value" >
                            </el-option>
                            <div slot="empty" style="padding:10px;">NO DATA</div>
                        </el-select>
                    </el-form-item>
                </el-col>
                <div class="button2">
                    <el-button class="ripple" type="primary" @click="SearchList()" style="background: #2E8B57">Search</el-button>
                </div>
            </el-form>
            
        </el-card>
        <el-card class="box-card">
            <h3 style="text-align: left;padding-left:55px">Search Result</h3>
            <component :is='nowModel' ref="msg" v-bind:message="table"></component>
        </el-card>
    </div>
</template>

<script>
import TWResultUserinfo from '@/components/Twitter/tables/ResultUserinfo'
import TWResultFollow from '@/components/Twitter/tables/ResultFollow'
import TWResultTweets from '@/components/Twitter/tables/ResultTweets'
export default {
    name: 'SeeDetails',
    components: {
        'userinfo': TWResultUserinfo,
        'follow': TWResultFollow,
        'tweets': TWResultTweets,
    },
    data() {
        return {
            nowModel: 'userinfo',
            value1: '',
            value2: '',
            options1:[],  //存放下拉框中TaskId
            options2:[],  //存放下拉框中Spider
            collectionName: '',
            table: [],
            tableData1: [],   //userinfo的表
            tableData2: [],   //follow的表
            tableData3: [],   //tweets的表
            jobid:''      //供传到后面来查值
        }
    },
    mounted () {
        this.$nextTick( function(){
            this.getTaskIDList(1)
        })
    },
    methods: {
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
                    if(res.data.data[i]!="twitter_history"&&res.data.data[i]!="twitter_account")
                    {
                        var model = res.data.data[i];
                        var item = {};
                        item.id =  model;
                        item.value = model;
                        _this.options1.push(item);
                    }
                }
                console.log(_this.options1)
            }).catch( error => {
                console.log()
            })
        },
        //下拉框取值
        selectGet1(vId){
            console.log(vId)
            this.collectionName = vId;
        },
        //查询
        SearchList() {
            var _this = this
            //得到所选的表名的jobid,传到表里供查头像
            var str = []
            str = _this.collectionName.split('/')
            for(var i=0;i<str.length;i++)
                _this.jobid = str[1]
            console.log(_this.jobid)
            // var Params1 = {}
            // this.$ajax({
            //     url: '/api/db/getCollections',
            //     method: 'get',
            //     contentType: "application/json; charset=utf-8",
            //     params: Params1
            // }).then( res => {
            //     for(let i=0;i<res.data.data.length;i++)
            //     {
            //         if(res.data.data[i].indexOf(_this.selectId)>0&&res.data.data[i].indexOf(_this.selectSpider)>0)
            //             _this.collectionName = res.data.data[i];
            //         else continue
            //     }   
                // console.log(_this.collectionName)
                var Params2 = {
                    collectionName: _this.collectionName,
                }
                this.$ajax({
                    url: '/two/twitter/db/queryAll',
                    method: 'get',
                    contentType: "application/json; charset=utf-8",
                    params: Params2
                }).then( res => {
                    // console.log(res.data.data)
                    if(_this.collectionName.indexOf("userinfo")>0)
                    {
                        _this.tableData1 = res.data.data
                        _this.tableData1.id = _this.jobid
                        _this.nowModel = 'userinfo'
                        _this.table = _this.tableData1
                    }
                    if(_this.collectionName.indexOf("follow")>0){
                        _this.tableData2 = res.data.data
                        _this.tableData2.id = _this.jobid
                        _this.table = _this.tableData2
                        _this.nowModel = 'follow'
                    }
                    if(_this.collectionName.indexOf("tweets")>0){
                        _this.tableData3 = res.data.data
                        _this.tableData3.id = _this.jobid
                        _this.table = _this.tableData3
                        _this.nowModel = 'tweets'
                    }
                    // if(_this.collectionName.indexOf("comments")>0){
                    //     _this.tableData4 = res.data.data
                    //     _this.tableData4.id = _this.jobid
                    //     _this.table = _this.tableData4
                    //     _this.nowModel = 'comments'
                    // }
                    // if(_this.collectionName.indexOf("like")>0){
                    //     _this.tableData5 = res.data.data
                    //     _this.tableData5.id = _this.jobid
                    //     _this.table = _this.tableData5
                    //     _this.nowModel = 'like'
                    // }
                }).catch( error => {
                    console.log()
                })
            // }).catch( error => {
            //     console.log()
            // })
            //再写一遍起到双击的效果，代码需要优化
            // var _this = this
            // var Params1 = {}
            // this.$ajax({
            //     url: '/api/db/getCollections',
            //     method: 'get',
            //     contentType: "application/json; charset=utf-8",
            //     params: Params1
            // }).then( res => {
            //     for(let i=0;i<res.data.data.length;i++)
            //     {
            //         if(res.data.data[i].indexOf(_this.selectId)>0&&res.data.data[i].indexOf(_this.selectSpider)>0)
            //             _this.collectionName = res.data.data[i];
            //         else continue
            //     }   
                var Params2 = {
                    collectionName: _this.collectionName,
                }
                this.$ajax({
                    url: '/two/twitter/db/queryAll',
                    method: 'get',
                    contentType: "application/json; charset=utf-8",
                    params: Params2
                }).then( res => {
                    if(_this.collectionName.indexOf("userinfo")>0)
                    {
                        _this.tableData1 = res.data.data
                        _this.tableData1.id = _this.jobid
                        _this.nowModel = 'userinfo'
                        _this.table = _this.tableData1
                    }
                    if(_this.collectionName.indexOf("follow")>0){
                        _this.tableData2 = res.data.data
                        _this.tableData2.id = _this.jobid
                        _this.table = _this.tableData2
                        _this.nowModel = 'follow'
                    }
                    if(_this.collectionName.indexOf("tweets")>0){
                        _this.tableData3 = res.data.data
                        _this.tableData3.id = _this.jobid
                        _this.table = _this.tableData3
                        _this.nowModel = 'tweets'
                    }
                }).catch( error => {
                    console.log()
                })
            // }).catch( error => {
            //     console.log()
            // })
        }
    }
}
</script>

<style lang="scss" scoped>
#SeeDetails {
    min-width: 1000px;
    height:100%;
    h1 {
        font-size: 25px;
        margin: 30px;
        padding-left: 15px;
        float:left;
    }
    .fa-wpforms { 
        color: rgb(116, 53, 17);
        font-size: 30px;
        float: left;
        margin-left: 40px;
        margin-top: 28px;
    }
    .box-card {
        width:95%;
        margin-left:30px;
        background: white;
        padding: 30px;
        padding-bottom: 0px;
        margin-bottom: 20px;
        /* height: 750px; */
    }
    .demo-dynamic {
        /* border-bottom: dashed 1px rgba(43, 41, 41, 0.1); */
        padding-bottom: 55px;
    }
}
</style>