<template>
  <ag-grid-vue
    class="ag-theme-alpine"
    style="height: 500px"
    :domLayout="domLayout"
    :columnDefs="columnDefs"
    :rowData="rowData"
    :defaultColDef="defaultColDef"
    rowSelection="multiple"
    animateRows="true"
    @first-data-rendered="onFirstDataRendered"
    @rowClicked="onRowClicked"
  >
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
            <div class="form-label fw-bold">気分</div>
            <div class="d-flex aligh-item-center justify-content-center">
              <div>
                <input
                  class="btn btn-outline-secondary btn-lg"
                  :class="{ 'btn-primary': isMoodSelected(0) }"
                  type="button"
                  value="😢"
                  @click="selectMood(0)"
                />
                <input
                  class="btn btn-outline-secondary btn-lg"
                  :class="{ 'btn-primary': isMoodSelected(1) }"
                  type="button"
                  value="🙁"
                  @click="selectMood(1)"
                />
                <input
                  class="btn btn-outline-secondary btn-lg"
                  :class="{ 'btn-primary': isMoodSelected(2) }"
                  type="button"
                  value="😐"
                  @click="selectMood(2)"
                />
                <input
                  class="btn btn-outline-secondary btn-lg"
                  :class="{ 'btn-primary': isMoodSelected(3) }"
                  type="button"
                  value="😃"
                  @click="selectMood(3)"
                />
                <input
                  class="btn btn-outline-secondary btn-lg"
                  :class="{ 'btn-primary': isMoodSelected(4) }"
                  type="button"
                  value="😄"
                  @click="selectMood(4)"
                />
              </div>
            </div>
          </div>
          <div class="mb-3">
            <div class="form-label fw-bold">
              睡眠記録
              <button class="btn btn-outline-secondary btn-sm" @click="addSleepRecord">
                追加
              </button>
            </div>
            <div
              class="row"
              v-for="(sleepRecordRef, idx) in sleepRecoredsRefWrap.sleepRecordsRef.value"
              :key="idx"
            >
              <div class="col">
                <input
                  type="datetime-local"
                  v-model="
                    sleepRecoredsRefWrap.sleepRecordsRef.value[idx].sleep_start_time
                  "
                />
              </div>
              <div class="col">
                <input
                  type="datetime-local"
                  v-model="sleepRecoredsRefWrap.sleepRecordsRef.value[idx].sleep_end_time"
                />
              </div>
              <div class="col">
                <button
                  class="btn btn-outline-secondary btn-sm"
                  @click="removeSleepRecord(idx)"
                >
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
            <div
              v-for="(activityRecordRef, idx) in activityRecoredsRefWrap
                .activityRecordsRef.value"
              :key="idx"
              class="mb-2 border border-2"
            >
              <div class="row justify-content-center mb-1">
                <div class="col">
                  <select class="col form-select" v-model="activityRecoredsRefWrap.activityRecordsRef.value[idx].activity_type">
                    <option v-for="activityType in activityTypes">{{ activityType }}</option>
                  </select>
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <input
                    type="datetime-local"
                    v-model="
                      activityRecoredsRefWrap.activityRecordsRef.value[idx]
                        .activity_start_time
                    "
                  />
                </div>
                <div class="col">
                  <input
                    type="datetime-local"
                    v-model="
                      activityRecoredsRefWrap.activityRecordsRef.value[idx]
                        .activity_end_time
                    "
                  />
                </div>
                <div class="col">
                  <button
                    class="btn btn-outline-secondary btn-sm"
                    @click="removeActivityRecord(idx)"
                  >
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
          <button class="btn btn-dark" data-bs-dismiss="modal" @click="upsertMood">
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
const targetYearRef = inject('targetYearRef');
const targetMonthRef = inject('targetMonthRef');
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

let modal = null;
const domLayout = "autoHeight";
const columnDefs = [
    { field: "日付" },
    { field: "気分" },
    { field: "メモ" },
    { field: "実睡眠時間" },
    { field: "睡眠時間" },
    { field: "睡眠効率" }
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
    user_id: "1",
  },
  async onRequest({ request, options }) {
    options.body.start_date = formatDateForRequest(
      sleepStartTimeOfYearMonth(targetYearRef.value, targetMonthRef.value)
    );
    options.body.end_date = formatDateForRequest(
      sleepEndTimeOfYearMonth(targetYearRef.value, targetMonthRef.value)
    );
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
      user_id: "1",
    },
    initialCache: false,
    async onRequest({ request, options }) {
      options.body.user_id = "1";
      options.body.date = `${selectedDateRef.value.getFullYear()}${zeroPadding(
        2,
        selectedDateRef.value.getMonth() + 1
      )}${zeroPadding(2, selectedDateRef.value.getDate())}`;
      options.body.mood = selectedMoodRef.value;
      options.body.sleeps = sleepRecordsRef.value;
      options.body.memo = memoRef.value;
      console.log(activityRecordsRef)
    },
  });
}

function sleepStartTimeOfYearMonth(year, month) {
  return new Date(year, Number(month) - 1, 1);
}

function sleepEndTimeOfYearMonth(year, month) {
  const sleepStartTimeOfMonth = sleepStartTimeOfYearMonth(year, month);
  return new Date(year, sleepStartTimeOfMonth.getMonth() + 1, 0);
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
    targetYearRef.value,
    targetMonthRef.value - 1,
    params.rowIndex + 1
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
      user_id: "1",
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
        return;
      }
      selectedMoodRef.value = response._data[0].mood;
      sleepRecordsRef.value =
        response._data[0].sleeps.length === 0
          ? []
          : response._data[0].sleeps.map(
              (sleep) =>
                new SleepRecord(
                  new Date(sleep.sleep_start_time.replace(" ", "T")),
                  new Date(sleep.sleep_end_time.replace(" ", "T"))
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

function addSleepRecord() {
  sleepRecordsRef.value = [...sleepRecordsRef.value, new SleepRecord()];
}

function removeSleepRecord(idx) {
  const copiedSleepRecord = [...sleepRecordsRef.value];
  copiedSleepRecord.splice(idx, 1);
  sleepRecordsRef.value = copiedSleepRecord;
}

function addActivityRecord() {
  activityRecordsRef.value = [...activityRecordsRef.value, new ActivityRecord()];
}

function removeActivityRecord(idx) {
  const copiedActivityRecord = [...activityRecordsRef.value];
  copiedActivityRecord.splice(idx, 1);
  activityRecordsRef.value = copiedActivityRecord;
}

watch(targetYearRef,tableRowsRefresh);
watch(targetMonthRef,tableRowsRefresh);

</script>

<style lang="scss"></style>
