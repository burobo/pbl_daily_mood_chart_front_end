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
            const sleepHours = response._data.map(record=>record.sleeps).flat().map(record=>{
                const sleepStartTime = new Date(record.sleep_start_time.replace(" ","T"));
                const sleepEndTime = new Date(record.sleep_end_time.replace(" ","T"));
                return hoursBetween(sleepStartTime, sleepEndTime)
            }).flat();
            const exerciseHours = response._data.map(record=>{if('activities' in record) return record.activities}).flat().map(record=>{
                if((typeof(record)=='object') && ('activity_start_time' in record)) {
                    if(record.activity_type == "運動"){
                        const activityStartTime = new Date(record.activity_start_time.replace(" ","T"));
                        const activityEndTime = new Date(record.activity_end_time.replace(" ","T"));
                        return hoursBetweenActivity(activityStartTime, activityEndTime)
                    }
                }
            }).flat();
            const workHours = response._data.map(record=>{if('activities' in record) return record.activities}).flat().map(record=>{
                if((typeof(record)=='object') && ('activity_start_time' in record)) {
                    if(record.activity_type == "通勤"){
                        const activityStartTime = new Date(record.activity_start_time.replace(" ","T"));
                        const activityEndTime = new Date(record.activity_end_time.replace(" ","T"));
                        return hoursBetweenActivity(activityStartTime, activityEndTime)
                    }
                }
            }).flat();
            const bathHours = response._data.map(record=>{if('activities' in record) return record.activities}).flat().map(record=>{
                if((typeof(record)=='object') && ('activity_start_time' in record)) {
                    if(record.activity_type == "入浴"){
                        const activityStartTime = new Date(record.activity_start_time.replace(" ","T"));
                        const activityEndTime = new Date(record.activity_end_time.replace(" ","T"));
                        return hoursBetweenActivity(activityStartTime, activityEndTime)
                    }
                }
            }).flat();
            const clinicHours = response._data.map(record=>{if('activities' in record) return record.activities}).flat().map(record=>{
                if((typeof(record)=='object') && ('activity_start_time' in record)) {
                    if(record.activity_type == "通院"){
                        const activityStartTime = new Date(record.activity_start_time.replace(" ","T"));
                        const activityEndTime = new Date(record.activity_end_time.replace(" ","T"));
                        return hoursBetweenActivity(activityStartTime, activityEndTime)
                    }
                }
            }).flat();
            res = datesBetween(formatYYYYMMDDToJSDate(reqBody.start_date), formatYYYYMMDDToJSDate(reqBody.end_date)).map(date=>{
                const format = {
                    "日付": `${date.getMonth() + 1}/${date.getDate()}`,
                    "気分": "",
                    "メモ": "",
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
                const rowInRes = response._data.find(resRow => formatYYYYMMDDToJSDate(resRow.date).getTime() == date.getTime())
                if (!rowInRes) {
                  return format;
                }
                const moods = ["😢", "🙁", "😐", "😃", "😄"]
                moods[Number(rowInRes.mood)] = `*${moods[Number(rowInRes.mood)]}*`
                format.気分 = rowInRes.mood === null ? "" : moods.join("")
                format.メモ = rowInRes.memo
                sleepHours.forEach(sleepHour=>{
                    if(date.getFullYear()==sleepHour.getFullYear() && date.getMonth()==sleepHour.getMonth() && date.getDate()==sleepHour.getDate()){
                        const hours = sleepHour.getHours().toString();
                        format[hours] = "sleep";
                    }
                })
                exerciseHours.forEach(actHour=>{
                    if(typeof(actHour) !== "undefined" && date.getFullYear()==actHour.getFullYear() && date.getMonth()==actHour.getMonth() && date.getDate()==actHour.getDate()){
                        const hours = actHour.getHours().toString();
                        format[hours] = "exercise";
                    }
                }) 
                workHours.forEach(actHour=>{
                    if(typeof(actHour) !== "undefined" && date.getFullYear()==actHour.getFullYear() && date.getMonth()==actHour.getMonth() && date.getDate()==actHour.getDate()){
                        const hours = actHour.getHours().toString();
                        format[hours] = "work";
                    }
                })
                bathHours.forEach(actHour=>{
                    if(typeof(actHour) !== "undefined" && date.getFullYear()==actHour.getFullYear() && date.getMonth()==actHour.getMonth() && date.getDate()==actHour.getDate()){
                        const hours = actHour.getHours().toString();
                        format[hours] = "bath";
                    }
                })
                clinicHours.forEach(actHour=>{
                    if(typeof(actHour) !== "undefined" && date.getFullYear()==actHour.getFullYear() && date.getMonth()==actHour.getMonth() && date.getDate()==actHour.getDate()){
                        const hours = actHour.getHours().toString();
                        format[hours] = "clinic";
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
    // 30分未満の睡眠は睡眠グラフに反映しない
    if((endDate.getTime()-startDate.getTime()) / (60 * 1000) < 30) return hours
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

function hoursBetweenActivity(startDate, endDate) {
    const current = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate(), startDate.getHours())
    const hours = []
    if((endDate.getTime()-startDate.getTime()) / (60 * 1000) < 30) return hours
    while(current.getTime() <= endDate.getTime()) {
        hours.push(new Date(current.getFullYear(), current.getMonth(), current.getDate(), current.getHours()))
        current.setHours(current.getHours() + 1)
    }
    if(startDate.getMinutes() >= 45){
        hours.shift();
    }
    if(endDate.getMinutes() < 15){
        hours.pop();
    }
    return hours;
};