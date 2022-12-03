<template>
    <h1>睡眠分析表</h1>
    <p>※<strong>実睡眠時間</strong>:体が完全に安静な状態の時間</p>
    <p>※<strong>睡眠時間</strong>:ベッドにいた時間</p>
    <p>※<strong>睡眠効率</strong>:実睡眠時間 / 睡眠時間×100</p>
    <ag-grid-vue class="ag-theme-alpine" style="height: 500px" :columnDefs="columnDefs" :rowData="rowData"
        :defaultColDef="defaultColDef" rowSelection="multiple" animateRows="true">
    </ag-grid-vue>
</template>

<style module>
.ag-header-cell {
    padding-right: 0 !important;
    padding-left: 16px !important;
}

.ag-header-cell:not(:last-child) {
    border-right: solid 0.1px;
}
</style>

<script>
import { AgGridVue } from "ag-grid-vue3";  // the AG Grid Vue Component

import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional theme CSS

// Import minimal modules required for charts
import { ModuleRegistry } from "@ag-grid-community/core";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { GridChartsModule } from "@ag-grid-enterprise/charts";

ModuleRegistry.registerModules([ClientSideRowModelModule, GridChartsModule]);

export default {
    name: "SleepGraph",
    components: {
        AgGridVue,
    },
    setup() {
        // Each Column Definition results in one Column.
        const columnDefs = [
            { field: "日付", filter: false, minWidth: 90 },
            { field: "0", filter: false, sortable: false, cellStyle: params => params.value === "true" ? { backgroundColor: "blue", fontSize: 0, borderRight: "dotted white" } : null },
            { field: "1", filter: false, sortable: false, cellStyle: params => params.value === "true" ? { backgroundColor: "blue", fontSize: 0, borderRight: "dotted white" } : null },
            { field: "2", filter: false, sortable: false, cellStyle: params => params.value === "true" ? { backgroundColor: "blue", fontSize: 0, borderRight: "dotted white" } : null },
            { field: "3", filter: false, sortable: false, cellStyle: params => params.value === "true" ? { backgroundColor: "blue", fontSize: 0, borderRight: "dotted white" } : null },
            { field: "4", filter: false, sortable: false, cellStyle: params => params.value === "true" ? { backgroundColor: "blue", fontSize: 0, borderRight: "dotted white" } : null },
            { field: "5", filter: false, sortable: false, cellStyle: params => params.value === "true" ? { backgroundColor: "blue", fontSize: 0, borderRight: "dotted white" } : null },
            { field: "6", filter: false, sortable: false, cellStyle: params => params.value === "true" ? { backgroundColor: "blue", fontSize: 0, borderRight: "dotted white" } : null },
            { field: "7", filter: false, sortable: false, cellStyle: params => params.value === "true" ? { backgroundColor: "blue", fontSize: 0, borderRight: "dotted white" } : null },
            { field: "8", filter: false, sortable: false, cellStyle: params => params.value === "true" ? { backgroundColor: "blue", fontSize: 0, borderRight: "dotted white" } : null },
            { field: "9", filter: false, sortable: false, cellStyle: params => params.value === "true" ? { backgroundColor: "blue", fontSize: 0, borderRight: "dotted white" } : null },
            { field: "10", filter: false, sortable: false, cellStyle: params => params.value === "true" ? { backgroundColor: 'blue', fontSize: 0, borderRight: "dotted white" } : null },
            { field: "11", filter: false, sortable: false, cellStyle: params => params.value === "true" ? { backgroundColor: 'blue', fontSize: 0, borderRight: "dotted white" } : null },
            { field: "12", filter: false, sortable: false, cellStyle: params => params.value === "true" ? { backgroundColor: 'blue', fontSize: 0, borderRight: "dotted white" } : null },
            { field: "13", filter: false, sortable: false, cellStyle: params => params.value === "true" ? { backgroundColor: 'blue', fontSize: 0, borderRight: "dotted white" } : null },
            { field: "14", filter: false, sortable: false, cellStyle: params => params.value === "true" ? { backgroundColor: 'blue', fontSize: 0, borderRight: "dotted white" } : null },
            { field: "15", filter: false, sortable: false, cellStyle: params => params.value === "true" ? { backgroundColor: 'blue', fontSize: 0, borderRight: "dotted white" } : null },
            { field: "16", filter: false, sortable: false, cellStyle: params => params.value === "true" ? { backgroundColor: 'blue', fontSize: 0, borderRight: "dotted white" } : null },
            { field: "17", filter: false, sortable: false, cellStyle: params => params.value === "true" ? { backgroundColor: 'blue', fontSize: 0, borderRight: "dotted white" } : null },
            { field: "18", filter: false, sortable: false, cellStyle: params => params.value === "true" ? { backgroundColor: 'blue', fontSize: 0, borderRight: "dotted white" } : null },
            { field: "19", filter: false, sortable: false, cellStyle: params => params.value === "true" ? { backgroundColor: 'blue', fontSize: 0, borderRight: "dotted white" } : null },
            { field: "20", filter: false, sortable: false, cellStyle: params => params.value === "true" ? { backgroundColor: 'blue', fontSize: 0, borderRight: "dotted white" } : null },
            { field: "21", filter: false, sortable: false, cellStyle: params => params.value === "true" ? { backgroundColor: 'blue', fontSize: 0, borderRight: "dotted white" } : null },
            { field: "22", filter: false, sortable: false, cellStyle: params => params.value === "true" ? { backgroundColor: 'blue', fontSize: 0, borderRight: "dotted white" } : null },
            { field: "23", filter: false, sortable: false, cellStyle: params => params.value === "true" ? { backgroundColor: 'blue', fontSize: 0, borderRight: "dotted white" } : null }
        ];

        // Example load data from sever
        const rowData = [
            { "日付": "11/16", "0": "true", "1": "true", "2": "true", "3": "true", "4": "", "5": "", "6": "", "7": "", "8": "", "9": "", "10": "", "11": "", "12": "", "13": "", "14": "", "15": "", "16": "", "17": "", "18": "true", "19": "true", "20": "true", "21": "true", "22": "true", "23": "true" },
            { "日付": "11/17", "0": "true", "1": "true", "2": "true", "3": "true", "4": "true", "5": "true", "6": "true", "7": "true", "8": "", "9": "", "10": "", "11": "", "12": "", "13": "", "14": "", "15": "", "16": "", "17": "", "18": "", "19": "", "20": "", "21": "", "22": "true", "23": "true" },
            { "日付": "11/18", "0": "true", "1": "true", "2": "true", "3": "true", "4": "true", "5": "", "6": "", "7": "", "8": "", "9": "", "10": "", "11": "", "12": "", "13": "", "14": "", "15": "", "16": "", "17": "", "18": "", "19": "", "20": "", "21": "", "22": "true", "23": "true" },
            { "日付": "11/19", "0": "true", "1": "true", "2": "true", "3": "true", "4": "true", "5": "true", "6": "true", "7": "", "8": "", "9": "", "10": "", "11": "", "12": "", "13": "", "14": "", "15": "", "16": "", "17": "", "18": "", "19": "", "20": "", "21": "", "22": "true", "23": "true" },
            { "日付": "11/20", "0": "true", "1": "true", "2": "true", "3": "true", "4": "true", "5": "", "6": "", "7": "", "8": "", "9": "", "10": "", "11": "", "12": "", "13": "", "14": "", "15": "", "16": "", "17": "", "18": "", "19": "", "20": "", "21": "", "22": "true", "23": "true" },
            { "日付": "11/21", "0": "true", "1": "true", "2": "true", "3": "true", "4": "", "5": "", "6": "", "7": "", "8": "", "9": "", "10": "", "11": "", "12": "", "13": "", "14": "", "15": "", "16": "", "17": "", "18": "", "19": "", "20": "true", "21": "true", "22": "true", "23": "true" },
            { "日付": "11/22", "0": "true", "1": "true", "2": "true", "3": "true", "4": "", "5": "", "6": "", "7": "", "8": "", "9": "", "10": "", "11": "", "12": "", "13": "", "14": "", "15": "", "16": "", "17": "", "18": "", "19": "true", "20": "true", "21": "true", "22": "true", "23": "true" },
            { "日付": "11/23", "0": "true", "1": "true", "2": "true", "3": "true", "4": "true", "5": "true", "6": "", "7": "", "8": "", "9": "", "10": "", "11": "", "12": "", "13": "", "14": "", "15": "", "16": "", "17": "", "18": "", "19": "", "20": "", "21": "true", "22": "true", "23": "true" },
            { "日付": "11/24", "0": "true", "1": "true", "2": "true", "3": "true", "4": "true", "5": "", "6": "", "7": "", "8": "", "9": "", "10": "", "11": "", "12": "", "13": "", "14": "", "15": "", "16": "", "17": "", "18": "", "19": "", "20": "", "21": "", "22": "true", "23": "true" }
        ]

        // DefaultColDef sets props common to all Columns
        const defaultColDef = {
            sortable: true,
            filter: true,
            flex: 1
        };

        return {
            columnDefs,
            rowData,
            defaultColDef
        };
    },
};
</script>

<style lang="scss">

</style>
