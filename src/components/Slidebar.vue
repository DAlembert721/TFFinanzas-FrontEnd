<template>
  <div>
    <v-app-bar dense color="green accent-2">
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
      <v-spacer></v-spacer>
      <v-toolbar-title>Otorongo</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn @click="logout">Cerrar sesión</v-btn>
    </v-app-bar>
    <v-navigation-drawer absolute v-model="drawer" app fixed temporary dark>
      <template v-slot:prepend>
        <v-list nav dense>
          <v-list-item-group v-model="group" class="text--accent-4">
            <v-list-item>
              <v-list-item-icon @click="toHome()">
                <v-icon>mdi-home</v-icon>
              </v-list-item-icon>
              <v-list-item-title @click="toHome()">Home</v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-icon @click="toProfile()">
                <v-icon>mdi-account</v-icon>
              </v-list-item-icon>
              <v-list-item-title @click="toProfile()">Perfil</v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-icon @click="toProducts()">
                <v-icon>mdi-package</v-icon>
              </v-list-item-icon>
              <v-list-item-title @click="toProducts()">Productos</v-list-item-title>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </template>
    </v-navigation-drawer>
  </div>

</template>

<script>
export default {
  name: "Slidebar",
  data: () => ({
    drawer: false,
    group: null,
  }),
  methods: {
    toProfile() {
      this.$router.push({name: 'profile'})
    },
    toHome() {
      this.$router.push({ name: 'home' })
    },
    toProducts() {
      this.$router.push({name: 'product'})
    },
    logout() {
      this.$store.dispatch('auth/logout');
      this.$router.push('index')
    }
  }
}
</script>

<style scoped>

</style>
