<template>
  <div class="grow overflow-auto">
    <Form @submit.prevent="onSubmit" class="grid grid-cols-2 gap-3">
      <FormGroup
        label="Order ID"
        required
        v-model="order_id"
        v-bind="orderIdAttrs"
        :error="errors.order_id"
        :disabled="isLoading"
      ></FormGroup>
      <FormGroup
        label="Seller SKU"
        required
        v-model="seller_sku"
        v-bind="sellerSkuAttrs"
        :error="errors.seller_sku"
        :disabled="isLoading"
      ></FormGroup>
      <FormGroup
        class="col-start-1 col-end-3"
        label="Product Name"
        required
        v-model="product_name"
        v-bind="productNameAttrs"
        :error="errors.product_name"
        :disabled="isLoading"
      ></FormGroup>
      <FormGroup
        label="Variation"
        required
        v-model="variation"
        v-bind="variationAttrs"
        :error="errors.variation"
        :disabled="isLoading"
      ></FormGroup>
      <FormGroup
        label="Quantity"
        required
        v-model="quantity"
        v-bind="quantityAttrs"
        :error="errors.quantity"
        :disabled="isLoading"
      ></FormGroup>
      <FormGroup
        label="Buyer Name"
        v-model="buyer_name"
        v-bind="buyerNameAttrs"
        :error="errors.buyer_name"
        :disabled="isLoading"
      ></FormGroup>
      <FormGroup
        label="Assigne"
        v-model="assigne"
        v-bind="assigneAttrs"
        :error="errors.assigne"
        :disabled="isLoading"
      ></FormGroup>
      <FormGroup
        class="col-start-1 col-end-3"
        label="Buyer Message"
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
    <Button severity="secondary" @click="emit('close')">Cancel</Button>
    <Button type="submit" @click="onSubmit" :loading="isLoading">
      Create
    </Button>
  </div>
</template>

<script setup lang="ts">
import { useForm } from 'vee-validate'
import { object, string } from 'yup'
import useOrders from '~/composables/api/useOrders'
import type { Tables } from '~/database'

interface EditOrderProps {
  id: number | null
}
const props = defineProps<EditOrderProps>()
const emit = defineEmits<{
  (e: 'close'): void
  (e: 'refresh'): Promise<void>
}>()

const { getOneOrder, updateOrder } = useOrders()
const { isLoading, showLoading, hideLoading } = useLoading()
const { $toast } = useNuxtApp()

const { errors, handleSubmit, defineField, setValues } = useForm({
  validationSchema: object<Tables<'order_products'>>({
    order_id: string()
      .required('Order ID is required field')
      .min(6, 'At least 6 character'),
    seller_sku: string()
      .required('Seller SKU is required field')
      .min(1, 'At least 1 character')
      .max(10, 'Max is 10 character'),
    product_name: string().required('Product Name is required field'),
    variation: string().required('Variation is required field'),
    quantity: string().required('Quantity is required field'),
    buyer_name: string().nullable(),
    assigne: string().nullable(),
    buyer_message: string().nullable(),
  }),
})

let initValue: object

const init = async () => {
  showLoading()
  if (!props.id) return
  const { data, error } = await getOneOrder(props.id)
  if (error) {
    $toast.error(error.message)
    hideLoading()
    return
  }
  setValues(data)
  initValue = data
  hideLoading()
}
onMounted(() => init())

const [order_id, orderIdAttrs] = defineField('order_id')
const [seller_sku, sellerSkuAttrs] = defineField('seller_sku')
const [product_name, productNameAttrs] = defineField('product_name')
const [variation, variationAttrs] = defineField('variation')
const [quantity, quantityAttrs] = defineField('quantity')
const [buyer_name, buyerNameAttrs] = defineField('buyer_name')
const [assigne, assigneAttrs] = defineField('assigne')
const [buyer_message, buyerMessageAttrs] = defineField('buyer_message')

const onSubmit = handleSubmit(async (data) => {
  if (!props.id) return
  const diff = getDiffObject(initValue, data)
  try {
    showLoading()
    const { data, error } = await updateOrder(
      diff as Tables<'order_products'>,
      props.id
    )
    if (error) {
      return $toast.error(error.message)
    }
    await emit('refresh')
    emit('close')
  } catch (e: any) {
  } finally {
    hideLoading()
  }
})
</script>
