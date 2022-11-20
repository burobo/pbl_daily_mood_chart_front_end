<template>
    <button @click="deselectRows">deselect rows</button>
    <ag-grid-vue
      class="ag-theme-alpine"
      style="height: 500px"
      :columnDefs="columnDefs"
      :rowData="rowData"
      :defaultColDef="defaultColDef"
      rowSelection="multiple"
      animateRows="true"
      @cell-clicked="cellWasClicked"
      @grid-ready="onGridReady"
    >
    </ag-grid-vue>
</template>

<script>
   import { AgGridVue } from "ag-grid-vue3";  // the AG Grid Vue Component
   import { ref } from "vue";

   import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
   import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional theme CSS

   export default {
    name: "App",
    components: {
      AgGridVue,
    },
    setup() {
      const gridApi = ref(null); // Optional - for accessing Grid's API
   
      // Obtain API from grid's onGridReady event
      const onGridReady = (params) => {
        gridApi.value = params.api;
      };
      
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
        { "日付": "11月19日", "気分": "😄", "就寝": "23:24", "起床": "4:16", "実睡眠": "9:34", "他睡眠": "0:00", "睡眠計": "9:34" },
        { "日付": "11月20日", "気分": "😄", "就寝": "23:20", "起床": "4:16", "実睡眠": "9:34", "他睡眠": "0:00", "睡眠計": "9:34" }
      ]

      // DefaultColDef sets props common to all Columns
      const defaultColDef = {
        sortable: true,
        filter: true,
        flex: 1
      };

      return {
        onGridReady,
        columnDefs,
        rowData,
        defaultColDef,
        cellWasClicked: (event) => { // Example of consuming Grid Event
          console.log("cell was clicked", event);
        },
        deselectRows: () =>{
          gridApi.value.deselectAll()
        }
      };
    },
   };
</script>

<style lang="scss"></style>
