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
            const sleepHours = response._data.map(record=>record.sleeps).flat().map(record=>{
                const sleepStartTime = new Date(record.sleep_start_time.replace(" ","T"));
                const sleepEndTime = new Date(record.sleep_end_time.replace(" ","T"));
                return hoursBetween(sleepStartTime, sleepEndTime)
            }).flat();
            res = datesBetween(formatYYYYMMDDToJSDate(reqBody.start_date), formatYYYYMMDDToJSDate(reqBody.end_date)).map(date=>{
                const format = {
                    "日付":`${date.getMonth() + 1}/${date.getDate()}`,
                    "0" :"",
                    "1" :"",
                    "2" :"",
                    "3" :"",
                    "4" :"",
                    "5" :"",
                    "6" :"",
                    "7" :"",
                    "8" :"",
                    "9" :"",
                    "10": "",
                    "11": "",
                    "12": "",
                    "13": "",
                    "14": "",
                    "15": "",
                    "16": "",
                    "17": "",
                    "18": "",
                    "19": "",
                    "20": "",
                    "21": "",
                    "22": "",
                    "23": ""
                };
                sleepHours.forEach(sleepHour=>{
                    if(date.getFullYear()==sleepHour.getFullYear() && date.getMonth()==sleepHour.getMonth() && date.getDate()==sleepHour.getDate()){
                        const hours = sleepHour.getHours().toString();
                        format[hours] = "true";
                    }
                     
                })
                return format
            })
        }
    });
    return res
})

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


function hoursBetween(startDate, endDate) {
    const current = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate(), startDate.getHours())
    const hours = []
    while(current.getTime() <= endDate.getTime()) {
        hours.push(new Date(current.getFullYear(), current.getMonth(), current.getDate(), current.getHours()))
        current.setHours(current.getHours() + 1)
    }
    if(startDate.getMinutes() >= 30){
        hours.shift();
    }
    if(endDate.getMinutes() < 30){
        hours.pop();
    }
    return hours;
};