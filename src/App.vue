<template>
    <div id="app">
        <!-- <img src="./assets/logo.png"> -->
        <!-- <router-view></router-view> -->
        <!-- <keep-alive>
        <router-view v-if="this.$route.meta.keepAlive"></router-view>
        </keep-alive> -->
        <router-view v-if="isReloadAlive"></router-view>
    </div>
</template>

<script>
export default {
    name: 'App',
    //页面刷新方法定义
    provide() {
        return {
            reload: this.reload
        }
    },
    data() {
        return{
            isReloadAlive: true
        }
    },
    methods: {
        reload() {
            this.isReloadAlive = false;
            this.$nextTick(function(){
                this.isReloadAlive = true;
            })
        }
    }
}
</script>

<style>
@import 'http://www.jq22.com/jquery/bootstrap-3.3.4.css';
/* @import 'http://www.jq22.com/jquery/font-awesome.4.6.0.css'; */

#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    /* min-width: 50%; */
    /* margin-top: 60px; */
}

.ripple {
    font-family: 'Helvetica', 'Arial', sans-serif;
    display: inline-block;
    font-size: 1em;
    padding: 1em 2em;
    /* margin-top: 100px; */
    /* margin-bottom: 60px; */
    -webkit-appearance: none;
    appearance: none;
    border-radius: 4px;
    border: none;
    cursor: pointer;
    position: relative;
    transition: transform ease-in 0.1s, box-shadow ease-in 0.25s;
}

.ripple:before, .ripple:after {
    position: absolute;
    content: '';
    display: block;
    width: 140%;
    height: 100%;
    left: -20%;
    z-index: -1000;
    transition: all ease-in-out 0.5s;
    background-repeat: no-repeat;
}

.ripple:active {
    transform: scale(0.9);
    opacity:0.8; 
}
</style>
