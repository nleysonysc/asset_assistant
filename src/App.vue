<script setup>
  import { onMounted, ref } from 'vue';
  import { RouterLink, RouterView } from 'vue-router'
  import { useUserStore } from './stores/userStore'
  import Scanner from "./components/Scanner.vue"
  import AdminNav from "./components/admin/AdminNav.vue"

  let userStore = useUserStore();
  userStore.fetchActiveUser(true);

  let showScanner = ref(false);
  onMounted(()=>{
    showScanner.value = "BarcodeDetector" in window ? true : false;
  });

</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink>
      </nav>
      
      <AdminNav v-if="userStore.activeUser?.auth === 'ADMIN'" />
      {{ userStore.activeUser }}
      
      <Scanner v-if="showScanner" />
    </div>
  </header>

  <RouterView />
</template>

<style scoped>

</style>
