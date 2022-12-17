<template>
    <h1>生活記録表</h1>
    <div class="border mb-5"></div>
    <div class="mb-2">
        <small class="me-3"><strong>※実睡眠時間</strong>：体が完全に安静な状態の時間</small>
        <small class="me-3"><strong>※睡眠時間</strong>：ベッドにいた時間</small>
        <small><strong>※睡眠効率</strong>：実睡眠時間 / 睡眠時間×100</small>
    </div>
    <select v-model="targetMonthRef">
        <option v-for="n in 12" v-bind:value="n">{{ n }}月</option>
    </select>
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
let d = new Date()
console.log(d.getFullYear())
import { ref, provide } from 'vue'

const targetMonthRef = ref(new Date().getMonth() + 1);
const activeTab = ref('table')

provide('targetMonthRef', targetMonthRef)

</script>

<style lang="scss">

</style>
