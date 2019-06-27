import Vue from 'vue'
import Router from 'vue-router'
import axios from 'axios'
import MajorStructure from '@/components/MajorStructure'

import FaceBookMainPage from '@/components/FaceBook/FaceBookMainPage'
import NewTask from '@/components/FaceBook/NewTask'
import UserConfig from '@/components/FaceBook/UserConfig'
import HostConfig from '@/components/FaceBook/HostConfig'
import WorkStation from '@/components/FaceBook/WorkStation'
import PeriodWorkStation from '@/components/FaceBook/PeriodWorkStation'
import Search from '@/components/FaceBook/Search'
import SeeDetails from '@/components/FaceBook/SeeDetails'

import TwitterMainPage from '@/components/twitter/TwitterMainPage'
import TWNewTask from '@/components/twitter/NewTask'
import TWUserConfig from '@/components/twitter/UserConfig'
import TWHostConfig from '@/components/twitter/HostConfig'
import TWWorkStation from '@/components/twitter/WorkStation'
import TWPeriodWorkStation from '@/components/twitter/PeriodWorkStation'
import TWSearch from '@/components/twitter/Search'
import TWSeeDetails from '@/components/twitter/SeeDetails'

import LinkedInMainPage from '@/components/LinkedIn/LinkedInMainPage'
import LKNewTask from '@/components/LinkedIn/NewTask'
import LKUserConfig from '@/components/LinkedIn/UserConfig'
import LKHostConfig from '@/components/LinkedIn/HostConfig'
import LKWorkStation from '@/components/LinkedIn/WorkStation'
import LKPeriodWorkStation from '@/components/LinkedIn/PeriodWorkStation'
import LKSearch from '@/components/LinkedIn/Search'
import LKSeeDetails from '@/components/LinkedIn/SeeDetails'
// import locale from 'element-ui/lib/locale/lang/en'
import FileSaver from "file-saver"
import XLSX from "xlsx"

Vue.use(Router)
Vue.prototype.$ajax = axios
export default new Router({
  mode:'history',
  // base: "/fbstest/",
  routes: [
    {
      path: '/',
      name: 'MajorStructure',
      component: MajorStructure,
    },
    {
      path: '/facebook',
      name: 'FaceBookMainPage',
      component: FaceBookMainPage,
      children: [
        {
          path: '/facebook/NewTask',
          name: 'NewTask',
          component: NewTask,
          meta:{
            keepAlive:true
          }
        },
        {
          path: '/facebook/UserConfig',
          name: 'UserConfig',
          component: UserConfig,
          meta:{
            keepAlive:true
          }
        },
        {
          path: '/facebook/HostConfig',
          name: 'HostConfig',
          component: HostConfig,
          meta:{
            keepAlive:true
          }
        },
        {
          path: '/facebook/WorkStation',
          name: 'WorkStation',
          component: WorkStation,
          meta:{
            keepAlive:true
          }
        },
        {
          path: '/facebook/PeriodWorkStation',
          name: 'PeriodWorkStation',
          component: PeriodWorkStation,
          meta:{
            keepAlive:true
          }
        },
        {
          path: '/facebook/SeeDetails',
          name: 'SeeDetails',
          component: SeeDetails,
          // children:[
          //   {
          //     path: '/ResultUserinfo',
          //     name: '/ResultUserinfo',
          //     component: ResultUserinfo
          //   },
          //   {
          //     path: '/ResultFriends',
          //     name: '/ResultFriends',
          //     component: ResultFriends
          //   },
          // ]
        },
        {
          path: '/facebook/Search',
          name: 'Search',
          component: Search
        }
      ]
    },
    {
      path: '/twitter',
      name: 'TwitterMainPage',
      component: TwitterMainPage,
      children: [
        {
          path: '/twitter/NewTask',
          name: 'TWNewTask',
          component: TWNewTask,
          meta:{
            keepAlive:true
          }
        },
        {
          path: '/twitter/UserConfig',
          name: 'TWUserConfig',
          component: TWUserConfig,
          meta:{
            keepAlive:true
          }
        },
        {
          path: '/twitter/HostConfig',
          name: 'TWHostConfig',
          component: TWHostConfig,
          meta:{
            keepAlive:true
          }
        },
        {
          path: '/twitter/WorkStation',
          name: 'TWWorkStation',
          component: TWWorkStation,
          meta:{
            keepAlive:true
          }
        },
        {
          path: '/twitter/PeriodWorkStation',
          name: 'TWPeriodWorkStation',
          component: TWPeriodWorkStation,
          meta:{
            keepAlive:true
          }
        },
        {
          path: '/twitter/SeeDetails',
          name: 'TWSeeDetails',
          component: TWSeeDetails,
        },
        {
          path: '/twitter/Search',
          name: 'TWSearch',
          component: TWSearch
        }
      ]
    },
    {
      path: '/linkedin',
      name: 'LinkedInMainPage',
      component: LinkedInMainPage,
      children: [
        {
          path: '/LinkedIn/NewTask',
          name: 'LKNewTask',
          component: LKNewTask,
          meta:{
            keepAlive:true
          }
        },
        {
          path: '/LinkedIn/UserConfig',
          name: 'LKUserConfig',
          component: LKUserConfig,
          meta:{
            keepAlive:true
          }
        },
        {
          path: '/LinkedIn/HostConfig',
          name: 'LKHostConfig',
          component: LKHostConfig,
          meta:{
            keepAlive:true
          }
        },
        {
          path: '/LinkedIn/WorkStation',
          name: 'LKWorkStation',
          component: LKWorkStation,
          meta:{
            keepAlive:true
          }
        },
        {
          path: '/LinkedIn/PeriodWorkStation',
          name: 'LKPeriodWorkStation',
          component: LKPeriodWorkStation,
          meta:{
            keepAlive:true
          }
        },
        {
          path: '/LinkedIn/SeeDetails',
          name: 'LKSeeDetails',
          component: LKSeeDetails,
        },
        {
          path: '/LinkedIn/Search',
          name: 'LKSearch',
          component: LKSearch
        }
      ]
    }
  ]
})
