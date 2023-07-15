<template>
  <BaseCard title="Настроки пользователя">
    <v-form class="form">
      <BaseTextInput
          v-model:value="formData.email"
          title="E-mail"
          :rules="['required', 'email']"
      />

      <BaseTextInput
          v-model:value="formData.username"
          title="Username"
          :rules="['required', 'max']"
          :max-symbols="15"
      />

      <BaseTextInput
          v-model:value="formData.fullName"
          title="ФИО"
      />

      <BaseTextInput
          v-model:value="formData.birthdate"
          title="Дата рождения"
          is-date
      />

      <v-textarea
          label="О себе"
          variant="outlined"
          v-model="formData.about"
      />

      <v-btn
          color="primary"
          :loading="isLoading"
          @click="save"
      >
        Сохранить
      </v-btn>
    </v-form>
  </BaseCard>
</template>

<script setup lang="ts">
import {onBeforeMount, reactive, ref} from "vue";
import BaseCard from "./BaseCard.vue";
import BaseTextInput from "./BaseTextInput.vue";
import {IUserData, useUserStore} from "../store/user";
import {useRouter} from "vue-router";

const formData = reactive<IUserData>({
  email: '',
  username: '',
  fullName: '',
  birthdate: '',
  about: '',
})

const userStore = useUserStore();
const router = useRouter();

onBeforeMount(() => {
  for (const key in formData) {
    if (!!userStore.data[key]) {
      formData[key] = userStore.data[key];
    }
  }
})

const isLoading = ref<boolean>(false)

const save = async () => {
  isLoading.value = true;
  const data = {}
  for (const key in formData) {
    if (!!formData[key]) data[key] = formData[key]
  }
  await userStore.updateUserInfo(data);
  isLoading.value = false;
  await router.push({name: 'home'});
}
</script>

<style>
.form > div {
  margin-bottom: 10px;
}
</style>