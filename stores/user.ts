export interface UserLogin {
  email: string
  password: string
}
export const useUserStore = defineStore('userStore', () => {
  const { $supabase } = useNuxtApp()
  const user = ref()
  const login = async (userData: UserLogin) => {
    const { data, error } = await $supabase.auth.signInWithPassword(userData)
    user.value = data.user
    return { data, error }
  }

  const signUp = async (userData: UserLogin) => {
    const { data, error } = await $supabase.auth.signUp(userData)
    if (error) return createError(error)
    return data
  }

  const logOut = async () => {
    return await $supabase.auth.signOut()
  }

  return { signUp, login, logOut }
})
