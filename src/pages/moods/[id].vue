<script setup>
</script>
<script>
export default {
  name: "inputMood",
  data() {
    return {
          targetDate: "2022-01-01T00:00",
          mood: null,
        };
    },
  methods: {
    isMoodSelected(mood) {
        return this.mood === mood;
    },
    async upsertMood() {
      const config = useRuntimeConfig()
      const { data, pending, error, refresh } = await useFetch("/", {
        method: "POST",
        baseURL: config.API_BASE_URL,
        body: {
          user_id: "19103",
          date: this.targetDate,
          mood: this.mood.toString(),
        },
      });
    },
    async deleteMood() {
      const config = useRuntimeConfig()
      const { data, pending, error, refresh } = await useFetch("/", {
        method: "DELETE",
        baseURL: config.API_BASE_URL,
        body: {
          user_id: "19103",
          date: this.targetDate,
        },
      });
    },
    selectMood(mood) {
      this.mood = mood;
    },
  },
};
</script>

<template>
  <div class="d-flex aligh-item-center justify-content-center">
    <div class="">
      <div class="">
        <input v-model="targetDate" type="datetime-local" />
      </div>
      <div class="">
        <input
          class="btn btn-outline-secondary"
          :class="{ 'btn-primary': isMoodSelected(0) }"
          type="button"
          value="😢"
          @click="selectMood(0)"
        />
        <input
          class="btn btn-outline-secondary"
          :class="{ 'btn-primary': isMoodSelected(1) }"
          type="button"
          value="🙁"
          @click="selectMood(1)"
        />
        <input
          class="btn btn-outline-secondary"
          :class="{ 'btn-primary': isMoodSelected(2) }"
          type="button"
          value="😐"
          @click="selectMood(2)"
        />
        <input
          class="btn btn-outline-secondary"
          :class="{ 'btn-primary': isMoodSelected(3) }"
          type="button"
          value="😃"
          @click="selectMood(3)"
        />
        <input
          class="btn btn-outline-secondary"
          :class="{ 'btn-primary': isMoodSelected(4) }"
          type="button"
          value="😄"
          @click="selectMood(4)"
        />
      </div>
      <div class="">
        <input type="button" @click="upsertMood" value="作成・更新" />
        <input type="button" @click="deleteMood" value="削除" />
      </div>
    </div>
  </div>
</template>
