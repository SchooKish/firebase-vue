<template>
  <BaseLayout>
    <BaseCard title="Регистрация">
      <v-form
          class="form"
          v-model="formValid"
      >
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
            v-model:value="formData.password"
            title="Password"
            :rules="['required', 'min', 'max']"
            :min-symbols="8"
            :max-symbols="20"
            is-password
        />

        <v-btn
            color="primary"
            @click="registration"
            :disabled="!formValid"
            :loading="isLoading"
        >
          Зарегистроваться
        </v-btn>
      </v-form>
    </BaseCard>
  </BaseLayout>
</template>

<script setup lang="ts">
import BaseLayout from "../layouts/BaseLayout.vue";
import BaseCard from "../components/BaseCard.vue";
import BaseTextInput from "../components/BaseTextInput.vue";
import {reactive, ref} from "vue";
import {useUserStore} from "../store/user";
import {useRouter} from "vue-router";

const formValid = ref<boolean>(false)
const isLoading = ref<boolean>(false)

const formData = reactive<{username: string, email: string, password: string}>({
  email: '',
  username: '',
  password: '',
})

const userStore = useUserStore()
const router = useRouter()

const registration = async () => {
  if (formValid.value) {
    isLoading.value = true;
    await userStore.registration(formData);
    isLoading.value = false;
    await router.push({name: 'login'})
  }
}
</script>

<style>
.form > div {
  margin-bottom: 10px;
}
</style>