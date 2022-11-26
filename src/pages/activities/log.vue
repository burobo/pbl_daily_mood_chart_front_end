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
        class TimePicker {
            // gets called once before the renderer is used
            init(params) {
                // create the cell
                this.eInput = document.createElement('input');
                this.eInput.type = 'time';
                this.eInput.value = params.value;
            }

            // gets called once when grid ready to insert the element
            getGui() {
                return this.eInput;
            }

            // returns the new value after editing
            getValue() {
                return this.eInput.value;
            }
        }

        // Each Column Definition results in one Column.
        const columnDefs = [
            { field: "日付" },
            {
                field: "気分",
                editable: true,
                cellEditor: 'agSelectCellEditor',
                cellEditorParams: {
                    values: ['😄', '😃', '😐', '🙁', '😢']
                }
            },
            {
                field: "就寝",
                editable: true,
                cellEditor: TimePicker,
                cellEditorPopup: true,
            },
            {
                field: "起床",
                editable: true,
                cellEditor: TimePicker,
                cellEditorPopup: true,
            },
            {
                field: "実睡眠",
                editable: true,
                cellEditor: TimePicker,
                cellEditorPopup: true,
            },
            {
                field: "他睡眠",
                editable: true,
                cellEditor: TimePicker,
                cellEditorPopup: true,
            },
            {
                field: "睡眠計",
                editable: true,
                cellEditor: TimePicker,
                cellEditorPopup: true,
            }
        ];

        // Example load data from sever
        const rowData = [
            { "日付": "11月16日", "気分": "😄", "就寝": "18:16", "起床": "04:16", "実睡眠": "09:34", "他睡眠": "00:00", "睡眠計": "09:34" },
            { "日付": "11月17日", "気分": "😄", "就寝": "21:24", "起床": "04:16", "実睡眠": "09:34", "他睡眠": "00:00", "睡眠計": "09:34" },
            { "日付": "11月18日", "気分": "😄", "就寝": "21:57", "起床": "04:16", "実睡眠": "09:34", "他睡眠": "00:00", "睡眠計": "09:34" },
            { "日付": "11月19日", "気分": "😢", "就寝": "23:24", "起床": "04:16", "実睡眠": "09:34", "他睡眠": "00:00", "睡眠計": "09:34" },
            { "日付": "11月20日", "気分": "😄", "就寝": "23:20", "起床": "04:16", "実睡眠": "09:34", "他睡眠": "00:00", "睡眠計": "09:34" },
            { "日付": "11月21日", "気分": "😄", "就寝": "21:24", "起床": "04:16", "実睡眠": "09:34", "他睡眠": "00:00", "睡眠計": "09:34" },
            { "日付": "11月22日", "気分": "😄", "就寝": "21:57", "起床": "04:16", "実睡眠": "09:34", "他睡眠": "00:00", "睡眠計": "09:34" },
            { "日付": "11月23日", "気分": "😢", "就寝": "23:24", "起床": "04:16", "実睡眠": "09:34", "他睡眠": "00:00", "睡眠計": "09:34" },
            { "日付": "11月24日", "気分": "😄", "就寝": "23:20", "起床": "04:16", "実睡眠": "09:34", "他睡眠": "00:00", "睡眠計": "09:34" }
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
