<template>
  <v-dialog persistent v-model="isShow">
    <BaseCard title="Error">
      <v-card-text>{{text}}</v-card-text>
      <v-card-actions>
        <v-btn color="primary" @click="close">OK</v-btn>
      </v-card-actions>
    </BaseCard>
  </v-dialog>
</template>

<script setup lang="ts">
  import {useNotifyStore} from "../store/notify";
  import {computed} from "vue";
  import BaseCard from "./BaseCard.vue";

  const error = useNotifyStore();
  const isShow = computed(() => {
    return error.isShowError;
  })
  const text = computed(() => {
    return error.errorText;
  })
  const close = () => {
    error.closeError();
  }
</script>