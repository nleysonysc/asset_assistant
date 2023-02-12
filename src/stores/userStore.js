import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  let activeUser = ref({});

  const fetchActiveUser = async function() {
    if (import.meta.env.DEV) {
      let admin = true
      activeUser.value = {
        email: "user's email", 
        auth: admin === true ? "ADMIN" : "USER"
      }
      return new Promise((resolve, reject)=>{
        resolve(activeUser)
        reject("Could not access user object")
      })
    }

    google.script.run.withSuccessHandler(response=> {activeUser.value = response.result}).activeUser();
  }

  return { activeUser, fetchActiveUser }
})
