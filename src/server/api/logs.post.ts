import { ofetch } from 'ofetch'

const config = useRuntimeConfig()

export default defineEventHandler(async (event) => {
    const reqBody = await readBody(event)
    let res
    const { data, pending, error, refresh } = await ofetch("/get-dms", {
        method: "POST",
        baseURL: config.public.API_BASE_URL,
        body: {
            user_id: "1"
        },
        async onRequest({request, options}) {
          options.body.start_date = reqBody.start_date;
          options.body.end_date = reqBody.end_date;
        },
        async onResponse({request, options, response}) {
            res = response
        }
    });
    return formatReponse(res._data, reqBody.start_date, reqBody.end_date)
})


function formatReponse(res, startDate, endDate) {
    return datesBetween(formatYYYYMMDDToJSDate(startDate), formatYYYYMMDDToJSDate(endDate)).map(date => {
        const formatted = {
            "日付": `${date.getMonth() + 1}月${date.getDate()}日`,
            "気分": "",
            "就寝": "",
            "起床": "",
            "実睡眠": "",
            "他睡眠": "",
            "睡眠計": ""
        }
        const rowInRes = res.find(resRow => formatYYYYMMDDToJSDate(resRow.date).getTime() == date.getTime())
        if (!rowInRes) {
            return formatted;
        }
        const mainSleepMinutes = rowInRes.main_sleep ? Number(rowInRes.main_sleep.minutes_a_sleep): 0;
        const napTimeMinutes = rowInRes.nap_time ? rowInRes.nap_time.reduce((a, c) =>  a + Number(c.minutes_a_sleep), 0) : 0;
        formatted.日付 = `${date.getMonth() + 1}月${date.getDate()}日`
        formatted.気分 = ["😢","🙁","😐","😃","😄"][Number(rowInRes.mood)] || ""
        formatted.就寝 = rowInRes.main_sleep ? rowInRes.main_sleep.sleep_start_time.slice(-5) : ""
        formatted.起床 = rowInRes.main_sleep ? rowInRes.main_sleep.sleep_end_time.slice(-5) : ""
        formatted.実睡眠 = minutesToHHcolonMM(mainSleepMinutes)
        formatted.他睡眠 = minutesToHHcolonMM(napTimeMinutes)
        formatted.睡眠計 = minutesToHHcolonMM(mainSleepMinutes + napTimeMinutes)
        return formatted
    })
}

function minutesToHHcolonMM(minutes) {
    return new Date(minutes * 60 * 1000).toISOString().substring(11, 16);
}

function datesBetween(startDate, endDate) {
    const current = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate())
    const dates = []
    while(current <= endDate) {
        dates.push(new Date(current.getFullYear(), current.getMonth(), current.getDate()))
        current.setDate(current.getDate() + 1)
    }
    return dates;
};

function formatYYYYMMDDToJSDate(date) {
    return new Date(`${date.slice(0,4)}-${date.slice(4,6)}-${date.slice(6,8)}T00:00:00.000Z`)
}