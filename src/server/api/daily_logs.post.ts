import { ofetch } from 'ofetch'

const config = useRuntimeConfig()

export default defineEventHandler(async (event) => {
    const reqBody = await readBody(event)
    let res
    const { data, pending, error, refresh } = await ofetch("/get-dms", {
        method: "POST",
        baseURL: config.public.API_BASE_URL,
        body: {
            user_id: config.public.USER_ID
        },
        async onRequest({request, options}) {
          options.body.start_date = reqBody.start_date;
          options.body.end_date = reqBody.end_date;
        },
        async onResponse({request, options, response}) {
            res = response
        }
    });
    return res._data
})
