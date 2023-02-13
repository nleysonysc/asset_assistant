<script setup>
  import { ref, watch } from 'vue';
  import { useRouter } from 'vue-router';
  
  let assetTag = ref("")
  let router = useRouter()

  let props = defineProps({
    onNavigate: Function
  })

  watch(assetTag, (newTag) => {
    if (newTag.match(/^[a-zA-Z]{4}\d{4}$/)){
      if (typeof props.onNavigate == "function") {props.onNavigate(newTag)}
      router.push({name: 'assetByTag', params: {'assetTag': newTag}})
    }
  })

</script>

<template>
      <v-text-field
        v-model="assetTag"
        clearable
        label="Go To Asset"
        variant="underlined"
        autofocus
        density="comfortable"
        height="auto"
        hint="Enter an 8 character asset tag"
        class="pa-6"
      >
      </v-text-field>
</template>

<style scoped>

</style>