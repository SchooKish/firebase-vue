<template>
  <v-card
    :title="title"
    :max-width="maxWidth"
    :min-width="minWidth"
    height="fit-content"
    class="pa-4"
  >
    <slot />
  </v-card>
</template>

<script setup lang="ts">
import {defineProps, withDefaults} from "vue";

interface IProps {
  title?: string,
  maxWidth?: string,
  minWidth?: string
}

const props = withDefaults(defineProps<IProps>(), {
  title: '',
  maxWidth: '500',
  minWidth: '400'
})

</script>