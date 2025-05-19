<template>
  <v-container fluid class="py-6 px-8">
    <!-- Header -->
    <h2 class="text-black text-h5 mb-6 font-weight-medium">Monitoring Overview</h2>

    <!-- Stat Cards -->
    <v-row dense class="mb-8">
      <v-col cols="12" sm="4">
        <v-card class="pa-4 stat-card hover-glow" elevation="10">
          <h3 class="text-subtitle-1 mb-2">Temperature</h3>
          <div class="text-h5 font-weight-bold">28°C</div>
        </v-card>
      </v-col>
      <v-col cols="12" sm="4">
        <v-card class="pa-4 stat-card hover-glow" elevation="10">
          <h3 class="text-subtitle-1 mb-2">Humidity</h3>
          <div class="text-h5 font-weight-bold">65%</div>
        </v-card>
      </v-col>
      <v-col cols="12" sm="4">
        <v-card class="pa-4 stat-card hover-glow" elevation="10">
          <h3 class="text-subtitle-1 mb-2">Feed Level</h3>
          <div class="text-h5 font-weight-bold">82%</div>
        </v-card>
      </v-col>
    </v-row>

    <!-- Chart -->
    <v-card elevation="12" class="pa-6 mb-8 chart-card hover-glow">
      <canvas ref="chartCanvas" height="100"></canvas>
    </v-card>

    <!-- Feeding Log Form -->
    <v-card elevation="10" class="pa-6 stat-card hover-glow">
      <h3 class="text-subtitle-1 mb-4">Chicken Feeding Log</h3>
      <v-form @submit.prevent="submitLog">
        <v-row dense>
          <v-col cols="12" sm="4">
            <v-checkbox v-model="fed" label="Chicken was fed" color="green"></v-checkbox>
          </v-col>
          <v-col cols="12" sm="4">
            <v-text-field v-model="date" label="Date" type="date" :rules="[v => !!v || 'Date is required']"></v-text-field>
          </v-col>
          <v-col cols="12" sm="4">
            <v-text-field v-model="time" label="Time" type="time" :rules="[v => !!v || 'Time is required']"></v-text-field>
          </v-col>
        </v-row>

        <v-btn type="submit" color="primary" class="mt-4">Log Feeding</v-btn>
      </v-form>

      <div v-if="logEntries.length" class="mt-6">
        <h4 class="text-subtitle-2 mb-2">Recent Logs:</h4>
        <v-list dense>
          <v-list-item v-for="(entry, index) in logEntries" :key="index">
            <v-list-item-content>
              <v-list-item-title>
                {{ entry.date }} at {{ entry.time }} —
                <strong>{{ entry.fed ? 'Fed' : 'Not Fed' }}</strong>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </div>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'

const chartCanvas = ref(null)
let chartInstance = null

const fed = ref(false)
const date = ref('')
const time = ref('')

const logEntries = ref(JSON.parse(localStorage.getItem('feedingLogs') || '[]'))

function submitLog() {
  if (!date.value || !time.value) return

  logEntries.value.unshift({
    fed: fed.value,
    date: date.value,
    time: time.value
  })

  fed.value = false
  date.value = ''
  time.value = ''
}

watch(logEntries, (newVal) => {
  localStorage.setItem('feedingLogs', JSON.stringify(newVal))
}, { deep: true })

onMounted(() => {
  const ctx = chartCanvas.value.getContext('2d')
  const gradient = ctx.createLinearGradient(0, 0, 0, 400)
  gradient.addColorStop(0, 'rgba(0, 191, 255, 0.5)')
  gradient.addColorStop(1, 'rgba(0, 191, 255, 0)')

  chartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['6 AM', '9 AM', '12 PM', '3 PM', '6 PM', '9 PM'],
      datasets: [{
        label: 'Temperature (°C)',
        data: [22, 24, 27, 29, 28, 26],
        backgroundColor: gradient,
        borderColor: '#00bfff',
        fill: true,
        tension: 0.3,
        pointRadius: 4,
        pointBackgroundColor: '#00bfff',
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          labels: { color: '#000' },
        },
      },
      scales: {
        x: {
          ticks: { color: '#333' },
          grid: { color: '#eee' },
        },
        y: {
          ticks: { color: '#333' },
          grid: { color: '#eee' },
        },
      },
    }
  })
})
</script>

<style scoped>
:deep(.stat-card),
:deep(.chart-card) {
  background-color: white;
  color: #1e1e1e;
  border-radius: 16px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
  transition: box-shadow 0.3s ease, transform 0.3s ease;
}

:deep(.hover-glow:hover) {
  box-shadow: 0 6px 24px rgba(0, 191, 255, 0.8) !important;
  transform: translateY(-4px);
}
</style>
