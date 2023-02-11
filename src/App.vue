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

  let darkMode = ref(true);
</script>

<template>
  <v-theme-provider :theme="darkMode ? 'dark' : 'light'">
  <v-app>
    <v-main>
      <v-container fluid>
        <v-app-bar app dense>
          <nav>
            <RouterLink to="/">Home</RouterLink>
          </nav>
          
          <AdminNav v-if="userStore.activeUser?.auth === 'ADMIN'" />
          {{ userStore.activeUser }}
          
          <Scanner v-if="showScanner" />

          <v-btn @click="_=> darkMode = !darkMode">
            <v-icon>mdi-brightness-4</v-icon>
          </v-btn>
        </v-app-bar>

        <RouterView />
      </v-container>
    </v-main>
  </v-app>
</v-theme-provider>
</template>

<style scoped>

</style>
