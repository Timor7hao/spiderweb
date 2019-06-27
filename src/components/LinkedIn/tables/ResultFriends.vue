<template>
    <div id="ResultTable2">
        <h2>Friends-Section</h2>
        <el-table id="Data2" :data="Data2.slice((currentPage-1)*pagesize,currentPage*pagesize)" stripe style="width: 100%" height="560" border empty-text="NO DATA">
            <el-table-column prop="#" label="#" width="50" type="index" fixed></el-table-column>
            <el-table-column prop="user_id" label="user_id" width="140" fixed></el-table-column>
            <el-table-column prop="screen_name" label="screen_name" width="200"></el-table-column>
            <el-table-column prop="friends_id" label="friends_id" width="140"></el-table-column>
            <el-table-column prop="friends_screen_name" label="friends_screen_name" width="200"></el-table-column>
            <el-table-column prop="friends_location" label="friends_location" width="300"></el-table-column>
            <el-table-column prop="friends_position" label="friends_position" width="300"></el-table-column>
            <el-table-column prop="friends_nick_name" label="friends_nick_name" width="200"></el-table-column>
            <el-table-column prop="friends_url" label="friends_url" width="400"></el-table-column>
            <el-table-column prop="friends_hop" label="friends_hop" width="200"></el-table-column>
            <el-table-column prop="timestamp" label="timestamp" width="200"></el-table-column>
        </el-table>
        <el-table id="Data2All" :data="Data2All" stripe style="width: 100%" height="560" border empty-text="NO DATA" hidden>
            <el-table-column prop="#" label="#" width="50" type="index" fixed></el-table-column>
            <el-table-column prop="user_id" label="user_id" width="140" fixed></el-table-column>
            <el-table-column prop="screen_name" label="screen_name" width="200"></el-table-column>
            <el-table-column prop="friends_id" label="friends_id" width="140"></el-table-column>
            <el-table-column prop="friends_screen_name" label="friends_screen_name" width="200"></el-table-column>
            <el-table-column prop="friends_location" label="friends_location" width="300"></el-table-column>
            <el-table-column prop="friends_position" label="friends_position" width="300"></el-table-column>
            <el-table-column prop="friends_nick_name" label="friends_nick_name" width="200"></el-table-column>
            <el-table-column prop="friends_url" label="friends_url" width="400"></el-table-column>
            <el-table-column prop="friends_hop" label="friends_hop" width="200"></el-table-column>
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
    name: 'TWResultFollow',
    props:["message"],
    data () {
        return {
            Data2 : [],
            total: 0,
            Data2All: [],
            pagesize: 10,
            currentPage: 1,
            ExportDialogVisible: false,
            //该表格的json数据串
            Data2_jsondata: '',
            picture: []   //放置头像图片数据
        }
    },
    watch:{
        message:function(){
        this.$nextTick( function(){
            this.Data2_jsondata = this.message
            this.Data2 = this.message
            this.Data2All = this.message
            this.total=this.Data2.length
            //拿到头像图片数据
            var Params = {
                id: this.Data2.id
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
            var blob = new Blob([JSON.stringify(this.Data2_jsondata, null, 2)],{type:'application/json,charset=utf-8;'});
            saveAs(blob, "friends_result" + '.json');
        },
        //输出CSV格式数据下载
        Export2() {
            var fix = document.querySelector('.el-table__fixed');
            let table = document.querySelector("#Data2All").cloneNode(true);
            if(fix)
                var wb = XLSX.utils.table_to_book(table.removeChild(table.querySelector(".el-table__fixed")))
            else
                var wb = XLSX.utils.table_to_book(table)
            var wbout = XLSX.write(wb, { bookType: 'csv', bookSST: true, type: 'array' })
            try {
                FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), 'friends_result.csv')
            } catch (e) { 
                if (typeof console !== 'undefined') console.log(e, wbout) 
            }
        },
        //输出XLSX格式数据下载
        Export3() {
            var fix = document.querySelector('.el-table__fixed');
            let table = document.querySelector("#Data2All").cloneNode(true);
            if(fix)
                var wb = XLSX.utils.table_to_book(table.removeChild(table.querySelector(".el-table__fixed")))
            else
                var wb = XLSX.utils.table_to_book(table)
            var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
            try {
                FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), 'friends_result.xlsx')
            } catch (e) { 
                if (typeof console !== 'undefined') console.log(e, wbout) 
            }
        }
    }
}
</script>

<style lang="scss" scoped>
#ResultTable2{
    h2{
        font-size:17px;
    }
}
</style>