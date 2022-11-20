import { ofetch } from 'ofetch'

const config = useRuntimeConfig()

export default defineEventHandler(async (event) => {
  const reqBody = await readBody(event)
  const { data, pending, error, refresh } = await ofetch("/", {
    method: "DELETE",
    baseURL: config.public.API_BASE_URL,
    body: reqBody,
  })
  return { data, pending, error, refresh }
})
