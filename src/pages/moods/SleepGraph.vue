<template>
    <h1>睡眠分析表</h1>
    <p>※<strong>実睡眠時間</strong>:体が完全に安静な状態の時間</p>
    <p>※<strong>睡眠時間</strong>:ベッドにいた時間</p>
    <p>※<strong>睡眠効率</strong>:実睡眠時間 / 睡眠時間×100</p>
    <ag-grid-vue class="ag-theme-alpine" style="height: 500px" :columnDefs="columnDefs" :rowData="rowData"
        :defaultColDef="defaultColDef" rowSelection="multiple" animateRows="true">
    </ag-grid-vue>
</template>

<script>
import { AgGridVue } from "ag-grid-vue3";  // the AG Grid Vue Component

import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional theme CSS

export default {
    name: "SleepGraph",
    components: {
        AgGridVue,
    },
    setup() {
        // Each Column Definition results in one Column.
        const columnDefs = [
            { field: "日付" },
            { field: "気分" },
            { field: "実睡眠時間" },
            { field: "睡眠時間" },
            { field: "睡眠効率" }
        ];

        // Example load data from sever
        const rowData = [
            { "日付": "11月16日", "気分": "😄", "実睡眠時間": "18:16", "睡眠時間": "04:16", "睡眠効率": "09:34" },
            { "日付": "11月17日", "気分": "😄", "実睡眠時間": "21:24", "睡眠時間": "04:16", "睡眠効率": "09:34" },
            { "日付": "11月18日", "気分": "😄", "実睡眠時間": "21:57", "睡眠時間": "04:16", "睡眠効率": "09:34" },
            { "日付": "11月19日", "気分": "😢", "実睡眠時間": "23:24", "睡眠時間": "04:16", "睡眠効率": "09:34" },
            { "日付": "11月20日", "気分": "😄", "実睡眠時間": "23:20", "睡眠時間": "04:16", "睡眠効率": "09:34" },
            { "日付": "11月21日", "気分": "😄", "実睡眠時間": "21:24", "睡眠時間": "04:16", "睡眠効率": "09:34" },
            { "日付": "11月22日", "気分": "😄", "実睡眠時間": "21:57", "睡眠時間": "04:16", "睡眠効率": "09:34" },
            { "日付": "11月23日", "気分": "😢", "実睡眠時間": "23:24", "睡眠時間": "04:16", "睡眠効率": "09:34" },
            { "日付": "11月24日", "気分": "😄", "実睡眠時間": "23:20", "睡眠時間": "04:16", "睡眠効率": "09:34" }
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
