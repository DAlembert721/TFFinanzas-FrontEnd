<template>
  <v-app-bar dense color="green accent-2">
    <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
    <v-navigation-drawer v-model="drawer" app temporary color="grey">
      <v-list nav dense>
        <v-list-item>
          <v-list-item-icon @click="toHome()">
            <v-icon>mdi-home</v-icon>
          </v-list-item-icon>
          <v-list-item-title @click="toHome()">
            Home
          </v-list-item-title>
        </v-list-item>
        <v-list-item>
          <v-list-item-icon @click="toProfile()">
            <v-icon>mdi-account</v-icon>
          </v-list-item-icon>
          <v-list-item-title @click="toProfile()">
            Perfil
          </v-list-item-title>
        </v-list-item>
        <v-list-item>
          <v-list-item-icon @click="toProducts()">
            <v-icon>mdi-package</v-icon>
          </v-list-item-icon>
          <v-list-item-title @click="toProducts()">
            Productos
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-spacer></v-spacer>
    <v-toolbar-title>Otorongo</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn @click="logout">Cerrar sesión</v-btn>
  </v-app-bar>
</template>

<script>
export default {
  name: "Slidebar",
  data: () => ({
    drawer: false
  }),
  methods: {
    toProfile() {
      this.$router.push('profile')
    },
    toHome() {
      this.$router.push('home')
    },
    toProducts() {
      this.$router.push('products')
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
