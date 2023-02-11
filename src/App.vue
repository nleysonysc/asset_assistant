<script setup>
  import { onMounted, ref } from 'vue';
  import { RouterLink, RouterView, useRouter } from 'vue-router'
  import { useUserStore } from './stores/userStore'
  import Scanner from "./components/Scanner.vue"
  import AdminNav from "./components/admin/AdminNav.vue"
  import Search from './components/Search.vue'

  let userStore = useUserStore();
  userStore.fetchActiveUser(true);
  let router = useRouter()

  let showScanner = ref(false);
  onMounted(()=>{
    showScanner.value = "BarcodeDetector" in window ? true : false;
  });

  let darkMode = ref(true);
  let showSearchDialog = ref(false);
  let showScanDialog = ref(false);
</script>

<template>
  <v-theme-provider :theme="darkMode ? 'dark' : 'light'">
  <v-app>
    <v-main>
      <v-container fluid>
        <v-app-bar app dense>
          <nav>
            <RouterLink to="/"><v-btn><v-icon size="x-large" >mdi-home</v-icon></v-btn></RouterLink>
          </nav>
          
          <AdminNav v-if="userStore.activeUser?.auth === 'ADMIN'" />
          {{ userStore.activeUser }}
          
          <Scanner v-if="showScanner" />

          <v-btn @click="_=> darkMode = !darkMode">
            <v-icon size="x-large">mdi-brightness-4</v-icon>
          </v-btn>

          <v-btn @click="_=> showSearchDialog = true">
            <v-icon size="x-large">mdi-magnify</v-icon>
          </v-btn>

          <v-btn @click="_=> showScanDialog = true">
            <v-icon size="x-large">mdi-barcode-scan</v-icon>
          </v-btn>

        </v-app-bar>

        <v-dialog
          v-model="showSearchDialog"
          width="auto"
        >
          <v-card>
            <v-btn @click="showSearchDialog = false"><v-icon>mdi-close-circle-outline</v-icon></v-btn>
            <Search :onSelect="_=> showSearchDialog = false" />
          </v-card>
        </v-dialog>

        <RouterView />
      </v-container>
    </v-main>
  </v-app>
</v-theme-provider>
</template>

<style scoped>
  a:visited {
    color: inherit;
  }

</style>
