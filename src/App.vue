<template>
  <v-app>
    <AppBar />
    <v-main>
      <router-view />
    </v-main>

    <v-snackbar v-model="isShow" color="success">
      {{ text }}
    </v-snackbar>

    <ErrorAlert />
  </v-app>
</template>

<script lang="ts" setup>
import AppBar from "./components/AppBar.vue";
import {useNotifyStore} from "./store/notify";
import {computed, onBeforeMount} from "vue";
import ErrorAlert from "./components/ErrorAlert.vue";
import {auth} from "./firebaseInit";
import {useRouter} from "vue-router";
import {useUserStore} from "./store/user";

const notifyStore = useNotifyStore();
const isShow = computed(() => {
  return notifyStore.isShow
})
const text = computed(() => {
  return notifyStore.notifyText;
})

const router = useRouter();
const userStore = useUserStore();

const authListener = auth.onAuthStateChanged(user => {
  if (user) {
    userStore.getUserData(user.uid);
  } else {
    router.push({name: 'login'})
  }
})

onBeforeMount(() => {
  authListener();
})
</script>
