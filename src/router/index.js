import Vue from 'vue'
import Router from 'vue-router'
import MajorStructure from '@/components/MajorStructure'
import NewTask from '@/components/NewTask'
import UserConfig from '@/components/UserConfig'
import HostConfig from '@/components/HostConfig'
import WorkStation from '@/components/WorkStation'
import PeriodWorkStation from '@/components/PeriodWorkStation'

Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      name: 'MajorStructure',
      component: MajorStructure,
      children: [
        {
          path: '/NewTask',
          name: 'NewTask',
          component: NewTask
        },
        {
          path: '/UserConfig',
          name: 'UserConfig',
          component: UserConfig
        },
        {
          path: '/HostConfig',
          name: 'HostConfig',
          component: HostConfig
        },
        {
          path: '/WorkStation',
          name: 'WorkStation',
          component: WorkStation
        },
        {
          path: '/PeriodWorkStation',
          name: 'PeriodWorkStation',
          component: PeriodWorkStation
        }
      ]
    }
  ]
})
