import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

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
      component: () => import('../views/AssetView.vue')
    },
    {
      path: '/asset/:assetTag([a-zA-Z]{4}\\d{4})',
      name: 'assetByTag',
      component: () => import('../views/AssetView.vue')
    },
    {
      path: '/admin/bulkedit',
      name: 'bulkedit',
      component: () => import('../views/BulkEditView.vue')
    },
    {
      path: '/admin/bulkadd',
      name: 'bulkadd',
      component: () => import('../views/BulkAddView.vue')
    }
  ]
})

export default router
