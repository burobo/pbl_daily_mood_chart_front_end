<template>
  <h1>生活記録表</h1>
  <select v-model="targetYearRef" @change="refreshTableRows">
    <option v-for="n in [2, 1, 0]" v-bind:value="new Date().getFullYear() - n">
      {{ new Date().getFullYear() - n }}年
    </option>
  </select>
  <select v-model="targetMonthRef" @change="refreshTableRows">
    <option v-for="n in 12" v-bind:value="n">{{ n }}月</option>
  </select>
  <ag-grid-vue
    class="ag-theme-alpine"
    :domLayout="domLayout"
    :columnDefs="columnDefs"
    :rowData="logsData"
    :colDef="colDef"
    rowSelection="multiple"
    animateRows="true"
    @first-data-rendered="onFirstDataRendered"
  >
  </ag-grid-vue>
</template>

<script setup>
import { AgGridVue } from "ag-grid-vue3"; // the AG Grid Vue Component
import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional theme CSS

const config = useRuntimeConfig();
const targetYearRef = ref(new Date().getFullYear());
const targetMonthRef = ref(new Date().getMonth() + 1);
const domLayout = "autoHeight";
const columnDefs = [
  { field: "日付" },
  { field: "気分" },
  { field: "就寝" },
  { field: "起床" },
  { field: "実睡眠" },
  { field: "他睡眠" },
  { field: "睡眠計" },
];
const colDef = {
  sortable: true,
  filter: true,
  flex: 1,
};

const { data: logsData, pending, error, refresh: refreshTableRows } = await useFetch(
  "/logs",
  {
    method: "POST",
    baseURL: config.public.API_PROXY_BASE_URL,
    body: {
      user_id: "1",
    },
    async onRequest({ request, options }) {
      options.body.start_date = formatDateForRequest(
        startDateOfYearMonth(targetYearRef.value, targetMonthRef.value)
      );
      options.body.end_date = formatDateForRequest(
        endDateOfYearMonth(targetYearRef.value, targetMonthRef.value)
      );
    },
  }
);

function startDateOfYearMonth(year, month) {
  return new Date(year, Number(month) - 1, 1);
}

function endDateOfYearMonth(year, month) {
  const startDateOfMonth = startDateOfYearMonth(year, month);
  return new Date(year, startDateOfMonth.getMonth() + 1, 0);
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
  params.api.sizeColumnsToFit()
}
</script>
