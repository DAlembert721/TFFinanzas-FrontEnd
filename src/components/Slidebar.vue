<template>
  <v-app-bar dense color="green accent-2">
    <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
    <v-navigation-drawer v-model="drawer" app temporary color="grey">
      <v-list nav dense>
        <v-list-item>
          <v-list-item-icon>
            <v-icon>mdi-home</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Home</v-list-item-title>
        </v-list-item>
        <v-list-item>
          <v-list-item-icon>
            <v-icon>mdi-account</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Perfil</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-spacer></v-spacer>
    <v-toolbar-title>Otorongo</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn>Cerrar sesión</v-btn>
  </v-app-bar>
</template>

<script>
export default {
  name: "Slidebar",
  data: () => ({
    drawer: false
  })
}
</script>

<style scoped>

</style>