import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AssetView from '../views/AssetView.vue'
import BulkEditView from '../views/BulkEditView.vue'
import BulkAddView from '../views/BulkAddView.vue'
import AddView from '../views/AddView.vue'
import BulkCheckInView from '../views/BulkCheckInView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/asset/:rowNum(\\d+)',
      name: 'assetByRowNum',
      component: AssetView
    },
    {
      path: '/asset/:assetTag([a-zA-Z]{2}[a-zA-Z0-9]{2}\\d{4})',
      name: 'assetByTag',
      component: AssetView
    },
    {
      path: '/admin/bulkedit',
      name: 'bulkedit',
      component: BulkEditView
    },
    {
      path: '/admin/bulkadd',
      name: 'bulkadd',
      component: BulkAddView
    },
    {
      path: '/admin/add',
      name: 'add',
      component: AddView
    },
    {
      path: '/admin/bulkcheckin',
      name: 'bulkcheckin',
      component: BulkCheckInView
    }
  ]
})

export default router
