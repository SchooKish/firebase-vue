<template>
  <BaseLayout>
    <UserList v-if="userStore.isLogged" />
    <Banner v-else />
  </BaseLayout>
</template>

<script lang="ts" setup>
import Banner from '../components/Banner.vue';
import UserList from "../components/UserList.vue";
import BaseLayout from "../layouts/BaseLayout.vue";
import {useUserStore} from "../store/user";

const userStore = useUserStore();
</script>