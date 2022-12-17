import { ofetch } from 'ofetch'

const config = useRuntimeConfig()

export default defineEventHandler(async (event) => {
    const reqQuery = await getQuery(event)
    return mockResponse(new Date(reqQuery.date))

    let res
    // /1.2/user/[user-id]/sleep/list.json
    const { data, pending, error, refresh } = await ofetch("", {
        method: "GET",
        baseURL: "", // TODO:
        body: {
        },
        async onRequest({request, options}) {
            // TODO
        },
        async onResponse({request, options, response}) {
            res = response
        }
    });
    return res._data
})

function formatResponse(fbRes){
    return {
        "minutesAsleep": fbRes.sleep.reduce((sum, sleep) => sum + sleep.minutesAsleep, 0),
        "sleep": fbRes.sleep.map(sleep => ({"startTime": sleep.startTime, "endTime": sleep.endTime}))
    }
}

function mockResponse(date) {
    return formatResponse({
        "pagination": {
          "afterDate": `${date.getFullYear()}-${zeroPadding(2, date.getMonth() + 1)}-${zeroPadding(2, date.getDate())}`,
          "limit": 1,
          "next": "https://api.fitbit.com/1.2/user/-/sleep/list.json?offset=1&limit=1&sort=asc&afterDate=2020-05-01",
          "offset": 0,
          "previous": "",
          "sort": "asc"
        },
        "sleep": [
          {
            "dateOfSleep": `${date.getFullYear()}-${zeroPadding(2, date.getMonth() + 1)}-${zeroPadding(2, date.getDate())}`,
            "duration": 20760000,
            "efficiency": 50,
            "endTime": `${date.getFullYear()}-${zeroPadding(2, date.getMonth() + 1)}-${zeroPadding(2, date.getDate())}T06:20:00.000`,
            "infoCode": 0,
            "isMainSleep": true,
            "levels": {
              "data": [
                {
                  "dateTime": `${date.getFullYear()}-${zeroPadding(2, date.getMonth() + 1)}-${zeroPadding(2, date.getDate())}T00:33:30.000`,
                  "level": "wake",
                  "seconds": 810
                },
                {
                  "dateTime": `${date.getFullYear()}-${zeroPadding(2, date.getMonth() + 1)}-${zeroPadding(2, date.getDate())}T00:47:00.000`,
                  "level": "light",
                  "seconds": 30
                },
                {
                  "dateTime": `${date.getFullYear()}-${zeroPadding(2, date.getMonth() + 1)}-${zeroPadding(2, date.getDate())}T00:47:30.000`,
                  "level": "deep",
                  "seconds": 270
                },
                {
                  "dateTime": `${date.getFullYear()}-${zeroPadding(2, date.getMonth() + 1)}-${zeroPadding(2, date.getDate())}T06:04:00.000`,
                  "level": "deep",
                  "seconds": 960
                }
              ],
              "shortData": [
                {
                  "dateTime": `${date.getFullYear()}-${zeroPadding(2, date.getMonth() + 1)}-${zeroPadding(2, date.getDate())}T01:05:00.000`,
                  "level": "wake",
                  "seconds": 60
                },
                {
                  "dateTime": `${date.getFullYear()}-${zeroPadding(2, date.getMonth() + 1)}-${zeroPadding(2, date.getDate())}T01:41:00.000`,
                  "level": "wake",
                  "seconds": 60
                },
                {
                  "dateTime": `${date.getFullYear()}-${zeroPadding(2, date.getMonth() + 1)}-${zeroPadding(2, date.getDate())}T06:19:30.000`,
                  "level": "wake",
                  "seconds": 30
                }
              ],
              "summary": {
                "deep": {
                  "count": 6,
                  "minutes": 61,
                  "thirtyDayAvgMinutes": 0
                },
                "light": {
                  "count": 23,
                  "minutes": 193,
                  "thirtyDayAvgMinutes": 0
                },
                "rem": {
                  "count": 6,
                  "minutes": 41,
                  "thirtyDayAvgMinutes": 0
                },
                "wake": {
                  "count": 18,
                  "minutes": 51,
                  "thirtyDayAvgMinutes": 0
                }
              }
            },
            "logId": 36718808202,
            "logType": "auto_detected",
            "minutesAfterWakeup": 0,
            "minutesAsleep": 295,
            "minutesAwake": 51,
            "minutesToFallAsleep": 0,
            "startTime": `${date.getFullYear()}-${zeroPadding(2, date.getMonth() + 1)}-${zeroPadding(2, date.getDate())}T00:33:30.000`,
            "timeInBed": 346,
            "type": "stages"
          }
        ]
      });      
}

function zeroPadding(digit, str) {
  return ("0".repeat(digit) + str).slice(-digit);
}