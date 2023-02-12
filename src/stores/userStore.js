import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  let activeUser = ref({});

  function activeUserHandler(response) {
    response = JSON.parse(response)
    if ('error' in response) {
      console.log(response.error)
    }
    else {
      activeUser.value = response.result
    }
  }

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

    google.script.run.withSuccessHandler(activeUserHandler).activeUser();
  }

  return { activeUser, fetchActiveUser }
})
