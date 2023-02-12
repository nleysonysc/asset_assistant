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
            <RouterLink to="/"><v-btn><v-icon size="x-large">mdi-home</v-icon></v-btn></RouterLink>
          </nav>
          
          <AdminNav v-if="userStore.activeUser?.auth === 'ADMIN'" />
          {{ userStore.activeUser }}

          <v-btn @click="_=> showSearchDialog = true">
            <v-icon size="x-large">mdi-magnify</v-icon>
          </v-btn>

          <v-btn v-if="showScanner" @click="_=> showScanDialog = true">
            <v-icon size="x-large">mdi-barcode</v-icon>
          </v-btn>
          <v-tooltip v-else text="Barcode scanning is not available">
            <template v-slot:activator="{ props }">
              <v-btn ><v-icon size="x-large" v-bind="props" color="warning">mdi-barcode-off</v-icon></v-btn>
            </template>
          </v-tooltip>

          <v-btn @click="_=> darkMode = !darkMode">
            <v-icon size="x-large">mdi-brightness-4</v-icon>
          </v-btn>

        </v-app-bar>

        <v-dialog
          v-model="showSearchDialog"
          width="w-100"
        >
          <v-card>
            <v-card-actions>
              <v-icon color="secondary">mdi-magnify</v-icon>
              <v-spacer></v-spacer>
              <v-btn @click="showSearchDialog = false">
                <v-icon>mdi-close-circle-outline</v-icon>
              </v-btn>
            </v-card-actions>
            <Search :onSelect="_=> showSearchDialog = false" />
          </v-card>
        </v-dialog>

        <v-dialog
          v-model="showScanDialog"
          width="w-100"
        >
          <v-card>
            <v-btn @click="showScanDialog = false"><v-icon>mdi-close-circle-outline</v-icon></v-btn>
            <Scanner />
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
