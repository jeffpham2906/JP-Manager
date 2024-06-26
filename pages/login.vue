<template>
  <div>
    <div class="w-screen max-w-96 rounded-md bg-white p-8">
      <h1 class="text-3xl text-primary">Welcome back!</h1>
      <span class="mb-6 block text-gray-600"
        >Hi there✋, sign in to continue</span
      >
      <Form @submit.prevent="onSubmit" validation-mode="lazy">
        <div class="space-y-4 text-gray-900">
          <FormGroup
            v-model="email"
            label="Email"
            name="email"
            placeholder="Enter email"
            v-bind="emailAttrs"
            :error="errors.email"
          />
          <FormGroup
            v-model="password"
            :label="$t('Password')"
            name="password"
            type="password"
            :placeholder="$t('Enter password')"
            v-bind="passwordAttrs"
            :error="errors.password"
          />
        </div>
        <div class="mt-6 flex flex-col items-center justify-center gap-2">
          <Button
            class="w-32"
            type="submit"
            @click="onSubmit"
            :loading="isLoading"
          >
            {{ $t('Log in') }}
          </Button>
        </div>
      </Form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useForm } from 'vee-validate'
import type { RouteLocationRaw } from 'vue-router'
import { object, string } from 'yup'

definePageMeta({
  layout: 'auth',
})
const route = useRoute()
const { $toast } = useNuxtApp()
const { t } = useI18n()
const { login } = useUserStore()
const { isLoading, showLoading, hideLoading } = useLoading()
const { errors, handleSubmit, defineField, setFieldError } = useForm({
  validationSchema: object({
    email: string()
      .required(t('Email is required field'))
      .min(6, t('At least 6 character'))
      .email(t('Invalid email')),
    password: string()
      .required(t('Password is required field'))
      .min(6, t('At least 6 character')),
  }),
})

const [email, emailAttrs] = defineField('email', {
  validateOnModelUpdate: false,
})
const [password, passwordAttrs] = defineField('password', {
  validateOnModelUpdate: false,
})
const onSubmit = handleSubmit(
  async (values) => {
    showLoading()
    const { error } = await login(values as UserLogin)
    if (error) {
      setFieldError('email', error.message)
      hideLoading()
      return
    }
    hideLoading()

    const navigatePath = (route.query?.redirect_uri || '/') as RouteLocationRaw
    $toast.success(t('Login success'))
    return navigateTo(navigatePath)
  },
  ({ errors }) => {
    const firstError = Object.keys(errors)[0]
    const el: HTMLElement | null = document.querySelector(
      `[name=${firstError}]`
    )
    el?.scrollIntoView({
      behavior: 'smooth',
    })
    el?.focus()
  }
)
</script>
