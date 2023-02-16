<script setup>
  import { ref } from 'vue'
  import { useAssetStore } from '../stores/assetStore'

  let assetStore = useAssetStore();
  let tagInput = ref("")
  let loading = ref(false)
  let messages = ref("asdf")
  let rules = [
    textAreaValue => {
      if (!textAreaValue || textAreaValue === ''){return "Enter one 8 character asset tag per line"}
      return true
    },
    textAreaValue => {
      let lines = textAreaValue.split('\n').filter(line => line !== '')
      for (let i=0; i < lines.length; i++){
        if (lines[i].match(/^[a-zA-Z]{2}[a-zA-Z0-9]{2}\d{4}$/) === null){
          return "Invalid tag at line "+(i+1)
        }
      }
      return true
    }
  ]

  function onComplete(response, userObject) {
    loading.value = false
    messages.value = "Operation finished successfully"
  }

  async function submit(e){
    let event = await e
    if (event.valid){
      loading.value = true
      let tags = tagInput.value.split('\n').filter(line => line !== '')
      assetStore.bulkCheckIn(tags, onComplete)
    }
  }

</script>

<template>
  <v-form 
    validate-on="submit"
    fast-fail
    @submit.prevent="submit"
  >
    <v-textarea
        auto-grow
        clearable
        prepend-inner-icon="mdi-tag"
        label="Asset Tags"
        rows="10"
        autofocus
        hint="Enter one asset tag per line"
        :rules="rules"
        v-model="tagInput"
        :loading="loading"
        :messages="messages"
    >
    </v-textarea>
    <v-btn type="submit">Check Assets In</v-btn>
  </v-form>
</template>

<style scoped>
</style>
