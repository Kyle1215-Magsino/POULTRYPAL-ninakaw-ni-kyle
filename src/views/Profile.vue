<template>
  <v-container class="pa-6" max-width="600px">
    <v-card class="pa-6" elevation="12" shaped>
      <h2 class="profile-header mb-6">Your Profile</h2>

      <!-- Profile Picture -->
      <div class="profile-pic-wrapper mb-6">
        <v-avatar size="120" class="mx-auto">
          <img
            v-if="previewImage"
            :src="previewImage"
            alt="Profile Picture"
          />
          <v-icon
            v-else
            color="grey lighten-1"
            size="120"
          >
            mdi-account-circle
          </v-icon>
        </v-avatar>

        <v-btn
          class="mt-3"
          color="primary"
          @click="triggerFileInput"
          small
          depressed
        >
          Change Photo
        </v-btn>

        <input
          ref="fileInput"
          type="file"
          accept="image/*"
          @change="onFileChange"
          hidden
        />
      </div>

      <!-- User Info Form -->
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field
          v-model="user.fullName"
          label="Full Name"
          :rules="[rules.required]"
          outlined
          dense
          class="mb-4"
        />

        <v-text-field
          v-model="user.email"
          label="Email"
          :rules="[rules.required, rules.email]"
          outlined
          dense
          class="mb-4"
        />

        <v-divider class="my-6"></v-divider>

        <h3 class="mb-4">Change Password</h3>

        <v-text-field
          v-model="password.current"
          label="Current Password"
          type="password"
          :rules="[rules.requiredIfPassword]"
          outlined
          dense
          class="mb-4"
        />

        <v-text-field
          v-model="password.new"
          label="New Password"
          type="password"
          :rules="[rules.minLength(6), rules.requiredIfPassword]"
          outlined
          dense
          class="mb-4"
        />

        <v-text-field
          v-model="password.confirm"
          label="Confirm New Password"
          type="password"
          :rules="[rules.matchPassword]"
          outlined
          dense
          class="mb-6"
        />

        <v-btn
          :disabled="!valid || loading"
          color="success"
          @click="submit"
          block
          large
        >
          <v-progress-circular
            v-if="loading"
            indeterminate
            size="18"
            width="2"
            color="white"
            class="mr-2"
          ></v-progress-circular>
          Save Changes
        </v-btn>
      </v-form>

      <v-snackbar
        v-model="snackbar.show"
        :color="snackbar.color"
        timeout="3500"
        top
      >
        {{ snackbar.message }}
        <template #action>
          <v-btn text @click="snackbar.show = false">Close</v-btn>
        </template>
      </v-snackbar>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref, reactive } from 'vue'

const user = reactive({
  fullName: 'John Doe',
  email: 'john.doe@example.com',
})

const password = reactive({
  current: '',
  new: '',
  confirm: '',
})

const previewImage = ref(null)
const loading = ref(false)
const valid = ref(false)

const snackbar = reactive({
  show: false,
  message: '',
  color: '',
})

// Validation rules
const rules = {
  required: (v) => !!v || 'This field is required',
  email: (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
  minLength: (min) => (v) =>
    !v || v.length >= min || `Must be at least ${min} characters`,
  matchPassword: (v) =>
    v === password.new || 'Passwords do not match',
  requiredIfPassword: (v) =>
    !password.new || !!v || 'This field is required when changing password',
}

const fileInput = ref(null)

function triggerFileInput() {
  fileInput.value.click()
}

function onFileChange(e) {
  const file = e.target.files[0]
  if (!file) return

  const reader = new FileReader()
  reader.onload = (event) => {
    previewImage.value = event.target.result
  }
  reader.readAsDataURL(file)
}

function submit() {
  if (!valid.value) {
    snackbar.color = 'error'
    snackbar.message = 'Please fix errors in the form.'
    snackbar.show = true
    return
  }

  loading.value = true
  setTimeout(() => {
    loading.value = false
    snackbar.color = 'success'
    snackbar.message = 'Profile updated successfully!'
    snackbar.show = true

    password.current = ''
    password.new = ''
    password.confirm = ''
  }, 1500)
}
</script>

<style scoped>
.profile-pic-wrapper {
  text-align: center;
}

.v-avatar img {
  object-fit: cover;
  border-radius: 50%;
}

.profile-header {
  font-weight: 700;
  color: #fff;
  text-align: center;
}

.v-btn {
  min-width: 140px;
}

/* Override default container background for dark mode */
.v-application {
  background-color: #121212;
}

/* Card background to match sidebar theme with white text */
.v-card {
  background-color: #1e1e1e;
  color: white;
}

/* Input label color override */
.v-label {
  color: #ccc !important;
}

/* Text fields text color */
.v-input__control {
  color: white;
}

/* Input outline color */
.v-input.v-input--is-focused:not(.v-input--has-state) .v-input__control {
  border-color: #90caf9 !important;
}
</style>
