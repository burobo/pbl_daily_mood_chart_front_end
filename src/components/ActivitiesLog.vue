<template>
  <div class="mb-3">
    <small class="me-3"><strong>※実睡眠時間</strong>：体が完全に安静な状態の時間</small>
    <small class="me-3"><strong>※睡眠時間</strong>：ベッドにいた時間</small>
    <small><strong>※睡眠効率</strong>：実睡眠時間 / 睡眠時間×100</small>
  </div>
  <ag-grid-vue class="ag-theme-alpine" style="height: 500px" :domLayout="domLayout" :columnDefs="columnDefs"
    :rowData="rowData" :defaultColDef="defaultColDef" rowSelection="multiple" animateRows="true"
    @first-data-rendered="onFirstDataRendered" @rowClicked="onRowClicked">
  </ag-grid-vue>
  <div class="modal fade" id="mood-input-modal">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">
            {{ `${selectedDateRef.getMonth() + 1}/${selectedDateRef.getDate()}` }}
          </h5>
          <button class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body p-4">
          <div class="mb-3">
            <p class="text-danger" style="white-space: pre-line">
              {{ validationErrors }}
            </p>
            <div class="form-label fw-bold">気分</div>
            <div class="d-flex aligh-item-center justify-content-center">
              <div>
                <input class="btn btn-outline-secondary btn-lg" :class="{ 'btn-primary': isMoodSelected(0) }"
                  type="button" value="😢" @click="selectMood(0)" />
                <input class="btn btn-outline-secondary btn-lg" :class="{ 'btn-primary': isMoodSelected(1) }"
                  type="button" value="🙁" @click="selectMood(1)" />
                <input class="btn btn-outline-secondary btn-lg" :class="{ 'btn-primary': isMoodSelected(2) }"
                  type="button" value="😐" @click="selectMood(2)" />
                <input class="btn btn-outline-secondary btn-lg" :class="{ 'btn-primary': isMoodSelected(3) }"
                  type="button" value="😃" @click="selectMood(3)" />
                <input class="btn btn-outline-secondary btn-lg" :class="{ 'btn-primary': isMoodSelected(4) }"
                  type="button" value="😄" @click="selectMood(4)" />
              </div>
            </div>
          </div>
          <div class="mb-3">
            <div class="form-label fw-bold">
              睡眠記録
              <button class="btn btn-outline-secondary btn-sm" @click="addSleepRecord">
                追加
              </button>
              <button class="btn btn-outline-secondary btn-sm" @click="fetchFitbitSleep()">
                Fitbitの睡眠記録を取得
              </button>
            </div>
            <div class="row" v-for="(sleepRecordRef, idx) in sleepRecoredsRefWrap.sleepRecordsRef.value" :key="idx">
              <div class="col">
                <input type="datetime-local" v-model="
                  sleepRecoredsRefWrap.sleepRecordsRef.value[idx].sleep_start_time
                " />
              </div>
              <div class="col">
                <input type="datetime-local" v-model="sleepRecoredsRefWrap.sleepRecordsRef.value[idx].sleep_end_time" />
              </div>
              <div class="col">
                <button class="btn btn-outline-secondary btn-sm" @click="removeSleepRecord(idx)">
                  削除
                </button>
              </div>
            </div>
          </div>
          <div class="mb-3">
            <div class="form-label fw-bold">
              行動記録
              <button class="btn btn-outline-secondary btn-sm" @click="addActivityRecord">
                追加
              </button>
            </div>
            <div v-for="(activityRecordRef, idx) in activityRecoredsRefWrap
            .activityRecordsRef.value" :key="idx" class="mb-2 border border-2">
              <div class="row justify-content-center mb-1">
                <div class="col d-flex">
                  <input class="col form-select" type="text" list="activityTypes"
                    v-model="activityRecoredsRefWrap.activityRecordsRef.value[idx].activity_type" />
                  <button class="btn btn-outline-danger btn-sm"
                    @click="deleteActivityType(activityRecoredsRefWrap.activityRecordsRef.value[idx].activity_type)">候補削除</button>
                  <datalist id="activityTypes">
                    <option v-for="activityType in activityTypes">{{ activityType }}</option>
                  </datalist>
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <input type="datetime-local" v-model="
                    activityRecoredsRefWrap.activityRecordsRef.value[idx]
                      .activity_start_time
                  " />
                </div>
                <div class="col">
                  <input type="datetime-local" v-model="
                    activityRecoredsRefWrap.activityRecordsRef.value[idx]
                      .activity_end_time
                  " />
                </div>
                <div class="col">
                  <button class="btn btn-outline-secondary btn-sm" @click="removeActivityRecord(idx)">
                    削除
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class="mb-3">
            <div class="form-label fw-bold">メモ</div>
            <textarea v-model="memoRef" class="form-control" rows="3"></textarea>
          </div>
          <div class="mb-3">
            <div class="form-label fw-bold">睡眠時間</div>
            <div>{{ sumSleepMinutes }}分</div>
            <div class="form-label fw-bold">実睡眠時間</div>
            <div>{{ actualSleepMinutes }}分</div>
            <div class="form-label fw-bold">睡眠効率</div>
            <div>{{ sleepEfficiency }}%</div>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-dark" @click="checkSleepData">
            保存
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { AgGridVue } from "ag-grid-vue3"; // the AG Grid Vue Component
import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional theme CSS
import { inject, watch } from 'vue'

class SleepRecord {
  constructor(sleepStartTime, sleepEndTime) {
    this.sleep_start_time = this.formatDate(sleepStartTime || selectedDateRef.value);
    this.sleep_end_time = this.formatDate(sleepEndTime || selectedDateRef.value);
  }
  formatDate(date) {
    return `${date.getFullYear()}-${zeroPadding(2, date.getMonth() + 1)}-${zeroPadding(
      2,
      date.getDate()
    )} ${zeroPadding(2, date.getHours())}:${zeroPadding(2, date.getMinutes())}`;
  }
  sleepMinutes() {
    return (
      (new Date(this.sleep_end_time.replace(" ", "T")).getTime() -
        new Date(this.sleep_start_time.replace(" ", "T")).getTime()) /
      1000 /
      60
    );
  }
}

class ActivityRecord {
  constructor(activityStartTime, activityEndTime, activityType) {
    this.activity_start_time = this.formatDate(activityStartTime || selectedDateRef.value);
    this.activity_end_time = this.formatDate(activityEndTime || selectedDateRef.value);
    this.activity_type = activityType || activityTypes[0];
  }
  formatDate(date) {
    return `${date.getFullYear()}-${zeroPadding(2, date.getMonth() + 1)}-${zeroPadding(
      2,
      date.getDate()
    )} ${zeroPadding(2, date.getHours())}:${zeroPadding(2, date.getMinutes())}`;
  }
}

const { $bootstrap } = useNuxtApp();
const config = useRuntimeConfig();
const startDate = inject('startDate')
const endDate = inject('endDate')
const selectedDateRef = ref(new Date());
const selectedMoodRef = ref(null);
const sleepRecordsRef = ref([]);
const actualSleepMinutesRef = ref(null);
const sleepRecoredsRefWrap = { sleepRecordsRef }; // v-forを使うためにwrapが必要
const activityRecordsRef = ref([]);
const activityRecoredsRefWrap = { activityRecordsRef }; // v-forを使うためにwrapが必要
const memoRef = ref("");
const activityTypes = ["運動", "通勤", "入浴", "通院"]

const sumSleepMinutes = computed(() => sleepRecoredsRefWrap.sleepRecordsRef.value.reduce((a, c) => a + c.sleepMinutes(), 0))
const actualSleepMinutes = computed(() => actualSleepMinutesRef.value === null ? "-" : actualSleepMinutesRef.value)
const sleepEfficiency = computed(() => sumSleepMinutes.value === 0 ? "-" : ((actualSleepMinutesRef.value / sumSleepMinutes.value) * 100).toFixed(2))
const validationErrors = ref("")

let modal = null;
const domLayout = "autoHeight";
const columnDefs = [
  {
    field: "日付",
    cellStyle: params => {
      const format = {
        color: null
      }
      const saturdayRegExp = /^.*\(土\)$/g;
      const sundayRegExp = /^.*\(日\)$/g;
      if (Array.isArray(saturdayRegExp.exec(params.value))) {
        format.color = 'blue';
      } else if (Array.isArray(sundayRegExp.exec(params.value))) {
        format.color = 'red';
      }
      return format
    }
  },
  {
    field: "気分",
    cellRenderer: params => {
      const element = document.createElement('div')
      element.classList.add('d-flex', 'aligh-item-center', 'justify-content-center')
      element.innerHTML = `<div>
<input class="btn btn-sm ${params.value === '😢' ? 'btn-primary' : 'btn-outline-secondary'}" type="button" value="😢" disabled/>
<input class="btn btn-sm ${params.value === '🙁' ? 'btn-primary' : 'btn-outline-secondary'}" type="button" value="🙁" disabled/>
<input class="btn btn-sm ${params.value === '😐' ? 'btn-primary' : 'btn-outline-secondary'}" type="button" value="😐" disabled/>
<input class="btn btn-sm ${params.value === '😃' ? 'btn-primary' : 'btn-outline-secondary'}" type="button" value="😃" disabled/>
<input class="btn btn-sm ${params.value === '😄' ? 'btn-primary' : 'btn-outline-secondary'}" type="button" value="😄" disabled/>
</div>`;
      return element;
    }
  },
  { field: "メモ" },
  { field: "実睡眠時間" },
  { field: "睡眠時間" },
  { field: "睡眠効率" },
];
const defaultColDef = {
  sortable: true,
  filter: true,
  flex: 1,
};

const {
  data: rowData,
  pending: tableRowsPending,
  error: tableRowsError,
  refresh: tableRowsRefresh,
} = await useFetch("/logs", {
  method: "POST",
  baseURL: config.public.API_PROXY_BASE_URL,
  body: {
    user_id: config.public.USER_ID,
  },
  async onRequest({ request, options }) {
    options.body.start_date = startDate.value.replace(/-/g, '')
    options.body.end_date = endDate.value.replace(/-/g, '')
  },
});

async function upsertMood() {
  const {
    data: upsertMoodData,
    pending: upsertMoodPending,
    error: upsertMoodError,
    refresh: upsertMoodRefresh,
  } = useFetch("/moods", {
    method: "POST",
    baseURL: config.public.API_PROXY_BASE_URL,
    body: {
      user_id: config.public.USER_ID,
    },
    initialCache: false,
    async onRequest({ request, options }) {
      options.body.date = `${selectedDateRef.value.getFullYear()}${zeroPadding(
        2,
        selectedDateRef.value.getMonth() + 1
      )}${zeroPadding(2, selectedDateRef.value.getDate())}`;
      options.body.mood = selectedMoodRef.value;
      options.body.sleeps = sleepRecordsRef.value;
      options.body.memo = memoRef.value;
      options.body.activities = activityRecordsRef.value;
      options.body.sleep_minutes = actualSleepMinutesRef.value
    },
  });
}

function formatDateForRequest(date) {
  return `${date.getFullYear()}${zeroPadding(2, date.getMonth() + 1)}${zeroPadding(
    2,
    date.getDate()
  )}`;
}

function zeroPadding(digit, str) {
  return ("0".repeat(digit) + str).slice(-digit);
}

function onFirstDataRendered(params) {
  params.api.sizeColumnsToFit();
}

function onRowClicked(params) {
  selectedDateRef.value = new Date(
    startDate.value.split('-')[0],
    Number(startDate.value.split('-')[1]) - 1,
    Number(startDate.value.split('-')[2]) + params.rowIndex
  );
  fetchDailyMood();
  modal.show();
}

async function fetchDailyMood() {
  const {
    data: dailyMoodData,
    pending: dailyMoodPending,
    error: dailyMoodError,
    refresh: dailyMoodRefresh,
  } = await useFetch("/daily_logs", {
    method: "POST",
    baseURL: config.public.API_PROXY_BASE_URL,
    body: {
      user_id: config.public.USER_ID,
    },
    initialCache: false,
    async onRequest({ request, options }) {
      options.body.start_date = formatDateForRequest(selectedDateRef.value);
      options.body.end_date = formatDateForRequest(selectedDateRef.value);
    },
    async onResponse({ request, options, response }) {
      if (response._data.length === 0) {
        selectedMoodRef.value = null;
        sleepRecordsRef.value = [];
        memoRef.value = "";
        actualSleepMinutesRef.value = null;
        return;
      }
      selectedMoodRef.value = response._data[0].mood;
      sleepRecordsRef.value = !Array.isArray(response._data[0].sleeps)
        ? []
        : response._data[0].sleeps.map(sleep =>
          new SleepRecord(
            new Date(sleep.sleep_start_time.replace(" ", "T")),
            new Date(sleep.sleep_end_time.replace(" ", "T"))
          )
        );
      activityRecordsRef.value = !Array.isArray(response._data[0].activities)
        ? []
        : response._data[0].activities.map(activity =>
          new ActivityRecord(
            new Date(activity.activity_start_time.replace(" ", "T")),
            new Date(activity.activity_end_time.replace(" ", "T")),
            activity.activity_type
          )
        );
      actualSleepMinutesRef.value = response._data[0].sleep_minutes;
      memoRef.value = response._data[0].memo;
    },
  });
}

function selectMood(mood) {
  selectedMoodRef.value = mood;
}

function isMoodSelected(mood) {
  return selectedMoodRef.value == mood;
}

onMounted(() => {
  // TODO: vue-bootstrapがvue3非対応のため、Elementをいじっている。Vue3対応のデザインフレームワークを検討。
  const moodInputModal = document.getElementById("mood-input-modal");
  modal = new $bootstrap.Modal(moodInputModal);
  moodInputModal.addEventListener("hidden.bs.modal", tableRowsRefresh)
  tableRowsRefresh()
});

function addSleepRecord(sleepRecord) {
  sleepRecordsRef.value = [...sleepRecordsRef.value, sleepRecord instanceof SleepRecord ? sleepRecord : new SleepRecord()];
}

function removeSleepRecord(idx) {
  const copiedSleepRecord = [...sleepRecordsRef.value];
  copiedSleepRecord.splice(idx, 1);
  sleepRecordsRef.value = copiedSleepRecord;
}

function addActivityRecord(activityRecord) {
  activityRecordsRef.value = [...activityRecordsRef.value, new ActivityRecord()];
}

function removeActivityRecord(idx) {
  const copiedActivityRecord = [...activityRecordsRef.value];
  copiedActivityRecord.splice(idx, 1);
  activityRecordsRef.value = copiedActivityRecord;
}

function checkSleepData() {
  const afterPM4Yesterday = new Date(
    selectedDateRef.value.getFullYear(),
    selectedDateRef.value.getMonth(),
    selectedDateRef.value.getDate() - 1,
    16
  )
  const beforePM4Today = new Date(
    selectedDateRef.value.getFullYear(),
    selectedDateRef.value.getMonth(),
    selectedDateRef.value.getDate(),
    15, 59
  )

  let isBeforePM4Yesterday = false
  let isAfterPM4Today = false
  let isStartTimeAfterEndTime = false
  const startDateTimeArray = []
  const endDateTimeArray = []
  for (let s of sleepRecordsRef.value) {
    const startDateTime = new Date(s.sleep_start_time)
    const endDateTime = new Date(s.sleep_end_time)
    startDateTimeArray.push(startDateTime)
    endDateTimeArray.push(endDateTime)

    if (startDateTime < afterPM4Yesterday) {
      isBeforePM4Yesterday = true
    }
    if (endDateTime > beforePM4Today) {
      isAfterPM4Today = true
    }
    if (startDateTime > endDateTime) {
      isStartTimeAfterEndTime = true
    }
  }

  const ascStartDateTimeArray = [...startDateTimeArray].sort((a, b) => new Date(a) - new Date(b));
  const ascEndDateTimeArray = [...endDateTimeArray].sort((a, b) => new Date(a) - new Date(b));
  let hasDuplicateSleepTime = false

  for (let i = 0; i < ascStartDateTimeArray.length; i++) {
    if (ascStartDateTimeArray[i + 1] < ascEndDateTimeArray[i]) {
      hasDuplicateSleepTime = true
    }
  }

  const errors = []
  if (isBeforePM4Yesterday) {
    errors.push("・開始時間は前日の16時以降にしてください")
  }
  if (isAfterPM4Today) {
    errors.push("・終了時間は当日の15時59分より前にしてください")
  }
  if (isStartTimeAfterEndTime) {
    errors.push("・開始時間は終了時間より前にしてください")
  }
  if (hasDuplicateSleepTime) {
    errors.push("・睡眠時間の重複がないようにしてください")
  }
  if (errors.length == 0) {
    upsertMood();
    modal.hide()
    validationErrors.value = ""
  } else {
    validationErrors.value = errors.join("\n")
    modal.show();
  }
}

function deleteActivityType(activityType) {
  const index = activityTypes.indexOf(activityType)
  if (index > -1) {
    activityTypes.splice(index, 1)
  }
}

watch(startDate, tableRowsRefresh);
watch(endDate, tableRowsRefresh);

async function fetchFitbitSleep() {
  const accessToken = localStorage.getItem('access_token')
  const userId = localStorage.getItem('user_id')
  if (!accessToken || !userId) {
    alert('メニューからFitbitにログインしてください。')
    return
  }
  const {
    data: fitbitSleepData,
    pending: fitbitSleepPending,
    error: fitbitSleepError,
    refresh: fitbitSleepRefresh,
  } = await useFetch("/fetch_fitbit_sleep", {
    baseURL: config.public.API_PROXY_BASE_URL,
    initialCache: false,
    params: {
      start_date: dateToYmdWithHyphen(new Date(new Date(selectedDateRef.value.getTime()).setDate(selectedDateRef.value.getDate() - 1))),
      end_date: dateToYmdWithHyphen(new Date(new Date(selectedDateRef.value.getTime()).setDate(selectedDateRef.value.getDate() + 1))),
      user_id: userId,
      access_token: accessToken,
    },
    async onResponse({ request, options, response }) {
      switch (response.status) {
        case 200:
          break;
        case 401:
          alert('メニューからFitbitにログインしてください。')
          return;
        default:
          console.log(response)
          alert('原因不明のエラーです。')
          return;
      }
      if (response._data.sleep.length === 0) {
        alert('Fitbitの睡眠記録がありません。')
        return
      }
      actualSleepMinutesRef.value = response._data.minutesAsleep
      response._data.sleep
        .filter(sleep => new Date(sleep.startTime) >= new Date(selectedDateRef.value.getFullYear(), selectedDateRef.value.getMonth(), selectedDateRef.value.getDate() - 1, 16))
        .filter(sleep => new Date(sleep.endTime) <= new Date(selectedDateRef.value.getFullYear(), selectedDateRef.value.getMonth(), selectedDateRef.value.getDate(), 15, 59))
        .forEach(sleep => addSleepRecord(new SleepRecord(new Date(sleep.startTime), new Date(sleep.endTime))))
    },
  })
}

function dateToYmdWithHyphen(date) {
  return `${date.getFullYear()}-${zeroPadding(
    2,
    date.getMonth() + 1
  )}-${zeroPadding(2, date.getDate())}`;
}
</script>

<style lang="scss">

</style>
