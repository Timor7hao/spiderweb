<template>
    <el-container id="headbar">
        <el-header height="70px">
            <i class="fa fa-twitter-square"></i> 
            <h1>Twitter Spider</h1>
            <router-link :to="{ path: '/' }">
                <el-tooltip content="Go Back" placement="bottom">
                    <i class="fa fa-home"></i>
                </el-tooltip>
            </router-link>
        </el-header>
        <el-container>
            <el-aside width="230px;">
                <h2>PROJECT</h2>
                <el-menu router :default-active="$route.path" class="el-menu-vertical-demo" active-text-color="#F4A460">
                    <el-menu-item index="/twitter/NewTask">
                        <i class="fa fa-pencil-square-o"></i>
                        <span slot="title">NewCrawlerTask</span>
                    </el-menu-item>
                    <h2>SPIDERS</h2>
                    <el-menu-item index="/twitter/UserConfig">
                        <i class="el-icon-setting" style="color: #FF8C00"></i>
                        <span slot="title">AccountConfiguration</span>
                    </el-menu-item>
                    <el-menu-item index="/twitter/HostConfig">
                        <i class="fa fa-server"></i>
                        <span slot="title">HostConfiguration</span>
                    </el-menu-item>
                    <h2 >JOBS</h2>
                    <el-menu-item index="/twitter/WorkStation">
                        <i class="el-icon-document" style="color: #AB82FF"></i>
                        <span slot="title">WorkStatus</span>
                    </el-menu-item>
                    <el-menu-item index="/twitter/PeriodWorkStation">
                        <i class="el-icon-refresh" style="color:  #EECBAD "></i>
                        <span slot="title">PeriodicWorkStatus</span>
                    </el-menu-item>
                    <h2>CONTENT</h2>
                    <el-menu-item index="/twitter/SeeDetails">
                        <i class="fa fa-wpforms" style="color:  rgb(116, 53, 17) "></i>
                        <span slot="title">SeeDetails</span>
                    </el-menu-item>
                    <el-menu-item index="/twitter/Search">
                        <i class="fa fa-search" style="color:  rgb(231, 73, 73) "></i>
                        <span slot="title">Search</span>
                    </el-menu-item>
                </el-menu>
            </el-aside>
            <el-container>
                <el-main>
                    <transition>
                        <keep-alive v-if="isReloadAlive">
                            <h4>Welcome to Twitter Spider</h4>
                            <router-view></router-view>
                        </keep-alive>
                    </transition>
                </el-main>
                <el-footer height="85.6px">
                    <h1>Twitter Spider（Version 1.0.0）</h1>
                    <h2>Copyright © 2019. All rights reserved.</h2>
                </el-footer>
            </el-container>
        </el-container>
    </el-container>
</template>

<script>
import TWNewTask from '@/components/twitter/NewTask'
import TWUserConfig from '@/components/twitter/UserConfig'
import TWHostConfig from '@/components/twitter/HostConfig'
import TWWorkStation from '@/components/twitter/WorkStation'
import TWPeriodWorkStation from '@/components/twitter/PeriodWorkStation'
import TWSearch from '@/components/twitter/Search'
import TWSeeDetails from '@/components/twitter/SeeDetails'
export default {
    name: 'HeadBar',
    components: {
        TWNewTask,
        TWUserConfig,
        TWHostConfig,
        TWWorkStation,
        TWPeriodWorkStation,
        TWSearch,
        TWSeeDetails
    },
    data () {
        return {
            isReloadAlive: true
        }
    },
}
</script>

<style lang="scss" scoped>
#headbar {
    height: 100vh;
    min-width:1000px;
    min-height:790px;
    .el-header {
        border-bottom: 1px solid #E8E8E8;
        .fa-twitter-square {
            color:  #338de6;
            float:left;
            font-size:45px;
            margin-top: 15px;
            margin-left:20px;
        }
        h1 {
            text-align: left;
            margin-left: 25px;
            float:left;
        }
        .fa-home{
            color: #408080;
            font-size: 25px;
            float: right;
            margin-right: 20px;
            margin-top: 30px;
        }
    }
    .el-aside {
        border-right: 1px solid lightgray;
        padding-left: 0px;
        padding-top: 10px;
        background: #F5F5F5;
        .fa-pencil-square-o{
            color: #009ACD;
            font-size: 18px;
            float: left;
            margin-left: 5px;
            margin-right: 13px;
            margin-top: 21px;
        }
        .fa-server ,.fa-wpforms ,.fa-search{
            color: #2E8B57;
            font-size: 15px;
            float: left;
            margin-left: 5px;
            margin-right: 14px;
            margin-top: 22px;
        }
        h2 {
            font-size: 15px;
            text-align: left;
            margin-left: 20px;
            margin-top: 0px;
            padding-top: 20px;
            padding-bottom: 10px;
            color: #B0B0B0;
        }
        .el-menu {
            background-color: #F5F5F5;
            border-right: 0;
        }
        .el-menu-item {
            text-align: left;
        }
        .el-menu-item span {
            font-weight: 550;
            color:rgb(69, 70, 71);
        }
        .el-menu-item:hover{ 
            background: #E8E8E8 !important;
        }
        .el-menu-item.is-active {
            background-color: rgb(190, 196, 202) !important;
            color: white !important;
        }
    }
    .el-main {
        height: 100vh;
        background: rgb(221, 227, 233);
        h4 {
            font-size:40px; 
            color:#B0B0B0; 
            padding-top:250px; 
            padding-bottom:280px;
        }
    }
    .el-footer {
        background: rgb(221, 227, 233);
        padding-bottom:20px;
        h1 {
            float:left;
            padding:10px;
            padding-top:40px;
            color:rgb(107, 185, 216);
            font-size: 15px;
            text-align: left;
            margin-left: 20px;
            margin-top: 0px;
        }
        h2 {
            float:right;
            padding-right:65px;
            padding-top:40px;
            font-size: 15px;
            text-align: left;
            margin-left: 20px;
            margin-top: 0px;
            color: #B0B0B0;
        }
    }
}
</style>