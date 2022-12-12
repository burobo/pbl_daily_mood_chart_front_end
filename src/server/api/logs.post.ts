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
            "メモ": "",
            "実睡眠時間": "",
            "睡眠時間": "",
            "睡眠効率": "",
        }
        const rowInRes = res.find(resRow => formatYYYYMMDDToJSDate(resRow.date).getTime() == date.getTime())
        if (!rowInRes) {
            return formatted;
        }
        const sumSleepMinutes = rowInRes.sleeps
            ? rowInRes.sleeps.reduce((a, c) => a + (formatYYYYHyphenMMHyphenDD_ToHHColonMMToJSDate(c.sleep_end_time).getTime() - formatYYYYHyphenMMHyphenDD_ToHHColonMMToJSDate(c.sleep_start_time).getTime())  / 1000 / 60 , 0)
            : 0;
        const actualSleepMinutes = Number(rowInRes.sleep_minutes || 0)
        formatted.日付 = `${date.getMonth() + 1}月${date.getDate()}日`
        formatted.気分 = ["😢","🙁","😐","😃","😄"][Number(rowInRes.mood)] || ""
        formatted.メモ = rowInRes.memo
        formatted.実睡眠時間 = minutesToHHcolonMM(actualSleepMinutes)
        formatted.睡眠時間 = minutesToHHcolonMM(sumSleepMinutes)
        formatted.睡眠効率 = sumSleepMinutes === 0 ? "-" : ((actualSleepMinutes / sumSleepMinutes) * 100).toFixed(2)
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

function formatYYYYHyphenMMHyphenDD_ToHHColonMMToJSDate(date) {
    return new Date(date.replace(' ', 'T'));
}