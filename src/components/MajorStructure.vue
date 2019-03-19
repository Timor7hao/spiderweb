<template>
  <div id="headbar">
    <div class="head">
      <h1>FaceBook爬虫</h1>
    </div>
    <div class="container">
    <div class="row">
    <div class="col-md-2">
      <h2>JOBS</h2>
      <el-menu router :default-active="$route.path" class="el-menu-vertical-demo" active-text-color="#F4A460">
        <el-menu-item index="/NewTask">
          <i class="fa fa-pencil-square-o"></i>
          <span slot="title">新建爬虫任务</span>
        </el-menu-item>
      <!-- </el-menu>  -->
      <h2>SPIDERS</h2>
        <el-menu-item index="/UserConfig">
          <i class="el-icon-setting" style="color: #FF8C00"></i>
          <span slot="title">账号密码配置</span>
        </el-menu-item>
        <el-menu-item index="/HostConfig">
          <!-- <i class="el-icon-menu"></i> -->
          <i class="fa fa-server"></i>
          <span slot="title">主机配置</span>
        </el-menu-item>
      <!-- </el-menu> -->
      <h2 >RROJECT</h2>
      <!-- <el-menu class="el-menu-vertical-demo"active-text-color="#F4A460"> -->
        <el-menu-item index="/WorkStation">
          <i class="el-icon-document" style="color: #AB82FF"></i>
          <span slot="title">爬虫工作状态</span>
        </el-menu-item>
        <el-menu-item index="/PeriodWorkStation">
          <i class="el-icon-refresh" style="color:  #EECBAD "></i>
          <span slot="title">周期性任务工作状态</span>
        </el-menu-item>
    </el-menu>
  </div>
  <div class="col-md-10">
    <transition>
      <router-view></router-view>
    </transition>
    <div class="footer">
      <h2 style="float:left;padding:10px;padding-top:50px;color:rgb(107, 185, 216);padding-bottom:0px;">FaceBook爬虫（Version 1.0.0）</h2>
      <h2 style="float:right;padding-right:65px;padding-top:50px">Copyright © 2019. All rights reserved.</h2>
    </div>
  </div>
</div>
</div>
</div>

</template>

<script>
import NewTask from '@/components/NewTask'
import UserConfig from '@/components/UserConfig'
import HostConfig from '@/components/HostConfig'
import WorkStation from '@/components/WorkStation'
import PeriodWorkStation from '@/components/PeriodWorkStation'
export default {
  name: 'HeadBar',
  components: {
    NewTask,
    UserConfig,
    HostConfig,
    WorkStation,
    PeriodWorkStation
  },
  data () {
    return {
      // activeIndex: '/',
          // barData: [
          //   { name: '新建爬虫任务', route: '/'}]
    }
  }
}
</script>

<style>
#headbar {
  height: 50px;
}

#headbar .fa-pencil-square-o{
    color: #009ACD;
    font-size: 18px;
    float: left;
    margin-left: 5px;
    margin-right: 13px;
    margin-top: 21px;
}

#headbar .fa-server {
    color: #2E8B57;
    font-size: 15px;
    float: left;
    margin-left: 5px;
    margin-right: 14px;
    margin-top: 22px;
}

#headbar li {
  margin-left:0px;
}

.head {
  border-bottom: 1px solid #E8E8E8;
}

h1 {
  text-align: left;
  margin-left: 60px;
}

.container {
    padding: 0px;
    margin: 0px;
    width: 100%;
}

.col-md-2 {
  border-right: 1px solid lightgray;
  height: 900px;
  padding: 0px;
  padding-left: 20px;
  padding-top: 10px;
  background: #F5F5F5;
  float: left;
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
  background: #F5F5F5;
  border-right: 0;
}

.el-menu-item {
  text-align: left;
}

.el-menu :hover{ 
  background-color: #E8E8E8 !important;
}

.el-menu-item.is-active {
   background-color: rgb(190, 196, 202) !important;
   color: white !important;
}

.col-md-10 {
  background: rgb(221, 227, 233);
  height: 900px;
}

.footer {
  padding-bottom:20px;
}

:root {
  overflow-y: hidden;
  overflow-x: hidden;
}

</style>