<script>
    import Vue from 'vue'
    Vue.createApp({
    data() {
        return {
            targetDate: ''
        }
    }
    }).mount('#target-mood-date')
</script>

<template>
    <div id="target-mood-date">
        <label for="target-date">Choose a time for your appointment:</label>
        <input v-model="targetDate" type="datetime-local" id="target-date">
    </div>
</template>
