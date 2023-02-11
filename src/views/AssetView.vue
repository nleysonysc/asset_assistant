<script setup>
  import { watch } from 'vue'
  import { useAssetStore } from '../stores/assetStore'
  import { useRoute } from "vue-router"

  let assetStore = useAssetStore()
  let route = useRoute()
  
  if ("rowNum" in route.params) { 
    watch(_=> route.params.rowNum, async (newRowNum) => {
      assetStore.fetchAssetByRow(newRowNum)
    }, {immediate: true})
  }
  else if ("assetTag" in route.params) { 
    assetStore.fetchAssetByTag(route.params.assetTag)
  }
</script>

<template>
  <div>
    {{ assetStore.activeAsset }}
    <span>Show basic info (location, user, checked in, etc) {{ assetStore.activeAsset.get("Location") }}</span>
    <ul>
      <li><v-btn>Check In(v if checked out)</v-btn></li>
      <li><v-btn>Check Out(v if checked in, show modal with check out form)</v-btn></li>
      <li><v-btn>
        <a href="https://mail.google.com/mail/?view=cm&to=name@example.com&su=SUBJECT&body=BODY&bcc=dakota@example.com" target="_blank">Submit Ticket</a>
        </v-btn>
      </li>
    </ul>
    
  </div>
</template>

<style scoped>
  ul {
    list-style-type: none;
  }
</style>
