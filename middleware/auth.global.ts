import { useAuth } from '~/composables/api/useAuth'

export default defineNuxtRouteMiddleware(async (to) => {
  const { getSession } = useAuth()
  const { data, error } = await getSession()

  if (to.path === '/login' && !!data.session) {
    return navigateTo('/')
  }
  if (to.path === '/login' && (!data.session || error)) {
    return
  }

  if (!data.session) {
    return navigateTo({
      path: '/login',
      query: {
        redirect_uri: to.fullPath,
      },
    })
  }
})
