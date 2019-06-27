<template>
    <el-container id="MainPage">
        <el-header height="100px">
            <h1>Web Spider</h1>
            <h4 style="text-align: left;padding-left:60px;color:gray">Welcome! Please click the crawler you need:</h4>
        </el-header>
        <el-main>
            <div class="desc" style="height: 90px"></div>
            <div class="button">
                <el-button class="ripple" @click="toFacebook">FaceBook Spider</el-button>
            </div>
            <div class="button">
                <el-button class="ripple" @click="toTwitter">Twitter Spider</el-button>
            </div>
            <div class="button">
                <el-button class="ripple" @click="toLinkedIn">LinkedIn Spider</el-button>
            </div>
        </el-main>
        <el-footer height="80px">
            <h2>Copyright © 2019. All rights reserved.</h2>
        </el-footer>
    </el-container>
</template>

<script>
export default {
    name: 'mainpage',
    methods:{
        //路由跳转方法
        toFacebook: function() {
            this.$router.push({name:'FaceBookMainPage'})
        },
        toTwitter: function() {
            this.$router.push({name:'TwitterMainPage'})
        },
        toLinkedIn: function() {
            this.$router.push({name:'LinkedInMainPage'})
        }
    }
}
</script>

<style lang="scss" scoped>
#MainPage {
    min-width:500px;
    height:100vh;
    .el-header {
        border-bottom: 1px solid #E8E8E8;
        h1 {
            text-align: left;
            margin-left: 60px;
        }
    }
    .el-main {
        background: #f5f5f5;
    }
    .button .el-button {
        background: rgb(221,227,233);
        width:70%;
        height: 100px;
        box-shadow: 8px 8px 10px #B0B0B0;
        font-size: 30px;
        margin-top: 20px;
        margin-bottom: 20px;
    }
    .el-footer {
        background:gray;
        position: relative; 
        bottom: 0;
        height:80px;
        opacity: 0.8;
        h2 {
            font-size: 15px;
            margin-top: 0px;
            padding-top:40px;
            padding-bottom: 10px;
            color: #B0B0B0;
            text-align: center;
            color:white;
            
        }
    }
}
</style>