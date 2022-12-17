<template>
    <h1>睡眠グラフ</h1>
    <div class="border mb-5"></div>
    <ag-grid-vue class="ag-theme-alpine" style="height: 500px" :columnDefs="columnDefs" :rowData="rowData"
        :defaultColDef="defaultColDef" animateRows="true">
    </ag-grid-vue>
</template>

<style>
.ag-header-cell {
    padding-right: 0 !important;
    padding-left: 16px !important;
}

.ag-header-cell:not(:last-child) {
    border-right: solid 0.1px;
}
</style>

<script setup>
import { AgGridVue } from "ag-grid-vue3";  // the AG Grid Vue Component
import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional theme CSS
import { inject, watch } from 'vue'

const config = useRuntimeConfig();
let d = new Date()
const targetYearRef = ref(d.getFullYear());
const targetMonthRef = ref(d.getMonth() + 1);

const { data: rowData, pending: tableRowsPending, error: tableRowsError, refresh: tableRowsRefresh } = await useFetch(
    "/sleep_graph",
    {
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
    }
);


// Each Column Definition results in one Column.
const columnDefs = [
    { field: "日付", filter: false, minWidth: 90 },
    { field: "0", filter: false, sortable: false, cellStyle: params => params.value === "true" ? { backgroundColor: "#0b3769", fontSize: 0, borderRight: "dotted white" } : null },
    { field: "1", filter: false, sortable: false, cellStyle: params => params.value === "true" ? { backgroundColor: "#0b3769", fontSize: 0, borderRight: "dotted white" } : null },
    { field: "2", filter: false, sortable: false, cellStyle: params => params.value === "true" ? { backgroundColor: "#0b3769", fontSize: 0, borderRight: "dotted white" } : null },
    { field: "3", filter: false, sortable: false, cellStyle: params => params.value === "true" ? { backgroundColor: "#0b3769", fontSize: 0, borderRight: "dotted white" } : null },
    { field: "4", filter: false, sortable: false, cellStyle: params => params.value === "true" ? { backgroundColor: "#0b3769", fontSize: 0, borderRight: "dotted white" } : null },
    { field: "5", filter: false, sortable: false, cellStyle: params => params.value === "true" ? { backgroundColor: "#0b3769", fontSize: 0, borderRight: "dotted white" } : null },
    { field: "6", filter: false, sortable: false, cellStyle: params => params.value === "true" ? { backgroundColor: "#0b3769", fontSize: 0, borderRight: "dotted white" } : null },
    { field: "7", filter: false, sortable: false, cellStyle: params => params.value === "true" ? { backgroundColor: "#0b3769", fontSize: 0, borderRight: "dotted white" } : null },
    { field: "8", filter: false, sortable: false, cellStyle: params => params.value === "true" ? { backgroundColor: "#0b3769", fontSize: 0, borderRight: "dotted white" } : null },
    { field: "9", filter: false, sortable: false, cellStyle: params => params.value === "true" ? { backgroundColor: "#0b3769", fontSize: 0, borderRight: "dotted white" } : null },
    { field: "10", filter: false, sortable: false, cellStyle: params => params.value === "true" ? { backgroundColor: "#0b3769", fontSize: 0, borderRight: "dotted white" } : null },
    { field: "11", filter: false, sortable: false, cellStyle: params => params.value === "true" ? { backgroundColor: "#0b3769", fontSize: 0, borderRight: "dotted white" } : null },
    { field: "12", filter: false, sortable: false, cellStyle: params => params.value === "true" ? { backgroundColor: "#0b3769", fontSize: 0, borderRight: "dotted white" } : null },
    { field: "13", filter: false, sortable: false, cellStyle: params => params.value === "true" ? { backgroundColor: "#0b3769", fontSize: 0, borderRight: "dotted white" } : null },
    { field: "14", filter: false, sortable: false, cellStyle: params => params.value === "true" ? { backgroundColor: "#0b3769", fontSize: 0, borderRight: "dotted white" } : null },
    { field: "15", filter: false, sortable: false, cellStyle: params => params.value === "true" ? { backgroundColor: "#0b3769", fontSize: 0, borderRight: "dotted white" } : null },
    { field: "16", filter: false, sortable: false, cellStyle: params => params.value === "true" ? { backgroundColor: "#0b3769", fontSize: 0, borderRight: "dotted white" } : null },
    { field: "17", filter: false, sortable: false, cellStyle: params => params.value === "true" ? { backgroundColor: "#0b3769", fontSize: 0, borderRight: "dotted white" } : null },
    { field: "18", filter: false, sortable: false, cellStyle: params => params.value === "true" ? { backgroundColor: "#0b3769", fontSize: 0, borderRight: "dotted white" } : null },
    { field: "19", filter: false, sortable: false, cellStyle: params => params.value === "true" ? { backgroundColor: "#0b3769", fontSize: 0, borderRight: "dotted white" } : null },
    { field: "20", filter: false, sortable: false, cellStyle: params => params.value === "true" ? { backgroundColor: "#0b3769", fontSize: 0, borderRight: "dotted white" } : null },
    { field: "21", filter: false, sortable: false, cellStyle: params => params.value === "true" ? { backgroundColor: "#0b3769", fontSize: 0, borderRight: "dotted white" } : null },
    { field: "22", filter: false, sortable: false, cellStyle: params => params.value === "true" ? { backgroundColor: "#0b3769", fontSize: 0, borderRight: "dotted white" } : null },
    { field: "23", filter: false, sortable: false, cellStyle: params => params.value === "true" ? { backgroundColor: "#0b3769", fontSize: 0, borderRight: "dotted white" } : null }
];

// DefaultColDef sets props common to all Columns
const defaultColDef = {
    sortable: true,
    filter: true,
    flex: 1
};

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

watch(targetYearRef, tableRowsRefresh);
watch(targetMonthRef, tableRowsRefresh);
onMounted(() => {
    tableRowsRefresh()
})
</script>

<style lang="scss">

</style>
