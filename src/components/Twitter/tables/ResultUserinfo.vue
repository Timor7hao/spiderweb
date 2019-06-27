<template>
    <div id="ResultTable1">
        <h2>UserInfo-Section</h2>
        <el-table id="Data1" :data="Data1.slice((currentPage-1)*pagesize,currentPage*pagesize)" stripe style="width: 100%" height="630" border empty-text="NO DATA">
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
        <el-table id="Data1All" :data="Data1All" stripe style="width: 100%" height="630" border empty-text="NO DATA" hidden>
            <el-table-column prop="#" label="#" width="50" type="index" fixed></el-table-column>
            <el-table-column prop="user_id" label="user_id" width="180" fixed></el-table-column>
            <el-table-column prop="nick_name" label="nick_name" width="120"></el-table-column>
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
            console.log(this.message)
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
                url: '/two/twitter/img/pictures',
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