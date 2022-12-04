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

<script>
import SleepGraph from '../../components/moods/SleepGraph.vue';
import { ref } from 'vue';

export default {
    name: "ShowSleep",
    components: {
        SleepGraph
    },
    setup() {
        const isActive = ref('table')

        return {
            isActive
        };
    },
};
</script>

<style lang="scss">

</style>
