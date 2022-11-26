<template>
    <h1>生活記録表</h1>
    <ag-grid-vue class="ag-theme-alpine" style="height: 500px" :columnDefs="columnDefs" :rowData="rowData"
        :defaultColDef="defaultColDef" rowSelection="multiple" animateRows="true">
    </ag-grid-vue>
</template>

<script>
import { AgGridVue } from "ag-grid-vue3";  // the AG Grid Vue Component

import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional theme CSS

export default {
    name: "App",
    components: {
        AgGridVue,
    },
    setup() {
        // Each Column Definition results in one Column.
        const columnDefs = [
            { field: "日付" },
            { field: "気分" },
            { field: "就寝" },
            { field: "起床" },
            { field: "実睡眠" },
            { field: "他睡眠" },
            { field: "睡眠計" }
        ];

        // Example load data from sever
        const rowData = [
            { "日付": "11月16日", "気分": "😄", "就寝": "18:16", "起床": "4:16", "実睡眠": "9:34", "他睡眠": "0:00", "睡眠計": "9:34" },
            { "日付": "11月17日", "気分": "😄", "就寝": "21:24", "起床": "4:16", "実睡眠": "9:34", "他睡眠": "0:00", "睡眠計": "9:34" },
            { "日付": "11月18日", "気分": "😄", "就寝": "21:57", "起床": "4:16", "実睡眠": "9:34", "他睡眠": "0:00", "睡眠計": "9:34" },
            { "日付": "11月19日", "気分": "😢", "就寝": "23:24", "起床": "4:16", "実睡眠": "9:34", "他睡眠": "0:00", "睡眠計": "9:34" },
            { "日付": "11月20日", "気分": "😄", "就寝": "23:20", "起床": "4:16", "実睡眠": "9:34", "他睡眠": "0:00", "睡眠計": "9:34" },
            { "日付": "11月21日", "気分": "😄", "就寝": "21:24", "起床": "4:16", "実睡眠": "9:34", "他睡眠": "0:00", "睡眠計": "9:34" },
            { "日付": "11月22日", "気分": "😄", "就寝": "21:57", "起床": "4:16", "実睡眠": "9:34", "他睡眠": "0:00", "睡眠計": "9:34" },
            { "日付": "11月23日", "気分": "😢", "就寝": "23:24", "起床": "4:16", "実睡眠": "9:34", "他睡眠": "0:00", "睡眠計": "9:34" },
            { "日付": "11月24日", "気分": "😄", "就寝": "23:20", "起床": "4:16", "実睡眠": "9:34", "他睡眠": "0:00", "睡眠計": "9:34" }
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
