import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AssetView from '../views/AssetView.vue'
import BulkEditView from '../views/BulkEditView.vue'
import BulkAddView from '../views/BulkAddView.vue'

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
      path: '/asset/:assetTag([a-zA-Z]{4}\\d{4})',
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
    }
  ]
})

export default router
