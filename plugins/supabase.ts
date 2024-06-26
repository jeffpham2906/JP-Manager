import { createClient } from '@supabase/supabase-js'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()

  const supabase = createClient(
    config.app.supabaseUrl,
    config.app.supabaseKey
  )
  return {
    provide: {
      supabase,
    },
  }
})
