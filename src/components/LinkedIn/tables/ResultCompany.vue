<template>
    <div id="ResultTable3">
        <h2>Company-Section</h2>
        <el-table id="Data3" :data="Data3.slice((currentPage-1)*pagesize,currentPage*pagesize)" stripe style="width: 100%" height="580" border empty-text="NO DATA">
            <el-table-column prop="#" label="#" width="50" type="index" fixed></el-table-column>
            <el-table-column prop="screen_name" label="screen_name" width="140" fixed></el-table-column>
            <el-table-column prop="name" label="name" width="120"></el-table-column>
            <el-table-column prop="follow_count" label="follow_count" width="140"></el-table-column>
            <el-table-column prop="description" label="description" width="1000"></el-table-column>
            <el-table-column prop="found_time" label="found_time" width="140">
                <template slot-scope="scope">
                    <li v-for="(val,index) in scope.row.found_time" :key="index">
                        {{index+' : '+val}}
                    </li> 
                </template> 
            </el-table-column>
            <el-table-column prop="specialities" label="specialities" width="180"></el-table-column>
            <el-table-column prop="staff_count" label="staff_count" width="140"></el-table-column>
            <el-table-column prop="company_url" label="company_url" width="180"></el-table-column>
            <el-table-column prop="company_type" label="company_type" width="180"></el-table-column>
            <el-table-column prop="company_location" label="company_location" width="200">
                <template slot-scope="scope">
                    <li v-for="(val,index) in scope.row.company_location" :key="index">
                        {{index+' : '+val}}
                    </li> 
                </template> 
            </el-table-column>
            <el-table-column prop="locations" label="locations" width="600">
                <el-table-column prop="locations" label="country - geographicArea - city - postalCode - line1" width="600">
                    <template slot-scope="scope">
                        <li v-for="(val,index) in scope.row.locations" :key="index">
                            {{val.country +' - '}}
                            {{val.geographicArea +' - '}}
                            {{val.city +' - '}}
                            {{val.postalCode +' - '}}
                            {{val.line1}}
                        </li>
                    </template>
                </el-table-column>
            </el-table-column>
            <el-table-column prop="timestamp" label="timestamp" width="160"></el-table-column>
            <el-table-column prop="companys" label="companys" width="2800">
                <el-table-column prop="companys" label="subcompany_followerCount - subcompany_descrpition - subcompany_companyIndustries - subcompany_name - subcompany_univesalName" width="2800">
                    <template slot-scope="scope">
                        <li v-for="(val,index) in scope.row.companys" :key="index">
                            {{val.subcompany_followerCount +' - '}}
                            {{val.subcompany_descrpition +' - '}}
                            {{val.subcompany_companyIndustries +' - '}}
                            {{val.subcompany_name +' - '}}
                            {{val.subcompany_univesalName}}
                        </li>
                    </template>
                </el-table-column>
            </el-table-column>
        </el-table>
        <el-table id="Data3All" :data="Data3All" stripe style="width: 100%" height="580" border empty-text="NO DATA" hidden>
            <el-table-column prop="#" label="#" width="50" type="index" fixed></el-table-column>
            <el-table-column prop="screen_name" label="screen_name" width="140" fixed></el-table-column>
            <el-table-column prop="name" label="name" width="120"></el-table-column>
            <el-table-column prop="follow_count" label="follow_count" width="140"></el-table-column>
            <el-table-column prop="description" label="description" width="1000"></el-table-column>
            <el-table-column prop="found_time" label="found_time" width="140">
                <template slot-scope="scope">
                    <li v-for="(val,index) in scope.row.found_time" :key="index">
                        {{index+' : '+val}}
                    </li> 
                </template> 
            </el-table-column>
            <el-table-column prop="specialities" label="specialities" width="180"></el-table-column>
            <el-table-column prop="staff_count" label="staff_count" width="140"></el-table-column>
            <el-table-column prop="company_url" label="company_url" width="180"></el-table-column>
            <el-table-column prop="company_type" label="company_type" width="180"></el-table-column>
            <el-table-column prop="company_location" label="company_location" width="200">
                <template slot-scope="scope">
                    <li v-for="(val,index) in scope.row.company_location" :key="index">
                        {{index+' : '+val}}
                    </li> 
                </template> 
            </el-table-column>
            <el-table-column prop="locations" label="locations" width="600">
                <el-table-column prop="locations" label="country - geographicArea - city - postalCode - line1" width="600">
                    <template slot-scope="scope">
                        <li v-for="(val,index) in scope.row.locations" :key="index">
                            {{val.country +' - '}}
                            {{val.geographicArea +' - '}}
                            {{val.city +' - '}}
                            {{val.postalCode +' - '}}
                            {{val.line1}}
                        </li>
                    </template>
                </el-table-column>
            </el-table-column>
            <el-table-column prop="timestamp" label="timestamp" width="160"></el-table-column>
            <el-table-column prop="companys" label="companys" width="2800">
                <el-table-column prop="companys" label="subcompany_followerCount - subcompany_descrpition - subcompany_companyIndustries - subcompany_name - subcompany_univesalName" width="2800">
                    <template slot-scope="scope">
                        <li v-for="(val,index) in scope.row.companys" :key="index">
                            {{val.subcompany_followerCount +' - '}}
                            {{val.subcompany_descrpition +' - '}}
                            {{val.subcompany_companyIndustries +' - '}}
                            {{val.subcompany_name +' - '}}
                            {{val.subcompany_univesalName}}
                        </li>
                    </template>
                </el-table-column>
            </el-table-column>
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
    name: 'ResultContent',
    props:["message"],
    data () {
        return {
            Data3 : [],
            total: 0,
            Data3All: [],
            pagesize: 10,
            currentPage: 1,
            ExportDialogVisible: false,
            //该表格的json数据串
            Data3_jsondata: '',
            picture: []   //放置头像图片数据
        }
    },
    watch:{
        message:function(){
        this.$nextTick( function(){
            this.Data3_jsondata = this.message
            this.Data3 = this.message
            this.Data3All = this.message
            this.total=this.Data3.length
            //判断布尔型textMute，转换成字符串显示
            for(var i=0;i<this.Data3.length;i++)
                if(this.Data3[i].textMute)
                    this.Data3[i].textMute="true";
                else
                    this.Data3[i].textMute="false";
            //拿到头像图片数据
            var Params = {
                id: this.Data3.id
            }
            this.$ajax({
                url: '/three/linkedin/img/pictures',
                method: 'get',
                contentType: "application/json; charset=utf-8",
                params: Params
            }).then( res => {
                this.picture = res.data.data
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
            var blob = new Blob([JSON.stringify(this.Data3_jsondata, null, 2)],{type:'application/json,charset=utf-8;'});
            saveAs(blob, "company_result" + '.json');
        },
        //输出CSV格式数据下载
        Export2() {
            var fix = document.querySelector('.el-table__fixed');
            let table = document.querySelector("#Data3All").cloneNode(true);
            if(fix)
                var wb = XLSX.utils.table_to_book(table.removeChild(table.querySelector(".el-table__fixed")))
            else
                var wb = XLSX.utils.table_to_book(table)
            var wbout = XLSX.write(wb, { bookType: 'csv', bookSST: true, type: 'array' })
            try {
                FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), 'company_result.csv')
            } catch (e) { 
                if (typeof console !== 'undefined') console.log(e, wbout) 
            }
        },
        //输出XLSX格式数据下载
        Export3() {
            var fix = document.querySelector('.el-table__fixed');
            let table = document.querySelector("#Data3All").cloneNode(true);
            if(fix)
                var wb = XLSX.utils.table_to_book(table.removeChild(table.querySelector(".el-table__fixed")))
            else
                var wb = XLSX.utils.table_to_book(table)
            var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
            try {
                FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), 'company_result.xlsx')
            } catch (e) { 
                if (typeof console !== 'undefined') console.log(e, wbout) 
            }
        }
    }
}
</script>

<style lang="scss" scoped>
#ResultTable3{
    h2{
        font-size:17px;
    }
}
</style>