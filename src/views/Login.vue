<template>
  <BaseLayout>
    <BaseCard title="Авторизация">
      <v-form v-model="formValid">
        <BaseTextInput
          v-model:value="formData.email"
          title="E-mail"
          :rules="['required', 'email']"
        />
        <BaseTextInput
            v-model:value="formData.password"
            title="Password"
            :rules="['required', 'min', 'max']"
            :min-symbols="8"
            :max-symbols="20"
            is-password
        />

        <v-btn
            color="primary"
            :disabled="!formValid"
            :loading="isLoading"
            @click="login">Войти</v-btn>
      </v-form>
    </BaseCard>
  </BaseLayout>
</template>

<script lang="ts" setup>
import BaseLayout from "../layouts/BaseLayout.vue";
import {useUserStore} from "../store/user";
import {useRouter} from "vue-router";
import BaseCard from "../components/BaseCard.vue";
import BaseTextInput from "../components/BaseTextInput.vue";
import {reactive, ref} from "vue";

const userStore = useUserStore();
const router = useRouter();

const isLoading = ref<boolean>(false)
const formValid = ref<boolean>(false)

const formData = reactive<{email: string, password: string}>({
  email: '',
  password: '',
})

const login = async () => {
  if (formValid.value) {
    isLoading.value = true;
    await userStore.login(formData);
    isLoading.value = false;
    await router.push({name: 'home'})
  }
}
</script>