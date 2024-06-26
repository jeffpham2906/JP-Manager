<template>
  <div class="grow overflow-auto">
    <Form @submit.prevent="onSubmit" class="grid grid-cols-2 gap-3">
      <FormGroup
        :label="$t('order_id')"
        required
        v-model="order_id"
        v-bind="orderIdAttrs"
        :error="errors.order_id"
        :disabled="isLoading"
      ></FormGroup>
      <FormGroup
        :label="$t('seller_sku')"
        required
        v-model="seller_sku"
        v-bind="sellerSkuAttrs"
        :error="errors.seller_sku"
        :disabled="isLoading"
      ></FormGroup>
      <FormGroup
        class="col-start-1 col-end-3"
        :label="$t('product_name')"
        required
        v-model="product_name"
        v-bind="productNameAttrs"
        :error="errors.product_name"
        :disabled="isLoading"
      ></FormGroup>
      <FormGroup
        :label="$t('variation')"
        required
        v-model="variation"
        v-bind="variationAttrs"
        :error="errors.variation"
        :disabled="isLoading"
      ></FormGroup>
      <FormGroup
        :label="$t('quantity')"
        required
        v-model="quantity"
        v-bind="quantityAttrs"
        :error="errors.quantity"
        :disabled="isLoading"
      ></FormGroup>
      <FormGroup
        :label="$t('buyer_name')"
        v-model="buyer_name"
        v-bind="buyerNameAttrs"
        :error="errors.buyer_name"
        :disabled="isLoading"
      ></FormGroup>
      <FormGroup
        :label="$t('assigne')"
        v-model="assigne"
        v-bind="assigneAttrs"
        :error="errors.assigne"
        :disabled="isLoading"
      ></FormGroup>
      <FormGroup
        class="col-start-1 col-end-3"
        :label="$t('buyer_message')"
        type="textarea"
        rows="4"
        v-model="buyer_message"
        v-bind="buyerMessageAttrs"
        :error="errors.buyer_message"
        :disabled="isLoading"
      ></FormGroup>
    </Form>
  </div>
  <div class="flex justify-end gap-3 pt-5">
    <Button severity="secondary" @click="emit('close')">
      {{ $t('cancel') }}
    </Button>
    <Button type="submit" @click="onSubmit" :loading="isLoading">
      {{ $t('create_order') }}
    </Button>
  </div>
</template>

<script setup lang="ts">
import { useForm } from 'vee-validate'
import { object, string } from 'yup'
import useOrders from '~/composables/api/useOrders'
import type { Tables } from '~/database'

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'onCreated'): Promise<void>
}>()

const { createOrder } = useOrders()
const { isLoading, showLoading, hideLoading } = useLoading()
const { $toast, $i18n } = useNuxtApp()
const { t } = $i18n

const { errors, handleSubmit, defineField, values } = useForm({
  validationSchema: object<Tables<'order_products'>>({
    order_id: string().required(t('order_id_is_required')),
    seller_sku: string().required(t('seller_sku_is_required')),

    product_name: string().required(t('product_name_is_required')),
    variation: string().required(t('variation_is_required')),
    quantity: string().required(t('quantity_is_required')),
    buyer_name: string(),
    assigne: string(),
    buyer_message: string(),
  }),
})

const [order_id, orderIdAttrs] = defineField('order_id')
const [seller_sku, sellerSkuAttrs] = defineField('seller_sku')
const [product_name, productNameAttrs] = defineField('product_name')
const [variation, variationAttrs] = defineField('variation')
const [quantity, quantityAttrs] = defineField('quantity')
const [buyer_name, buyerNameAttrs] = defineField('buyer_name')
const [assigne, assigneAttrs] = defineField('assigne')
const [buyer_message, buyerMessageAttrs] = defineField('buyer_message')

const onSubmit = handleSubmit(async (data) => {
  data.created_time = new Date()
  try {
    showLoading()
    const { error } = await createOrder(data as Tables<'order_products'>)
    if (error) {
      return $toast.error(error.message)
    }
    await emit('onCreated')
    emit('close')
  } catch (e: any) {
  } finally {
    hideLoading()
  }
})
</script>
