<template>
  <v-text-field
      variant="outlined"
      density="compact"
      :type="getType"
      :label="title"
      :value="getVal"
      :rules="getRules"
      :counter="!!maxSymbols || !!minSymbols"
      :append-inner-icon="getIcon"
      @click:appendInner="isShowPass = !isShowPass"
      @input="input($event.target.value)"
  />
</template>

<script setup lang="ts">
import {computed, defineEmits, defineProps, onMounted, reactive, ref, withDefaults} from "vue";

interface IProps {
  value: string,
  title: string,
  isPassword?: boolean,
  isDate?: boolean,
  rules?: string[],
  maxSymbols?: number,
  minSymbols?: number,
}

const props = withDefaults(defineProps<IProps>(), {
  value: '',
  title: 'title',
  isPassword: false,
})

const emits = defineEmits(['update:value']);

const rules = reactive({
  required: value => !!value || 'Обязательное поле',
  max: v => v?.length <= props.maxSymbols || `Муксимум ${props.maxSymbols} символов`,
  min: v => v?.length >= props.minSymbols || `Минимум ${props.minSymbols} символов`,
  email: value => {
    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return pattern.test(value) || 'Некорректный e-mail'
  },
})

onMounted(() => {
  input(getVal.value);
})

const input = (val) => {
  emits('update:value', val)
}

const getVal = computed(() => {
  return props.value;
})

const getRules = computed(() => {
  return props.rules?.map(r => rules[r]);
})

const isShowPass = ref<boolean>(false);

const getType = computed(() => {
  return props.isDate ? 'date' : props.isPassword ? isShowPass.value ? 'text' : 'password' : 'text';
})

const getIcon = computed(() => {
  return props.isPassword ? isShowPass.value ? 'mdi-eye' : 'mdi-eye-off' : '';
})

</script>