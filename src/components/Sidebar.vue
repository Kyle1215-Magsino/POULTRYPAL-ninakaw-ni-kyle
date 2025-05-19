<template>
  <v-navigation-drawer
    app
    permanent
    class="sidebar"
  >
    <!-- Header -->
    <div class="sidebar-header">
      <h2 class="project-name">🐔 PoultryPal</h2>
    </div>

    <!-- Navigation Items -->
    <v-list dense>
      <v-list-item
        v-for="item in items"
        :key="item.title"
        link
        class="sidebar-button"
        @click="navigate(item.route)"
      >
        <v-list-item-icon>
          <v-icon color="white">{{ item.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title class="white--text">
            {{ item.title }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const items = [
  { title: 'Dashboard', icon: 'mdi-view-grid-outline', route: '/dashboard' },
  { title: 'Profile', icon: 'mdi-account-circle-outline', route: '/profile' },
  { title: 'Settings', icon: 'mdi-cog-outline', route: '/settings' },
  { title: 'Monitoring', icon: 'mdi-chart-line-variant', route: '/monitoring' },
]

function navigate(route) {
  router.push(route)
}
</script>

<style scoped>
.sidebar {
  background-color: #1e1e1e !important; /* Grayish black */
  color: white;
  width: 260px;
  border-right: 1px solid rgba(255, 255, 255, 0.05);
}

.sidebar-header {
  padding: 24px 16px;
  text-align: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.project-name {
  color: white;
  font-size: 22px;
  font-weight: bold;
  margin: 0;
}

.sidebar-button {
  transition: background-color 0.3s ease, transform 0.2s ease;
  border-radius: 8px;
  margin: 4px 8px;
}

.sidebar-button:hover {
  background-color: rgba(255, 255, 255, 0.08);
  transform: translateX(5px);
}
</style>
