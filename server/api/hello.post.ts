import { supabase } from '../supabase'

export default defineEventHandler(async (event) => {
  console.log(supabase)
  return {
    status: 'Hello',
  }
})
