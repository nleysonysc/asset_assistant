<script setup>
  import { ref, watch } from 'vue'
  import { useUserStore } from '../stores/userStore'

  let userStore = useUserStore();
  const props = defineProps({
    onSubmit: Function,
    buttonText: String
  })
  
  let forMe = ref(true)
  let selectedUser = ref(userStore.activeUser.email)

  function onSubmit() {
    if (typeof props.onSubmit === 'function'){
      props.onSubmit(selectedUser.value)
    }
  }
  
  watch(forMe, (newVal) => {
    if (newVal === true) {
      selectedUser.value = userStore.activeUser.email
    }
    else {
      selectedUser.value = ''
    }
  })

</script>

<template>
  <v-btn-toggle v-model="forMe" group mandatory>
    <v-btn variant="tonal" color="secondary-darken-1" class="ma-2" :value="true">For Me</v-btn>
    <v-btn variant="tonal" color="secondary-darken-1" class="ma-2" :value="false">For Someone Else</v-btn>
  </v-btn-toggle>
  <v-autocomplete
    :items="userStore.userSuggestions"
    v-model="selectedUser"
    v-model:search="userStore.userSearch"
    hide-no-data
    :loading="userStore.loadingSearch"
    density="comfortable"
    variant="underlined"
    class="pa-6"
    clearable
    label="Check out for"
    autofocus
    hint="Enter a name or email address"
  >
  </v-autocomplete>
  <v-btn @click="onSubmit">{{ props.buttonText }}</v-btn>
</template>

<style scoped>

</style>
