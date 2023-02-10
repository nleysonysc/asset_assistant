import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  let activeUser = ref({});

  const fetchActiveUser = async function(admin) {
    activeUser.value = {
      name: "user's name", 
      email: "user's email", 
      auth: admin === true ? "ADMIN" : "USER"
    }
    return new Promise((resolve, reject)=>{
      resolve(activeUser)
      reject("Could not access user object")
    })
  }

  return { activeUser, fetchActiveUser }
})
