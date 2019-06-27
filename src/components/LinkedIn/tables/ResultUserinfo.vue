<template>
    <div id="ResultTable1">
        <h2>UserInfo-Section</h2>
        <el-table id="Data1" :data="Data1.slice((currentPage-1)*pagesize,currentPage*pagesize)" stripe style="width: 100%" height="630" border empty-text="NO DATA">
            <el-table-column prop="#" label="#" width="50" type="index" fixed></el-table-column>
            <el-table-column prop="user_id" label="user_id" width="140" fixed></el-table-column>
            <el-table-column prop="screen_name" label="screen_name" width="200"></el-table-column>
            <el-table-column prop="fullName" label="fullName" width="140"></el-table-column>
            <el-table-column prop="title" label="title" width="200"></el-table-column>
            <el-table-column prop="location" label="location" width="200"></el-table-column>
            <el-table-column prop="experience_past" label="experience_past" width="1000">
                <el-table-column prop="experience_past" label="company_name - description - positions" width="1500">
                    <template slot-scope="scope">
                        <li v-for="(val,index) in scope.row.experience_past" :key="index">
                            {{val.company_name +' - '}}
                            {{val.description +' - '}}
                            {{val.positions}}
                        </li>
                    </template>
                </el-table-column>
            </el-table-column>
            <el-table-column prop="background_education" label="background_education" width="400">
                <el-table-column prop="background_education" label="education_time - fieldOfStudy - degree_name" width="400">
                    <template slot-scope="scope">
                        <li v-for="(val,index) in scope.row.background_education" :key="index">
                            {{val.education_time +' - '}}
                            {{val.fieldOfStudy +' - '}}
                            {{val.degree_name}}
                        </li>
                    </template>
                </el-table-column>
            </el-table-column>
            <el-table-column prop="brif_summary" label="brif_summary" width="1000"></el-table-column>
            <el-table-column prop="endorsement" label="endorsement" width="1000">
                <el-table-column prop="endorsement" label="category - skills" width="1000">
                    <template slot-scope="scope">
                        <li v-for="(val,index) in scope.row.endorsement" :key="index">
                            {{val.category +' - '}}
                            {{val.skills}}
                        </li>
                    </template> 
                </el-table-column>
            </el-table-column>
            <el-table-column prop="accomplishment" label="accomplishment" width="360">
                <template slot-scope="scope">
                    <li v-for="(val,index) in scope.row.accomplishment" :key="index">
                        {{index+' : '+val}}
                    </li> 
                </template> 
            </el-table-column>
            <el-table-column prop="linkedinUrl" label="linkedinUrl" width="200"></el-table-column>
            <el-table-column prop="wechat" label="wechat" width="600">
                <template slot-scope="scope">
                    <li v-for="(val,index) in scope.row.wechat" :key="index">
                        {{index+' : '+val}}
                    </li>
                </template> 
            </el-table-column>
            <el-table-column prop="email" label="email" width="210"></el-table-column>
            <el-table-column prop="phone" label="phone" width="180">
                <el-table-column prop="phone" label="number - type" width="180">
                    <template slot-scope="scope">
                        <li v-for="(val,index) in scope.row.phone" :key="index">
                            {{val.number +' - '}}
                            {{val.type}}
                        </li>
                    </template>
                </el-table-column>
            </el-table-column>
            <el-table-column prop="contact_address" label="contact_address" width="150"></el-table-column>
            <el-table-column prop="birthDate" label="birthDate" width="180">
                <template slot-scope="scope">
                    <li v-for="(val,index) in scope.row.birthDate" :key="index">
                        {{index+' : '+val}}
                    </li>
                </template> 
            </el-table-column>
            <el-table-column prop="people" label="people" width="800">
                <el-table-column prop="people" label="name - occupation - publicIdentifier - user_id" width="700">
                    <template slot-scope="scope">
                        <li v-for="(val,index) in scope.row.people" :key="index">
                            {{val.name +' - '}}
                            {{val.occupation +' - '}}
                            {{val.publicIdentifier +' - '}}
                            {{val.user_id}}
                        </li>
                    </template> 
                </el-table-column>
            </el-table-column>
            <el-table-column prop="imageUrl" label="imageUrl" width="300"></el-table-column>
            <el-table-column prop="timestamp" label="timestamp" width="200"></el-table-column>
        </el-table>
        <el-table id="Data1All" :data="Data1All" stripe style="width: 100%" height="630" border empty-text="NO DATA" hidden>
            <el-table-column prop="#" label="#" width="50" type="index" fixed></el-table-column>
            <el-table-column prop="user_id" label="user_id" width="140" fixed></el-table-column>
            <el-table-column prop="screen_name" label="screen_name" width="200"></el-table-column>
            <el-table-column prop="fullName" label="fullName" width="140"></el-table-column>
            <el-table-column prop="title" label="title" width="200"></el-table-column>
            <el-table-column prop="location" label="location" width="200"></el-table-column>
            <el-table-column prop="experience_past" label="experience_past" width="1000">
                <el-table-column prop="experience_past" label="company_name - description - positions" width="1500">
                    <template slot-scope="scope">
                        <li v-for="(val,index) in scope.row.experience_past" :key="index">
                            {{val.company_name +' - '}}
                            {{val.description +' - '}}
                            {{val.positions}}
                        </li>
                    </template>
                </el-table-column>
            </el-table-column>
            <el-table-column prop="background_education" label="background_education" width="400">
                <el-table-column prop="background_education" label="education_time - fieldOfStudy - degree_name" width="400">
                    <template slot-scope="scope">
                        <li v-for="(val,index) in scope.row.background_education" :key="index">
                            {{val.education_time +' - '}}
                            {{val.fieldOfStudy +' - '}}
                            {{val.degree_name}}
                        </li>
                    </template>
                </el-table-column>
            </el-table-column>
            <el-table-column prop="brif_summary" label="brif_summary" width="1000"></el-table-column>
            <el-table-column prop="endorsement" label="endorsement" width="1000">
                <el-table-column prop="endorsement" label="category - skills" width="1000">
                    <template slot-scope="scope">
                        <li v-for="(val,index) in scope.row.endorsement" :key="index">
                            {{val.category +' - '}}
                            {{val.skills}}
                        </li>
                    </template> 
                </el-table-column>
            </el-table-column>
            <el-table-column prop="accomplishment" label="accomplishment" width="360">
                <template slot-scope="scope">
                    <li v-for="(val,index) in scope.row.accomplishment" :key="index">
                        {{index+' : '+val}}
                    </li> 
                </template> 
            </el-table-column>
            <el-table-column prop="linkedinUrl" label="linkedinUrl" width="200"></el-table-column>
            <el-table-column prop="wechat" label="wechat" width="600">
                <template slot-scope="scope">
                    <li v-for="(val,index) in scope.row.wechat" :key="index">
                        {{index+' : '+val}}
                    </li>
                </template> 
            </el-table-column>
            <el-table-column prop="email" label="email" width="210"></el-table-column>
            <el-table-column prop="phone" label="phone" width="180">
                <el-table-column prop="phone" label="number - type" width="180">
                    <template slot-scope="scope">
                        <li v-for="(val,index) in scope.row.phone" :key="index">
                            {{val.number +' - '}}
                            {{val.type}}
                        </li>
                    </template>
                </el-table-column>
            </el-table-column>
            <el-table-column prop="contact_address" label="contact_address" width="150"></el-table-column>
            <el-table-column prop="birthDate" label="birthDate" width="180">
                <template slot-scope="scope">
                    <li v-for="(val,index) in scope.row.birthDate" :key="index">
                        {{index+' : '+val}}
                    </li>
                </template> 
            </el-table-column>
            <el-table-column prop="people" label="people" width="800">
                <el-table-column prop="people" label="name - occupation - publicIdentifier - user_id" width="700">
                    <template slot-scope="scope">
                        <li v-for="(val,index) in scope.row.people" :key="index">
                            {{val.name +' - '}}
                            {{val.occupation +' - '}}
                            {{val.publicIdentifier +' - '}}
                            {{val.user_id}}
                        </li>
                    </template> 
                </el-table-column>
            </el-table-column>
            <el-table-column prop="imageUrl" label="imageUrl" width="300"></el-table-column>
            <el-table-column prop="timestamp" label="timestamp" width="200"></el-table-column>
        </el-table>
        <el-button class="ripple" type="primary" @click="ExportList" style="float:right;margin:15px;background: #2E8B57">Export</el-button>
        <div style="text-align: center;margin-top: 30px;">
            <el-pagination
                background
                layout="prev, pager, next"
                :total="total"
                @current-change="current_change">
            </el-pagination>
        </div>

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
    </div>
</template>

<script>
import FileSaver from "file-saver"
import XLSX from "xlsx"
export default {
    name: 'TWResultUserinfo',
    props:["message"],
    data () {
        return {
            Data1 : [],
            Data1All: [],
            total: 0,
            pagesize: 10,
            currentPage: 1,
            ExportDialogVisible: false,
            //该表格的json数据串
            Data1_jsondata: '',
            picture: []   //放置头像图片数据
        }
    },
    watch:{
        message:function(){
        this.$nextTick( function(){
            this.Data1_jsondata = this.message
            this.Data1 = this.message
            this.Data1All = this.message
            this.total=this.Data1.length
            //判断布尔型verified，转换成字符串显示
            for(var i=0;i<this.Data1.length;i++)
                if(this.Data1[i].verified)
                    this.Data1[i].verified="true";
                else
                    this.Data1[i].verified="false";
            //拿到头像图片数据
            var Params = {
                id: this.Data1.id
            }
            console.log(Params)
            this.$ajax({
                url: '/three/linkedin/img/pictures',
                method: 'get',
                contentType: "application/json; charset=utf-8",
                params: Params
            }).then( res => {
                this.picture = res.data.data
                console.log(res.data.data)
            }).catch( error => {
                console.log()
            })
        })
        }
    },
    methods: {
        current_change:function(currentPage){
            this.currentPage = currentPage;
        },
        getAvatar(row) {
            for(var i=0;i<this.picture.length;i++)
                if(this.picture[i].indexOf(row.user_id)!=-1)
                    return this.picture[i]
        },
        //导出查询的数据
        ExportList() {
            this.ExportDialogVisible = true;
        },
        //输出JSON格式数据下载
        Export1() {
            var blob = new Blob([JSON.stringify(this.Data1_jsondata, null, 2)],{type:'application/json,charset=utf-8;'});
            saveAs(blob, "userinfo_result" + '.json');
        },
        //输出CSV格式数据下载
        Export2() {
            var fix = document.querySelector('.el-table__fixed');
            let table = document.querySelector("#Data1All").cloneNode(true);
            if(fix)
                var wb = XLSX.utils.table_to_book(table.removeChild(table.querySelector(".el-table__fixed")))
            else
                var wb = XLSX.utils.table_to_book(table)
            var wbout = XLSX.write(wb, { bookType: 'csv', bookSST: true, type: 'array' })
            try {
                FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), 'userinfo_result.csv')
            } catch (e) { 
                if (typeof console !== 'undefined') console.log(e, wbout) 
            }
        },
        //输出XLSX格式数据下载
        Export3() {
            var fix = document.querySelector('.el-table__fixed');
            let table = document.querySelector("#Data1All").cloneNode(true);
            if(fix)
                var wb = XLSX.utils.table_to_book(table.removeChild(table.querySelector(".el-table__fixed")))
            else
                var wb = XLSX.utils.table_to_book(table)
            var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
            try {
                FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), 'userinfo_result.xlsx')
            } catch (e) { 
                if (typeof console !== 'undefined') console.log(e, wbout) 
            }
        }
    }
}
</script>

<style lang="scss" scoped>
#ResultTable1{
    h2{
        font-size:17px;
    }
}
</style>