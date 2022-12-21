<template>
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
const startDate = inject('startDate')
const endDate = inject('endDate')

const { data: rowData, pending: tableRowsPending, error: tableRowsError, refresh: tableRowsRefresh } = await useFetch(
  "/sleep_graph",
  {
    method: "POST",
    baseURL: config.public.API_PROXY_BASE_URL,
    body: {
      user_id: "1",
    },
    async onRequest({ request, options }) {
      options.body.start_date = startDate.value.replace(/-/g, '')
      options.body.end_date = endDate.value.replace(/-/g, '')
    },
  }
);

const styleSleep    = { backgroundColor: "#0b3769", fontSize: 0, borderRight: "dotted white" };
const styleExercise = { backgroundColor: "#000000", fontSize: 0, borderRight: "dotted white" };
const styleWork     = { backgroundColor: "#ffff00", fontSize: 0, borderRight: "dotted white" };
const styleBath     = { backgroundColor: "#00ffff", fontSize: 0, borderRight: "dotted white" };
const styleClinic   = { backgroundColor: "#f08080", fontSize: 0, borderRight: "dotted white" };

// Each Column Definition results in one Column.
const columnDefs = [
  { field: "日付", filter: false, minWidth: 90 },
  { field: "0", filter: false, sortable: false, cellStyle: params => {
    if(params.value=="sleep")    return styleSleep
    if(params.value=="exercise") return styleExercise
    if(params.value=="work")     return styleWork
    if(params.value=="bath")     return styleBath
    if(params.value=="clinic")   return styleClinic
    return null
  }},  
  { field: "1", filter: false, sortable: false, cellStyle: params => {
    if(params.value=="sleep")    return styleSleep
    if(params.value=="exercise") return styleExercise
    if(params.value=="work")     return styleWork
    if(params.value=="bath")     return styleBath
    if(params.value=="clinic")   return styleClinic
    return null
  }},
  { field: "2", filter: false, sortable: false, cellStyle: params => {
    if(params.value=="sleep")    return styleSleep
    if(params.value=="exercise") return styleExercise
    if(params.value=="work")     return styleWork
    if(params.value=="bath")     return styleBath
    if(params.value=="clinic")   return styleClinic
    return null
  }},  
  { field: "3", filter: false, sortable: false, cellStyle: params => {
    if(params.value=="sleep")    return styleSleep
    if(params.value=="exercise") return styleExercise
    if(params.value=="work")     return styleWork
    if(params.value=="bath")     return styleBath
    if(params.value=="clinic")   return styleClinic
    return null
  }},
  { field: "4", filter: false, sortable: false, cellStyle: params => {
    if(params.value=="sleep")    return styleSleep
    if(params.value=="exercise") return styleExercise
    if(params.value=="work")     return styleWork
    if(params.value=="bath")     return styleBath
    if(params.value=="clinic")   return styleClinic
    return null
  }},  
  { field: "5", filter: false, sortable: false, cellStyle: params => {
    if(params.value=="sleep")    return styleSleep
    if(params.value=="exercise") return styleExercise
    if(params.value=="work")     return styleWork
    if(params.value=="bath")     return styleBath
    if(params.value=="clinic")   return styleClinic
    return null
  }},
  { field: "6", filter: false, sortable: false, cellStyle: params => {
    if(params.value=="sleep")    return styleSleep
    if(params.value=="exercise") return styleExercise
    if(params.value=="work")     return styleWork
    if(params.value=="bath")     return styleBath
    if(params.value=="clinic")   return styleClinic
    return null
  }},  
  { field: "7", filter: false, sortable: false, cellStyle: params => {
    if(params.value=="sleep")    return styleSleep
    if(params.value=="exercise") return styleExercise
    if(params.value=="work")     return styleWork
    if(params.value=="bath")     return styleBath
    if(params.value=="clinic")   return styleClinic
    return null
  }}, 
  { field: "8", filter: false, sortable: false, cellStyle: params => {
    if(params.value=="sleep")    return styleSleep
    if(params.value=="exercise") return styleExercise
    if(params.value=="work")     return styleWork
    if(params.value=="bath")     return styleBath
    if(params.value=="clinic")   return styleClinic
    return null
  }},  
  { field: "9", filter: false, sortable: false, cellStyle: params => {
    if(params.value=="sleep")    return styleSleep
    if(params.value=="exercise") return styleExercise
    if(params.value=="work")     return styleWork
    if(params.value=="bath")     return styleBath
    if(params.value=="clinic")   return styleClinic
    return null
  }},
  { field: "10", filter: false, sortable: false, cellStyle: params => {
    if(params.value=="sleep")    return styleSleep
    if(params.value=="exercise") return styleExercise
    if(params.value=="work")     return styleWork
    if(params.value=="bath")     return styleBath
    if(params.value=="clinic")   return styleClinic
    return null
  }},  
  { field: "11", filter: false, sortable: false, cellStyle: params => {
    if(params.value=="sleep")    return styleSleep
    if(params.value=="exercise") return styleExercise
    if(params.value=="work")     return styleWork
    if(params.value=="bath")     return styleBath
    if(params.value=="clinic")   return styleClinic
    return null
  }},
  { field: "12", filter: false, sortable: false, cellStyle: params => {
    if(params.value=="sleep")    return styleSleep
    if(params.value=="exercise") return styleExercise
    if(params.value=="work")     return styleWork
    if(params.value=="bath")     return styleBath
    if(params.value=="clinic")   return styleClinic
    return null
  }},  
  { field: "13", filter: false, sortable: false, cellStyle: params => {
    if(params.value=="sleep")    return styleSleep
    if(params.value=="exercise") return styleExercise
    if(params.value=="work")     return styleWork
    if(params.value=="bath")     return styleBath
    if(params.value=="clinic")   return styleClinic
    return null
  }},
  { field: "14", filter: false, sortable: false, cellStyle: params => {
    if(params.value=="sleep")    return styleSleep
    if(params.value=="exercise") return styleExercise
    if(params.value=="work")     return styleWork
    if(params.value=="bath")     return styleBath
    if(params.value=="clinic")   return styleClinic
    return null
  }},  
  { field: "15", filter: false, sortable: false, cellStyle: params => {
    if(params.value=="sleep")    return styleSleep
    if(params.value=="exercise") return styleExercise
    if(params.value=="work")     return styleWork
    if(params.value=="bath")     return styleBath
    if(params.value=="clinic")   return styleClinic
    return null
  }}, 
  { field: "16", filter: false, sortable: false, cellStyle: params => {
    if(params.value=="sleep")    return styleSleep
    if(params.value=="exercise") return styleExercise
    if(params.value=="work")     return styleWork
    if(params.value=="bath")     return styleBath
    if(params.value=="clinic")   return styleClinic
    return null
  }},  
  { field: "17", filter: false, sortable: false, cellStyle: params => {
    if(params.value=="sleep")    return styleSleep
    if(params.value=="exercise") return styleExercise
    if(params.value=="work")     return styleWork
    if(params.value=="bath")     return styleBath
    if(params.value=="clinic")   return styleClinic
    return null
  }},
  { field: "18", filter: false, sortable: false, cellStyle: params => {
    if(params.value=="sleep")    return styleSleep
    if(params.value=="exercise") return styleExercise
    if(params.value=="work")     return styleWork
    if(params.value=="bath")     return styleBath
    if(params.value=="clinic")   return styleClinic
    return null
  }},  
  { field: "19", filter: false, sortable: false, cellStyle: params => {
    if(params.value=="sleep")    return styleSleep
    if(params.value=="exercise") return styleExercise
    if(params.value=="work")     return styleWork
    if(params.value=="bath")     return styleBath
    if(params.value=="clinic")   return styleClinic
    return null
  }},
  { field: "20", filter: false, sortable: false, cellStyle: params => {
    if(params.value=="sleep")    return styleSleep
    if(params.value=="exercise") return styleExercise
    if(params.value=="work")     return styleWork
    if(params.value=="bath")     return styleBath
    if(params.value=="clinic")   return styleClinic
    return null
  }},  
  { field: "21", filter: false, sortable: false, cellStyle: params => {
    if(params.value=="sleep")    return styleSleep
    if(params.value=="exercise") return styleExercise
    if(params.value=="work")     return styleWork
    if(params.value=="bath")     return styleBath
    if(params.value=="clinic")   return styleClinic
    return null
  }},
  { field: "22", filter: false, sortable: false, cellStyle: params => {
    if(params.value=="sleep")    return styleSleep
    if(params.value=="exercise") return styleExercise
    if(params.value=="work")     return styleWork
    if(params.value=="bath")     return styleBath
    if(params.value=="clinic")   return styleClinic
    return null
  }},  
  { field: "23", filter: false, sortable: false, cellStyle: params => {
    if(params.value=="sleep")    return styleSleep
    if(params.value=="exercise") return styleExercise
    if(params.value=="work")     return styleWork
    if(params.value=="bath")     return styleBath
    if(params.value=="clinic")   return styleClinic
    return null
  }}
];

// DefaultColDef sets props common to all Columns
const defaultColDef = {
  sortable: true,
  filter: true,
  flex: 1
};

watch(startDate, tableRowsRefresh);
watch(endDate, tableRowsRefresh);
onMounted(() => {
  tableRowsRefresh()
})
</script>

<style lang="scss">

</style>
