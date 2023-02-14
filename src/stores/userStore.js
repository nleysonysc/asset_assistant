import { ref, watch } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  let activeUser = ref({});
  let userSuggestions = ref([]);
  let userSearch = ref('')
  let loadingSearch = ref(false)

  function activeUserHandler(response) {
    response = JSON.parse(response)
    if ('error' in response) {
      console.log(response.error)
    }
    else {
      activeUser.value = response.result
    }
  }

  function userSuggestionsHandler(response) {
    response = JSON.parse(response)
    if ('error' in response) {
      console.log(response.error)
    }
    else {
      userSuggestions.value = response.result
    }
  }

  const fetchActiveUser = async function() {
    if (import.meta.env.DEV) {
      let admin = true
      activeUser.value = {
        email: "user@example.com", 
        auth: admin === true ? "ADMIN" : "USER"
      }
      return new Promise((resolve, reject)=>{
        resolve(activeUser)
        reject("Could not access user object")
      })
    }
    else {
      google.script.run.withSuccessHandler(activeUserHandler).activeUser();
    }
  }

  const fetchUserSuggestions = async function(search) {
    if (import.meta.env.DEV) {
      userSuggestions.value = [
        {title: 'fname lname (email@example.com)', value:'email@example.com'},
        {title: 'fname2 lname2 (email2@example.com)', value:'email2@example.com'}
      ]
      return new Promise((resolve, reject)=>{
        resolve(userSuggestions)
        reject("Could not access user object")
      })
    }
    else {
      google.script.run.withSuccessHandler(userSuggestionsHandler).userSuggestions(search);
    }
  }

  watch(userSearch, async(newUserSearch) => {
    if (newUserSearch.length > 2){
      fetchUserSuggestions(newUserSearch)
    }
  })

  return { activeUser, fetchActiveUser, activeUser, loadingSearch, fetchUserSuggestions, userSuggestions, userSearch }
})
