<template>
    <ul class="tabnav">
        <li @click="isActive = 'table'" :class="{ 'active': isActive === 'table' }">
            生活記録表
        </li>
        <li @click="isActive = 'graph'" :class="{ 'active': isActive === 'graph' }">
            睡眠グラフ
        </li>
    </ul>
    <div v-if="isActive === 'table'">
        <ActivitiesLog></ActivitiesLog>
    </div>
    <div v-else-if="isActive === 'graph'">
        <SleepGraph></SleepGraph>
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
import ActivitiesLog from '../../components/ActivitiesLog.vue'
import SleepGraph from '../../components/SleepGraph.vue';
import { ref } from 'vue';

const isActive = ref('table')
</script>

<style lang="scss">

</style>
