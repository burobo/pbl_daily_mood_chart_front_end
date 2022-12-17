<template>
  <h1>生活記録表</h1>
  <div class="border mb-5"></div>
  <div class="mb-3">
    <small class="me-3"><strong>※実睡眠時間</strong>：体が完全に安静な状態の時間</small>
    <small class="me-3"><strong>※睡眠時間</strong>：ベッドにいた時間</small>
    <small><strong>※睡眠効率</strong>：実睡眠時間 / 睡眠時間×100</small>
  </div>
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
      睡眠グラフ
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
import { ref, provide } from 'vue'

let d = new Date()
const startDate = ref([d.getFullYear(), d.getMonth(), '01'].join('-'));
const endDate = ref([d.getFullYear(), d.getMonth() + 1, d.getDate()].join('-'));
const activeTab = ref('table')

provide('startDate', startDate)
provide('endDate', endDate)

</script>

<style lang="scss">

</style>
