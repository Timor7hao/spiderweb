<template>
    <div id="OtherSearch">
        <i class="el-icon-more-outline"></i>
        <h1 style="font-family:sans-serif">OtherSearch</h1>
        <el-card class="box-card">
            <h3 style="text-align: left;padding-left:55px">Get the avatar of the seed user:</h3>
            <br>
            <el-form class="getAvatar">
                <el-col :span="1">&nbsp;</el-col>
                <el-col :span="8">
                    <el-form-item label="JobID：" prop="num">
                        <el-select v-model="value1" @change="selectGet1" allow-create filterable placeholder="Please select a job id" style="width:260px">
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
            <h3 style="text-align: left;padding-left:55px">Get common</h3>
            <input id="fileFolder" name="fileFolder" type="file" webkitdirectory directory /><span id="msg" style="color:#F00"></span>
            <button type="button" class="btn btn-primary" id="subButton" @click="commit()">Submit</button>

        </el-card>
    </div>
</template>

<script>
export default {
    name: 'OtherSearch',
    data() {
        return {
            value1: '',
            // value2: '',
            options1:[],  //存放下拉框中TaskId
            // options2:[],  //存放下拉框中Spider
            chooseID: '',
            id : ''
        }
    },
    mounted () {
        // this.$nextTick( function(){
        //     this.getTaskIDList(1)
        // }),
        // this.$nextTick( function(){
        //     // this.downs(1)
        // })
    },
    methods: {
        
        //获取job/list中的id
        getTaskIDList(){
            var _this = this
            var Params = {}
            this.$ajax({
                url: '/api/job/list',
                method: 'get',
                contentType: "application/json; charset=utf-8",
                params: Params
            }).then( res => {
                let obj = []
                for(var i=0;i<res.data.data.length;i++){
                    var model = res.data.data[i];
                    var item = {};
                    item.id =  model.id;
                    item.value = model.id;
                    _this.options1.push(item);
                }
                // console.log(_this.options1)
            }).catch( error => {
                console.log()
            })
        },
        //下拉框取值
        selectGet1(vId){
            console.log(vId)
            this.chooseID = vId;
        },
        //查询
        SearchList() {
            var _this = this
            var Params = {
                id: _this.chooseID,
            }
            this.$ajax({
                url: '/api/img/pictures',
                method: 'get',
                contentType: "application/json; charset=utf-8",
                params: Params
            }).then( res => {
                console.log(res.data.data)
                // window.open("http://47.103.8.63:8081/images/8000/100000447512907.jpg", '_blank'); 
                // windows.open="http://47.103.8.63:8081/images/8000/100000447512907.jpg"
                for(var i=0;i<res.data.data.length;i++)
                //     window.location.href=res.data.data[i];
                    window.open(res.data.data[i],'_blank')
            }).catch( error => {
                console.log()
            })
        },
        
        commit(){
	//判断是否选中文件夹
	// var file=$("#fileFolder").val();
	// if(file==''){
	// 	$("#msg").text('请选择要上传的文件夹');
	// 	return;
	// }
	
    var oInput=document.getElementById("fileFolder");
    console.log(oInput.value)
	
    // $("#fileUploadForm").submit();

}



// document.getElementById('fileFolder').onchange = function(e) {
	
// 	//判断是否选中文件
// 	  var file=$("#fileFolder").val();
// 	  if(file!=''){
// 		  $("#msg").text('');
// 	  }
//  	  var files = e.target.files; // FileList
//  	  //文件数量
//  	  actual_filesCount = files.length;
//  	  if(actual_filesCount > filesCount){
//  		 $("#msg").text("文件过多，单次最多可上传"+filesCount+"个文件");
//  		 return;
//  	  }
//  	  for (var i = 0, f; f = files[i]; ++i){
//  		  actual_filesSize += f.size;
//  		  if(actual_filesSize > filesSize){
//  			 $("#msg").text("单次文件夹上传不能超过"+filesSize/1024/1024+"M");
//  			 return;
//  		  }
//  	  }
//  	};

        }
    }
</script>

<style>
#OtherSearch {
    height: 610px;
    overflow-y: auto;
}

#OtherSearch h1 {
    font-size: 25px;
    margin: 30px;
    margin-left: 10px !important;
    font-family: YouYuan;
}

#OtherSearch .el-icon-more-outline { 
    color:  rgb(104, 121, 10);
    font-size: 30px;
    float: left;
    margin-left: 35px;
    margin-right: 10px;
    margin-top: 28px;
}

#OtherSearch .box-card {
    width:95%;
    margin-left:30px;
    background: white;
    padding: 30px;
    padding-bottom: 0px;
    margin-bottom: 20px;
}

</style>
        