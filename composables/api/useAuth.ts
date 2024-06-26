export const useAuth = () => {
  const { $supabase } = useNuxtApp()
  const login = (payload: UserLogin) => {
    return $supabase.auth.signInWithPassword({
      ...payload,
    })
  }
  const getSession = () => {
    return $supabase.auth.getSession()
  }
  return { login, getSession }
}
