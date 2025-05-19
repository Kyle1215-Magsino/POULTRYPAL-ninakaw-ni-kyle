<template>
  <v-container fluid class="pa-4">
    <!-- Header -->
    <div class="dashboard-header">
      <h2>Dashboard</h2>
    </div>

    <v-row
      class="dashboard-row"
      justify="start"
      align="stretch"
      style="gap: 20px; flex-wrap: nowrap;"
    >
      <v-col cols="12" sm="4" class="dashboard-col">
        <v-card class="dashboard-card">
          <v-card-title>Chicken Fed</v-card-title>
          <v-card-text>120 Chickens Fed Today</v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" sm="4" class="dashboard-col">
        <v-card class="dashboard-card">
          <v-card-title>Grams</v-card-title>
          <v-card-text>24,000g Fed Today</v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" sm="4" class="dashboard-col">
        <v-card class="dashboard-card">
          <v-card-title>Mortality Rate</v-card-title>
          <v-card-text>1.5% Today</v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row style="margin-top: 32px;">
      <v-col cols="12" class="chart-col">
        <v-card class="dashboard-card">
          <v-card-title>Weekly Feed Overview</v-card-title>
          <v-card-text>
            <canvas
              id="feedChart"
              height="220"
              style="max-width: 700px; width: 100%; margin: 0 auto; display: block;"
            ></canvas>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { onMounted } from 'vue'

function getGradientColors(ctx, width, height, steps, colorStops) {
  // Create linear gradient left to right
  const gradient = ctx.createLinearGradient(0, 0, width, 0)

  // Add color stops, e.g. [{pos:0,color:'#42a5f5'}, {pos:0.5,color:'#7e57c2'}, {pos:1,color:'#ec407a'}]
  colorStops.forEach(({ pos, color }) => {
    gradient.addColorStop(pos, color)
  })

  // Create temporary canvas to sample colors from gradient
  const tempCanvas = document.createElement('canvas')
  tempCanvas.width = width
  tempCanvas.height = height
  const tempCtx = tempCanvas.getContext('2d')

  // Fill gradient
  tempCtx.fillStyle = gradient
  tempCtx.fillRect(0, 0, width, height)

  // Sample colors evenly across the gradient width
  const colors = []
  for (let i = 0; i < steps; i++) {
    const x = Math.floor((i / (steps - 1)) * (width - 1))
    const imageData = tempCtx.getImageData(x, height / 2, 1, 1).data
    const [r, g, b, a] = imageData
    colors.push(`rgba(${r},${g},${b},${a / 255})`)
  }

  return colors
}

onMounted(() => {
  const ctx = document.getElementById('feedChart').getContext('2d')

  const steps = 7 // number of bars
  const width = 700 // canvas width for gradient sampling
  const height = 20

  // Define your gradient stops here (from blue to purple to pink)
  const colorStops = [
    { pos: 0, color: '#42a5f5' },
    { pos: 0.5, color: '#7e57c2' },
    { pos: 1, color: '#ec407a' },
  ]

  // Get gradient colors array for bars
  const barColors = getGradientColors(ctx, width, height, steps, colorStops)

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [
        {
          label: 'Feed (grams)',
          data: [4000, 4500, 4200, 5000, 4800, 4600, 4700],
          backgroundColor: barColors,
          borderRadius: 12,
          maxBarThickness: 20,
          borderSkipped: false,
          hoverBackgroundColor: '#1976d2',
        },
      ],
    },
    options: {
      responsive: true,
      animation: {
        duration: 1000,
        easing: 'easeOutQuart',
        delay(ctx) {
          if (ctx.type !== 'data' || ctx.mode !== 'default') return 0
          return ctx.dataIndex * 200
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            color: '#555',
            font: { weight: '600' },
          },
          grid: {
            color: '#eee',
          },
        },
        x: {
          ticks: {
            color: '#555',
            font: { weight: '600' },
          },
          grid: {
            display: false,
          },
        },
      },
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: '#1976d2',
          titleFont: { weight: '700' },
          bodyFont: { weight: '500' },
          cornerRadius: 6,
          padding: 10,
          callbacks: {
            label(ctx) {
              return ctx.parsed.y + ' grams'
            },
          },
        },
      },
    },
  })
})
</script>

<style scoped>
.dashboard-header {
  background-color: #2c2c2c;
  color: white;
  padding: 14px 24px;
  font-weight: 600;
  font-size: 20px;
  user-select: none;
  margin-bottom: 18px;
  border-radius: 8px;
  text-align: left;
  width: 100%;
  box-sizing: border-box;
}

.dashboard-row {
  gap: 20px;
  flex-wrap: nowrap;
}

.dashboard-col {
  flex-shrink: 1;
  min-width: 0;
}

.chart-col {
  padding-left: 12px;
  padding-right: 12px;
}

.dashboard-card {
  background-color: white;
  color: black;
  box-shadow:
    0 10px 25px rgba(0, 0, 0, 0.12),
    0 8px 16px rgba(0, 0, 0, 0.08);
  border-radius: 16px;
  padding: 20px 24px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-sizing: border-box;
  height: 100%;
}

.dashboard-card:hover {
  transform: translateY(-6px);
  box-shadow:
    0 25px 45px rgba(66, 165, 245, 0.45),
    0 12px 28px rgba(66, 165, 245, 0.25);
}

.v-card-title {
  font-weight: 700 !important;
  font-size: 1.1rem !important;
  margin-bottom: 8px;
}

.v-card-text {
  font-size: 0.95rem;
  line-height: 1.3;
  color: #444;
}
</style>
