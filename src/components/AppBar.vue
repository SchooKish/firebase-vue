<template>
  <v-app-bar color="primary">
    <template #prepend>
      <v-btn
        v-if="isNotHome"
        :to="{name: 'home'}"
      >
        На главную
      </v-btn>
    </template>

    <template #append>
      <div v-if="userStore.isLogged">
        <v-btn
            :to="{name: 'settings'}"
        >
          Настройки
        </v-btn>
        <v-btn @click="logout">Выйти</v-btn>
      </div>

      <div v-else>
        <v-btn
            v-if="isNotLogin"
            :to="{name: 'login'}"
        >
          Войти
        </v-btn>

        <v-btn
          v-if="isNotRegistration"
          :to="{name: 'registration'}"
        >
          Зарегистроваться
        </v-btn>
      </div>
    </template>
  </v-app-bar>
</template>

<script lang="ts" setup>
import {useUserStore} from "../store/user";
import {useRoute, useRouter} from "vue-router";
import {computed} from "vue";

const userStore = useUserStore();
const route = useRoute();
const router = useRouter();

const isNotHome = computed(() => {
  return route.name !== 'home';
})
const isNotLogin = computed(() => {
  return route.name !== 'login';
})
const isNotRegistration = computed(() => {
  return route.name !== 'registration';
})

const logout = () => {
  userStore.logout();
  this.router.push({name: 'login'});
}
</script>
