<template>
    <ul class="tabnav">
        <li @click="isActive = 'table'" :class="{ 'active': isActive === 'table' }">
            睡眠表
        </li>
        <li @click="isActive = 'graph'" :class="{ 'active': isActive === 'graph' }">
            睡眠グラフ
        </li>
    </ul>
    <div v-if="isActive === 'table'">
        <h1>睡眠表</h1>
        <div class="border mb-5"></div>
        <div class="mb-2">
            <small class="me-3"><strong>※実睡眠時間</strong>：体が完全に安静な状態の時間</small>
            <small class="me-3"><strong>※睡眠時間</strong>：ベッドにいた時間</small>
            <small><strong>※睡眠効率</strong>：実睡眠時間 / 睡眠時間×100</small>
        </div>
    </div>
    <div v-else-if="isActive === 'graph'">
        <h1>睡眠グラフ</h1>
        <div class="border mb-5"></div>
        <ag-grid-vue class="ag-theme-alpine" style="height: 500px" :columnDefs="columnDefs" :rowData="rowData"
            :defaultColDef="defaultColDef" rowSelection="multiple" animateRows="true">
        </ag-grid-vue>
    </div>
</template>

<style>
.ag-header-cell {
    padding-right: 0 !important;
    padding-left: 16px !important;
}

.ag-header-cell:not(:last-child) {
    border-right: solid 0.1px;
}

.tabnav {
    display: flex;
    list-style-type: none;
    padding: 0;
}

.tabnav li {
    cursor: pointer;
    width: 50%;
    background: #f2f3f5;
    padding: 10px;
    text-decoration: none;
}

.tabnav li.active {
    background: #3cc0d9;
    color: #fff;
}
</style>

<script>
import { AgGridVue } from "ag-grid-vue3";  // the AG Grid Vue Component

import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional theme CSS

import { ref } from 'vue';

export default {
    name: "SleepGraph",
    components: {
        AgGridVue,
    },
    setup() {
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

        const isActive = ref('table')

        return {
            columnDefs,
            rowData,
            defaultColDef,
            isActive
        };
    },
};
</script>

<style lang="scss">

</style>
