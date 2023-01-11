<template>
  <h1>生活記録表</h1>
  <div class="border mb-5"></div>
  <div class="mb-3">
    開始日<input type="date" v-model="startDate" />
    -
    終了日<input type="date" v-model="endDate" />
  </div>
  <ul class="tabnav">
    <li @click="activeTab = 'table'" :class="{ 'active': activeTab === 'table' }">
      生活記録表
    </li>
    <li @click="activeTab = 'graph'" :class="{ 'active': activeTab === 'graph' }">
      生活記録グラフ
    </li>
  </ul>
  <div v-if="activeTab === 'table'">
    <ActivitiesLog />
  </div>
  <div v-if="activeTab === 'graph'">
    <SleepGraph />
  </div>
</template>

<style>
.sleep-bg {
  background-color: #0b3769;
  padding: 20px 25px;
}

.exercise-bg {
  background-color: #F45656;
  padding: 20px 25px;
}

.commute-bg {
  background-color: #ffc003;
  padding: 20px 25px;
}

.bathe-bg {
  background-color: #00BFFF;
  padding: 20px 25px;
}

.commute-hospital-bg {
  background-color: #34a853;
  padding: 20px 25px;
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

<script setup>
import { ref, provide, watch } from 'vue'

const startDate = ref();
const endDate = ref();
const activeTab = ref('table')

provide('startDate', startDate)
provide('endDate', endDate)
watch(startDate, setStartDate)
watch(endDate, setEndDate)

function zeroPadding(digit, str) {
  return ("0".repeat(digit) + str).slice(-digit);
}

function setStartDate() {
  localStorage.setItem('startDate', startDate.value)
}
function setEndDate() {
  localStorage.setItem('endDate', endDate.value)
}

onMounted(() => {
  let d = new Date()
  const defaultStartDate = new Date(d.getFullYear(), d.getMonth() - 1, 1);
  startDate.value = localStorage.getItem('startDate') || [defaultStartDate.getFullYear(), zeroPadding(2, defaultStartDate.getMonth() + 1), zeroPadding(2, defaultStartDate.getDate())].join('-');
  endDate.value = localStorage.getItem('endDate') || [d.getFullYear(), zeroPadding(2, d.getMonth() + 1), zeroPadding(2, d.getDate())].join('-');
})
</script>

<style lang="scss">

</style>
