import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  let activeUser;

  const fetchActiveUser = function() {
    activeUser = {name: "user's name", email: "user's email"}
    return activeUser
  }

  const checkAuth = function() {
    return "USER"
  }

  return { activeUser, fetchActiveUser, checkAuth }
})
