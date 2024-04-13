import { createRouter, createWebHistory } from 'vue-router'
import PlaylistItemView from '../views/PlaylistItemView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'demo',
      component: PlaylistItemView
    }
  ]
})

export default router
