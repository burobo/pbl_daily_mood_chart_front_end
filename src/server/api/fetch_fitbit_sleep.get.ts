import { ofetch } from 'ofetch'

const config = useRuntimeConfig()

export default defineEventHandler(async (event) => {
    const reqQuery = await getQuery(event)
    let res
    const { data, pending, error, refresh } = await ofetch("", {
        method: "GET",
        baseURL: `https://api.fitbit.com/1.2/user/${reqQuery.user_id}/sleep/date/${reqQuery.date}.json`, 
        headers: {
          accept: "application/json",
          authorization: `Bearer ${reqQuery.access_token}`,
        },
        async onResponse({request, options, response}) {
            res = response
        }
    });
    return formatResponse(res._data)
})

function formatResponse(fbRes){
    return {
        "minutesAsleep": fbRes.sleep.reduce((sum, sleep) => sum + sleep.minutesAsleep, 0),
        "sleep": fbRes.sleep.map(sleep => ({"startTime": sleep.startTime, "endTime": sleep.endTime}))
    }
}

function zeroPadding(digit, str) {
  return ("0".repeat(digit) + str).slice(-digit);
}