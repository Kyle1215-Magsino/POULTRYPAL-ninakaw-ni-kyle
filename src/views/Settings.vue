<template>
  <v-container fluid class="py-6 px-8">
    <!-- Header -->
    <h2 class="text-h5 mb-6 font-weight-medium">Settings</h2>

    <v-row dense class="d-flex flex-column align-start">
      <!-- Dark Mode Toggle -->
      <v-col cols="12" class="d-flex justify-start">
        <v-card elevation="10" class="pa-5 hover-glow settings-card" style="width: 100%; max-width: 600px;">
          <h3 class="text-subtitle-1 mb-3">Dark Mode</h3>
          <v-switch v-model="isDark" label="Enable Dark Mode" inset></v-switch>
        </v-card>
      </v-col>

      <!-- Notification Settings -->
      <v-col cols="12" class="d-flex justify-start">
        <v-card elevation="10" class="pa-5 hover-glow settings-card" style="width: 100%; max-width: 600px;">
          <h3 class="text-subtitle-1 mb-3">Notifications</h3>
          <v-checkbox v-model="notifications.email" label="Email Alerts"></v-checkbox>
          <v-checkbox v-model="notifications.sms" label="SMS Alerts"></v-checkbox>
        </v-card>
      </v-col>

      <!-- Account Security -->
      <v-col cols="12" class="d-flex justify-start">
        <v-card elevation="10" class="pa-5 hover-glow settings-card" style="width: 100%; max-width: 600px;">
          <h3 class="text-subtitle-1 mb-3">Account Security</h3>
          <v-text-field
            v-model="password"
            label="Change Password"
            type="password"
            prepend-inner-icon="mdi-lock-outline"
            variant="outlined"
            color="primary"
            hide-details="auto"
            class="mb-4"
          ></v-text-field>
          <v-btn color="primary" @click="updatePassword">Update Password</v-btn>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useTheme } from 'vuetify'

const theme = useTheme()
const isDark = ref(theme.global.name.value === 'dark')

// Sync toggle with Vuetify theme globally
watch(isDark, val => {
  theme.global.name.value = val ? 'dark' : 'light'
})

const notifications = ref({
  email: true,
  sms: false,
})

const password = ref('')

function updatePassword() {
  if (!password.value) {
    alert('Please enter a password.')
    return
  }
  alert('Password updated successfully!')
  password.value = ''
}
</script>

<style scoped>
.settings-card {
  border-radius: 16px;
  transition: box-shadow 0.3s ease;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
  background-color: var(--v-theme-surface);
  color: var(--v-theme-on-surface);
  /* Make sure the cards take full width but max 600px */
  width: 100%;
  max-width: 600px;
}

.settings-card:hover {
  box-shadow: 0 6px 24px rgba(0, 145, 255, 0.5);
}

.v-btn {
  text-transform: none;
}
</style>
